"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  number: string;
  title: string;
}

export default function SectionHeading({ number, title }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4 mb-12"
    >
      <span className="font-mono text-[var(--accent)] text-sm">
        {number}.
      </span>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-200 whitespace-nowrap">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
    </motion.div>
  );
}
