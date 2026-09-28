import { motion } from "framer-motion";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { site } from "../config/site";

export function TechStack(){
  return <section>
    <GapBand/>
    <SectionHeader id="stack" title="Toolbox" aside={<span className="font-mono text-[10px] text-[var(--soft)]">04 / 07</span>}/>
    <Shell>
      <div className="grid grid-cols-2 border-l border-t border-[var(--line)] sm:grid-cols-4">
        {site.skills.map((s,i)=><motion.div
          key={s}
          initial={{opacity:0,y:10}}
          whileInView={{opacity:1,y:0}}
          viewport={{once:true,amount:.25}}
          transition={{duration:.38,delay:Math.min(i*.025,.22),ease:[.22,1,.36,1]}}
          whileHover={{y:-3}}
          className="group flex min-h-24 flex-col justify-between border-b border-r border-[var(--line)] p-4 transition-colors hover:bg-[var(--fg)] hover:text-[var(--bg)]"
        >
          <span className="font-mono text-[9px] opacity-50">{String(i+1).padStart(2,"0")}</span><strong className="text-xs font-medium">{s}</strong>
        </motion.div>)}
      </div>
    </Shell>
  </section>
}
