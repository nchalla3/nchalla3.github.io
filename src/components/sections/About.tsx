"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading number="01" title="About Me" />

      <div className="grid md:grid-cols-5 gap-12 items-start">
        {/* Bio text */}
        <div className="md:col-span-3 space-y-4 text-slate-400 leading-relaxed">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Hi! I&apos;m Naveen, a software engineer based in the US with a
            passion for building products that make a difference. I got my start
            in computer science studying algorithms and systems, and quickly
            fell in love with the craft of writing clean, efficient code.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            My main focus these days is building accessible, scalable web
            applications and services. I enjoy working across the full stack —
            from designing APIs to polishing UIs — and I care deeply about
            performance, developer experience, and shipping things that work.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            When I&apos;m not at my desk, I&apos;m usually hiking, tinkering
            with side projects, or reading about distributed systems.
          </motion.p>
        </div>

        {/* Skills */}
        <div className="md:col-span-2 space-y-5">
          {Object.entries(skills).map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <p className="font-mono text-[var(--accent)] text-xs mb-2 tracking-wider uppercase">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: catIndex * 0.1 + i * 0.05,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="font-mono text-xs bg-[#0f2137] border border-slate-700 text-slate-300 px-3 py-1 rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
