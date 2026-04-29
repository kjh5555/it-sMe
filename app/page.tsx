"use client";

import { useRef } from "react";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/sections/HeroSection";
import { ResumeSection } from "./components/sections/ResumeSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { ProjectsWrapper } from "./components/sections/ProjectsWrapper";
import { ContactSection } from "./components/sections/ContactSection";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const resumeRef = useRef<HTMLElement | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLElement | null>> = {
      hero: heroRef,
      resume: resumeRef,
      skills: skillsRef,
      projects: projectsRef,
      contact: contactRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navigation onScrollTo={scrollToSection} />
      <main className="relative min-h-screen overflow-x-clip bg-background text-foreground">
        {/* Editorial side rule */}
        <div
          aria-hidden
          className="pointer-events-none fixed left-6 top-1/2 z-10 hidden -translate-y-1/2 -rotate-90 origin-center font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground md:block"
        >
          김재현 · Portfolio · MMXXV
        </div>
        <div
          aria-hidden
          className="pointer-events-none fixed right-6 top-1/2 z-10 hidden -translate-y-1/2 rotate-90 origin-center font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground md:block"
        >
          AI · Web · Full-Stack
        </div>

        <HeroSection ref={heroRef} onScrollTo={scrollToSection} />
        <ResumeSection ref={resumeRef} />
        <SkillsSection ref={skillsRef} />
        <ProjectsWrapper ref={projectsRef} />
        <ContactSection ref={contactRef} />
      </main>
    </>
  );
}
