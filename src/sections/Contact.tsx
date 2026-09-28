import { motion } from "framer-motion";
import { ArrowUpRight, Github, Mail, Twitter } from "lucide-react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { Reveal } from "../components/Reveal";
import { site } from "../config/site";

export function Contact() {
  return (
    <section>
      <GapBand />
      <SectionHeader
        id="contact"
        title="Contact"
        aside={<span className="font-mono text-[10px] text-[var(--soft)]">07 / 07</span>}
      />
      <Shell>
        <div className="px-6 py-12 sm:px-8 sm:py-16">
          <Reveal y={22}>
            <p className="max-w-2xl font-serif text-4xl leading-[1.02] sm:text-6xl">
              Have something worth building, fixing, or arguing about?
            </p>
          </Reveal>

          <Reveal delay={0.08} y={16}>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--muted)]">
              A useful project, an open-source issue, or just a good technical conversation — my inbox is open.
            </p>
          </Reveal>

          <Reveal delay={0.14} y={14}>
            <div className="mt-8 flex flex-wrap gap-2">
              {[
                { href: `mailto:${site.email}`, label: site.email, icon: <Mail size={14} />, external: false },
                { href: site.github, label: "GitHub", icon: <Github size={14} />, external: true },
                { href: site.twitter, label: "@AkagamiRust37", icon: <Twitter size={14} />, external: true },
              ].map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  whileHover={{ y: -3, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 360, damping: 25 }}
                  className="contact-link group"
                >
                  {item.icon}
                  {item.label}
                  <ArrowUpRight size={11} className="opacity-0 transition-opacity group-hover:opacity-70" />
                </motion.a>
              ))}
            </div>
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
