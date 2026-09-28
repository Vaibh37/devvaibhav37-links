import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Shell({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <div className={`relative mx-auto w-full max-w-[920px] border-x border-dashed border-[var(--line)] ${className}`}>
      {children}
    </div>
  );
}

export function GapBand({ size = "h-9" }: { size?: string }) {
  return (
    <div className={`bg-stripes relative w-full overflow-hidden ${size}`}>
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
  const reduceMotion = useReducedMotion();

  return (
    <div id={id} className="relative w-full scroll-mt-20 overflow-hidden border-y border-[var(--line)] bg-stripes">
      <Shell className="bg-[var(--bg)]">
        <span className="anchor-dot left-0 top-0" />
        <span className="anchor-dot right-0 top-0" />
        <span className="anchor-dot bottom-0 left-0" />
        <span className="anchor-dot bottom-0 right-0" />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.65 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-between gap-4 px-6 py-3.5 sm:px-8"
        >
          <h2 className="font-serif text-2xl tracking-wide sm:text-[27px]">{title}</h2>
          {aside}
        </motion.div>

        {!reduceMotion && (
          <motion.span
            className="absolute bottom-0 left-0 h-px origin-left bg-[var(--accent)]"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </Shell>
    </div>
  );
}
