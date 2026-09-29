import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { site } from "../config/site";

export function Projects() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <section>
      <GapBand />
      <SectionHeader id="projects" title="Selected Projects" aside={<span className="font-mono text-[10px] text-[var(--soft)]">02 / 07</span>} />
      <Shell>
        <div className="grid gap-5 px-4 py-8 md:grid-cols-2 sm:px-8">
          {site.projects.map((project, index) => {
            const expanded = open === index;
            return (
              <Reveal key={project.title} delay={index * 0.05} y={18}>
                <motion.article whileHover={reduceMotion ? undefined : { y: -5 }} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-[0_24px_80px_rgba(0,0,0,.12)]">
                  <div className="relative h-48 overflow-hidden border-b border-[var(--line)] bg-[var(--bg)] p-5">
                    <div className="absolute inset-0 bg-grid-fine opacity-45" />
                    <div className="absolute inset-0 bg-radial-mono opacity-40" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-[var(--line)] bg-[var(--card)] px-2.5 py-1 font-mono text-[8px] uppercase tracking-[.15em] text-[var(--muted)]">● {project.status}</span>
                        <span className="font-mono text-[9px] text-[var(--soft)]">0{index + 1} / {project.year}</span>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[.16em] text-[var(--soft)]">{project.label}</p>
                        <h3 className="mt-2 font-serif text-4xl leading-none sm:text-5xl">{project.title}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-sm leading-6 text-[var(--muted)]">{project.blurb}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => <span key={tech} className="rounded-md border border-[var(--line)] px-2 py-1 font-mono text-[9px] text-[var(--soft)]">{tech}</span>)}
                    </div>

                    <div className="mt-auto pt-6">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex gap-2">
                          <a href={project.source} target="_blank" rel="noreferrer" className="mini-link"><Github size={12}/> source</a>
                          {project.live && <a href={project.live} target="_blank" rel="noreferrer" className="mini-link"><ArrowUpRight size={12}/> live</a>}
                        </div>
                        <button onClick={() => setOpen(expanded ? null : index)} className="inline-flex items-center gap-1.5 font-mono text-[9px] text-[var(--muted)] transition hover:text-[var(--fg)]">
                          {expanded ? "hide story" : "project story"} {expanded ? <Minus size={12}/> : <Plus size={12}/>}
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div initial={reduceMotion ? false : {height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={reduceMotion ? undefined : {height:0,opacity:0}} className="overflow-hidden">
                            <p className="mt-5 border-t border-dashed border-[var(--line)] pt-5 text-xs leading-6 text-[var(--muted)]">{project.story}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </Shell>
    </section>
  );
}
