import { ArrowUpRight, GitMerge } from "lucide-react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { site } from "../config/site";

export function OpenSource(){
  return <section>
    <GapBand/>
    <SectionHeader id="opensource" title="Open Source" aside={<span className="font-mono text-[10px] text-[var(--soft)]">03 / 07</span>}/>
    <Shell>
      <div className="divide-y divide-[var(--line)]">
        {site.contributions.map((c,i)=><a key={c.url} href={c.url} target="_blank" rel="noreferrer" className="group grid grid-cols-[36px_1fr_auto] gap-3 px-6 py-5 transition hover:bg-[var(--hover)] sm:px-8">
          <span className="pt-1 text-[var(--soft)]"><GitMerge size={14}/></span>
          <span>
            <span className="font-mono text-[9px] text-[var(--soft)]">{c.repo}</span>
            <strong className="mt-1 block text-sm font-medium">{c.title}</strong>
            <span className="mt-1 block text-[10px] text-[var(--muted)]">{c.meta}</span>
          </span>
          <ArrowUpRight size={14} className="mt-1 text-[var(--soft)] transition group-hover:text-[var(--accent)]"/>
        </a>)}
      </div>
    </Shell>
  </section>
}