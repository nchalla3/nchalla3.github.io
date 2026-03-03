"use client";

import { motion, type Variants } from "framer-motion";
import { social } from "@/lib/data";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto"
    >
      {/* Animated background grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 40%, rgba(45,212,191,0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(99,102,241,0.06) 0%, transparent 50%)`,
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(45,212,191,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,212,191,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="pt-24"
      >
        <motion.p
          variants={item}
          className="font-mono text-[var(--accent)] mb-5 text-sm md:text-base"
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          variants={item}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-100 leading-tight mb-3"
        >
          Naveen Challa.
        </motion.h1>

        <motion.h2
          variants={item}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-500 leading-tight mb-6"
        >
          I build things.
        </motion.h2>

        <motion.div variants={item} className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 font-mono text-sm border border-[var(--accent)] text-[var(--accent)] px-6 py-3 rounded hover:bg-[var(--accent)]/10 transition-all duration-300"
          >
            View my work
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
          <a
            href={social.email}
            className="font-mono text-sm text-slate-400 px-6 py-3 rounded border border-slate-700 hover:border-slate-500 hover:text-slate-200 transition-all duration-300"
          >
            Get in touch
          </a>
        </motion.div>

        {/* Social links sidebar */}
        <motion.div
          variants={item}
          className="flex gap-5 mt-14 md:mt-16"
        >
          {[
            { label: "GH", href: social.github },
            { label: "LI", href: social.linkedin },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-slate-500 hover:text-[var(--accent)] transition-colors tracking-widest"
            >
              {label}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-transparent to-[var(--accent)]"
        />
      </motion.div>
    </section>
  );
}
