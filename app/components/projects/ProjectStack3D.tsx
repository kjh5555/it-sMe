"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "./types";

interface ProjectStack3DProps {
  projects: Project[];
  onOpenDetails: (project: Project) => void;
}

/**
 * Perspective stack carousel.
 * - Front card: full opacity, 0deg, z=0
 * - Neighbors: tilted, dimmed, scaled down, pushed back
 * - Click center card → opens dialog
 * - Keyboard arrow keys, drag (pointer), wheel-throttled navigation
 */
export function ProjectStack3D({ projects, onOpenDetails }: ProjectStack3DProps) {
  const [active, setActive] = useState(0);
  const len = projects.length;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const next = useCallback(() => setActive((a) => (a + 1) % len), [len]);
  const prev = useCallback(() => setActive((a) => (a - 1 + len) % len), [len]);

  // Keyboard nav (only when stack is in viewport)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      const rect = el.getBoundingClientRect();
      const visible =
        rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      if (!visible) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Drag / swipe support
  const dragState = useRef({ startX: 0, dragging: false });
  const handlePointerDown = (e: React.PointerEvent) => {
    dragState.current.startX = e.clientX;
    dragState.current.dragging = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragState.current.dragging) return;
    const dx = e.clientX - dragState.current.startX;
    dragState.current.dragging = false;
    if (dx > 60) prev();
    else if (dx < -60) next();
  };

  const cardOffset = (i: number) => {
    // Wrap-around offset: -2..-1..0..1..2
    let diff = i - active;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none scene-3d"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* Stage */}
      <div
        className="relative mx-auto h-[560px] md:h-[640px] w-full max-w-[1100px]"
        role="region"
        aria-roledescription="carousel"
        aria-label="주요 프로젝트"
      >
        {projects.map((project, i) => {
          const off = cardOffset(i);
          const abs = Math.abs(off);
          const visible = abs <= 2;
          const translateX = off * 92; // px
          const translateZ = -abs * 220; // depth
          const rotateY = off * -18; // deg
          const opacity = visible ? Math.max(0, 1 - abs * 0.35) : 0;
          const isActive = off === 0;

          return (
            <div
              key={`${project.title}-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(-50%, -50%) translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg)`,
                transformStyle: "preserve-3d",
                transition:
                  "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
                opacity,
                zIndex: 100 - abs,
                pointerEvents: visible ? "auto" : "none",
              }}
              aria-hidden={!isActive}
            >
              <StackCard
                project={project}
                isActive={isActive}
                onClick={() => {
                  if (isActive) {
                    onOpenDetails(project);
                  } else if (off > 0) {
                    next();
                  } else {
                    prev();
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <Button
          variant="outline"
          size="icon"
          onClick={prev}
          aria-label="이전 프로젝트"
          className="h-12 w-12 rounded-full border-2 border-[hsl(var(--ink)/0.15)] bg-background/80 hover:border-[hsl(var(--accent-cyan))] hover:text-[hsl(var(--accent-cyan))] transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2" role="tablist" aria-label="프로젝트 인디케이터">
          {projects.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                aria-label={`프로젝트 ${i + 1}로 이동`}
                onClick={() => setActive(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  isActive
                    ? "w-10 bg-[hsl(var(--accent-cyan))]"
                    : "w-2 bg-[hsl(var(--ink)/0.25)] hover:bg-[hsl(var(--ink)/0.45)]"
                }`}
              />
            );
          })}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={next}
          aria-label="다음 프로젝트"
          className="h-12 w-12 rounded-full border-2 border-[hsl(var(--ink)/0.15)] bg-background/80 hover:border-[hsl(var(--accent-cyan))] hover:text-[hsl(var(--accent-cyan))] transition"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
        ← → 키 · 드래그 · 클릭으로 탐색
      </p>
    </div>
  );
}

function StackCard({
  project,
  isActive,
  onClick,
}: {
  project: Project;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative h-[440px] md:h-[520px] w-[300px] md:w-[420px] overflow-hidden rounded-3xl border bg-card text-left shadow-2xl transition-shadow ${
        isActive
          ? "border-[hsl(var(--accent-cyan))] shadow-[0_30px_80px_-20px_hsl(var(--accent-iris)/0.45)]"
          : "border-[hsl(var(--ink)/0.12)]"
      }`}
      tabIndex={isActive ? 0 : -1}
      aria-label={`${project.title} ${isActive ? "자세히 보기" : "이동"}`}
    >
      {/* Cover image */}
      <div className="relative h-3/5 w-full overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 300px, 420px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        {project.featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[hsl(var(--accent-cyan))] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--ink))]">
            ● Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="relative flex h-2/5 flex-col justify-between p-5 md:p-6">
        <div>
          <h3 className="line-clamp-2 text-lg md:text-xl font-bold text-foreground">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.badges.slice(0, 4).map((b) => (
            <Badge
              key={b}
              variant="outline"
              className="border-[hsl(var(--accent-iris)/0.4)] text-[10px] uppercase tracking-wider"
            >
              {b}
            </Badge>
          ))}
          {project.badges.length > 4 && (
            <Badge variant="outline" className="text-[10px]">
              +{project.badges.length - 4}
            </Badge>
          )}
        </div>
      </div>

      {/* Active glow */}
      {isActive && (
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-[hsl(var(--accent-cyan)/0.4)]" />
      )}
    </button>
  );
}
