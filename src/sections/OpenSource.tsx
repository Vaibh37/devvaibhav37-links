import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, GitMerge } from "lucide-react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { site } from "../config/site";

export function OpenSource() {
  const reduceMotion = useReducedMotion();

  return (
    <section>
      <GapBand />
      <SectionHeader id="opensource" title="Open Source" aside={<span className="font-mono text-[10px] text-[var(--soft)]">03 / 07</span>} />
      <Shell>
        <div className="px-6 py-10 sm:px-8 sm:py-12">
          <Reveal y={16}>
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[.18em] text-[var(--soft)]">proof outside my own repos</p>
                <p className="mt-2 max-w-xl text-[15px] font-medium leading-7 text-[var(--muted)]">
                  Contributions that made it through review and into someone else's codebase.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-mono text-[9px] text-[var(--fg)]">
                <Check size={11} /> {site.contributions.length} merged
              </span>
            </div>
          </Reveal>

          <div className="grid gap-4">
            {site.contributions.map((c, i) => (
              <Reveal key={c.url} delay={i * 0.08} y={20}>
                <motion.a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={reduceMotion ? undefined : { y: -5 }}
                  whileTap={{ scale: 0.995 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className="group relative block overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-[0_14px_50px_rgba(0,0,0,.08)] transition-[border-color,box-shadow] hover:border-[var(--muted)] hover:shadow-[0_22px_70px_rgba(0,0,0,.18)] sm:p-6"
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute -right-3 -top-9 font-sans text-[120px] font-extrabold tracking-[-.1em] text-[var(--fg)] opacity-[.025]"
                    whileHover={reduceMotion ? undefined : { x: -8, rotate: -3 }}
                  >
                    0{i + 1}
                  </motion.span>

                  <div className="relative flex items-start justify-between gap-5">
                    <div className="flex min-w-0 gap-4">
                      <motion.span
                        whileHover={reduceMotion ? undefined : { rotate: 8, scale: 1.08 }}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[var(--line)] bg-[var(--bg)]"
                      >
                        <GitMerge size={16} />
                      </motion.span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[9px] text-[var(--soft)]">{c.repo}</span>
                          <span className="rounded-full border border-[var(--line)] px-2 py-0.5 font-mono text-[8px] uppercase tracking-[.12em] text-[var(--fg)]">merged</span>
                        </div>
                        <h3 className="mt-3 max-w-2xl font-sans text-lg font-bold leading-6 tracking-[-.025em] text-[var(--fg)] sm:text-xl">
                          {c.title}
                        </h3>
                        <p className="mt-3 font-mono text-[9px] leading-5 text-[var(--muted)]">{c.meta}</p>
                      </div>
                    </div>
                    <motion.span className="shrink-0 text-[var(--soft)] group-hover:text-[var(--fg)]" whileHover={{ x: 2, y: -2 }}>
                      <ArrowUpRight size={17} />
                    </motion.span>
                  </div>
                  <motion.span
                    className="absolute bottom-0 left-0 h-px bg-[var(--fg)]"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: .8, delay: .12 + i * .08, ease: [0.22,1,0.36,1] }}
                  />
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  );
}
