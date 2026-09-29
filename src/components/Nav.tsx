import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

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
    const top = element.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top, behavior: "smooth" });
    window.history.replaceState(null, "", id === "top" ? window.location.pathname : `#${id}`);
    setMenuOpen(false);
  };

  return (
    <header id="site-nav" className="relative z-50 px-3 pt-3">
      <div className="pointer-events-auto mx-auto grid h-14 max-w-[980px] grid-cols-[1fr_auto_1fr] items-center rounded-2xl border border-[var(--line)] bg-[color:var(--nav)] px-3 shadow-[0_14px_50px_rgba(0,0,0,.28)] backdrop-blur-2xl sm:px-4">
        <button
          onClick={() => go("top")}
          className="flex w-fit items-center font-sans text-[15px] font-bold tracking-[-.045em] sm:text-base"
        >
          <motion.span whileHover={{ x: 2 }} whileTap={{ scale: 0.96 }}>Vaibhav37</motion.span>
        </button>

        <nav className="hidden items-center gap-0.5 rounded-full border border-[var(--line)] bg-[var(--card)] p-1 md:flex">
          {navItems.map(([id, label]) => {
            const selected = active === id;
            return (
              <button
                key={id}
                onClick={() => go(id)}
                className={`relative rounded-full px-3.5 py-1.5 font-sans text-xs font-semibold lowercase transition-colors ${
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
            className="pointer-events-auto mx-auto mt-1 max-w-[980px] overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--bg)] shadow-2xl md:hidden"
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