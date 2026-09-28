import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const items = [
  ["about", "About"],
  ["projects", "Projects"],
  ["opensource", "Open Source"],
  ["stack", "Stack"],
  ["writing", "Writing"],
  ["github", "GitHub"],
  ["contact", "Contact"],
] as const;

export function SideIndex() {
  const [active, setActive] = useState<string>("about");

  useEffect(() => {
    const elements = items
      .map(([id]) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight * 0.28) -
              Math.abs(b.boundingClientRect.top - window.innerHeight * 0.28),
          );

        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-18% 0px -62% 0px", threshold: [0, 0.08, 0.2, 0.5] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 68;
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <aside className="fixed left-[calc(50%+500px)] top-[24vh] z-30 hidden flex-col gap-3 2xl:flex">
      <span className="mb-1 font-mono text-[10px] font-medium tracking-[0.2em] text-[var(--soft)]">INDEX</span>
      {items.map(([id, label]) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`group relative flex items-center gap-2 text-left font-mono text-[11px] transition-colors ${
              isActive ? "text-[var(--fg)]" : "text-[var(--soft)] hover:text-[var(--muted)]"
            }`}
          >
            <span className="relative h-px w-4">
              {isActive ? (
                <motion.span
                  layoutId="side-index-active"
                  className="absolute inset-y-0 left-0 w-4 bg-current"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : (
                <span className="absolute inset-y-0 left-0 w-0 bg-current transition-all duration-200 group-hover:w-2" />
              )}
            </span>
            <motion.span
              animate={{ x: isActive ? 2 : 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 32 }}
            >
              {label}
            </motion.span>
          </button>
        );
      })}
    </aside>
  );
}
