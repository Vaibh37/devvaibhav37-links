import { motion } from "framer-motion";
import { ArrowRight, Github, Search, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "../config/site";
import { Shell } from "../components/Layout";

const roles = ["Rust learner.", "Full-stack builder.", "Open-source contributor.", "Problem solver."];

export function Hero({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [role, setRole] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const full = roles[role];
    const id = window.setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) window.setTimeout(() => setDeleting(true), 1200);
      } else {
        const next = full.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (!next) { setDeleting(false); setRole((r) => (r + 1) % roles.length); }
      }
    }, deleting ? 34 : 62);
    return () => clearTimeout(id);
  }, [text, deleting, role]);

  useEffect(() => {
    const tick=()=>setTime(new Intl.DateTimeFormat("en-IN",{timeZone:site.timezone,hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date()));
    tick(); const id=window.setInterval(tick,30000); return()=>clearInterval(id);
  },[]);

  return (
    <section id="top" className="relative overflow-hidden">
      <Shell>
        <div className="hero-grid min-h-[82vh] px-6 pb-14 pt-16 sm:px-8 sm:pt-20">
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{duration:.55}}>
            <div className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--soft)]">
              <span>{site.location}</span><span>·</span><span>{time} IST</span><span>·</span>
              <span className="inline-flex items-center gap-1.5 text-[var(--muted)]"><i className="h-1.5 w-1.5 rounded-full bg-emerald-500"/> building</span>
            </div>

            <div className="relative mb-8 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)]">
              <div className="absolute inset-0 bg-radial-red opacity-60"/>
              <div className="absolute inset-0 bg-grid-fine opacity-50"/>
              <div className="relative flex min-h-36 items-end justify-between p-5 sm:min-h-44 sm:p-7">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[.18em] text-[var(--soft)]">signal / 037</span>
                  <p className="mt-2 max-w-md font-serif text-3xl leading-none sm:text-5xl">Betting it all on learning the hard things properly.</p>
                </div>
                <span className="hidden font-mono text-[10px] text-[var(--soft)] sm:block">bounty // 000000</span>
              </div>
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <img src={site.avatar} alt="Vaibhav" className="h-24 w-24 rounded-xl border-4 border-[var(--bg)] object-cover grayscale sm:h-28 sm:w-28"/>
                <div className="pb-1">
                  <h1 className="font-serif text-5xl leading-none sm:text-6xl">{site.name}</h1>
                  <p className="mt-2 h-5 font-mono text-xs text-[var(--muted)]">{text}<span className="ml-1 inline-block h-3.5 w-px animate-pulse bg-[var(--fg)]"/></p>
                </div>
              </div>
              <button onClick={onOpenPalette} className="hidden items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 font-mono text-[10px] text-[var(--muted)] hover:text-[var(--fg)] sm:flex">
                <Search size={13}/> command palette <kbd>⌘K</kbd>
              </button>
            </div>

            <p className="mt-7 max-w-2xl text-[15px] leading-7 text-[var(--muted)] sm:text-base">{site.tagline}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#projects" className="inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-4 py-2 text-xs font-semibold text-[var(--bg)]">Explore projects <ArrowRight size={14}/></a>
              <a href={site.github} target="_blank" rel="noreferrer" className="social-button"><Github size={14}/> GitHub</a>
              <a href={site.twitter} target="_blank" rel="noreferrer" className="social-button"><Twitter size={14}/> X</a>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
              {site.now.map(([label,value])=><div key={label} className="bg-[var(--card)] p-4"><span className="font-mono text-[9px] uppercase tracking-[.16em] text-[var(--soft)]">{label}</span><p className="mt-1 text-xs text-[var(--muted)]">{value}</p></div>)}
            </div>
          </motion.div>
        </div>
      </Shell>
    </section>
  );
}