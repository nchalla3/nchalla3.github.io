import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";

const CONTENT_DIR = path.join(process.cwd(), "notes", "content");

function slugifySegment(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function filePathToSlug(filePath: string): string[] {
  const rel = path.relative(CONTENT_DIR, filePath).replace(/\.md$/, "");
  return rel.split(path.sep).map(slugifySegment).filter(Boolean);
}

function walkDir(dir: string, files: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, files);
    } else if (entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

export interface NoteMetadata {
  slug: string[];
  title: string;
  description?: string;
  date?: string;
  tags?: string[];
  folder: string;
}

export interface Note extends NoteMetadata {
  contentHtml: string;
}

export function getAllNotes(): NoteMetadata[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = walkDir(CONTENT_DIR);
  const notes: NoteMetadata[] = [];

  for (const filePath of files) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);

    if (String(data.publish) !== "true") continue;

    const fileName = path.basename(filePath, ".md");
    const rel = path.relative(CONTENT_DIR, filePath);
    const dirName = path.dirname(rel);
    const folder = dirName === "." ? "" : dirName;
    const slug = filePathToSlug(filePath);

    // Skip root index — it becomes /notes itself
    if (fileName.toLowerCase() === "index" && folder === "") continue;

    notes.push({
      slug,
      title: data.title ?? fileName,
      description: data.description,
      date: data.date ? String(data.date) : undefined,
      tags: Array.isArray(data.tags)
        ? data.tags
        : data.tags
          ? [String(data.tags)]
          : undefined,
      folder,
    });
  }

  return notes.sort(
    (a, b) =>
      a.folder.localeCompare(b.folder) || a.title.localeCompare(b.title),
  );
}

export async function getNoteBySlug(slug: string[]): Promise<Note | null> {
  if (!fs.existsSync(CONTENT_DIR)) return null;

  const files = walkDir(CONTENT_DIR);

  for (const filePath of files) {
    const fileSlug = filePathToSlug(filePath);
    if (JSON.stringify(fileSlug) !== JSON.stringify(slug)) continue;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    if (String(data.publish) !== "true") return null;

    const fileName = path.basename(filePath, ".md");
    const rel = path.relative(CONTENT_DIR, filePath);
    const dirName = path.dirname(rel);
    const folder = dirName === "." ? "" : dirName;

    return {
      slug,
      title: data.title ?? fileName,
      description: data.description,
      date: data.date ? String(data.date) : undefined,
      tags: Array.isArray(data.tags)
        ? data.tags
        : data.tags
          ? [String(data.tags)]
          : undefined,
      folder,
      contentHtml: await markdownToHtml(content),
    };
  }

  return null;
}

async function markdownToHtml(markdown: string): Promise<string> {
  // Strip Obsidian wiki-links: [[Note Title]] → Note Title
  const cleaned = markdown.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, alias) => alias ?? target);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(cleaned);

  return String(result);
}
