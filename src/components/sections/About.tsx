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
            I&apos;m Naveen, an undergraduate Computer Science student at the
            University of California, Santa Cruz. My interests are currently in
            scalable systems design to solve everyday problems and augmenting
            the human condition with the power of computing.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Outside of tech, I spend my time writing screenplays, going on
            whatever sidequest presents itself, and volunteering in my
            community. I&apos;m a big music person, with my current rotation
            including Noah Kahan, RHCP, Kendrick Lamar, Radiohead, Clipse, and
            Saba. You&apos;ll usually find me at a concert, catching a football
            or baseball game, or hunting down a good local spot to eat or
            drink. I also have a soft spot for movies and genuinely believe
            that trying something new spontaneously is almost always worth it.
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
                    className="font-mono text-xs bg-[var(--card)] border border-[var(--border)] text-slate-300 px-3 py-1 rounded-full hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 cursor-default"
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
