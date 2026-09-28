export type Project = {
  title: string;
  blurb: string;
  story: string;
  stack: string[];
  year: string;
  status: string;
  source: string;
  live?: string;
  label: string;
};

export const site = {
  name: "Vaibhav",
  handle: "Vaibh37",
  role: "Developer · Rust learner · Builder",
  location: "Pune, India",
  timezone: "Asia/Kolkata",
  email: "devvaibhav37@gmail.com",
  github: "https://github.com/Vaibh37",
  twitter: "https://x.com/AkagamiRust37",
  avatar: "https://avatars.githubusercontent.com/u/158248067?v=4",
  tagline:
    "I build useful software, learn systems from the inside out, and keep shipping while I get better.",
  quote: {
    text: "A ship is safest in the harbor, but that is not what ships are built for.",
    author: "John A. Shedd",
  },
  now: [
    ["learning", "Rust deeper — ownership, collections, DSA"],
    ["solving", "LeetCode + SQL"],
    ["building", "small serious tools, not tutorial clones"],
    ["fuel", "black coffee, apparently"],
  ],
  about: [
    "I'm Vaibhav, a developer from Pune. Right now I care most about getting genuinely good at Rust, C++ and problem solving while still shipping full-stack products.",
    "I like understanding what sits underneath the abstraction — data structures, APIs, databases, networking, tooling and the tradeoffs that make software hold up.",
    "I build in public, contribute outside my own repositories, and keep notes on what I learn so the second pass is always sharper than the first.",
  ],
  tldr: ["Rust first.", "Build real things.", "Contribute upstream.", "Question everything."],
  projects: [
    {
      title: "StudyOS",
      label: "Full-stack product",
      blurb:
        "A student productivity system connecting tasks, subjects, notes, focus sessions, XP, streaks, progress and leaderboard mechanics.",
      story:
        "StudyOS started as a productivity app and turned into a much broader product exercise: auth, persistence, responsive UX, data modeling, gamification and shipping something people can actually use.",
      stack: ["React", "Vite", "Express", "MongoDB", "Firebase", "IndexedDB"],
      year: "2026",
      status: "Live",
      source: "https://github.com/Vaibh37/Studyos",
      live: "https://studyos-one-omega.vercel.app/",
    },
    {
      title: "Exam Eligibility Engine",
      label: "Scraping + rule engine",
      blurb:
        "A Node.js service that discovers official exam sources, parses HTML/PDF evidence and evaluates eligibility using explainable reviewed rules.",
      story:
        "The interesting part is not scraping a page. It is preserving provenance, separating source extraction from exam-specific logic, detecting source changes and making every eligibility result explainable.",
      stack: ["Node.js", "Axios", "HTML/PDF", "Testing", "Docker"],
      year: "2026",
      status: "Active",
      source: "https://github.com/Vaibh37/exam-eligibility-scraper",
    },
    {
      title: "QRify",
      label: "Client-side PWA",
      blurb:
        "A small privacy-focused QR generator with customization, download/copy flows, installability and offline support.",
      story:
        "QRify deliberately keeps the surface area small: no server, no account, no unnecessary data path. The browser does the work and the service worker keeps it useful offline.",
      stack: ["HTML", "CSS", "JavaScript", "PWA", "Cache API"],
      year: "2026",
      status: "Shipped",
      source: "https://github.com/Vaibh37/qrify",
    },
  ] as Project[],
  contributions: [
    {
      repo: "Keshavcodes3/Animicon",
      title: "Add 10 animated icons and improve collection navigation",
      meta: "Merged · 28 files · +2165 / -17",
      url: "https://github.com/Keshavcodes3/Animicon/pull/5",
    },
    {
      repo: "Keshavcodes3/Animicon",
      title: "Add a new animated icon set",
      meta: "Merged · 30 files · +1781 / -806",
      url: "https://github.com/Keshavcodes3/Animicon/pull/4",
    },
  ],
  skills: [
    "Rust","C++","C","JavaScript","TypeScript","React","Next.js","Node.js","Express",
    "MongoDB","MySQL","PostgreSQL","Docker","Git","GitHub","Vercel"
  ],
  writing: [
    {
      title: "Making Sense of It — Part 1",
      date: "Sep 21, 2026",
      summary: "Part one of an eight-part technical writing series — learning by forcing fuzzy ideas into clear words.",
      url: "https://x.com/devvaibhav37/status/2102037035406266642?s=20",
    },
  ],
} as const;