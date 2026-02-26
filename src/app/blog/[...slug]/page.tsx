import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllNotes, getNoteBySlug } from "@/lib/notes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const notes = getAllNotes();
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) return {};
  return {
    title: `${note.title} | Naveen Challa`,
    description: note.description,
  };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  if (!note) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-[var(--accent)] transition-colors mb-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          All Notes
        </Link>

        {/* Metadata */}
        <div className="mb-2 flex flex-wrap items-center gap-3">
          {note.folder && (
            <span className="font-mono text-[var(--accent)] text-xs uppercase tracking-widest">
              {note.folder}
            </span>
          )}
          {note.date && (
            <span className="text-slate-600 text-xs">{note.date}</span>
          )}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4 leading-tight">
          {note.title}
        </h1>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {note.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs text-slate-500 bg-[var(--surface)] border border-[var(--border)] px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <hr className="border-slate-800 mb-10" />

        {/* Rendered markdown */}
        <article
          className="note-prose"
          dangerouslySetInnerHTML={{ __html: note.contentHtml }}
        />
      </main>
      <Footer />
    </div>
  );
}
