"use client";

import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { Reveal, StaggerGroup, StaggerItem } from "../scroll/Reveal";


interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  detail?: string;
  accent: "cyan" | "coral" | "iris" | "lime";
}

const CAREER: TimelineEntry[] = [
  {
    period: "2026.01 — 현재",
    title: "주임연구원",
    org: "마인드웨어웍스",
    detail: "재직중",
    accent: "lime",
  },
  {
    period: "2024 — 2025",
    title: "AI & Web Developer",
    org: "프리랜서",
    detail: "하나은행 개인/기업 챗봇 운영",
    accent: "cyan",
  },
  {
    period: "2021 — 2024",
    title: "AI 솔루션 개발자",
    org: "파인트리 시스템",
    accent: "iris",
  },
];

const EDU: TimelineEntry[] = [
  {
    period: "2013 — 2020",
    title: "선박해양 공학 학사",
    org: "조선대학교",
    accent: "coral",
  },
];

const TRAINING: TimelineEntry[] = [
  {
    period: "2020.03 — 2020.07",
    title: "IOT융합 SW전문가 과정",
    org: "스마트미디어인재개발원",
    accent: "lime",
  },
  {
    period: "2020.10 — 2020.12",
    title: "AI 과정",
    org: "멋쟁이사자처럼",
    accent: "lime",
  },
];

const accentMap: Record<TimelineEntry["accent"], string> = {
  cyan: "hsl(var(--accent-cyan))",
  coral: "hsl(var(--accent-coral))",
  iris: "hsl(var(--accent-iris))",
  lime: "hsl(var(--accent-lime))",
};

export const ResumeSection = forwardRef<HTMLElement>(function ResumeSection(_, ref) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".resume-col").forEach((col, i) => {
        gsap.fromTo(
          col,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: col,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.05,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="resume"
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      className="relative py-32 md:py-40"
    >
      {/* Decorative diagonal stripe */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--ink)/0.2)] to-transparent"
      />

      <div className="container mx-auto px-4">
        <Reveal className="mb-16 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-[hsl(var(--accent-iris))]">
              ◆ Resume · 01
            </div>
            <h2 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
              이력 <span className="text-gradient-iris">Track</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground md:text-right">
            금융 챗봇 운영부터 RAG 기반 시스템까지 — 4년 이상의 실무 경험을 통해
            기술과 사용자 사이의 다리를 만들어 왔습니다.
          </p>
        </Reveal>

        <StaggerGroup className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <StaggerItem className="resume-col">
            <TimelineColumn label="Experience" entries={CAREER} symbol="●" />
          </StaggerItem>
          <StaggerItem className="resume-col">
            <TimelineColumn label="Education" entries={EDU} symbol="◆" />
          </StaggerItem>
          <StaggerItem className="resume-col">
            <TimelineColumn label="Training" entries={TRAINING} symbol="✦" />
          </StaggerItem>
        </StaggerGroup>
      </div>
    </section>
  );
});

function TimelineColumn({
  label,
  entries,
  symbol,
}: {
  label: string;
  entries: TimelineEntry[];
  symbol: string;
}) {
  return (
    <div className="relative">
      <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
        <span>{symbol}</span>
        <span>{label}</span>
      </div>
      <ol className="relative space-y-8 border-l border-[hsl(var(--ink)/0.15)] pl-6">
        {entries.map((entry, i) => (
          <li key={`${entry.title}-${i}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-background"
              style={{ background: accentMap[entry.accent] }}
            />
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {entry.period}
            </div>
            <div className="mt-1 text-lg font-bold tracking-tight text-foreground">
              {entry.title}
            </div>
            <div className="text-sm text-muted-foreground">{entry.org}</div>
            {entry.detail && (
              <div
                className="mt-1.5 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium"
                style={{
                  color: accentMap[entry.accent],
                  background: `${accentMap[entry.accent]}1f`,
                }}
              >
                {entry.detail}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
