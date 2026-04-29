"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HeroSceneClient } from "../three/HeroSceneClient";
import { MagneticButton } from "../scroll/MagneticButton";


interface HeroSectionProps {
  onScrollTo: (section: string) => void;
}

const STATS = [
  { label: "경력 기간", value: "5+", sublabel: "년" },
  { label: "프로젝트", value: "8+", sublabel: "개" },
  { label: "기술 스택", value: "20+", sublabel: "개" },
  { label: "협업 기업", value: "3+", sublabel: "개" },
];

export const HeroSection = forwardRef<HTMLElement, HeroSectionProps>(
  function HeroSection({ onScrollTo }, ref) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const subRef = useRef<HTMLParagraphElement | null>(null);
    const statsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const ctx = gsap.context(() => {
        // Stagger entrance
        gsap.from(".hero-line", {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.2,
        });
        gsap.from(".hero-stat", {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.6,
        });

        // Parallax on scroll for the hero text + stats
        gsap.to(titleRef.current, {
          y: -80,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to(subRef.current, {
          y: -40,
          opacity: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
        gsap.to(statsRef.current, {
          y: 40,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    }, []);

    return (
      <section
        id="hero"
        ref={(el) => {
          sectionRef.current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) ref.current = el;
        }}
        className="relative isolate min-h-screen overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32"
      >
        {/* 3D scene (md+) or CSS fallback (mobile / reduced-motion) */}
        <HeroSceneClient className="pointer-events-none absolute inset-0 z-0" />

        {/* Pattern grid + grain texture */}
        <div className="pointer-events-none absolute inset-0 z-[1] pattern-grid opacity-40 dark:opacity-30" aria-hidden />
        <div className="pointer-events-none absolute inset-0 z-[1] grain-overlay" aria-hidden />

        {/* Soft vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, hsl(var(--background) / 0.6) 70%, hsl(var(--background)) 100%)",
          }}
          aria-hidden
        />

        <div className="container relative z-10 mx-auto px-4">
          {/* Editorial header strip */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            <span>◉ Portfolio · 2025</span>
            <span className="hidden md:inline">Seoul ↔ Remote</span>
            <span className="text-[hsl(var(--accent-cyan))]">● Available for hire</span>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Avatar column */}
            <div className="hero-line flex items-center justify-center lg:col-span-3 lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[hsl(var(--accent-cyan))] via-[hsl(var(--accent-iris))] to-[hsl(var(--accent-coral))] opacity-40 blur-2xl animate-mesh-drift" />
                <Avatar className="relative h-32 w-32 border-2 border-[hsl(var(--ink)/0.15)] shadow-2xl md:h-36 md:w-36">
                  <AvatarImage src="/me.png" alt="김재현" />
                  <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--accent-cyan))] to-[hsl(var(--accent-iris))] text-3xl font-black text-[hsl(var(--ink))]">
                    JH
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -bottom-1 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-[hsl(var(--ink)/0.15)] bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-widest shadow-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--accent-cyan))] opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent-cyan))]" />
                  </span>
                  Available
                </span>
              </div>
            </div>

            {/* Content column */}
            <div ref={titleRef} className="lg:col-span-9">
              <div className="hero-line mb-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                <span className="h-px w-8 bg-[hsl(var(--accent-cyan))]" />
                AI · Web · Full-Stack
              </div>

              <h1 className="text-[clamp(2.5rem,7vw,5.75rem)] font-black leading-[0.95] tracking-tight">
                <span className="hero-line block text-foreground">AI &amp; Web</span>
                <span className="hero-line block">
                  <span className="text-gradient-iris">Developer</span>
                  <span className="ml-3 inline-block align-baseline text-[hsl(var(--accent-coral))]">.</span>
                </span>
              </h1>

              <p
                ref={subRef}
                className="hero-line mt-8 max-w-2xl text-base font-medium text-foreground/85 md:text-lg"
              >
                AI 기술과 웹 개발을 결합하여 혁신적인 솔루션을 만드는{" "}
                <span className="font-bold text-foreground">풀스택 개발자</span>.
                하나은행 챗봇 운영부터 최신 LLM 기반 RAG 시스템까지, 실무 경험과 기술 학습을 통해 지속적으로 성장하고 있습니다.
              </p>

              {/* CTA */}
              <div className="hero-line mt-10 flex flex-col gap-3 sm:flex-row">
                <MagneticButton
                  onClick={() => onScrollTo("projects")}
                  className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-foreground px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-[hsl(var(--accent-cyan))] hover:text-[hsl(var(--ink))]"
                >
                  <span>프로젝트 보기</span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </MagneticButton>
                <MagneticButton
                  onClick={() => onScrollTo("contact")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[hsl(var(--ink)/0.2)] bg-background/60 px-7 py-3.5 text-sm font-semibold text-foreground backdrop-blur-md transition hover:border-[hsl(var(--accent-iris))] hover:text-[hsl(var(--accent-iris))]"
                  strength={10}
                >
                  연락하기
                </MagneticButton>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[hsl(var(--ink)/0.1)] bg-[hsl(var(--ink)/0.06)] sm:grid-cols-4">
                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="hero-stat group relative bg-background/80 p-5 backdrop-blur transition-colors hover:bg-background"
                  >
                    <div className="flex items-baseline gap-1">
                      <div className="font-mono text-3xl font-black tabular-nums text-foreground transition-colors group-hover:text-[hsl(var(--accent-cyan))] md:text-4xl">
                        {stat.value}
                      </div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground">
                        {stat.sublabel}
                      </div>
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {stat.label}
                    </div>
                    <div
                      aria-hidden
                      className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[hsl(var(--accent-cyan))] to-[hsl(var(--accent-iris))] transition-all duration-500 group-hover:w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            <span className="h-px w-12 bg-current" />
            Scroll
            <span className="h-px w-12 bg-current" />
          </div>
        </div>
      </section>
    );
  }
);
