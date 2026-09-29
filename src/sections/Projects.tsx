import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { site } from "../config/site";

type PortfolioProject = (typeof site.projects)[number];
const ease = [0.22, 1, 0.36, 1] as const;

function ProjectCard({
  project, index, expanded, onToggle,
}: {
  project: PortfolioProject;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [3.5, -3.5]), { stiffness: 170, damping: 26 });
  const rotateY = useSpring(useTransform(mouseX, [-260, 260], [-4, 4]), { stiffness: 170, damping: 26 });
  const shineX = useTransform(mouseX, [-260, 260], ["15%", "85%"]);
  const shineY = useTransform(mouseY, [-200, 200], ["15%", "85%"]);
  const shine = useTransform([shineX, shineY], ([x, y]) =>
    `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,.075), transparent 55%)`
  );

  return (
    <motion.article
      onMouseMove={reducedMotion ? undefined : (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left - rect.width / 2);
        mouseY.set(event.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={reducedMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      whileHover={reducedMotion ? undefined : { y: -9, scale: 1.012 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-[0_18px_55px_rgba(0,0,0,.12)] transition-[border-color,box-shadow] duration-300 hover:border-[color:var(--muted)] hover:shadow-[0_24px_75px_rgba(0,0,0,.24)]"
    >
      <div className="relative flex min-h-[220px] flex-col justify-between overflow-hidden border-b border-[var(--line)] bg-[var(--bg)] p-6 sm:min-h-[250px] sm:p-7">
        <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-35" />
        {!reducedMotion && <motion.div className="pointer-events-none absolute inset-0" style={{ background: shine }} />}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -right-6 select-none font-sans text-[170px] font-extrabold leading-none tracking-[-.12em] text-[var(--fg)] opacity-[.035] sm:text-[210px]"
          whileHover={reducedMotion ? undefined : { x: -8, rotate: -3 }}
        >
          0{index + 1}
        </motion.div>

        <div className="relative flex items-center justify-between gap-3">
          <span className="rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1.5 font-sans text-[11px] font-semibold tracking-[.02em] text-[var(--fg)]">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--fg)]" />
            {project.status}
          </span>
          <span className="font-mono text-[11px] font-medium text-[var(--muted)]">{project.year} / 0{index + 1}</span>
        </div>

        <motion.div className="relative mt-12" initial={reducedMotion ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .65 }} transition={{ duration: .55, ease }}>
          <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[.12em] text-[var(--muted)]">{project.label}</p>
          <motion.h3
            className="font-sans text-[clamp(2.35rem,5vw,3.7rem)] font-extrabold leading-[1.02] tracking-[-.065em] text-[var(--fg)] [text-shadow:0_1px_24px_rgba(255,255,255,.08)]"
            whileHover={reducedMotion ? undefined : { x: 5 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            {project.title}
          </motion.h3>
        </motion.div>
      </div>

      <div className="relative flex flex-1 flex-col p-6 sm:p-7">
        <p className="max-w-[46ch] font-sans text-[15px] font-medium leading-[1.8] text-[var(--fg)] opacity-[.94]">
          {project.blurb}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <motion.span
              key={tech}
              whileHover={reducedMotion ? undefined : { y: -3, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 380, damping: 21, delay: i * 0.008 }}
              className="rounded-lg border border-[var(--line)] bg-[var(--bg)] px-2.5 py-1.5 font-sans text-xs font-semibold text-[var(--fg)] opacity-80"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        <div className="mt-auto pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--line)] pt-5">
            <div className="flex flex-wrap gap-2">
              <motion.a whileHover={reducedMotion ? undefined : { y: -2 }} whileTap={{ scale: .97 }}
                href={project.source} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-2 font-sans text-xs font-semibold text-[var(--fg)] transition-colors hover:bg-[var(--hover)]"
              ><Github size={15} /> Code <ArrowUpRight size={12} /></motion.a>
              {project.live && <motion.a whileHover={reducedMotion ? undefined : { y: -2 }} whileTap={{ scale: .97 }}
                href={project.live} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--fg)] px-3 py-2 font-sans text-xs font-semibold text-[var(--bg)]"
              >Live demo <ArrowUpRight size={14} /></motion.a>}
            </div>
            <motion.button
              type="button" onClick={onToggle} aria-expanded={expanded}
              whileTap={{ scale: .97 }}
              className="inline-flex items-center gap-2 rounded-full px-2 py-2 font-sans text-xs font-semibold text-[var(--fg)] transition-colors hover:bg-[var(--hover)]"
            >
              {expanded ? "Close details" : "Explore details"}
              <motion.span animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: .28 }}>
                {expanded ? <Minus size={16} /> : <Plus size={16} />}
              </motion.span>
            </motion.button>
          </div>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="details"
                initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: .42, ease }}
                className="overflow-hidden"
              >
                <motion.p
                  initial={reducedMotion ? false : { y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ duration: .35, ease }}
                  className="mt-5 border-t border-dashed border-[var(--line)] pt-5 font-sans text-sm leading-7 text-[var(--muted)]"
                >{project.story}</motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section>
      <GapBand />
      <SectionHeader id="projects" title="Selected Projects"
        aside={<span className="font-mono text-[10px] text-[var(--soft)]">02 / 07</span>} />
      <Shell>
        <div className="grid gap-6 px-4 py-10 md:grid-cols-2 sm:px-8">
          {site.projects.map((project, index) => (
            <Reveal key={project.title} delay={index * .09} y={24}>
              <ProjectCard project={project} index={index} expanded={open === index}
                onToggle={() => setOpen(open === index ? null : index)} />
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
