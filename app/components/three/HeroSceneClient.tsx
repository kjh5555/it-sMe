"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

interface HeroSceneClientProps {
  className?: string;
}

/**
 * Decides whether to mount the WebGL hero scene or the lightweight
 * CSS fallback. Disables R3F entirely on viewport <768px and when
 * prefers-reduced-motion is set.
 */
export function HeroSceneClient({ className }: HeroSceneClientProps) {
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const evaluate = () => {
      setShouldRender3D(mql.matches && !reduce);
    };
    evaluate();

    const onChange = () => evaluate();
    mql.addEventListener("change", onChange);
    return () => {
      mql.removeEventListener("change", onChange);
    };
  }, []);

  if (!shouldRender3D) {
    return <CssFallback className={className} />;
  }

  return <HeroScene className={className} />;
}

function CssFallback({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-[60vw] w-[60vw] max-h-[640px] max-w-[640px] rounded-full bg-[radial-gradient(circle_at_30%_30%,hsl(var(--accent-iris)/0.55),transparent_60%)] blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-32 h-[55vw] w-[55vw] max-h-[560px] max-w-[560px] rounded-full bg-[radial-gradient(circle_at_70%_30%,hsl(var(--accent-cyan)/0.55),transparent_60%)] blur-3xl animate-blob [animation-delay:-6s]" />
        <div className="absolute bottom-0 left-1/3 h-[45vw] w-[45vw] max-h-[480px] max-w-[480px] rounded-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent-coral)/0.45),transparent_60%)] blur-3xl animate-blob [animation-delay:-12s]" />
      </div>
    </div>
  );
}
