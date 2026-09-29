import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Search, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Shell } from "../components/Layout";
import { site } from "../config/site";

const roles = ["Rust learner.", "Full-stack builder.", "Open-source contributor.", "Problem solver."];

export function Hero({ onOpenPalette }: { onOpenPalette: () => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 72]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.42]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 120]);

  const [role, setRole] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const full = roles[role];
    const id = window.setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1);
        setText(next);
        if (next === full) window.setTimeout(() => setDeleting(true), 1200);
      } else {
        const next = full.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (!next) {
          setDeleting(false);
          setRole((current) => (current + 1) % roles.length);
        }
      }
    }, deleting ? 34 : 62);

    return () => clearTimeout(id);
  }, [text, deleting, role]);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: site.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );

    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  const jumpToProjects = () => {
    const element = document.getElementById("projects");
    if (!element) return;
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 70,
      behavior: "smooth",
    });
  };

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden">
      <Shell>
        <motion.div
          style={{ y: glowY }}
          className="pointer-events-none absolute -right-28 top-20 h-72 w-72 rounded-full bg-[var(--fg)] opacity-[0.045] blur-[110px]"
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="hero-grid min-h-[86vh] px-6 pb-16 pt-14 sm:px-8 sm:pt-20"
        >
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.075, delayChildren: 0.04 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.48 } },
              }}
              className="mb-8 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-[var(--soft)]"
            >
              <span>{site.location}</span>
              <span>·</span>
              <span>{time} IST</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5 text-[var(--muted)]">
                <i className="relative h-1.5 w-1.5 rounded-full bg-emerald-500">
                  <i className="absolute inset-0 animate-ping rounded-full bg-emerald-500 opacity-60" />
                </i>
                building
              </span>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.985 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              className="relative mb-9 overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] shadow-[0_18px_80px_rgba(0,0,0,.16)]"
            >
              <motion.div
                className="absolute inset-0 bg-radial-mono opacity-70"
                animate={reduceMotion ? undefined : { scale: [1, 1.04, 1], opacity: [0.52, 0.66, 0.52] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-grid-fine opacity-50" />
              <div className="relative flex min-h-40 items-end justify-between p-5 sm:min-h-52 sm:p-8">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[.18em] text-[var(--soft)]">
                    signal / 037
                  </span>
                  <p className="mt-3 max-w-xl font-serif text-4xl leading-[.95] sm:text-[58px]">
                    Building slowly. Learning deeply. Shipping what survives.
                  </p>
                </div>
                <span className="hidden font-mono text-[10px] text-[var(--soft)] sm:block">
                  bounty // 000000
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.58 } },
              }}
              className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
            >
              <div className="flex items-end gap-4">
                <motion.img
                  whileHover={reduceMotion ? undefined : { rotate: -2, scale: 1.025 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  src={site.avatar}
                  alt="Vaibhav"
                  className="h-24 w-24 rounded-xl border-4 border-[var(--bg)] object-cover grayscale sm:h-28 sm:w-28"
                />
                <div className="pb-1">
                  <h1 className="font-serif text-5xl leading-none sm:text-6xl">{site.name}</h1>
                  <p className="mt-2 h-5 font-mono text-xs text-[var(--muted)]">
                    {text}
                    <span className="ml-1 inline-block h-3.5 w-px animate-pulse bg-[var(--fg)]" />
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.015 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenPalette}
                className="hidden items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-4 py-2 font-mono text-[10px] text-[var(--muted)] hover:text-[var(--fg)] sm:flex"
              >
                <Search size={13} /> command palette <kbd>⌘K</kbd>
              </motion.button>
            </motion.div>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
              className="mt-7 max-w-2xl text-[15px] leading-7 text-[var(--muted)] sm:text-base"
            >
              {site.tagline}
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <motion.button
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={jumpToProjects}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-4 py-2 text-xs font-semibold text-[var(--bg)]"
              >
                view projects <ArrowRight size={14} />
              </motion.button>
              <motion.a whileHover={{ y: -2 }} href={site.github} target="_blank" rel="noreferrer" className="social-button">
                <Github size={14} /> GitHub
              </motion.a>
              <motion.a whileHover={{ y: -2 }} href={site.twitter} target="_blank" rel="noreferrer" className="social-button">
                <Twitter size={14} /> X
              </motion.a>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: { opacity: 1, y: 0, transition: { duration: 0.58 } },
              }}
              className="mt-10 grid gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2"
            >
              {site.now.map(([label, value], index) => (
                <motion.div
                  key={label}
                  whileHover={reduceMotion ? undefined : { backgroundColor: "var(--hover)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-[var(--card)] p-4"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[.16em] text-[var(--soft)]">{label}</span>
                  <p className="mt-1 text-xs text-[var(--muted)]">{value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Shell>
    </section>
  );
}
