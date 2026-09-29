import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { site } from "../config/site";

const viewBadge =
  "https://api.visitorbadge.io/api/visitors?path=vaibh37-portfolio&label=views&labelColor=%23090909&countColor=%23f7f7f5";

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
        <div className="px-6 py-11 sm:px-8 sm:py-14">
          <Reveal y={10}>
            <div className="mb-6 flex items-center gap-2 text-[var(--soft)]">
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[.14em]">
                <Eye size={12} className="text-[var(--fg)]" />
                profile
              </span>
              <img src={viewBadge} alt="Portfolio view count" className="h-[18px] max-w-full" />
            </div>
          </Reveal>

          <div className="grid gap-12 sm:grid-cols-[1fr_280px]">
            <div className="space-y-4">
              {site.about.map((paragraph, index) => (
                <Reveal key={paragraph} delay={index * 0.06} y={16}>
                  <p className="max-w-[62ch] font-sans text-[15px] font-medium leading-8 text-[var(--fg)] opacity-[.82]">{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.12} y={18}>
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_18px_60px_rgba(0,0,0,.1)]">
                <p className="mb-3 font-mono text-[9px] uppercase tracking-[.16em] text-[var(--soft)]">
                  developer snapshot
                </p>
                <div className="space-y-1">
                  {site.tldr.map((item, index) => (
                    <motion.div
                      key={item}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="group flex items-center gap-3 border-b border-[var(--line)] py-3 text-[13px] font-semibold last:border-b-0"
                    >
                      <span className="font-mono text-[9px] text-[var(--fg)]">0{index + 1}</span>
                      <span className="text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
