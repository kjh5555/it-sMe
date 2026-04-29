"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { MagneticButton } from "../scroll/MagneticButton";
import type { Project } from "./types";

export interface ProjectDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Zero-padded index string, e.g. 1 → "01" */
function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  if (!project) return null;

  const hasChallenges = Array.isArray(project.challenges) && project.challenges.length > 0;
  const hasAchievements = Array.isArray(project.achievements) && project.achievements.length > 0;
  const hasImages = Array.isArray(project.images) && project.images.length > 0;
  const hasDemo = Boolean(project.demoUrl);
  const hasGithub = Boolean(project.githubUrl);
  const hasCta = hasDemo || hasGithub;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/*
        Override DialogContent defaults:
        — no padding (p-0), wider (max-w-[1000px]), cinematic height (max-h-[90vh])
        — flex column so inner scroll + sticky bars work
        — sharp border instead of default rounding
      */}
      <DialogContent
        className={[
          // Layout
          "flex flex-col p-0 gap-0 overflow-hidden",
          // Size
          "w-full sm:max-w-[1000px] max-h-[90vh]",
          // Aesthetics: thin ink border, no shadow ring
          "rounded-2xl border border-[hsl(var(--ink)/0.18)] bg-background shadow-none",
          // Override the shadcn close button so it reads against the dark hero image:
          // dark circular backdrop, white icon, sits at right-4 top-4 by default
          "[&>button[type='button']]:!opacity-100 [&>button[type='button']]:bg-[hsl(222_47%_7%/0.7)] [&>button[type='button']]:hover:bg-[hsl(222_47%_7%/0.9)] [&>button[type='button']]:text-white [&>button[type='button']]:rounded-full [&>button[type='button']]:p-1.5 [&>button[type='button']]:transition-colors",
        ].join(" ")}
      >
        {/* ── HERO BANNER ──────────────────────────────────────────────── */}
        <div className="relative h-64 md:h-72 w-full shrink-0 overflow-hidden">
          {/* Project image */}
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 1000px"
            className="object-cover"
            priority
            unoptimized
          />

          {/* Dark ink overlay gradient — heavier at bottom for text legibility */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, hsl(222 47% 7% / 0.55) 0%, hsl(222 47% 7% / 0.82) 60%, hsl(222 47% 7% / 0.97) 100%)",
            }}
          />

          {/* Grain texture overlay */}
          <div className="pointer-events-none absolute inset-0 grain-overlay" aria-hidden />

          {/* Featured pill — top right, behind close button (z-10 < shadcn close z-[101]) */}
          {project.featured && (
            <span
              className="absolute right-12 top-4 z-10 inline-flex items-center gap-1.5 rounded-none border border-[hsl(var(--accent-cyan))] bg-[hsl(var(--accent-cyan))] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[hsl(var(--ink))]"
            >
              ● Featured
            </span>
          )}

          {/* Text overlay — bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 md:px-8 md:pb-7">
            {/* Mono micro-label */}
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.4em] text-[hsl(var(--accent-cyan))]">
              ◆ Case Study
            </div>

            {/* Title — visually hidden from DialogTitle (accessibility) but visible here */}
            <DialogHeader className="space-y-0 text-left">
              <DialogTitle className="text-2xl font-black leading-tight tracking-tight text-white md:text-3xl lg:text-4xl">
                {project.title}
              </DialogTitle>
              <DialogDescription className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base">
                {project.description}
              </DialogDescription>
            </DialogHeader>

            {/* Badge row */}
            {project.badges.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-block border border-white/25 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── SCROLLABLE BODY ───────────────────────────────────────────── */}
        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain"
        >
          <div className="grid gap-10 p-6 md:grid-cols-[240px_1fr] md:gap-12 md:p-8">

            {/* ── LEFT RAIL (sticky meta) ──────────────────────────────── */}
            <aside className="space-y-7 md:sticky md:top-0 md:self-start">

              {/* Timeline */}
              {project.timeline && (
                <div>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[hsl(var(--accent-iris))]">
                    Timeline
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {project.timeline}
                  </p>
                </div>
              )}

              {/* Role */}
              {project.role && (
                <div>
                  <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-[hsl(var(--accent-coral))]">
                    Role
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {project.role}
                  </p>
                </div>
              )}

              {/* Tech stack chips */}
              {project.techStack.length > 0 && (
                <div>
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[hsl(var(--accent-lime))]">
                    Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={tech}
                        className={[
                          "inline-block px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors",
                          // First 3 get accent-cyan border for visual rhythm
                          i < 3
                            ? "border border-[hsl(var(--accent-cyan)/0.45)] text-[hsl(var(--accent-cyan))] hover:bg-[hsl(var(--accent-cyan)/0.08)]"
                            : "border border-[hsl(var(--ink)/0.18)] text-muted-foreground hover:border-[hsl(var(--ink)/0.35)]",
                        ].join(" ")}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery thumbnails if present */}
              {hasImages && (
                <div>
                  <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                    Gallery
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {project.images!.map((img, i) => (
                      <div key={i} className="group relative aspect-video w-full overflow-hidden border border-[hsl(var(--ink)/0.1)]">
                        <Image
                          src={img.url}
                          alt={img.caption}
                          fill
                          sizes="120px"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-[hsl(var(--ink)/0.75)] px-1.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                          {img.caption}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>

            {/* ── RIGHT COLUMN (editorial content) ─────────────────────── */}
            <div className="space-y-12 min-w-0">

              {/* Section 01 — Project description */}
              <section>
                <SectionHeader index={1} label="프로젝트 설명" accent="cyan" />
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {project.longDescription}
                </p>
              </section>

              {/* Section 02 — Challenges (only if data present) */}
              {hasChallenges && (
                <section>
                  <SectionHeader index={2} label="기술적 도전과 해결" accent="iris" />
                  <ol className="mt-5 space-y-0">
                    {project.challenges!.map((challenge, i) => (
                      <ChallengeItem key={i} index={i} text={challenge} />
                    ))}
                  </ol>
                </section>
              )}

              {/* Section 03 — Achievements (only if data present) */}
              {hasAchievements && (
                <section>
                  <SectionHeader
                    index={hasChallenges ? 3 : 2}
                    label="주요 성과"
                    accent="coral"
                  />
                  <ol className="mt-5 space-y-0">
                    {project.achievements!.map((achievement, i) => (
                      <ChallengeItem
                        key={i}
                        index={i}
                        text={achievement}
                        accentColor="hsl(var(--accent-coral))"
                      />
                    ))}
                  </ol>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* ── STICKY CTA BAR ────────────────────────────────────────────── */}
        {hasCta && (
          <div className="shrink-0 border-t border-[hsl(var(--ink)/0.12)] bg-background/95 backdrop-blur-md px-6 py-4 md:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                프로젝트 링크
              </span>
              <div className="flex flex-wrap gap-3">
                {hasDemo && (
                  <MagneticButton
                    as="a"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    strength={10}
                    className="inline-flex items-center gap-2 bg-[hsl(var(--accent-cyan))] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[hsl(var(--ink))] transition-opacity hover:opacity-90"
                  >
                    데모 보기
                    <span aria-hidden>↗</span>
                  </MagneticButton>
                )}
                {hasGithub && (
                  <MagneticButton
                    as="a"
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    strength={10}
                    className="inline-flex items-center gap-2 border border-[hsl(var(--ink)/0.2)] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                  >
                    GitHub
                    <span aria-hidden>↗</span>
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ── Sub-components ──────────────────────────────────────────────────────── */

type AccentKey = "cyan" | "iris" | "coral" | "lime";

const ACCENT_VARS: Record<AccentKey, string> = {
  cyan: "hsl(var(--accent-cyan))",
  iris: "hsl(var(--accent-iris))",
  coral: "hsl(var(--accent-coral))",
  lime: "hsl(var(--accent-lime))",
};

function SectionHeader({
  index,
  label,
  accent,
}: {
  index: number;
  label: string;
  accent: AccentKey;
}) {
  const color = ACCENT_VARS[accent];
  return (
    <div className="flex items-center gap-4">
      <span
        className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.35em]"
        style={{ color }}
      >
        {pad(index)} —
      </span>
      <h3 className="text-base font-black uppercase tracking-[0.15em] text-foreground">
        {label}
      </h3>
      {/* Inline accent rule */}
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to right, ${color}, transparent)`,
        }}
        aria-hidden
      />
    </div>
  );
}

function ChallengeItem({
  index,
  text,
  accentColor = "hsl(var(--accent-cyan))",
}: {
  index: number;
  text: string;
  accentColor?: string;
}) {
  return (
    <li className="group relative flex gap-5 border-t border-[hsl(var(--ink)/0.1)] py-4 first:border-t-0">
      {/* Hover accent slide-in line */}
      <div
        className="pointer-events-none absolute left-0 top-0 h-0.5 w-0 origin-left transition-[width] duration-500 group-hover:w-full"
        style={{ background: accentColor }}
        aria-hidden
      />
      {/* Number */}
      <span
        className="mt-0.5 shrink-0 font-mono text-[11px] font-bold tabular-nums"
        style={{ color: accentColor }}
      >
        ({pad(index + 1)})
      </span>
      {/* Text */}
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
    </li>
  );
}
