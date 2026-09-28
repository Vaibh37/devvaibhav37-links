import { motion } from "framer-motion";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { site } from "../config/site";

export function About(){
  return <section>
    <GapBand/>
    <SectionHeader id="about" title="About" aside={<span className="font-mono text-[10px] text-[var(--soft)]">01 / 07</span>}/>
    <Shell>
      <div className="grid gap-8 px-6 py-10 sm:grid-cols-[1fr_220px] sm:px-8">
        <motion.div initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="space-y-4 text-sm leading-7 text-[var(--muted)]">
          {site.about.map(p=><p key={p}>{p}</p>)}
        </motion.div>
        <div className="space-y-2">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[.16em] text-[var(--soft)]">tldr</p>
          {site.tldr.map((x,i)=><div key={x} className="flex items-center gap-3 border-b border-[var(--line)] py-2 text-xs"><span className="font-mono text-[9px] text-[var(--accent)]">0{i+1}</span><span>{x}</span></div>)}
        </div>
      </div>
    </Shell>
  </section>
}