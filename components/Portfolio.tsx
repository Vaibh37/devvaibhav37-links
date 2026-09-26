"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import profileImage from "@/assets/profile.jpeg";

const nav = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Stack", "#stack"],
  ["Contact", "#contact"],
] as const;

const core = ["Rust", "C++"];
const web = ["MongoDB", "Express", "React", "Node.js"];
const supporting = [
  "C",
  "Python",
  "JavaScript",
  "Next.js",
  "PostgreSQL",
  "MySQL",
  "Docker",
  "Git",
];

const ease = [0.22, 1, 0.36, 1] as const;

function ExternalArrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.22 },
    transition: { duration: 0.72, ease },
  };

  return (
    <div className="portfolio">
      <div className="top-accent" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">V</span>
          <span>Vaibhav</span>
        </a>

        <nav className="nav" aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <a
          className="header-link"
          href="https://github.com/Vaibh37"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ExternalArrow />
        </a>
      </header>

      <main>
        <section className="hero" id="top">
          <motion.div className="hero-copy" {...reveal}>
            <div className="hero-meta">
              <span>Software developer</span>
              <span>India</span>
            </div>

            <p className="hero-name">VAIBHAV</p>

            <h1>
              <span>RUST</span>
              <span className="hero-plus">+</span>
              <span>C++</span>
            </h1>

            <div className="hero-rule" aria-hidden="true" />

            <div className="hero-bottom">
              <p className="hero-intro">
                Systems-focused development with Rust and C++.
                <br />
                MERN for full-stack web applications.
              </p>

              <div className="hero-actions">
                <a href="#work">Selected work ↓</a>
                <a
                  href="mailto:devvaibhav37@gmail.com"
                  className="muted-link"
                >
                  devvaibhav37@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.aside
            className="hero-portrait"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease }}
          >
            <div className="portrait-shell">
              <Image
                src={profileImage}
                alt="Vaibhav"
                priority
                className="portrait-image"
                sizes="(max-width: 760px) 86vw, 380px"
              />
              <div className="portrait-caption">
                <span>Current focus</span>
                <strong>Rust · DSA · Backend</strong>
              </div>
            </div>
          </motion.aside>
        </section>

        <section className="section work" id="work">
          <motion.div className="section-intro" {...reveal}>
            <span className="section-index">01</span>
            <div>
              <p className="section-kicker">Work</p>
              <h2>Selected projects.</h2>
            </div>
          </motion.div>

          <motion.article className="project studyos-project" {...reveal}>
            <div className="project-topline">
              <span>01 / FULL-STACK</span>
              <span>2026</span>
            </div>

            <a
              className="project-image-link"
              href="https://studyos-one-omega.vercel.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Open StudyOS"
            >
              <div className="project-image-frame">
                <Image
                  src="https://raw.githubusercontent.com/Vaibh37/Studyos/main/docs/screenshots/dashboard.png"
                  alt="StudyOS dashboard"
                  width={1600}
                  height={1000}
                  className="studyos-image"
                  sizes="(max-width: 900px) 94vw, 1160px"
                />
              </div>
            </a>

            <div className="project-info">
              <div className="project-title-block">
                <h3>StudyOS</h3>
                <p>Student productivity platform</p>
              </div>

              <div className="project-copy">
                <p>
                  Tasks, notes, focus sessions, progress tracking, XP, streaks,
                  and a leaderboard in one full-stack workspace.
                </p>
                <p className="project-detail">
                  React · Node.js · Express · MongoDB · Firebase
                </p>
              </div>

              <div className="project-links">
                <a
                  href="https://studyos-one-omega.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live <ExternalArrow />
                </a>
                <a
                  href="https://github.com/Vaibh37/Studyos"
                  target="_blank"
                  rel="noreferrer"
                >
                  Source <ExternalArrow />
                </a>
              </div>
            </div>
          </motion.article>

          <motion.article className="project qrify-project" {...reveal}>
            <div className="project-topline">
              <span>02 / BROWSER + PWA</span>
              <span>2026</span>
            </div>

            <div className="qrify-layout">
              <div className="qrify-visual" aria-hidden="true">
                <div className="qrify-grid" />
                <Image
                  src="https://raw.githubusercontent.com/Vaibh37/qrify/main/icons/icon-512.png"
                  alt=""
                  width={512}
                  height={512}
                  className="qrify-icon"
                />
                <span className="qrify-word">QRIFY</span>
              </div>

              <div className="qrify-copy">
                <div>
                  <h3>QRify</h3>
                  <p className="project-subtitle">
                    Lightweight QR generation with offline support.
                  </p>
                </div>

                <p>
                  Client-side QR generation with customization, contrast checks,
                  downloads, clipboard support, service workers, and PWA
                  caching.
                </p>

                <p className="project-detail">
                  JavaScript · Service Worker · Cache API · PWA
                </p>

                <a
                  className="inline-project-link"
                  href="https://github.com/Vaibh37/qrify"
                  target="_blank"
                  rel="noreferrer"
                >
                  View source <ExternalArrow />
                </a>
              </div>
            </div>
          </motion.article>
        </section>

        <section className="section about" id="about">
          <motion.div className="section-intro" {...reveal}>
            <span className="section-index">02</span>
            <div>
              <p className="section-kicker">About</p>
              <h2>A short introduction.</h2>
            </div>
          </motion.div>

          <motion.div className="about-grid" {...reveal}>
            <p className="about-lead">
              I&apos;m Vaibhav. I mainly work with{" "}
              <strong>Rust and C++</strong>, and use <strong>MERN</strong> for
              full-stack web applications.
            </p>

            <div className="about-detail">
              <p>
                Right now I&apos;m spending most of my development time on
                problem solving, backend fundamentals, and getting much better
                at Rust.
              </p>
              <p>
                I&apos;m also building up stronger fundamentals around memory,
                data structures, APIs, databases, and deployment.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="section stack" id="stack">
          <motion.div className="section-intro" {...reveal}>
            <span className="section-index">03</span>
            <div>
              <p className="section-kicker">Stack</p>
              <h2>Languages &amp; tools.</h2>
            </div>
          </motion.div>

          <motion.div className="stack-table" {...reveal}>
            <div className="stack-row stack-primary">
              <span className="stack-type">Core</span>
              <div className="stack-values">
                {core.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="stack-row">
              <span className="stack-type">Web</span>
              <div className="stack-values">
                {web.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <div className="stack-row">
              <span className="stack-type">Also</span>
              <div className="stack-values stack-values-small">
                {supporting.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="section contact" id="contact">
          <motion.div className="contact-inner" {...reveal}>
            <div>
              <span className="section-index">04</span>
              <p className="section-kicker">Contact</p>
            </div>

            <h2>Get in touch.</h2>

            <div className="contact-links">
              <a href="mailto:devvaibhav37@gmail.com">
                Email <ExternalArrow />
              </a>
              <a
                href="https://github.com/Vaibh37"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <ExternalArrow />
              </a>
              <a
                href="https://x.com/AkagamiRust37"
                target="_blank"
                rel="noreferrer"
              >
                X / @AkagamiRust37 <ExternalArrow />
              </a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="footer">
        <span>Vaibhav</span>
        <span>Rust · C++ · MERN</span>
        <span>Next.js / 2026</span>
      </footer>
    </div>
  );
}
