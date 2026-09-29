import { motion, useReducedMotion } from "framer-motion";
import { Braces } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiC,
  SiCplusplus,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiRust,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { site } from "../config/site";

type Brand = {
  icon?: IconType;
  color?: string;
  group: string;
};

const brands: Record<string, Brand> = {
  Rust: { icon: SiRust, color: "#dea584", group: "language" },
  "C++": { icon: SiCplusplus, color: "#659ad2", group: "language" },
  C: { icon: SiC, color: "#a8b9cc", group: "language" },
  JavaScript: { icon: SiJavascript, color: "#f7df1e", group: "language" },
  TypeScript: { icon: SiTypescript, color: "#3178c6", group: "language" },
  HTML: { icon: SiHtml5, color: "#e34f26", group: "frontend" },
  CSS: { icon: SiCss3, color: "#1572b6", group: "frontend" },
  React: { icon: SiReact, color: "#61dafb", group: "frontend" },
  "Next.js": { icon: SiNextdotjs, color: "var(--fg)", group: "frontend" },
  Vite: { icon: SiVite, color: "#a98bff", group: "frontend" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06b6d4", group: "frontend" },
  "Node.js": { icon: SiNodedotjs, color: "#5fa04e", group: "backend" },
  Express: { icon: SiExpress, color: "var(--fg)", group: "backend" },
  "REST APIs": { color: "#d2493f", group: "backend" },
  MongoDB: { icon: SiMongodb, color: "#47a248", group: "data" },
  MySQL: { icon: SiMysql, color: "#4479a1", group: "data" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169e1", group: "data" },
  Firebase: { icon: SiFirebase, color: "#ffca28", group: "data" },
  Docker: { icon: SiDocker, color: "#2496ed", group: "tooling" },
  Postman: { icon: SiPostman, color: "#ff6c37", group: "tooling" },
  Git: { icon: SiGit, color: "#f05032", group: "tooling" },
  GitHub: { icon: SiGithub, color: "var(--fg)", group: "tooling" },
  Vercel: { icon: SiVercel, color: "var(--fg)", group: "tooling" },
};

export function TechStack() {
  const reduceMotion = useReducedMotion();

  return (
    <section>
      <GapBand />
      <SectionHeader
        id="stack"
        title="Toolbox"
        aside={<span className="font-mono text-[10px] text-[var(--soft)]">04 / 07</span>}
      />
      <Shell>
        <div className="px-6 py-7 sm:px-8 sm:py-9">
          <div className="mb-5 flex items-end justify-between gap-4">
            <p className="max-w-md text-xs leading-5 text-[var(--muted)]">
              Languages, frameworks and tools I actually use while learning, building and shipping.
            </p>
            <span className="hidden font-mono text-[9px] uppercase tracking-[.16em] text-[var(--soft)] sm:block">
              hover the grid
            </span>
          </div>

          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3 lg:grid-cols-4">
            {site.skills.map((skill, index) => {
              const brand: Brand = brands[skill] ?? { group: "tooling" };
              const Icon = brand.icon;

              return (
                <motion.div
                  key={skill}
                  initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.44,
                    delay: reduceMotion ? 0 : Math.min((index % 8) * 0.035, 0.22),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={reduceMotion ? undefined : { y: -4, scale: 1.015 }}
                  className="group relative min-h-28 overflow-hidden bg-[var(--bg)] p-4 transition-colors duration-300 hover:bg-[var(--card)]"
                >
                  <div className="flex items-start justify-between">
                    <motion.span
                      whileHover={reduceMotion ? undefined : { rotate: -5, scale: 1.12 }}
                      transition={{ type: "spring", stiffness: 360, damping: 22 }}
                      className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--line)] bg-[var(--card)]"
                      style={{ color: brand.color }}
                    >
                      {Icon ? <Icon size={20} /> : <Braces size={20} />}
                    </motion.span>
                    <span className="font-mono text-[8px] uppercase tracking-[.14em] text-[var(--soft)]">
                      {brand.group}
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-3">
                    <strong className="text-xs font-medium">{skill}</strong>
                    <span className="font-mono text-[8px] text-[var(--soft)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[var(--fg)] transition-all duration-300 group-hover:w-full" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Shell>
    </section>
  );
}
