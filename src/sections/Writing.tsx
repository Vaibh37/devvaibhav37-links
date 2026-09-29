import { motion } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { site } from "../config/site";

export function Writing() {
  return (
    <section>
      <GapBand />
      <SectionHeader id="writing" title="Writing" aside={<span className="font-mono text-[10px] text-[var(--soft)]">05 / 07</span>} />
      <Shell>
        <div className="px-6 py-8 sm:px-8">
          {site.writing.map((w) => (
            <Reveal key={w.title}>
              <motion.a
                href={w.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                className="group block rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_10px_40px_rgba(0,0,0,0)] transition-shadow hover:shadow-[0_18px_50px_rgba(0,0,0,.16)]"
              >
                <div className="flex items-start gap-4">
                  <motion.span
                    className="mt-1 text-[var(--fg)]"
                    whileHover={{ rotate: -8, scale: 1.08 }}
                  >
                    <BookOpen size={16} />
                  </motion.span>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--soft)]">{w.date}</span>
                    <div className="mt-1 flex items-start justify-between gap-4">
                      <h3 className="font-serif text-2xl">{w.title}</h3>
                      <ArrowUpRight size={15} className="mt-1 shrink-0 text-[var(--soft)] transition group-hover:text-[var(--fg)]" />
                    </div>
                    <p className="mt-2 text-xs leading-6 text-[var(--muted)]">{w.summary}</p>
                    <span className="mt-4 inline-block font-mono text-[9px] text-[var(--soft)]">part 1 / 8 · read on X ↗</span>
                  </div>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
