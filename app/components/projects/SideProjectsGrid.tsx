"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "../scroll/TiltCard";
import { Reveal, StaggerGroup, StaggerItem } from "../scroll/Reveal";
import { Github, ExternalLink } from "lucide-react";
import type { Project } from "./types";

interface SideProjectsGridProps {
  projects: Project[];
  onOpenDetails: (project: Project) => void;
}

export function SideProjectsGrid({ projects, onOpenDetails }: SideProjectsGridProps) {
  return (
    <StaggerGroup className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
      {projects.map((project, i) => (
        <StaggerItem key={`${project.title}-${i}`}>
          <TiltCard className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[hsl(var(--ink)/0.1)] bg-card shadow-lg transition-all hover:border-[hsl(var(--accent-iris)/0.6)] hover:shadow-[0_20px_50px_-12px_hsl(var(--accent-iris)/0.4)]">
              {/* Cover */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                <div className="absolute right-4 top-4 flex gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="GitHub 저장소 열기"
                      className="rounded-full bg-background/85 p-2 text-foreground backdrop-blur-sm transition hover:bg-[hsl(var(--accent-cyan))] hover:text-[hsl(var(--ink))]"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      aria-label="데모 열기"
                      className="rounded-full bg-background/85 p-2 text-foreground backdrop-blur-sm transition hover:bg-[hsl(var(--accent-cyan))] hover:text-[hsl(var(--ink))]"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.badges.slice(0, 5).map((b) => (
                    <Badge
                      key={b}
                      variant="outline"
                      className="border-[hsl(var(--accent-coral)/0.5)] text-[10px] uppercase tracking-wider text-[hsl(var(--accent-coral))]"
                    >
                      {b}
                    </Badge>
                  ))}
                </div>

                <div className="mt-auto pt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenDetails(project)}
                    className="w-full justify-between border-[hsl(var(--ink)/0.15)] hover:border-[hsl(var(--accent-iris))] hover:text-[hsl(var(--accent-iris))]"
                  >
                    자세히 보기
                    <span aria-hidden>→</span>
                  </Button>
                </div>
              </div>
            </article>
          </TiltCard>
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}

// Suppress unused-import warning when Reveal is not directly used; keep export-friendly module.
export { Reveal };
