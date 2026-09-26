"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import profileImage from "@/assets/profile.jpeg";

const ease = [0.22, 1, 0.36, 1] as const;

const navigation = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Stack", "#stack"],
  ["Contact", "#contact"],
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(onComplete, reduceMotion ? 120 : 1150);
    return () => window.clearTimeout(timer);
  }, [onComplete, reduceMotion]);

  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease }}
      aria-label="Loading portfolio"
      role="status"
    >
      <div className="loader-inner loader-inner-simple">
        <div className="loader-copy">
          <motion.p
            className="loader-jp"
            initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease }}
          >
            読み込み中
          </motion.p>

          <motion.div
            className="loader-rule"
            initial={reduceMotion ? undefined : { scaleX: 0 }}
            animate={reduceMotion ? undefined : { scaleX: 1 }}
            transition={{ duration: 0.72, delay: 0.16, ease }}
          />

          <motion.p
            className="loader-en"
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.26 }}
          >
            VAIBHAV / PORTFOLIO
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.62, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function ScrollParallax({
  children,
  className = "",
  distance = 36,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [distance, -distance],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.985, 1, 0.995],
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? undefined : { y, scale }}
    >
      {children}
    </motion.div>
  );
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 24,
    mass: 0.4,
  });

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="portfolio-shell">
        <motion.div
          className="page-progress"
          style={{ scaleX: progress }}
          aria-hidden="true"
        />

        <motion.aside
          className="profile-rail"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: -24 }}
          animate={loading ? { opacity: 0 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.72, ease }}
        >
          <div className="profile-top">
            <motion.div
              className="portrait-frame"
              whileHover={reduceMotion ? undefined : { y: -3 }}
              transition={{ duration: 0.24, ease }}
            >
              <Image
                src={profileImage}
                alt="Vaibhav"
                priority
                className="profile-photo"
                sizes="(max-width: 900px) 220px, 260px"
              />
            </motion.div>

            <div className="identity">
              <p className="eyebrow">SOFTWARE DEVELOPER</p>
              <h1>Vaibhav</h1>
              <p className="identity-copy">
                Rust and C++ focused developer building stronger foundations in
                systems, backend engineering, and problem solving.
              </p>
            </div>

            <div className="availability">
              <span className="status-dot" />
              <span>Currently learning & building</span>
            </div>
          </div>

          <nav className="side-nav" aria-label="Portfolio sections">
            {navigation.map(([label, href], index) => (
              <a href={href} key={href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {label}
              </a>
            ))}
          </nav>

          <div className="rail-links">
            <a
              href="https://github.com/Vaibh37"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Arrow />
            </a>
            <a
              href="https://x.com/AkagamiRust37"
              target="_blank"
              rel="noreferrer"
            >
              X <Arrow />
            </a>
            <a href="mailto:devvaibhav37@gmail.com">Email <Arrow /></a>
          </div>
        </motion.aside>

        <section className="content-column">
          <motion.section
            className="intro-section"
            initial={reduceMotion ? { opacity: 1 } : "hidden"}
            animate={loading ? "hidden" : "show"}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.08,
                },
              },
            }}
          >
            <motion.p
              className="section-label"
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.45, ease },
                },
              }}
            >
              PORTFOLIO / 2026
            </motion.p>

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.68, ease },
                },
              }}
            >
              <span className="headline-line">Rust &amp; C++ at the core.</span>
              <span className="headline-line">MERN for full-stack products.</span>
            </motion.h2>

            <motion.p
              className="intro-copy"
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.58, ease },
                },
              }}
            >
              I&apos;m focused on learning software deeply: memory, data
              structures, APIs, databases, deployment, and the systems concepts
              behind the code I write.
            </motion.p>

            <motion.div
              className="intro-actions"
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, delay: 0.05 },
                },
              }}
            >
              <motion.a
                className="primary-link"
                href="#work"
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.015 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              >
                View selected work
              </motion.a>
              <a
                className="secondary-link"
                href="https://github.com/Vaibh37"
                target="_blank"
                rel="noreferrer"
              >
                GitHub profile <Arrow />
              </a>
            </motion.div>

            <motion.div
              className="focus-grid"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {[
                ["Primary", "Rust · C++"],
                ["Full-stack", "MERN"],
                ["Current focus", "DSA · Backend"],
              ].map(([label, value]) => (
                <motion.div
                  key={label}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease },
                    },
                  }}
                >
                  <span>{label}</span>
                  <strong>{value}</strong>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <section className="content-section" id="work">
            <Reveal className="section-head">
              <p className="section-label">01 / WORK</p>
              <h2>Selected projects</h2>
              <p>
                Projects that show different parts of how I build: a full-stack
                product and a focused browser application.
              </p>
            </Reveal>

            <article className="case-study case-study-primary">
              <Reveal className="case-copy">
                <div className="case-meta">
                  <span>StudyOS</span>
                  <span>Full-stack application</span>
                </div>

                <h3>One workspace for studying.</h3>

                <p className="case-summary">
                  StudyOS connects tasks, notes, subjects, focus sessions,
                  calendars, progress tracking, XP, streaks, and a leaderboard
                  inside one student productivity platform.
                </p>

                <dl className="case-facts">
                  <div>
                    <dt>Frontend</dt>
                    <dd>React · Vite · Firebase Auth</dd>
                  </div>
                  <div>
                    <dt>Backend</dt>
                    <dd>Node.js · Express · MongoDB</dd>
                  </div>
                  <div>
                    <dt>Local mode</dt>
                    <dd>IndexedDB guest storage</dd>
                  </div>
                  <div>
                    <dt>Deployment</dt>
                    <dd>Vercel · Render</dd>
                  </div>
                </dl>

                <div className="case-links">
                  <a
                    href="https://studyos-one-omega.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live application <Arrow />
                  </a>
                  <a
                    href="https://github.com/Vaibh37/Studyos"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source code <Arrow />
                  </a>
                </div>
              </Reveal>

              <ScrollParallax className="scroll-media" distance={44}>
                <motion.a
                  className="case-image-link"
                  href="https://studyos-one-omega.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  initial={
                    reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, clipPath: "inset(0 0 20% 0)" }
                  }
                  whileInView={{
                    opacity: 1,
                    clipPath: "inset(0 0 0% 0)",
                  }}
                  viewport={{ once: true, amount: 0.12 }}
                  transition={{ duration: 0.82, ease }}
                  whileHover={reduceMotion ? undefined : { y: -5 }}
                >
                  <Image
                    src="https://raw.githubusercontent.com/Vaibh37/Studyos/main/docs/screenshots/dashboard.png"
                    alt="StudyOS dashboard"
                    width={1600}
                    height={1000}
                    className="case-image"
                    sizes="(max-width: 900px) 94vw, 780px"
                  />
                </motion.a>
              </ScrollParallax>
            </article>

            <article className="case-study case-study-secondary">
              <Reveal className="case-copy">
                <div className="case-meta">
                  <span>QRify</span>
                  <span>Browser / PWA</span>
                </div>

                <h3>QR generation without a backend.</h3>

                <p className="case-summary">
                  QRify generates and customizes QR codes entirely in the browser
                  and continues working offline through a Service Worker and the
                  Cache API.
                </p>

                <dl className="case-facts">
                  <div>
                    <dt>Core</dt>
                    <dd>HTML · CSS · JavaScript</dd>
                  </div>
                  <div>
                    <dt>Offline</dt>
                    <dd>Service Worker · Cache API</dd>
                  </div>
                  <div>
                    <dt>Features</dt>
                    <dd>Contrast checks · PNG · Clipboard</dd>
                  </div>
                  <div>
                    <dt>Architecture</dt>
                    <dd>100% client-side</dd>
                  </div>
                </dl>

                <div className="case-links">
                  <a
                    href="https://github.com/Vaibh37/qrify"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Source code <Arrow />
                  </a>
                </div>
              </Reveal>

              <ScrollParallax className="scroll-media" distance={34}>
                <motion.div
                  className="qrify-panel"
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.68, ease }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                >
                  <div className="qrify-panel-inner">
                    <motion.div
                      whileHover={reduceMotion ? undefined : { rotate: 2, scale: 1.04 }}
                      transition={{ duration: 0.24, ease }}
                    >
                      <Image
                        src="https://raw.githubusercontent.com/Vaibh37/qrify/main/icons/icon-512.png"
                        alt="QRify app icon"
                        width={512}
                        height={512}
                        className="qrify-icon"
                      />
                    </motion.div>
                    <div>
                      <span>QRIFY</span>
                      <p>Offline-capable QR generation in the browser.</p>
                    </div>
                  </div>
                </motion.div>
              </ScrollParallax>
            </article>
          </section>

          <section className="content-section" id="about">
            <Reveal className="section-head">
              <p className="section-label">02 / ABOUT</p>
              <h2>How I&apos;m developing</h2>
            </Reveal>

            <ScrollParallax className="about-scroll" distance={24}>
              <Reveal className="about-layout">
                <div className="about-lead">
                  <p>
                    My main focus is <strong>Rust and C++</strong>. I&apos;m using
                    them to improve how I think about memory, ownership, data
                    structures, performance, and lower-level software behavior.
                  </p>
                </div>

                <div className="about-copy">
                  <p>
                    For product work, I use the <strong>MERN stack</strong> to
                    build interfaces, APIs, authentication flows, and
                    database-backed applications.
                  </p>
                  <p>
                    Right now I&apos;m spending most of my time on DSA, backend
                    fundamentals, Rust, and building projects that force me to
                    understand the implementation instead of only the surface API.
                  </p>
                </div>
              </Reveal>
            </ScrollParallax>
          </section>

          <section className="content-section" id="stack">
            <Reveal className="section-head">
              <p className="section-label">03 / STACK</p>
              <h2>Languages &amp; tools</h2>
            </Reveal>

            <div className="stack-list">
              <Reveal className="stack-row">
                <span>Core</span>
                <div>
                  <strong>Rust</strong>
                  <strong>C++</strong>
                </div>
              </Reveal>

              <Reveal className="stack-row" delay={0.05}>
                <span>Full-stack</span>
                <div>
                  <strong>MongoDB</strong>
                  <strong>Express</strong>
                  <strong>React</strong>
                  <strong>Node.js</strong>
                </div>
              </Reveal>

              <Reveal className="stack-row" delay={0.1}>
                <span>Also working with</span>
                <div className="stack-small">
                  <strong>C</strong>
                  <strong>Python</strong>
                  <strong>JavaScript</strong>
                  <strong>Next.js</strong>
                  <strong>PostgreSQL</strong>
                  <strong>MySQL</strong>
                  <strong>Docker</strong>
                  <strong>Git</strong>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="contact-block" id="contact">
            <Reveal>
              <p className="section-label">04 / CONTACT</p>
              <h2>Get in touch.</h2>
              <p>
                Email is the best way to reach me. You can also find my work on
                GitHub and what I&apos;m building on X.
              </p>

              <div className="contact-actions">
                <motion.a
                  className="primary-link"
                  href="mailto:devvaibhav37@gmail.com"
                  whileHover={reduceMotion ? undefined : { y: -2, scale: 1.01 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                >
                  devvaibhav37@gmail.com
                </motion.a>
                <a
                  className="secondary-link"
                  href="https://github.com/Vaibh37"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <Arrow />
                </a>
                <a
                  className="secondary-link"
                  href="https://x.com/AkagamiRust37"
                  target="_blank"
                  rel="noreferrer"
                >
                  X <Arrow />
                </a>
              </div>
            </Reveal>
          </section>
        </section>
      </main>
    </>
  );
}
