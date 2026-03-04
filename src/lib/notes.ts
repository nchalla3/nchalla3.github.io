import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";

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

// ── Obsidian callout plugin ────────────────────────────────────────────────
// Transforms blockquotes starting with [!type] into styled callout divs.
// Runs at the MDAST level so content nodes are still processed by the pipeline.

const CALLOUT_REGEX = /^\[!([\w-]+)\]([+-]?)(?:[ \t]+(.+))?$/;

interface MdastNode {
  type: string;
  children?: MdastNode[];
  value?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function transformCalloutNodes(node: MdastNode): void {
  if (!Array.isArray(node.children)) return;

  const newChildren: MdastNode[] = [];
  for (const child of node.children) {
    if (child.type === "blockquote") {
      const calloutNodes = tryConvertCallout(child);
      if (calloutNodes) {
        newChildren.push(...calloutNodes);
        continue;
      }
    }
    transformCalloutNodes(child);
    newChildren.push(child);
  }
  node.children = newChildren;
}

function tryConvertCallout(node: MdastNode): MdastNode[] | null {
  const firstChild = node.children?.[0];
  if (!firstChild || firstChild.type !== "paragraph") return null;

  const firstText = firstChild.children?.[0];
  if (!firstText || firstText.type !== "text" || !firstText.value) return null;

  const firstLine = firstText.value.split("\n")[0].trimEnd();
  const match = firstLine.match(CALLOUT_REGEX);
  if (!match) return null;

  const calloutType = match[1].toLowerCase();
  const defaultTitle = match[1].charAt(0).toUpperCase() + match[1].slice(1);
  const calloutTitle = match[3]?.trim() || defaultTitle;

  // Content: text after the callout marker + remaining paragraph children + sibling nodes
  const remainingText = firstText.value.slice(firstLine.length).replace(/^\n/, "");
  let contentChildren: MdastNode[] = [];

  if (remainingText || (firstChild.children?.length ?? 0) > 1) {
    const newParaChildren = [
      remainingText ? { type: "text", value: remainingText } : null,
      ...(firstChild.children?.slice(1) ?? []),
    ].filter(Boolean) as MdastNode[];

    if (newParaChildren.length > 0) {
      contentChildren.push({ type: "paragraph", children: newParaChildren });
    }
  }

  contentChildren.push(...(node.children?.slice(1) ?? []));

  // Recursively convert nested callouts in content
  const wrapper = { type: "root", children: contentChildren };
  transformCalloutNodes(wrapper);
  contentChildren = wrapper.children;

  return [
    {
      type: "html",
      value: `<div class="callout callout-${calloutType}" data-callout="${calloutType}"><div class="callout-title">${escapeHtml(calloutTitle)}</div><div class="callout-content">`,
    },
    ...contentChildren,
    { type: "html", value: `</div></div>` },
  ];
}

function remarkCallouts() {
  return (tree: MdastNode) => {
    transformCalloutNodes(tree);
  };
}

// ── Markdown → HTML ────────────────────────────────────────────────────────

async function markdownToHtml(markdown: string): Promise<string> {
  // Strip Obsidian wiki-links: [[Note Title]] → Note Title
  const cleaned = markdown.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, alias) => alias ?? target);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkCallouts)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      keepBackground: false,
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(cleaned);

  // Rewrite relative Quartz static asset paths to the live Cloudflare Pages URL.
  // Notes reference assets as "../static/foo" relative to their content path;
  // the portfolio doesn't serve those files, but they're available on the Quartz CDN.
  return String(result).replace(
    /src="\.\.\/static\//g,
    'src="https://nchalla3-notes.pages.dev/static/',
  );
}
