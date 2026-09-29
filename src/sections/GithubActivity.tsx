import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { site } from "../config/site";

type Day = { date: string; count: number; level: number };
type Api = { total?: { lastYear?: number }; contributions?: Array<{ date: string; count: number; level: number }> };

export function GithubActivity() {
  const [days, setDays] = useState<Day[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/Vaibh37?y=last")
      .then((response) => {
        if (!response.ok) throw new Error();
        return response.json();
      })
      .then((data: Api) => {
        const list = (data.contributions || []).slice(-364);
        setDays(list);
        setTotal(list.reduce((sum, day) => sum + day.count, 0));
      })
      .catch(() => setFailed(true));
  }, []);

  const fallback = useMemo(
    () =>
      Array.from({ length: 364 }, (_, index) => ({
        date: `fallback-${index}`,
        count: 0,
        level: (index * 17 + (index % 9)) % 5,
      })),
    [],
  );

  const display = days.length ? days : fallback;
  const weeks = Array.from({ length: 52 }, (_, week) => display.slice(week * 7, week * 7 + 7));

  return (
    <section>
      <GapBand />
      <SectionHeader
        id="github"
        title="GitHub Activity"
        aside={<span className="font-mono text-[10px] text-[var(--soft)]">06 / 07</span>}
      />
      <Shell>
        <div className="px-6 py-9 sm:px-8 sm:py-11">
          <Reveal y={18}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-[0_16px_60px_rgba(0,0,0,.08)] sm:p-5"
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <motion.span
                    whileHover={{ rotate: -7, scale: 1.08 }}
                    className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--line)]"
                  >
                    <Github size={18} />
                  </motion.span>
                  <div>
                    <p className="text-xs font-medium">@{site.handle}</p>
                    <p className="font-mono text-[9px] text-[var(--soft)]">
                      {failed
                        ? "live graph unavailable · showing visual fallback"
                        : total === null
                          ? "loading contribution signal..."
                          : `${total} contributions in the last year`}
                    </p>
                  </div>
                </div>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[9px] text-[var(--fg)]"
                >
                  profile ↗
                </a>
              </div>

              <div className="overflow-x-auto pb-2">
                <div className="flex min-w-[690px] gap-[3px]">
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                      {week.map((day, dayIndex) => (
                        <motion.span
                          key={day.date}
                          initial={{ opacity: 0, scale: 0.45 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.55, zIndex: 4 }}
                          transition={{
                            delay: (weekIndex * 7 + dayIndex) * 0.0008,
                            duration: 0.16,
                          }}
                          title={
                            day.date.startsWith("fallback")
                              ? "visual fallback"
                              : `${day.count} contributions on ${day.date}`
                          }
                          className={`h-[10px] w-[10px] rounded-[2px] contrib-${Math.min(4, day.level)}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-end gap-1 font-mono text-[9px] text-[var(--soft)]">
                less
                {[0, 1, 2, 3, 4].map((level) => (
                  <i key={level} className={`h-[9px] w-[9px] rounded-[2px] contrib-${level}`} />
                ))}
                more
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
