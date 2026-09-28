import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Code2, Copy, ExternalLink, Github, Mail, Moon, Search, Sun, Wrench } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "../config/site";

type Item = { title: string; subtitle: string; icon: JSX.Element; action: () => void };

export function CommandPalette({
  open,
  onClose,
  light,
  onToggleTheme,
}: {
  open: boolean;
  onClose: () => void;
  light: boolean;
  onToggleTheme: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const input = useRef<HTMLInputElement>(null);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  const items: Item[] = useMemo(() => [
    { title: "Go to Projects", subtitle: "Things I have actually shipped", icon: <Code2 size={15} />, action: () => go("projects") },
    { title: "Go to Open Source", subtitle: "Work outside my own repos", icon: <Github size={15} />, action: () => go("opensource") },
    { title: "Go to Stack", subtitle: "Current toolbox", icon: <Wrench size={15} />, action: () => go("stack") },
    { title: "Go to Writing", subtitle: "Notes and technical writing", icon: <BookOpen size={15} />, action: () => go("writing") },
    { title: "Open GitHub", subtitle: "github.com/Vaibh37", icon: <Github size={15} />, action: () => { window.open(site.github, "_blank"); onClose(); } },
    { title: "Open X", subtitle: "@AkagamiRust37", icon: <ExternalLink size={15} />, action: () => { window.open(site.twitter, "_blank"); onClose(); } },
    { title: "Copy email", subtitle: site.email, icon: <Copy size={15} />, action: () => { navigator.clipboard.writeText(site.email); onClose(); } },
    { title: light ? "Switch to dark" : "Switch to light", subtitle: "Toggle portfolio theme", icon: light ? <Moon size={15} /> : <Sun size={15} />, action: () => { onToggleTheme(); onClose(); } },
    { title: "Email me", subtitle: site.email, icon: <Mail size={15} />, action: () => { window.location.href = `mailto:${site.email}`; onClose(); } },
  ], [light]);

  const filtered = items.filter((i) => (i.title + i.subtitle).toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => input.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowDown") { e.preventDefault(); setSelected((v) => (v + 1) % Math.max(filtered.length, 1)); }
      if (e.key === "ArrowUp") { e.preventDefault(); setSelected((v) => (v - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1)); }
      if (e.key === "Enter" && filtered[selected]) filtered[selected].action();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, selected]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[14vh]">
          <motion.button
            aria-label="Close palette"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: .98 }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3">
              <Search size={16} className="text-[var(--soft)]" />
              <input
                ref={input}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelected(0); }}
                placeholder="Search pages, links or actions..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--soft)]"
              />
              <kbd className="font-mono text-[9px] text-[var(--soft)]">ESC</kbd>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.map((item, i) => (
                <button
                  key={item.title}
                  onMouseEnter={() => setSelected(i)}
                  onClick={item.action}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${i === selected ? "bg-[var(--hover)] text-[var(--fg)]" : "text-[var(--muted)]"}`}
                >
                  <span>{item.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-medium">{item.title}</span>
                    <span className="block truncate text-[10px] text-[var(--soft)]">{item.subtitle}</span>
                  </span>
                </button>
              ))}
              {!filtered.length && <p className="px-3 py-8 text-center font-mono text-xs text-[var(--soft)]">no match</p>}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
