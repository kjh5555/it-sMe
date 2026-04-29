"use client";

import { forwardRef } from "react";
import { ProjectSection } from "../projects/ProjectSection";
import { Reveal } from "../scroll/Reveal";

export const ProjectsWrapper = forwardRef<HTMLElement>(function ProjectsWrapper(_, ref) {
  return (
    <section
      id="projects"
      ref={ref}
      className="relative overflow-x-clip py-32 md:py-40"
    >
      <div className="container mx-auto px-4">
        <Reveal className="mb-20 flex flex-col items-start gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 font-mono text-xs uppercase tracking-[0.4em] text-[hsl(var(--accent-coral))]">
              ◆ Projects · 03
            </div>
            <h2 className="text-5xl font-black leading-none tracking-tight md:text-7xl">
              <span className="text-gradient-iris">Selected</span>{" "}
              <span className="text-foreground">Works</span>
            </h2>
          </div>
          <p className="max-w-md text-base text-muted-foreground md:text-right">
            드래그, 화살표, 또는 인디케이터로 카드를 탐색하세요. 활성 카드를 클릭하면 상세
            정보가 열립니다.
          </p>
        </Reveal>

        <ProjectSection />
      </div>
    </section>
  );
});
