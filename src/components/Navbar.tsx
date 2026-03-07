"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, social } from "@/lib/data";

function applyTheme(t: "dark" | "light") {
  const root = document.documentElement;
  if (t === "light") {
    root.classList.add("light");
    root.style.setProperty("--background", "#f8fafc");
    root.style.setProperty("--foreground", "#0f172a");
    root.style.setProperty("--accent", "#0d9488");
    root.style.setProperty("--surface", "#f1f5f9");
    root.style.setProperty("--card", "#ffffff");
    root.style.setProperty("--border", "#e2e8f0");
  } else {
    root.classList.remove("light");
    root.style.removeProperty("--background");
    root.style.removeProperty("--foreground");
    root.style.removeProperty("--accent");
    root.style.removeProperty("--surface");
    root.style.removeProperty("--card");
    root.style.removeProperty("--border");
  }
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme") as "dark" | "light" | null;
      if (saved) {
        setTheme(saved);
        applyTheme(saved);
      }
    } catch {}
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setHidden(y > lastY && y > 200);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md navbar-scrolled border-b border-[var(--border)] shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            className="font-mono text-[var(--accent)] text-lg font-bold hover:opacity-80 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            NC
          </motion.a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, href }, i) => (
              <motion.li
                key={href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.3 }}
              >
                <a
                  href={href}
                  className="font-mono text-sm text-slate-400 hover:text-[var(--accent)] transition-colors duration-200"
                >
                  <span className="text-[var(--accent)] mr-1">
                    0{i + 1}.
                  </span>
                  {label}
                </a>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
            >
              <button
                onClick={toggleTheme}
                className="text-slate-400 hover:text-[var(--accent)] transition-colors p-1"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm border border-[var(--accent)] text-[var(--accent)] px-4 py-2 rounded hover:bg-[var(--accent)]/10 transition-all duration-200"
              >
                GitHub
              </a>
            </motion.li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-[var(--accent)]"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-0.5 bg-[var(--accent)]"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-0.5 bg-[var(--accent)]"
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-40 w-72 bg-[var(--surface)] shadow-2xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
                className="font-mono text-slate-200 text-lg hover:text-[var(--accent)] transition-colors"
              >
                <span className="text-[var(--accent)] block text-center text-xs mb-1">
                  0{i + 1}.
                </span>
                {label}
              </motion.a>
            ))}
            <button
              onClick={() => { toggleTheme(); setMenuOpen(false); }}
              className="text-slate-400 hover:text-[var(--accent)] transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
