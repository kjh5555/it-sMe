"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

interface ProjectDialogProps {
  project: {
    title: string
    description: string
    longDescription: string
    badges: string[]
    featured?: boolean
    githubUrl?: string
    demoUrl?: string
    techStack: string[]
    timeline?: string
    role?: string
    challenges?: string[]
    achievements?: string[]
    images?: {
      url: string
      caption: string
    }[]
  } | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProjectDialog({ project, open, onOpenChange }: ProjectDialogProps) {
  if (!project) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            {project.featured && <Badge>Featured</Badge>}
            {project.badges.map((badge) => (
              <Badge key={badge} variant="outline">
                {badge}
              </Badge>
            ))}
          </div>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <DialogDescription className="text-lg">{project.description}</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="technical">기술 상세</TabsTrigger>
            <TabsTrigger value="achievements">성과</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div>
              <h4 className="text-lg font-medium mb-2">프로젝트 설명</h4>
              <p className="text-muted-foreground">
                {project.longDescription}
              </p>
            </div>
            {project.timeline && (
              <div>
                <h4 className="text-lg font-medium mb-2">진행 기간</h4>
                <p className="text-muted-foreground">{project.timeline}</p>
              </div>
            )}
            {project.role && (
              <div>
                <h4 className="text-lg font-medium mb-2">담당 역할</h4>
                <p className="text-muted-foreground">{project.role}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="technical" className="space-y-4 mt-4">
            <div>
              <h4 className="text-lg font-medium mb-2">기술 스택</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            {project.challenges && (
              <div>
                <h4 className="text-lg font-medium mb-2">기술적 도전과 해결</h4>
                <div className="space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        {challenge}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4 mt-4">
            {project.achievements && (
              <div>
                <h4 className="text-lg font-medium mb-2">주요 성과</h4>
                <div className="space-y-2">
                  {project.achievements.map((achievement, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        {achievement}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            {project.images && (
              <div>
                <h4 className="text-lg font-medium mb-2">스크린샷</h4>
                <div className="grid grid-cols-2 gap-4">
                  {project.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="rounded-lg w-full h-auto"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-sm">
                        {image.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          {project.demoUrl && (
            <Button asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                데모 보기
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 