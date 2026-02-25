import Link from "next/link";
import { getAllNotes } from "@/lib/notes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function NoteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

export default function NotesPage() {
  const notes = getAllNotes();

  // Group notes by folder
  const grouped: Record<string, typeof notes> = {};
  for (const note of notes) {
    const key = note.folder || "General";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(note);
  }

  const folders = Object.keys(grouped).sort();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-mono text-[var(--accent)] text-sm">05.</span>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-200">
            Notes
          </h1>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </div>
        <p className="text-slate-400 mb-16 ml-10">
          Notes on software, systems, and things I find interesting — mirrored
          from my{" "}
          <a
            href="https://nchalla3-notes.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline"
          >
            Quartz garden
          </a>
          .
        </p>

        {notes.length === 0 ? (
          <p className="text-slate-500 ml-10">No published notes yet.</p>
        ) : (
          <div className="space-y-14">
            {folders.map((folder) => (
              <div key={folder}>
                <h2 className="font-mono text-[var(--accent)] text-xs uppercase tracking-widest mb-5">
                  {folder}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {grouped[folder].map((note) => (
                    <Link
                      key={note.slug.join("/")}
                      href={`/notes/${note.slug.join("/")}`}
                      className="group relative bg-[#0d1b2e] border border-slate-800 rounded-lg p-5 flex flex-col gap-3 hover:border-[var(--accent)]/50 hover:shadow-[0_8px_30px_rgba(45,212,191,0.07)] transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-slate-600 group-hover:text-[var(--accent)] transition-colors mt-0.5 shrink-0">
                          <NoteIcon />
                        </span>
                        <h3 className="text-slate-200 font-semibold text-sm leading-snug group-hover:text-[var(--accent)] transition-colors">
                          {note.title}
                        </h3>
                      </div>
                      {note.description && (
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 pl-7">
                          {note.description}
                        </p>
                      )}
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pl-7">
                          {note.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="font-mono text-[10px] text-slate-500 bg-slate-800/60 px-1.5 py-0.5 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
