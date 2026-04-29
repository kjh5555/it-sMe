"use client";

import { forwardRef } from "react";
import { Reveal } from "../scroll/Reveal";
import { MagneticButton } from "../scroll/MagneticButton";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

const LINKS = [
  {
    label: "이메일 보내기",
    sub: "s650422@gmail.com",
    href: "mailto:s650422@gmail.com",
    icon: Mail,
    accent: "hsl(var(--accent-cyan))",
    primary: true,
    asAnchor: true,
    external: false,
  },
  {
    label: "GitHub",
    sub: "github.com/kjh5555",
    href: "https://github.com/kjh5555",
    icon: Github,
    accent: "hsl(var(--accent-iris))",
    asAnchor: true,
    external: true,
  },
  {
    label: "LinkedIn",
    sub: "프로필 확인하기",
    href: "#",
    icon: Linkedin,
    accent: "hsl(var(--accent-coral))",
    asAnchor: false,
    external: false,
  },
] as const;

export const ContactSection = forwardRef<HTMLElement>(function ContactSection(_, ref) {
  return (
    <section
      id="contact"
      ref={ref}
      className="relative overflow-hidden py-32 md:py-44"
    >
      {/* Glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[80%]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, hsl(var(--accent-iris) / 0.18) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4">
        <Reveal className="mx-auto max-w-4xl text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-[hsl(var(--accent-coral))]">
            ◆ Contact · 04
          </div>
          <h2 className="text-[clamp(2.5rem,8vw,7rem)] font-black leading-[0.95] tracking-tight">
            <span className="text-foreground">Let&apos;s build </span>
            <span className="text-gradient-coral italic">something</span>
            <span className="text-foreground">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            프로젝트 협업이나 채용 관련 문의를 환영합니다. 언제든지 편하게
            연락해주세요.
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          {LINKS.map((link) => {
            const Icon = link.icon;
            const isPrimary = "primary" in link && link.primary;
            const baseClassName = `group relative block w-full overflow-hidden rounded-2xl border p-6 text-left transition-all ${
              isPrimary
                ? "border-transparent bg-foreground text-background hover:bg-[hsl(var(--accent-cyan))] hover:text-[hsl(var(--ink))]"
                : "border-[hsl(var(--ink)/0.15)] bg-card hover:border-transparent"
            }`;

            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{
                      background: isPrimary
                        ? "hsl(var(--background) / 0.15)"
                        : `${link.accent}24`,
                      color: isPrimary ? "currentColor" : link.accent,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 opacity-50 transition-all group-hover:rotate-12 group-hover:opacity-100" />
                </div>
                <div className="mt-8">
                  <div className="text-lg font-bold tracking-tight">{link.label}</div>
                  <div className="mt-1 truncate font-mono text-xs uppercase tracking-widest opacity-70">
                    {link.sub}
                  </div>
                </div>
                {!isPrimary && (
                  <div
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: link.accent }}
                  />
                )}
              </>
            );

            if (link.asAnchor) {
              return (
                <MagneticButton
                  key={link.label}
                  as="a"
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  strength={8}
                  className={baseClassName}
                >
                  {inner}
                </MagneticButton>
              );
            }

            return (
              <MagneticButton
                key={link.label}
                strength={8}
                className={baseClassName}
              >
                {inner}
              </MagneticButton>
            );
          })}
        </div>

        {/* Footer line */}
        <div className="mx-auto mt-24 flex max-w-4xl flex-col items-center justify-between gap-3 border-t border-[hsl(var(--ink)/0.1)] pt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} 김재현 · All rights reserved</span>
          <span>Crafted with care · Seoul</span>
        </div>
      </div>
    </section>
  );
});
