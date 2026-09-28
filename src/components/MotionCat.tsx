import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function MotionCat() {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(typeof window === "undefined" ? 24 : window.innerWidth - 64);
  const rawY = useMotionValue(typeof window === "undefined" ? 24 : window.innerHeight - 80);
  const x = useSpring(rawX, { stiffness: 220, damping: 28, mass: 0.38 });
  const y = useSpring(rawY, { stiffness: 220, damping: 28, mass: 0.38 });
  const [visible, setVisible] = useState(false);
  const [facing, setFacing] = useState(1);

  useEffect(() => {
    if (reduceMotion) return;

    let lastX = window.innerWidth - 64;
    const onPointerMove = (event: PointerEvent) => {
      const nextX = Math.min(window.innerWidth - 44, Math.max(8, event.clientX + 18));
      const nextY = Math.min(window.innerHeight - 44, Math.max(8, event.clientY + 20));
      setFacing(nextX < lastX ? -1 : 1);
      lastX = nextX;
      rawX.set(nextX);
      rawY.set(nextY);
      setVisible(true);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [rawX, rawY, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-9 w-9 md:block"
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        animate={{ y: [0, -2, 0], rotate: [0, -1.2, 1.2, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ scaleX: facing }}
        className="h-full w-full drop-shadow-[0_3px_8px_rgba(0,0,0,.32)]"
      >
        <svg viewBox="0 0 48 48" className="h-full w-full overflow-visible">
          <motion.path
            d="M10 30c0-9 6-16 14-16s14 7 14 16v5H10z"
            fill="var(--cat-body)"
            stroke="var(--cat-line)"
            strokeWidth="1.8"
          />
          <path d="M13 17 9 8l10 6M35 17l4-9-10 6" fill="var(--cat-body)" stroke="var(--cat-line)" strokeWidth="1.8" strokeLinejoin="round"/>
          <circle cx="19" cy="25" r="1.5" fill="var(--cat-line)"/>
          <circle cx="29" cy="25" r="1.5" fill="var(--cat-line)"/>
          <path d="M22 29c1.2 1.2 2.8 1.2 4 0" fill="none" stroke="var(--cat-line)" strokeWidth="1.6" strokeLinecap="round"/>
          <motion.path
            d="M37 33c8-1 8 7 3 9"
            fill="none"
            stroke="var(--cat-line)"
            strokeWidth="2"
            strokeLinecap="round"
            animate={{ pathLength: [0.7, 1, 0.7] }}
            transition={{ duration: 1.15, repeat: Infinity, ease: "easeInOut" }}
          />
          <path d="M17 34v6M31 34v6" stroke="var(--cat-line)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </motion.div>
    </motion.div>
  );
}
