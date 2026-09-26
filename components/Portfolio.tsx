"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import profileImage from "@/assets/profile.jpeg";

const navItems = [
  ["Work", "#work"],
  ["About", "#about"],
  ["Stack", "#stack"],
  ["Contact", "#contact"],
] as const;

const stackGroups = [
  {
    label: "Core",
    items: ["Rust", "C++"],
  },
  {
    label: "Full-stack",
    items: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    label: "Working with",
    items: [
      "C",
      "Python",
      "JavaScript",
      "Next.js",
      "PostgreSQL",
      "MySQL",
      "Docker",
      "Git",
    ],
  },
];

const easing = [0.22, 1, 0.36, 1] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const portraitY = useTransform(scrollYProgress, [0, 0.32], [0, 56]);
  const smoothPortraitY = useSpring(portraitY, {
    stiffness: 90,
    damping: 24,
    mass: 0.6,
  });

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const sectionReveal = {
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 34 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: 0.7, ease: easing },
  };

  return (
    <div
      className="page"
      onPointerMove={(event) => {
        if (reduceMotion) return;
        pointerX.set(event.clientX);
        pointerY.set(event.clientY);
      }}
    >
      <motion.div
        className="cursor-light"
        style={{ x: pointerX, y: pointerY }}
        aria-hidden="true"
      />

      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Vaibhav home">
          <span className="brand-symbol">V</span>
          <span>Vaibhav</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <a
          className="nav-cta"
          href="mailto:devvaibhav37@gmail.com"
        >
          Contact <Arrow />
        </a>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-backdrop" aria-hidden="true">
            <motion.div
              className="gradient-orb gradient-orb-one"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, 36, -18, 0],
                      y: [0, -28, 20, 0],
                      scale: [1, 1.08, 0.96, 1],
                    }
              }
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="gradient-orb gradient-orb-two"
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, -24, 26, 0],
                      y: [0, 34, -18, 0],
                      scale: [1, 0.94, 1.08, 1],
                    }
              }
              transition={{
                duration: 19,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <motion.div
            className="hero-copy"
            initial={reduceMotion ? { opacity: 1 } : "hidden"}
            animate="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.11,
                  delayChildren: 0.06,
                },
              },
            }}
          >
            <motion.div
              className="availability"
              variants={{
                hidden: { opacity: 0, y: 14 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easing } },
              }}
            >
              <span className="availability-dot" />
              Software developer · India
            </motion.div>

            <motion.p
              className="hero-kicker"
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easing } },
              }}
            >
              VAIBHAV
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 28 },
                show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: easing } },
              }}
            >
              Building with
              <span className="gradient-text"> Rust &amp; C++</span>
              <br />
              and shipping with MERN.
            </motion.h1>

            <motion.p
              className="hero-description"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.62, ease: easing } },
              }}
            >
              I focus on software fundamentals, backend engineering, and
              performance-minded development. For web products, I work across
              the MERN stack.
            </motion.p>

            <motion.div
              className="hero-actions"
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: easing } },
              }}
            >
              <a className="button button-primary" href="#work">
                View my work
                <span>↓</span>
              </a>
              <a
                className="button button-secondary"
                href="https://github.com/Vaibh37"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <Arrow />
              </a>
            </motion.div>

            <motion.div
              className="hero-stack"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { duration: 0.6, delay: 0.12 } },
              }}
            >
              <span>Rust</span>
              <span>C++</span>
              <span>MongoDB</span>
              <span>Express</span>
              <span>React</span>
              <span>Node.js</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-visual"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, x: 48, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.18, ease: easing }}
            style={reduceMotion ? undefined : { y: smoothPortraitY }}
          >
            <div className="portrait-card">
              <div className="portrait-accent" aria-hidden="true" />
              <Image
                src={profileImage}
                alt="Vaibhav"
                priority
                className="portrait"
                sizes="(max-width: 800px) 84vw, 430px"
              />

              <div className="portrait-info">
                <div>
                  <span>Current focus</span>
                  <strong>Rust · DSA · Backend</strong>
                </div>
                <div className="portrait-year">2026</div>
              </div>
            </div>

            <motion.div
              className="floating-note floating-note-one"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -9, 0], rotate: [-1, 1, -1] }
              }
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span>01</span>
              <strong>Systems</strong>
              <small>Rust · C++</small>
            </motion.div>

            <motion.div
              className="floating-note floating-note-two"
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, 8, 0], rotate: [1, -1, 1] }
              }
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <span>02</span>
              <strong>Web</strong>
              <small>MERN</small>
            </motion.div>
          </motion.div>
        </section>

        <section className="section work-section" id="work">
          <motion.div className="section-heading" {...sectionReveal}>
            <div>
              <span className="section-number">01</span>
              <p>Selected work</p>
            </div>
            <h2>Projects I&apos;ve built and shipped.</h2>
          </motion.div>

          <motion.article
            className="project-card project-studyos"
            {...sectionReveal}
            whileHover={reduceMotion ? undefined : { y: -6 }}
            transition={{ duration: 0.3, ease: easing }}
          >
            <div className="project-content">
              <div className="project-meta">
                <span>Full-stack product</span>
                <span>2026</span>
              </div>

              <h3>StudyOS</h3>

              <p>
                A student productivity platform combining tasks, notes, focus
                sessions, progress tracking, XP, streaks, and a leaderboard.
              </p>

              <div className="tech-list">
                <span>React</span>
                <span>Node.js</span>
                <span>Express</span>
                <span>MongoDB</span>
                <span>Firebase</span>
              </div>

              <div className="project-actions">
                <a
                  href="https://studyos-one-omega.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Live project <Arrow />
                </a>
                <a
                  href="https://github.com/Vaibh37/Studyos"
                  target="_blank"
                  rel="noreferrer"
                >
                  Source <Arrow />
                </a>
              </div>
            </div>

            <motion.a
              className="project-preview"
              href="https://studyos-one-omega.vercel.app/"
              target="_blank"
              rel="noreferrer"
              whileHover={reduceMotion ? undefined : { scale: 1.012 }}
              transition={{ duration: 0.35, ease: easing }}
            >
              <Image
                src="https://raw.githubusercontent.com/Vaibh37/Studyos/main/docs/screenshots/dashboard.png"
                alt="StudyOS dashboard"
                width={1600}
                height={1000}
                className="studyos-preview"
                sizes="(max-width: 900px) 94vw, 760px"
              />
            </motion.a>
          </motion.article>

          <motion.article
            className="project-card project-qrify"
            {...sectionReveal}
            whileHover={reduceMotion ? undefined : { y: -6 }}
            transition={{ duration: 0.3, ease: easing }}
          >
            <div className="qrify-visual" aria-hidden="true">
              <motion.div
                className="qr-orbit qr-orbit-one"
                animate={
                  reduceMotion
                    ? undefined
                    : { rotate: 360 }
                }
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="qr-orbit qr-orbit-two"
                animate={
                  reduceMotion
                    ? undefined
                    : { rotate: -360 }
                }
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              />
              <Image
                src="https://raw.githubusercontent.com/Vaibh37/qrify/main/icons/icon-512.png"
                alt=""
                width={512}
                height={512}
                className="qrify-icon"
              />
            </div>

            <div className="project-content">
              <div className="project-meta">
                <span>Browser / PWA</span>
                <span>2026</span>
              </div>

              <h3>QRify</h3>

              <p>
                Client-side QR generation with customization, contrast
                checking, downloads, clipboard support, service workers, and
                offline caching.
              </p>

              <div className="tech-list">
                <span>JavaScript</span>
                <span>Service Worker</span>
                <span>Cache API</span>
                <span>PWA</span>
              </div>

              <div className="project-actions">
                <a
                  href="https://github.com/Vaibh37/qrify"
                  target="_blank"
                  rel="noreferrer"
                >
                  Source <Arrow />
                </a>
              </div>
            </div>
          </motion.article>
        </section>

        <section className="section about-section" id="about">
          <motion.div className="section-heading" {...sectionReveal}>
            <div>
              <span className="section-number">02</span>
              <p>About</p>
            </div>
            <h2>Software engineering, with depth.</h2>
          </motion.div>

          <motion.div className="about-grid" {...sectionReveal}>
            <div className="about-main">
              <p>
                I&apos;m Vaibhav. My main languages are{" "}
                <strong>Rust and C++</strong>.
              </p>
              <p>
                I&apos;m currently strengthening my fundamentals in data
                structures, memory, backend systems, APIs, databases, and
                deployment.
              </p>
            </div>

            <div className="about-side">
              <p>
                For full-stack products, I use the <strong>MERN stack</strong>.
              </p>
              <p>
                I prefer learning by building, debugging, and understanding the
                mechanics behind the code rather than collecting frameworks.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="section stack-section" id="stack">
          <motion.div className="section-heading" {...sectionReveal}>
            <div>
              <span className="section-number">03</span>
              <p>Stack</p>
            </div>
            <h2>Languages and tools.</h2>
          </motion.div>

          <div className="stack-groups">
            {stackGroups.map((group, index) => (
              <motion.div
                className={`stack-group ${index === 0 ? "stack-group-primary" : ""}`}
                key={group.label}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.58, delay: index * 0.08, ease: easing }}
              >
                <span className="stack-label">{group.label}</span>
                <div className="stack-items">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact">
          <motion.div
            className="contact-card"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.72, ease: easing }}
          >
            <div className="contact-glow" aria-hidden="true" />
            <span className="contact-label">04 · Contact</span>
            <h2>Want to talk?</h2>
            <p>
              You can reach me by email, find the code on GitHub, or follow
              what I&apos;m building on X.
            </p>

            <div className="contact-links">
              <a href="mailto:devvaibhav37@gmail.com">
                Email <Arrow />
              </a>
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
