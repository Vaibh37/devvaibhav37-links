import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { site } from "../config/site";

type Day={date:string;count:number;level:number};
type Api={total?:{lastYear?:number};contributions?:Array<{date:string;count:number;level:number}>};

export function GithubActivity(){
  const [days,setDays]=useState<Day[]>([]);
  const [total,setTotal]=useState<number|null>(null);
  const [failed,setFailed]=useState(false);

  useEffect(()=>{
    fetch("https://github-contributions-api.jogruber.de/v4/Vaibh37?y=last")
      .then(r=>{if(!r.ok)throw new Error();return r.json()})
      .then((data:Api)=>{
        const list=(data.contributions||[]).slice(-364);
        setDays(list);
        setTotal(list.reduce((s,d)=>s+d.count,0));
      })
      .catch(()=>setFailed(true));
  },[]);

  const fallback=useMemo(()=>Array.from({length:364},(_,i)=>({date:`fallback-${i}`,count:0,level:(i*17+i%9)%5})),[]);
  const display=days.length?days:fallback;
  const weeks=Array.from({length:52},(_,w)=>display.slice(w*7,w*7+7));

  return <section>
    <GapBand/>
    <SectionHeader id="github" title="GitHub Activity" aside={<span className="font-mono text-[10px] text-[var(--soft)]">06 / 07</span>}/>
    <Shell>
      <div className="px-6 py-8 sm:px-8">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4 sm:p-5">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3"><Github size={18}/><div><p className="text-xs font-medium">@{site.handle}</p><p className="font-mono text-[9px] text-[var(--soft)]">{failed?"live graph unavailable · showing visual fallback":total===null?"loading contribution signal...":`${total} contributions in the last year`}</p></div></div>
            <a href={site.github} target="_blank" rel="noreferrer" className="font-mono text-[9px] text-[var(--accent)]">profile ↗</a>
          </div>
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-[690px] gap-[3px]">
              {weeks.map((week,w)=><div key={w} className="flex flex-col gap-[3px]">{week.map((d,i)=><motion.span key={d.date} initial={{opacity:0,scale:.5}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} transition={{delay:(w*7+i)*.001}} title={d.date.startsWith("fallback")?"visual fallback":`${d.count} contributions on ${d.date}`} className={`h-[10px] w-[10px] rounded-[2px] contrib-${Math.min(4,d.level)}`}/>)}</div>)}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end gap-1 font-mono text-[9px] text-[var(--soft)]">less {[0,1,2,3,4].map(x=><i key={x} className={`h-[9px] w-[9px] rounded-[2px] contrib-${x}`}/>)} more</div>
        </div>
      </div>
    </Shell>
  </section>
}