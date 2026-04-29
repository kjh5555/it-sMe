"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { ScrollProgress } from "./scroll/ScrollProgress";

interface NavigationProps {
  onScrollTo: (section: string) => void;
}

const NAV_ITEMS: Array<{ label: string; section: string }> = [
  { label: "소개", section: "hero" },
  { label: "이력", section: "resume" },
  { label: "기술", section: "skills" },
  { label: "프로젝트", section: "projects" },
  { label: "연락", section: "contact" },
];

export function Navigation({ onScrollTo }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("hero");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.section);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgress />
      <nav
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
          scrolled ? "glass py-3" : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              onClick={() => onScrollTo("hero")}
              className="group flex items-center gap-2 outline-none"
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--accent-cyan))] via-[hsl(var(--accent-iris))] to-[hsl(var(--accent-coral))] text-[11px] font-black text-[hsl(var(--ink))]">
                <span className="absolute inset-[2px] rounded-full bg-background" aria-hidden />
                <span className="relative">JH</span>
              </span>
              <span className="font-mono text-sm font-semibold tracking-widest text-foreground">
                kjh<span className="text-[hsl(var(--accent-cyan))]">.</span>dev
              </span>
            </button>

            {/* Section links */}
            <div className="hidden items-center gap-1 md:flex">
              {NAV_ITEMS.map((item) => {
                const isActive = active === item.section;
                return (
                  <button
                    key={item.section}
                    onClick={() => onScrollTo(item.section)}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded-full bg-[hsl(var(--ink)/0.06)] dark:bg-[hsl(var(--accent-cyan)/0.12)]"
                        aria-hidden
                      />
                    )}
                    <span className="relative">{item.label}</span>
                    {isActive && (
                      <span
                        className="absolute -bottom-0.5 left-1/2 h-[3px] w-1 -translate-x-1/2 rounded-full bg-[hsl(var(--accent-cyan))]"
                        aria-hidden
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9 rounded-full"
                aria-label="Toggle theme"
              >
                {mounted ? (
                  theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                onClick={() => onScrollTo("contact")}
                className="hidden rounded-full bg-foreground px-5 text-background hover:bg-[hsl(var(--accent-cyan))] hover:text-[hsl(var(--ink))] sm:inline-flex"
              >
                연락하기 →
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
