import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { site } from "../config/site";

export function Projects() {
  const [open, setOpen] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section>
      <GapBand />
      <SectionHeader
        id="projects"
        title="Selected Projects"
        aside={<span className="font-mono text-[10px] text-[var(--soft)]">02 / 07</span>}
      />
      <Shell>
        <div className="divide-y divide-[var(--line)]">
          {site.projects.map((project, index) => {
            const expanded = open === index;

            return (
              <Reveal key={project.title} delay={index * 0.05} y={18}>
                <motion.article
                  layout={!reduceMotion}
                  className="group"
                  transition={{ layout: { type: "spring", stiffness: 260, damping: 30 } }}
                >
                  <motion.button
                    onClick={() => setOpen(expanded ? -1 : index)}
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="grid w-full grid-cols-[44px_1fr_auto] items-start gap-3 px-4 py-7 text-left sm:grid-cols-[54px_1fr_auto] sm:px-8"
                  >
                    <span className="pt-1 font-mono text-[10px] text-[var(--soft)]">0{index + 1}</span>
                    <span>
                      <span className="flex flex-wrap items-center gap-2">
                        <strong className="font-serif text-3xl font-normal transition-colors group-hover:text-[var(--accent)] sm:text-4xl">
                          {project.title}
                        </strong>
                        <span className="rounded-full border border-[var(--line)] px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-[var(--soft)]">
                          {project.status}
                        </span>
                      </span>
                      <span className="mt-2 block max-w-2xl text-xs leading-5 text-[var(--muted)] sm:text-sm">
                        {project.blurb}
                      </span>
                    </span>

                    <motion.span
                      animate={{ rotate: expanded ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 360, damping: 25 }}
                      className="mt-1 grid h-7 w-7 place-items-center rounded-full border border-[var(--line)] text-[var(--soft)]"
                    >
                      {expanded ? <Minus size={13} /> : <Plus size={13} />}
                    </motion.span>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 border-t border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-7 sm:grid-cols-[1fr_240px] sm:px-8">
                          <motion.div
                            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08, duration: 0.35 }}
                          >
                            <p className="font-mono text-[9px] uppercase tracking-[.16em] text-[var(--accent)]">
                              {project.label} · {project.year}
                            </p>
                            <p className="mt-3 text-xs leading-6 text-[var(--muted)]">{project.story}</p>
                            <div className="mt-5 flex flex-wrap gap-2">
                              {project.stack.map((tech, techIndex) => (
                                <motion.span
                                  key={tech}
                                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.12 + techIndex * 0.035 }}
                                  className="rounded-md border border-[var(--line)] px-2 py-1 font-mono text-[9px] text-[var(--soft)]"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </div>
                          </motion.div>

                          <motion.div
                            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.35 }}
                            className="terminal-card min-h-40 p-4"
                          >
                            <div className="mb-4 flex gap-1.5">
                              <i />
                              <i />
                              <i />
                            </div>
                            <p className="font-mono text-[9px] leading-5 text-[var(--soft)]">
                              $ project.inspect
                              <br />
                              <span className="text-[var(--muted)]">status:</span> {project.status.toLowerCase()}
                              <br />
                              <span className="text-[var(--muted)]">year:</span> {project.year}
                              <br />
                              <span className="text-[var(--muted)]">stack:</span> {project.stack.slice(0, 3).join(", ")}
                            </p>
                            <div className="mt-5 flex gap-2">
                              <a
                                onClick={(event) => event.stopPropagation()}
                                href={project.source}
                                target="_blank"
                                rel="noreferrer"
                                className="mini-link"
                              >
                                <Github size={12} /> source
                              </a>
                              {project.live && (
                                <a
                                  onClick={(event) => event.stopPropagation()}
                                  href={project.live}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="mini-link"
                                >
                                  <ArrowUpRight size={12} /> live
                                </a>
                              )}
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
