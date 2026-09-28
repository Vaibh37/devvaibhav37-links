import { BookOpen } from "lucide-react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { site } from "../config/site";

export function Writing(){
  return <section>
    <GapBand/>
    <SectionHeader id="writing" title="Writing" aside={<span className="font-mono text-[10px] text-[var(--soft)]">05 / 07</span>}/>
    <Shell>
      <div className="px-6 py-8 sm:px-8">
        {site.writing.map(w=><div key={w.title} className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-5">
          <div className="flex items-start gap-4"><BookOpen size={16} className="mt-1 text-[var(--accent)]"/><div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[var(--soft)]">{w.date}</span>
            <h3 className="mt-1 font-serif text-2xl">{w.title}</h3>
            <p className="mt-2 text-xs leading-6 text-[var(--muted)]">{w.summary}</p>
            <span className="mt-4 inline-block font-mono text-[9px] text-[var(--soft)]">part 1 / 8 · link intentionally omitted until canonical URL is wired</span>
          </div></div>
        </div>)}
      </div>
    </Shell>
  </section>
}