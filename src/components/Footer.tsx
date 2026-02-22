"use client";

import { social } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="py-8 text-center border-t border-slate-800/40">
      <p className="font-mono text-xs text-slate-600">
        Designed & Built by{" "}
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 hover:text-[var(--accent)] transition-colors"
        >
          Naveen Challa
        </a>
      </p>
    </footer>
  );
}
