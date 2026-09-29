import { useEffect, useState } from "react";
import { CommandPalette } from "./components/CommandPalette";
import { Nav } from "./components/Nav";
import { SideIndex } from "./components/SideIndex";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Projects } from "./sections/Projects";
import { OpenSource } from "./sections/OpenSource";
import { TechStack } from "./sections/TechStack";
import { GithubActivity } from "./sections/GithubActivity";
import { Writing } from "./sections/Writing";
import { Contact } from "./sections/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("vaibhav-theme");
    setLight(saved === "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem("vaibhav-theme", light ? "light" : "dark");
  }, [light]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      <Nav onOpenPalette={() => setPaletteOpen(true)} light={light} onToggleTheme={() => setLight((v) => !v)} />
      <SideIndex />
      <main>
        <Hero onOpenPalette={() => setPaletteOpen(true)} />
        <About />
        <Projects />
        <OpenSource />
        <TechStack />
        <Writing />
        <GithubActivity />
        <Contact />
      </main>
      <Footer />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        light={light}
        onToggleTheme={() => setLight((v) => !v)}
      />
    </div>
  );
}
