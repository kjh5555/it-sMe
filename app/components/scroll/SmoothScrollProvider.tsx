"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * Wraps the app in a Lenis smooth-scroll instance and syncs it with GSAP
 * ScrollTrigger so pinning + parallax stay in lockstep with the smoothed
 * scroll position. Honors prefers-reduced-motion: when set, Lenis is not
 * activated and native scrolling is used.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduce) {
      // Honor user preference — keep native scroll.
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    document.documentElement.classList.add("lenis-smooth");

    const onLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onLenisScroll);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onLenisScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis-smooth");
    };
  }, []);

  return <>{children}</>;
}

/**
 * Imperatively scroll to a section by id while honoring Lenis if present.
 * Falls back to native scroll for reduced-motion users.
 */
export function scrollToId(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  // Lenis exposes itself on window in its plugin pattern, but we keep a simple
  // native fallback that still works smoothly on modern browsers.
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
