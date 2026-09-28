import { useEffect, useState } from "react";

const items = [
  ["about", "About"],
  ["projects", "Projects"],
  ["opensource", "Open Source"],
  ["stack", "Stack"],
  ["writing", "Writing"],
  ["github", "GitHub"],
  ["contact", "Contact"],
];

export function SideIndex() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 220;
      for (const [id] of items) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActive(id);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <aside className="fixed left-[calc(50%+410px)] top-[24vh] z-30 hidden flex-col gap-3 xl:flex">
      <span className="mb-1 font-mono text-[10px] font-medium tracking-[0.2em] text-[var(--soft)]">INDEX</span>
      {items.map(([id, label]) => {
        const isActive = active === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            className={`group flex items-center gap-2 font-mono text-[11px] transition ${isActive ? "text-[var(--fg)]" : "text-[var(--soft)] hover:text-[var(--muted)]"}`}
          >
            <span className={`h-px bg-current transition-all ${isActive ? "w-4" : "w-0 group-hover:w-2"}`} />
            {label}
          </a>
        );
      })}
    </aside>
  );
}
