import { motion } from "framer-motion";
import { ArrowUpRight, GitMerge } from "lucide-react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { site } from "../config/site";

export function OpenSource() {
  return (
    <section>
      <GapBand />
      <SectionHeader id="opensource" title="Open Source" aside={<span className="font-mono text-[10px] text-[var(--soft)]">03 / 07</span>} />
      <Shell>
        <div className="divide-y divide-[var(--line)]">
          {site.contributions.map((c, i) => (
            <Reveal key={c.url} delay={i * 0.06} y={12}>
              <motion.a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className="group grid grid-cols-[36px_1fr_auto] gap-3 px-6 py-5 hover:bg-[var(--hover)] sm:px-8"
              >
                <motion.span
                  className="pt-1 text-[var(--soft)]"
                  whileHover={{ rotate: 8, scale: 1.08 }}
                >
                  <GitMerge size={14} />
                </motion.span>
                <span>
                  <span className="font-mono text-[9px] text-[var(--soft)]">{c.repo}</span>
                  <strong className="mt-1 block text-sm font-medium">{c.title}</strong>
                  <span className="mt-1 block text-[10px] text-[var(--muted)]">{c.meta}</span>
                </span>
                <ArrowUpRight size={14} className="mt-1 text-[var(--soft)] transition-colors group-hover:text-[var(--accent)]" />
              </motion.a>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
