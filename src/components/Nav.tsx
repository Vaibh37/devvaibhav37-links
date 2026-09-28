import { Moon, Search, Sun } from "lucide-react";
import { site } from "../config/site";

export function Nav({
  onOpenPalette,
  light,
  onToggleTheme,
}: {
  onOpenPalette: () => void;
  light: boolean;
  onToggleTheme: () => void;
}) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color:var(--nav)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-[760px] items-center justify-between border-x border-dashed border-[var(--line)] px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-mono text-xs tracking-[0.08em]">
          <span className="grid h-7 w-7 place-items-center border border-[var(--line)] text-[var(--accent)]">V</span>
          <span className="hidden sm:block">{site.name.toLowerCase()}.dev</span>
        </a>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="inline-flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-mono text-[10px] text-[var(--muted)] transition hover:text-[var(--fg)]"
          >
            <Search size={13} />
            <span className="hidden sm:inline">search</span>
            <kbd className="text-[9px]">⌘K</kbd>
          </button>
          <button
            onClick={onToggleTheme}
            className="grid h-8 w-8 place-items-center rounded-md border border-[var(--line)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--fg)]"
            aria-label="Toggle theme"
          >
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </div>
    </header>
  );
}
