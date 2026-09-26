"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import profileImage from "@/assets/profile.jpeg";

const ease = [0.22, 1, 0.36, 1] as const;

const stack = [
  "Rust",
  "C++",
  "MongoDB",
  "Express",
  "React",
  "Node.js",
  "Docker",
  "PostgreSQL",
  "Git",
  "Next.js",
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.45,
  });

  const portraitY = useTransform(progress, [0, 0.2], [0, 70]);
  const heroWordY = useTransform(progress, [0, 0.2], [0, -90]);

  const reveal = {
    initial: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 42 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.75, ease },
  };

  return (
    <main className="experience">
      <motion.div
        className="scroll-line"
        style={{ scaleY: progress }}
        aria-hidden="true"
      />

      <div className="corner-id" aria-hidden="true">
        <span>VS</span>
        <small>2026</small>
      </div>

      <section className="opening" id="top">
        <div className="opening-noise" aria-hidden="true" />

        <motion.div
          className="opening-orb opening-orb-a"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 50, -20, 0],
                  y: [0, -35, 18, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />
        <motion.div
          className="opening-orb opening-orb-b"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -35, 28, 0],
                  y: [0, 28, -24, 0],
                  scale: [1, 0.94, 1.07, 1],
                }
          }
          transition={{ duration: 21, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        <motion.div
          className="opening-copy"
          initial={reduceMotion ? { opacity: 1 } : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                delayChildren: 0.08,
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.p
            className="opening-label"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease },
              },
            }}
          >
            SOFTWARE DEVELOPER / INDIA
          </motion.p>

          <motion.h1
            className="opening-name"
            style={reduceMotion ? undefined : { y: heroWordY }}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.82, ease },
              },
            }}
          >
            VAIBHAV
          </motion.h1>

          <motion.div
            className="opening-statement"
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease },
              },
            }}
          >
            <span className="statement-main">Rust + C++</span>
            <span className="statement-separator">/</span>
            <span className="statement-sub">MERN</span>
          </motion.div>

          <motion.p
            className="opening-description"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.62, ease },
              },
            }}
          >
            Focused on software fundamentals, backend engineering, and
            performance-minded development. I use MERN when the product belongs
            on the web.
          </motion.p>

          <motion.div
            className="opening-links"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { duration: 0.5, delay: 0.15 },
              },
            }}
          >
            <a href="#work">View work ↓</a>
            <a
              href="https://github.com/Vaibh37"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <Arrow />
            </a>
            <a href="mailto:devvaibhav37@gmail.com">Email <Arrow /></a>
          </motion.div>
        </motion.div>

        <motion.div
          className="opening-portrait"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, x: 40 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          style={reduceMotion ? undefined : { y: portraitY }}
        >
          <div className="portrait-shape">
            <Image
              src={profileImage}
              alt="Vaibhav"
              priority
              className="portrait-image"
              sizes="(max-width: 760px) 78vw, 420px"
            />
          </div>
          <div className="portrait-note">
            <span>CURRENT</span>
            <strong>Rust · DSA · Backend</strong>
          </div>
        </motion.div>

        <div className="opening-scroll" aria-hidden="true">
          <span>SCROLL</span>
          <i />
        </div>
      </section>

      <section className="work-stage" id="work">
        <motion.div className="stage-title" {...reveal}>
          <span>01</span>
          <h2>Selected work</h2>
        </motion.div>

        <motion.article className="feature feature-studyos" {...reveal}>
          <div className="feature-visual">
            <motion.div
              className="studyos-window"
              whileHover={reduceMotion ? undefined : { rotate: -0.6, scale: 1.01 }}
              transition={{ duration: 0.35, ease }}
            >
              <Image
                src="https://raw.githubusercontent.com/Vaibh37/Studyos/main/docs/screenshots/dashboard.png"
                alt="StudyOS dashboard"
                width={1600}
                height={1000}
                sizes="(max-width: 900px) 94vw, 840px"
              />
            </motion.div>
          </div>

          <div className="feature-copy">
            <div className="feature-index">01 / FULL-STACK / 2026</div>
            <h3>StudyOS</h3>
            <p>
              Student productivity platform combining tasks, notes, focus
              sessions, progress tracking, XP, streaks, and a leaderboard.
            </p>
            <div className="feature-tech">
              React · Node.js · Express · MongoDB · Firebase
            </div>
            <div className="feature-links">
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
        </motion.article>

        <motion.article className="feature feature-qrify" {...reveal}>
          <div className="feature-copy">
            <div className="feature-index">02 / PWA / 2026</div>
            <h3>QRify</h3>
            <p>
              Client-side QR generation with customization, contrast checks,
              downloads, clipboard support, service workers, and offline
              caching.
            </p>
            <div className="feature-tech">
              JavaScript · Service Worker · Cache API · PWA
            </div>
            <div className="feature-links">
              <a
                href="https://github.com/Vaibh37/qrify"
                target="_blank"
                rel="noreferrer"
              >
                Source <Arrow />
              </a>
            </div>
          </div>

          <div className="qrify-canvas" aria-hidden="true">
            <motion.div
              className="qrify-ring ring-a"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="qrify-ring ring-b"
              animate={reduceMotion ? undefined : { rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="qrify-logo-wrap"
              whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: 2 }}
              transition={{ duration: 0.3, ease }}
            >
              <Image
                src="https://raw.githubusercontent.com/Vaibh37/qrify/main/icons/icon-512.png"
                alt=""
                width={512}
                height={512}
                className="qrify-logo"
              />
            </motion.div>
          </div>
        </motion.article>
      </section>

      <section className="about-spread" id="about">
        <motion.div className="about-number" {...reveal}>
          02
        </motion.div>

        <motion.div className="about-statement" {...reveal}>
          <p>
            I&apos;m Vaibhav. My main languages are{" "}
            <strong>Rust and C++</strong>.
          </p>
          <p>
            I&apos;m currently strengthening my fundamentals in data
            structures, memory, backend systems, APIs, databases, and
            deployment.
          </p>
        </motion.div>

        <motion.div className="about-side" {...reveal}>
          <span>FULL-STACK</span>
          <p>
            For web products, I use the <strong>MERN stack</strong>.
          </p>

          <span>LEARNING STYLE</span>
          <p>
            I learn by building, debugging, and understanding the mechanics
            behind the code.
          </p>
        </motion.div>
      </section>

      <section className="stack-band" id="stack">
        <div className="stack-band-head">
          <span>03 / STACK</span>
          <p>Languages and tools I work with</p>
        </div>

        <div className="marquee" aria-label="Technology stack">
          <motion.div
            className="marquee-track"
            animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {[...stack, ...stack].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="ending" id="contact">
        <motion.div
          className="ending-inner"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="ending-index">04 / CONTACT</span>
          <h2>Let&apos;s talk.</h2>
          <a
            className="ending-email"
            href="mailto:devvaibhav37@gmail.com"
          >
            devvaibhav37@gmail.com <Arrow />
          </a>

          <div className="ending-socials">
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
              X / @AkagamiRust37 <Arrow />
            </a>
          </div>

          <div className="ending-signoff">
            <span>VAIBHAV</span>
            <span>RUST · C++ · MERN</span>
            <span>2026</span>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
