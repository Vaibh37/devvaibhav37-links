import { site } from "../config/site";
import { Shell } from "./Layout";

export function Footer() {
  return (
    <div className="border-t border-[var(--line)] bg-stripes">
      <Shell className="bg-[var(--bg)]">
        <footer className="flex flex-col gap-2 px-6 py-8 text-xs text-[var(--soft)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© 2026 {site.name}</span>
          <span className="font-mono">built with react · fueled by questionable coffee decisions</span>
        </footer>
      </Shell>
    </div>
  );
}
