import { Github, Mail, Twitter } from "lucide-react";
import { GapBand, SectionHeader, Shell } from "../components/Layout";
import { site } from "../config/site";

export function Contact(){
  return <section>
    <GapBand/>
    <SectionHeader id="contact" title="Contact" aside={<span className="font-mono text-[10px] text-[var(--soft)]">07 / 07</span>}/>
    <Shell>
      <div className="px-6 py-12 sm:px-8">
        <p className="max-w-xl font-serif text-4xl leading-tight sm:text-5xl">Have something worth building, fixing, or arguing about?</p>
        <div className="mt-8 flex flex-wrap gap-2">
          <a href={`mailto:${site.email}`} className="contact-link"><Mail size={14}/>{site.email}</a>
          <a href={site.github} target="_blank" rel="noreferrer" className="contact-link"><Github size={14}/>GitHub</a>
          <a href={site.twitter} target="_blank" rel="noreferrer" className="contact-link"><Twitter size={14}/>@AkagamiRust37</a>
        </div>
      </div>
    </Shell>
  </section>
}