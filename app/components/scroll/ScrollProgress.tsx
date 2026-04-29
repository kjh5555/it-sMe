"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Top-of-viewport scroll progress bar — accent gradient.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-[hsl(var(--accent-cyan))] via-[hsl(var(--accent-iris))] to-[hsl(var(--accent-coral))]"
    />
  );
}
