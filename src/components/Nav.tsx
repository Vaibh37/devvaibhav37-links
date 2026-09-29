import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "../config/site";

const navItems = [
  ["top", "home"],
  ["about", "about"],
  ["opensource", "work"],
  ["projects", "projects"],
  ["contact", "contact"],
] as const;

export function Nav({
  onOpenPalette,
  light,
  onToggleTheme,
}: {
  onOpenPalette: () => void;
  light: boolean;
  onToggleTheme: () => void;
}) {
  const [active, setActive] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const elements = navItems
      .map(([id]) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight * 0.3) -
              Math.abs(b.boundingClientRect.top - window.innerHeight * 0.3),
          );

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -64% 0px", threshold: [0, 0.1, 0.3] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color:var(--nav)] backdrop-blur-xl">
      <div className="mx-auto grid h-14 max-w-[920px] grid-cols-[1fr_auto_1fr] items-center border-x border-dashed border-[var(--line)] px-3 sm:px-5">
        <button
          onClick={() => go("top")}
          className="flex w-fit items-center gap-2 font-mono text-xs tracking-[0.08em]"
        >
          <motion.span
            whileHover={{ rotate: -5, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            className="grid h-7 w-7 place-items-center border border-[var(--line)] text-[var(--fg)]"
          >
            V
          </motion.span>
          <span className="hidden lg:block">{site.name.toLowerCase()}.dev</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(([id, label]) => {
            const selected = active === id;
            return (
              <button
                key={id}
                onClick={() => go(id)}
                className={`relative rounded-full px-3 py-1.5 font-mono text-[10px] lowercase transition-colors ${
                  selected ? "text-[var(--fg)]" : "text-[var(--soft)] hover:text-[var(--fg)]"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId="top-nav-active"
                    className="absolute inset-0 -z-10 rounded-full border border-[var(--line)] bg-[var(--hover)]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={onOpenPalette}
            className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-2.5 py-1.5 font-mono text-[10px] text-[var(--muted)] transition hover:text-[var(--fg)]"
          >
            <Search size={13} />
            <span className="hidden lg:inline">search</span>
            <kbd className="hidden text-[9px] sm:inline">⌘K</kbd>
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9, rotate: 8 }}
            onClick={onToggleTheme}
            className="grid h-8 w-8 place-items-center rounded-md border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--fg)]"
            aria-label="Toggle theme"
          >
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </motion.button>
          <button
            onClick={() => setMenuOpen((value) => !value)}
            className="grid h-8 w-8 place-items-center rounded-md border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[var(--line)] bg-[var(--bg)] md:hidden"
          >
            <div className="mx-auto grid max-w-[920px] grid-cols-5 gap-px bg-[var(--line)]">
              {navItems.map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => go(id)}
                  className={`bg-[var(--bg)] px-2 py-3 font-mono text-[9px] lowercase transition ${
                    active === id ? "text-[var(--fg)]" : "text-[var(--soft)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}