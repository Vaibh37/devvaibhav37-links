import type { ReactNode } from "react";

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[760px] border-x border-dashed border-[var(--line)] ${className}`}>
      {children}
    </div>
  );
}

export function GapBand({ size = "h-8" }: { size?: string }) {
  return (
    <div className={`bg-stripes relative w-full ${size}`}>
      <Shell className="h-full bg-[var(--bg)]" />
    </div>
  );
}

export function SectionHeader({
  id,
  title,
  aside,
}: {
  id: string;
  title: string;
  aside?: ReactNode;
}) {
  return (
    <div id={id} className="relative w-full border-y border-[var(--line)] bg-stripes scroll-mt-20">
      <Shell className="bg-[var(--bg)]">
        <span className="anchor-dot left-0 top-0" />
        <span className="anchor-dot right-0 top-0" />
        <span className="anchor-dot bottom-0 left-0" />
        <span className="anchor-dot bottom-0 right-0" />
        <div className="flex items-center justify-between gap-4 px-6 py-3 sm:px-8">
          <h2 className="font-serif text-2xl tracking-wide">{title}</h2>
          {aside}
        </div>
      </Shell>
    </div>
  );
}
