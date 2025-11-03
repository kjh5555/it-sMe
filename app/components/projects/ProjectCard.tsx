"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    longDescription: string
    badges: string[]
    featured?: boolean
    githubUrl?: string
    demoUrl?: string
    techStack: string[]
    imageUrl: string
  }
  onViewDetails: () => void
}

export function ProjectCard({ project, onViewDetails }: ProjectCardProps) {
  return (
    <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur border-slate-200 dark:border-slate-700 hover:border-purple-500/50 dark:hover:border-purple-400/50 transition-colors shadow-lg w-[500px] relative z-0">
      <img src={project.imageUrl} alt={project.title} className="w-full h-48 object-cover rounded-t-lg relative z-0" />
      <CardHeader>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          {project.featured && <Badge>Featured</Badge>}
          {project.badges.map((badge) => (
            <Badge key={badge} variant="outline">
              {badge}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-slate-800 dark:text-slate-200">{project.title}</CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {project.longDescription}
        </p>
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            자세히 보기
          </Button>
          {project.featured && project.demoUrl && (
            <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700 transition-colors" asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                Demo
              </a>
            </Button>
          )}
          {!project.featured && project.githubUrl && (
            <Button variant="ghost" size="sm" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                GitHub
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 