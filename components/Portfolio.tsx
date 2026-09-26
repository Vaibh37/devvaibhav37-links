"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import profileImage from "@/assets/profile.jpeg";

const stack = [
  { name: "Rust", group: "Core", emphasis: true },
  { name: "C++", group: "Core", emphasis: true },
  { name: "MongoDB", group: "MERN" },
  { name: "Express", group: "MERN" },
  { name: "React", group: "MERN" },
  { name: "Node.js", group: "MERN" },
  { name: "C", group: "Supporting" },
  { name: "Python", group: "Supporting" },
  { name: "Next.js", group: "Supporting" },
  { name: "PostgreSQL", group: "Supporting" },
  { name: "MySQL", group: "Supporting" },
  { name: "Docker", group: "Supporting" },
];

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Portfolio() {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty("--scroll-progress", String(progress));
    };

    const updatePointer = (event: PointerEvent) => {
      root.style.setProperty("--pointer-x", `${event.clientX}px`);
      root.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.14 },
    );

    reveals.forEach((element) => observer.observe(element));

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    if (finePointer && !reducedMotion) {
      window.addEventListener("pointermove", updatePointer, { passive: true });
      document.body.classList.add("has-fine-pointer");
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("pointermove", updatePointer);
      document.body.classList.remove("has-fine-pointer");
    };
  }, []);

  const copyEmail = async () => {
    const email = "devvaibhav37@gmail.com";

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="site-shell">
      <div className="scroll-progress" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#top" onClick={closeMenu}>
          <span className="wordmark-dot" />
          <span>VAIBHAV</span>
        </a>

        <nav className={`nav ${menuOpen ? "is-open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>
              {item.label}
            </a>
          ))}
        </nav>

        <a
          className="header-github"
          href="https://github.com/Vaibh37"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <span>↗</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero section" id="top">
        <div className="hero-grid">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">
              <span>01</span>
              Software Developer
            </p>

            <h1>
              Rust &amp; C++
              <span>at the core.</span>
            </h1>

            <p className="hero-line">MERN when it needs a browser.</p>

            <p className="hero-description">
              I build systems-oriented projects, full-stack applications, and
              small tools that solve real problems.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                View work <span>↓</span>
              </a>
              <a
                className="button button-ghost"
                href="https://github.com/Vaibh37"
                target="_blank"
                rel="noreferrer"
              >
                GitHub <span>↗</span>
              </a>
            </div>
          </div>

          <div className="hero-aside" data-reveal>
            <div className="portrait-wrap">
              <div className="portrait-frame">
                <Image
                  src={profileImage}
                  alt="Vaibhav"
                  className="portrait"
                  priority
                  sizes="(max-width: 800px) 72vw, 360px"
                />
              </div>
              <span className="portrait-index">V / 37</span>
            </div>

            <div className="signal-panel">
              <div>
                <span>CORE</span>
                <strong>Rust · C++</strong>
              </div>
              <div>
                <span>WEB</span>
                <strong>MERN</strong>
              </div>
              <div>
                <span>FOCUS</span>
                <strong>Systems · DSA · Backend</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-footer" aria-hidden="true">
          <span>INDIA</span>
          <span className="hero-footer-line" />
          <span>SCROLL TO EXPLORE</span>
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">
            <span>02</span>
            Selected Work
          </p>
          <div>
            <h2>Things I&apos;ve shipped.</h2>
            <p>Two projects, two different reasons to build.</p>
          </div>
        </div>

        <article className="project project-featured" data-reveal>
          <div className="project-copy">
            <div className="project-number">01</div>
            <p className="project-kicker">Full-stack product</p>
            <h3>StudyOS</h3>
            <p className="project-description">
              A study productivity platform that brings tasks, notes, focus
              sessions, progress, XP, streaks, and a leaderboard into one
              workspace.
            </p>

            <div className="tag-row">
              <span>React</span>
              <span>Node.js</span>
              <span>Express</span>
              <span>MongoDB</span>
              <span>Firebase</span>
            </div>

            <ul className="project-points">
              <li>Guest mode with IndexedDB</li>
              <li>Firebase authentication</li>
              <li>Progress and gamification system</li>
              <li>Responsive desktop + mobile UI</li>
            </ul>

            <div className="project-links">
              <a
                className="text-link"
                href="https://studyos-one-omega.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                Live app <span>↗</span>
              </a>
              <a
                className="text-link muted"
                href="https://github.com/Vaibh37/Studyos"
                target="_blank"
                rel="noreferrer"
              >
                Source <span>↗</span>
              </a>
            </div>
          </div>

          <div className="studyos-preview" aria-label="StudyOS visual preview">
            <div className="preview-topbar">
              <div className="preview-dots">
                <span />
                <span />
                <span />
              </div>
              <span>studyos.app</span>
              <span className="preview-status">LIVE</span>
            </div>
            <div className="dashboard">
              <aside className="dashboard-sidebar">
                <span className="dash-logo">S</span>
                <i className="active" />
                <i />
                <i />
                <i />
              </aside>
              <div className="dashboard-main">
                <div className="dashboard-welcome">
                  <div>
                    <small>WELCOME BACK</small>
                    <strong>Ready to focus?</strong>
                  </div>
                  <span>LV. 12</span>
                </div>
                <div className="dashboard-stats">
                  <div>
                    <small>FOCUS</small>
                    <strong>4h 28m</strong>
                  </div>
                  <div>
                    <small>TASKS</small>
                    <strong>8 / 11</strong>
                  </div>
                  <div>
                    <small>STREAK</small>
                    <strong>12 days</strong>
                  </div>
                </div>
                <div className="dashboard-chart">
                  <span style={{ height: "34%" }} />
                  <span style={{ height: "58%" }} />
                  <span style={{ height: "44%" }} />
                  <span style={{ height: "82%" }} />
                  <span style={{ height: "66%" }} />
                  <span style={{ height: "91%" }} />
                  <span style={{ height: "74%" }} />
                </div>
                <div className="dashboard-bottom">
                  <div>
                    <small>NEXT TASK</small>
                    <strong>Data Structures</strong>
                  </div>
                  <button type="button" tabIndex={-1}>
                    Start focus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="project project-compact" data-reveal>
          <div className="qr-preview" aria-hidden="true">
            <div className="qr-card">
              <div className="qr-code" />
              <div className="qr-meta">
                <span>QRIFY</span>
                <strong>Offline-ready QR tools.</strong>
              </div>
            </div>
          </div>

          <div className="project-copy">
            <div className="project-number">02</div>
            <p className="project-kicker">Browser / PWA</p>
            <h3>QRify</h3>
            <p className="project-description">
              A lightweight, privacy-focused QR generator with customization,
              contrast checks, downloads, clipboard support, and offline PWA
              behavior.
            </p>

            <div className="tag-row">
              <span>JavaScript</span>
              <span>Service Worker</span>
              <span>Cache API</span>
              <span>PWA</span>
            </div>

            <div className="project-links">
              <a
                className="text-link"
                href="https://github.com/Vaibh37/qrify"
                target="_blank"
                rel="noreferrer"
              >
                Source <span>↗</span>
              </a>
            </div>
          </div>
        </article>
      </section>

      <section className="section about-section" id="about">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">
            <span>03</span>
            About
          </p>
          <h2>What I&apos;m focused on.</h2>
        </div>

        <div className="about-grid">
          <div className="about-main" data-reveal>
            <p>
              I&apos;m <strong>Vaibhav</strong>. My main focus is{" "}
              <strong>Rust and C++</strong>.
            </p>
            <p>
              I use <strong>MERN</strong> when I&apos;m building full-stack web
              applications.
            </p>
            <p>
              Right now I&apos;m improving my problem solving, learning systems
              concepts more deeply, and building projects that force me to
              understand what&apos;s happening under the abstraction.
            </p>
          </div>

          <div className="focus-list" data-reveal>
            <div>
              <span>01</span>
              <p>Rust</p>
            </div>
            <div>
              <span>02</span>
              <p>C++</p>
            </div>
            <div>
              <span>03</span>
              <p>DSA &amp; Problem Solving</p>
            </div>
            <div>
              <span>04</span>
              <p>Backend Engineering</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section stack-section" id="stack">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">
            <span>04</span>
            Stack
          </p>
          <h2>Core first. Tools second.</h2>
        </div>

        <div className="stack-grid" data-reveal>
          <div className="stack-column stack-core">
            <span className="stack-label">CORE</span>
            <div className="stack-big">Rust</div>
            <div className="stack-big">C++</div>
          </div>

          <div className="stack-column">
            <span className="stack-label">MERN</span>
            {stack
              .filter((item) => item.group === "MERN")
              .map((item) => (
                <div className="stack-item" key={item.name}>
                  {item.name}
                </div>
              ))}
          </div>

          <div className="stack-column">
            <span className="stack-label">SUPPORTING</span>
            {stack
              .filter((item) => item.group === "Supporting")
              .map((item) => (
                <div className="stack-item" key={item.name}>
                  {item.name}
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="section score-section">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">
            <span>05</span>
            GitHub
          </p>
          <h2>Code over time.</h2>
        </div>

        <div className="score-card" data-reveal>
          <Image
            src="https://awesome-github-stats.azurewebsites.net/user-stats/Vaibh37?theme=github-dark&preferLogin=true"
            alt="Vaibhav GitHub statistics"
            width={900}
            height={500}
            unoptimized
          />
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-panel" data-reveal>
          <p className="eyebrow">
            <span>06</span>
            Contact
          </p>
          <h2>Found something worth building?</h2>
          <p>
            Reach me by email, find my work on GitHub, or follow what I&apos;m
            learning and building on X.
          </p>

          <div className="contact-actions">
            <button className="button button-primary" type="button" onClick={copyEmail}>
              {copied ? "Copied" : "Copy email"} <span>{copied ? "✓" : "↗"}</span>
            </button>
            <a
              className="button button-ghost"
              href="mailto:devvaibhav37@gmail.com"
            >
              Email me <span>↗</span>
            </a>
          </div>

          <div className="social-row">
            <a
              href="https://github.com/Vaibh37"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span>↗</span>
            </a>
            <a
              href="https://x.com/AkagamiRust37"
              target="_blank"
              rel="noreferrer"
            >
              X / @AkagamiRust37 <span>↗</span>
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div>
          <span className="wordmark-dot" />
          <strong>VAIBHAV</strong>
        </div>
        <p>Rust · C++ · MERN</p>
        <p>Built with Next.js.</p>
      </footer>
    </main>
  );
}
