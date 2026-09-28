import { motion } from "framer-motion";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { site } from "../config/site";

export function About() {
  return (
    <section>
      <GapBand />
      <SectionHeader
        id="about"
        title="About"
        aside={<span className="font-mono text-[10px] text-[var(--soft)]">01 / 07</span>}
      />
      <Shell>
        <div className="grid gap-10 px-6 py-11 sm:grid-cols-[1fr_260px] sm:px-8 sm:py-14">
          <div className="space-y-4">
            {site.about.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.06} y={16}>
                <p className="text-sm leading-7 text-[var(--muted)]">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.12} y={18}>
            <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4">
              <p className="mb-3 font-mono text-[9px] uppercase tracking-[.16em] text-[var(--soft)]">
                developer snapshot
              </p>
              <div className="space-y-1">
                {site.tldr.map((item, index) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="group flex items-center gap-3 border-b border-[var(--line)] py-2.5 text-xs last:border-b-0"
                  >
                    <span className="font-mono text-[9px] text-[var(--accent)]">0{index + 1}</span>
                    <span className="text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
