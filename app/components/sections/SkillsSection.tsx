"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Reveal } from "../scroll/Reveal";
import { cn } from "@/lib/utils";


type Level = "Beginner" | "Intermediate" | "Advanced";

interface Skill {
  name: string;
  level: Level;
}

interface Group {
  id: string;
  label: string;
  description: string;
  accent: string;
  skills: Skill[];
}

const GROUPS: Group[] = [
  {
    id: "frontend",
    label: "Frontend",
    description: "웹 프론트엔드 기술 — 컴포넌트 아키텍처와 인터랙션 디자인",
    accent: "hsl(var(--accent-cyan))",
    skills: [
      { name: "Vue.js & Vite", level: "Intermediate" },
      { name: "React & Next.js", level: "Intermediate" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "TypeScript", level: "Beginner" },
      { name: "Tailwind CSS", level: "Intermediate" },
      { name: "SASS", level: "Intermediate" },
      { name: "AG-Grid", level: "Intermediate" },
      { name: "Pinia", level: "Intermediate" },
      { name: "JQuery", level: "Intermediate" },
    ],
  },
  {
    id: "ai",
    label: "AI & ML",
    description: "인공지능과 머신러닝 — RAG, LLM, 컴퓨터 비전",
    accent: "hsl(var(--accent-iris))",
    skills: [
      { name: "TensorFlow / Keras", level: "Intermediate" },
      { name: "PyTorch", level: "Intermediate" },
      { name: "LangChain", level: "Intermediate" },
      { name: "LangSmith", level: "Beginner" },
      { name: "YOLO", level: "Intermediate" },
      { name: "OpenCV", level: "Intermediate" },
      { name: "OpenAI API", level: "Intermediate" },
      { name: "Hugging Face", level: "Intermediate" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    description: "서버 & 데이터베이스 — REST API, 비동기 처리, 클라우드",
    accent: "hsl(var(--accent-coral))",
    skills: [
      { name: "Node.js / Express", level: "Intermediate" },
      { name: "Python / FastAPI", level: "Intermediate" },
      { name: "MySQL", level: "Intermediate" },
      { name: "MongoDB", level: "Intermediate" },
      { name: "AWS / Vercel", level: "Beginner" },
    ],
  },
];

const levelMap: Record<Level, number> = {
  Beginner: 35,
  Intermediate: 70,
  Advanced: 95,
};

export const SkillsSection = forwardRef<HTMLElement>(function SkillsSection(_, ref) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const [activeGroup, setActiveGroup] = useState<string>(GROUPS[0].id);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      // Ticker parallax slide
      if (tickerRef.current) {
        gsap.to(tickerRef.current, {
          xPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = GROUPS.find((g) => g.id === activeGroup) ?? GROUPS[0];

  return (
    <section
      id="skills"
      ref={(el) => {
        sectionRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      className="relative overflow-hidden py-32 md:py-40"
    >
      {/* Marquee ticker behind */}
      <div
        ref={tickerRef}
        aria-hidden
        className="pointer-events-none absolute -left-10 top-24 z-0 flex w-[200%] gap-12 whitespace-nowrap font-mono text-[18vw] font-black uppercase leading-none tracking-tighter text-[hsl(var(--ink)/0.04)] dark:text-[hsl(var(--ink)/0.06)]"
      >
        <span>STACK · CRAFT · STACK · CRAFT ·</span>
        <span aria-hidden>STACK · CRAFT · STACK · CRAFT ·</span>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <Reveal className="mb-16 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-[hsl(var(--accent-cyan))]">
              ◆ Skills · 02
            </div>
            <h2 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
              <span className="text-gradient-cyan">Stack</span>{" "}
              <span className="text-foreground">Atlas</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground md:text-right">
            도메인별로 사용하는 도구들. 항상 최신 트렌드를 학습하며 실전에 적용합니다.
          </p>
        </Reveal>

        {/* Tab pills */}
        <div className="mb-10 flex flex-wrap gap-2">
          {GROUPS.map((group) => {
            const isActive = group.id === activeGroup;
            return (
              <button
                key={group.id}
                onClick={() => setActiveGroup(group.id)}
                className={cn(
                  "group relative inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all",
                  isActive
                    ? "border-transparent text-[hsl(var(--ink))]"
                    : "border-[hsl(var(--ink)/0.15)] text-foreground hover:border-[hsl(var(--ink)/0.3)]"
                )}
                style={isActive ? { background: group.accent } : undefined}
                aria-pressed={isActive}
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: isActive ? "hsl(var(--ink))" : group.accent }}
                />
                {group.label}
              </button>
            );
          })}
        </div>

        {/* Active group panel */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-2xl font-bold leading-snug tracking-tight">
              {active.description}
            </p>
            <div className="mt-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: active.accent }}
              />
              {active.skills.length} skills
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="space-y-2">
              {active.skills.map((skill) => (
                <li
                  key={skill.name}
                  className="group relative overflow-hidden rounded-xl border border-[hsl(var(--ink)/0.08)] bg-card/50 p-4 transition-all hover:border-[hsl(var(--ink)/0.2)] hover:bg-card"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span
                        className="font-mono text-[10px] uppercase tracking-widest"
                        style={{ color: active.accent }}
                      >
                        ▸
                      </span>
                      <span className="text-base font-semibold text-foreground md:text-lg">
                        {skill.name}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {skill.level}
                    </span>
                  </div>
                  <div className="relative mt-3 h-[3px] w-full overflow-hidden rounded-full bg-[hsl(var(--ink)/0.08)]">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${levelMap[skill.level]}%`,
                        background: active.accent,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
});
