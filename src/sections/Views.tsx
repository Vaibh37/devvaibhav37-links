import { motion } from "framer-motion";
import { Eye, Radio } from "lucide-react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { Reveal } from "../components/Reveal";

const counterUrl =
  "https://api.visitorbadge.io/api/visitors?path=vaibh37-portfolio&label=views&labelColor=%23090909&countColor=%23d2493f";

export function Views() {
  return (
    <section>
      <GapBand />
      <SectionHeader
        id="views"
        title="Views"
        aside={<span className="font-mono text-[10px] text-[var(--soft)]">LIVE</span>}
      />
      <Shell>
        <div className="px-6 py-10 sm:px-8 sm:py-12">
          <Reveal y={18}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 sm:p-6"
            >
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full bg-[var(--accent)] opacity-[0.08] blur-3xl"
                animate={{ scale: [1, 1.12, 1], opacity: [0.06, 0.11, 0.06] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.16em] text-[var(--soft)]">
                    <Radio size={12} className="text-[var(--accent)]" />
                    live portfolio signal
                  </div>
                  <h3 className="mt-3 max-w-md font-serif text-3xl leading-tight sm:text-4xl">
                    People have been here.
                  </h3>
                  <p className="mt-3 max-w-lg text-xs leading-6 text-[var(--muted)]">
                    A lightweight page-view counter for this portfolio. Reloads count as views, so this is a traffic signal—not a unique-person metric.
                  </p>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="flex min-w-40 items-center gap-3 rounded-lg border border-[var(--line)] bg-[var(--bg)] p-4"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-md border border-[var(--line)] text-[var(--accent)]">
                    <Eye size={17} />
                  </span>
                  <div>
                    <span className="block font-mono text-[8px] uppercase tracking-[.15em] text-[var(--soft)]">
                      total
                    </span>
                    <img
                      src={counterUrl}
                      alt="Portfolio view count"
                      className="mt-1 h-[20px] max-w-full"
                      loading="eager"
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
