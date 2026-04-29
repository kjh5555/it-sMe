"use client";

import {
  forwardRef,
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";

interface MagneticBaseProps {
  children: ReactNode;
  strength?: number;
}

type MagneticButtonProps = MagneticBaseProps & { as?: "button" } & Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "ref"
  >;

type MagneticAnchorProps = MagneticBaseProps & { as: "a" } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "ref"
  >;

type MagneticProps = MagneticButtonProps | MagneticAnchorProps;

function useMagneticEffect(
  innerRef: React.RefObject<HTMLElement | null>,
  strength: number
) {
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      targetX = dx * strength;
      targetY = dy * strength;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf);
      el.style.transform = "";
    };
  }, [innerRef, strength]);
}

/**
 * Wraps any clickable element with a subtle magnetic / 3D-tilt response
 * that follows the mouse. No-ops when prefers-reduced-motion is set
 * and on touch-only devices.
 *
 * Supports `as="a"` to render an anchor tag (accepts href, target, rel, etc.)
 * instead of the default `<button>`.
 */
export const MagneticButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MagneticProps
>(function MagneticButton({ children, strength = 18, className, ...rest }, forwardedRef) {
  const innerRef = useRef<HTMLElement | null>(null);

  useMagneticEffect(innerRef, strength);

  const setRef = (node: HTMLElement | null) => {
    innerRef.current = node;
    if (typeof forwardedRef === "function") {
      forwardedRef(node as HTMLButtonElement & HTMLAnchorElement);
    } else if (forwardedRef) {
      (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  };

  if ((rest as MagneticAnchorProps).as === "a") {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { as: _, ...anchorRest } = rest as MagneticAnchorProps;
    return (
      <a
        ref={setRef as React.Ref<HTMLAnchorElement>}
        className={className}
        {...anchorRest}
      >
        {children}
      </a>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: _, ...buttonRest } = rest as MagneticButtonProps;
  return (
    <button
      ref={setRef as React.Ref<HTMLButtonElement>}
      className={className}
      {...buttonRest}
    >
      {children}
    </button>
  );
});
