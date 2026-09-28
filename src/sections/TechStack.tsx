import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { site } from "../config/site";

export function TechStack(){
  return <section>
    <GapBand/>
    <SectionHeader id="stack" title="Toolbox" aside={<span className="font-mono text-[10px] text-[var(--soft)]">04 / 07</span>}/>
    <Shell>
      <div className="grid grid-cols-2 border-l border-t border-[var(--line)] sm:grid-cols-4">
        {site.skills.map((s,i)=><div key={s} className="group flex min-h-24 flex-col justify-between border-b border-r border-[var(--line)] p-4 transition hover:bg-[var(--fg)] hover:text-[var(--bg)]">
          <span className="font-mono text-[9px] opacity-50">{String(i+1).padStart(2,"0")}</span><strong className="text-xs font-medium">{s}</strong>
        </div>)}
      </div>
    </Shell>
  </section>
}