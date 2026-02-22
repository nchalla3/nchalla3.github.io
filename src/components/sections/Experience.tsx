"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const METRIC_RE = /(\$[\d,]+(?:\.\d+)?(?:k|K)?|top[-\s]\d+(?:%)?|\d+[\d,.]*(?:%|×|x|\+)?)/;

function BulletText({ text }: { text: string }) {
  // split with a capturing group: even indices = plain text, odd indices = metric matches
  const parts = text.split(METRIC_RE);
  return (
    <span>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="text-slate-200 font-semibold">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading number="02" title="Where I've Worked" />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Tab list */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-visible gap-0 border-b md:border-b-0 md:border-l border-slate-700 shrink-0">
          {experience.map((job, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`relative px-5 py-3 font-mono text-sm text-left whitespace-nowrap transition-all duration-200 ${
                activeTab === i
                  ? "text-[var(--accent)] bg-[var(--accent)]/5"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/30"
              }`}
            >
              {activeTab === i && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute left-0 top-0 bottom-0 md:w-0.5 md:h-auto h-0.5 w-auto bottom-0 md:bottom-auto right-0 md:right-auto bg-[var(--accent)]"
                />
              )}
              {job.role}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-xl font-semibold text-slate-200 mb-1">
                {experience[activeTab].role}{" "}
                <span className="text-[var(--accent)]">
                  @{" "}
                  <a
                    href={experience[activeTab].url}
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {experience[activeTab].company}
                  </a>
                </span>
              </h3>
              <p className="font-mono text-sm text-slate-500 mb-5">
                {experience[activeTab].period}
              </p>
              <ul className="space-y-3">
                {experience[activeTab].bullets.map((bullet, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-3 text-slate-400 text-sm leading-relaxed"
                  >
                    <span className="text-[var(--accent)] mt-1 shrink-0">▹</span>
                    <BulletText text={bullet} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
