import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { site } from "../config/site";

export function Projects(){
  const [open,setOpen]=useState(0);
  return <section>
    <GapBand/>
    <SectionHeader id="projects" title="Selected Projects" aside={<span className="font-mono text-[10px] text-[var(--soft)]">02 / 07</span>}/>
    <Shell>
      <div className="divide-y divide-[var(--line)]">
        {site.projects.map((p,i)=>{
          const expanded=open===i;
          return <article key={p.title} className="group">
            <button onClick={()=>setOpen(expanded?-1:i)} className="grid w-full grid-cols-[44px_1fr_auto] items-start gap-3 px-4 py-6 text-left sm:grid-cols-[54px_1fr_auto] sm:px-8">
              <span className="pt-1 font-mono text-[10px] text-[var(--soft)]">0{i+1}</span>
              <span>
                <span className="flex flex-wrap items-center gap-2">
                  <strong className="font-serif text-3xl font-normal sm:text-4xl">{p.title}</strong>
                  <span className="rounded-full border border-[var(--line)] px-2 py-1 font-mono text-[8px] uppercase tracking-wider text-[var(--soft)]">{p.status}</span>
                </span>
                <span className="mt-2 block max-w-xl text-xs leading-5 text-[var(--muted)] sm:text-sm">{p.blurb}</span>
              </span>
              <span className="mt-1 grid h-7 w-7 place-items-center rounded-full border border-[var(--line)] text-[var(--soft)]">{expanded?<Minus size={13}/>:<Plus size={13}/>}</span>
            </button>
            <AnimatePresence initial={false}>
              {expanded&&<motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} className="overflow-hidden">
                <div className="grid gap-6 border-t border-dashed border-[var(--line)] bg-[var(--card)] px-6 py-6 sm:grid-cols-[1fr_220px] sm:px-8">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[.16em] text-[var(--accent)]">{p.label} · {p.year}</p>
                    <p className="mt-3 text-xs leading-6 text-[var(--muted)]">{p.story}</p>
                    <div className="mt-5 flex flex-wrap gap-2">{p.stack.map(t=><span key={t} className="rounded-md border border-[var(--line)] px-2 py-1 font-mono text-[9px] text-[var(--soft)]">{t}</span>)}</div>
                  </div>
                  <div className="terminal-card min-h-40 p-4">
                    <div className="mb-4 flex gap-1.5"><i/><i/><i/></div>
                    <p className="font-mono text-[9px] leading-5 text-[var(--soft)]">$ project.inspect<br/><span className="text-[var(--muted)]">status:</span> {p.status.toLowerCase()}<br/><span className="text-[var(--muted)]">year:</span> {p.year}<br/><span className="text-[var(--muted)]">stack:</span> {p.stack.slice(0,3).join(", ")}</p>
                    <div className="mt-5 flex gap-2">
                      <a onClick={e=>e.stopPropagation()} href={p.source} target="_blank" rel="noreferrer" className="mini-link"><Github size={12}/> source</a>
                      {p.live&&<a onClick={e=>e.stopPropagation()} href={p.live} target="_blank" rel="noreferrer" className="mini-link"><ArrowUpRight size={12}/> live</a>}
                    </div>
                  </div>
                </div>
              </motion.div>}
            </AnimatePresence>
          </article>
        })}
      </div>
    </Shell>
  </section>
}