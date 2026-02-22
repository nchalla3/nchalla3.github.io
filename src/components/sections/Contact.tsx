"use client";

import { motion } from "framer-motion";
import { social } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading number="04" title="Get In Touch" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-xl mx-auto text-center"
      >
        <p className="text-slate-400 text-base leading-relaxed mb-10">
          I&apos;m currently open to new opportunities. Whether you have a
          question, a project idea, or just want to say hi — my inbox is always
          open. I&apos;ll do my best to get back to you!
        </p>

        <motion.a
          href={social.email}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block font-mono text-base border border-[var(--accent)] text-[var(--accent)] px-8 py-4 rounded hover:bg-[var(--accent)]/10 transition-all duration-300"
        >
          Say Hello →
        </motion.a>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center gap-8 mt-14"
        >
          {[
            { label: "GitHub", href: social.github },
            { label: "LinkedIn", href: social.linkedin },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-slate-500 hover:text-[var(--accent)] transition-colors duration-200 tracking-wider"
            >
              {label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
