"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
}

/**
 * Pure CSS perspective tilt card driven by mouse position.
 * Disabled for reduced motion + coarse pointers.
 */
export function TiltCard({
  children,
  className,
  max = 10,
  scale = 1.02,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const inner = el.querySelector<HTMLElement>("[data-tilt-inner]");
    if (!inner) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let cx = 0;
    let cy = 0;
    let active = false;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = -py * max;
      targetY = px * max;
      active = true;
    };
    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
      active = false;
    };
    const tick = () => {
      cx += (targetX - cx) * 0.12;
      cy += (targetY - cy) * 0.12;
      const s = active ? scale : 1;
      inner.style.transform = `perspective(900px) rotateX(${cx.toFixed(
        2
      )}deg) rotateY(${cy.toFixed(2)}deg) scale(${s})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf);
      if (inner) inner.style.transform = "";
    };
  }, [max, scale]);

  return (
    <div ref={ref} className={className} style={{ perspective: 900 }}>
      <div data-tilt-inner style={{ transformStyle: "preserve-3d", transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}>
        {children}
      </div>
    </div>
  );
}
