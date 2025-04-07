"use client"

import { useState, useRef } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ProjectCard } from "./ProjectCard"
import { ProjectDialog } from "./ProjectDialog"

const PROJECTS = [
  {
    title: "AI 이미지 생성기",
    description: "DALL-E API를 활용한 이미지 생성 서비스",
    longDescription: "자연어로 원하는 이미지를 생성하고 편집할 수 있는 웹 서비스입니다. React와 OpenAI API를 활용하여 구현했습니다. 사용자는 자연어로 원하는 이미지를 설명하면, AI가 이를 분석하여 적절한 이미지를 생성합니다.",
    badges: ["AI", "React"],
    featured: true,
    githubUrl: "https://github.com/yourusername/ai-image-generator",
    demoUrl: "https://ai-image-generator.demo.com",
    techStack: ["React", "TypeScript", "OpenAI API", "Tailwind CSS", "Next.js"],
    timeline: "2023.09 - 2023.12 (4개월)",
    role: "프론트엔드 개발 리드 & AI 통합 담당",
    challenges: [
      "DALL-E API의 응답 시간이 길어 사용자 경험이 저하되는 문제가 있었습니다. 이를 해결하기 위해 로딩 상태에서 이미지 생성 과정을 시각화하고, 생성 중간 결과를 실시간으로 보여주는 기능을 구현했습니다.",
      "이미지 생성 프롬프트의 품질이 결과물에 큰 영향을 미쳤습니다. GPT-4를 활용하여 사용자의 입력을 최적화된 프롬프트로 변환하는 프롬프트 개선 시스템을 도입했습니다.",
      "생성된 이미지의 후처리 요구사항이 많았습니다. Canvas API를 활용한 이미지 편집 기능을 추가하여 사용자가 직접 이미지를 수정할 수 있도록 했습니다."
    ],
    achievements: [
      "월간 활성 사용자 5,000명 달성",
      "평균 이미지 생성 시간 20% 단축",
      "사용자 만족도 조사에서 90점 이상 획득",
      "GitHub 스타 500개 이상 획득"
    ],
    images: [
      {
        url: "/projects/ai-image-generator/dashboard.png",
        caption: "메인 대시보드 - 이미지 생성 인터페이스"
      },
      {
        url: "/projects/ai-image-generator/gallery.png",
        caption: "생성된 이미지 갤러리 뷰"
      }
    ],
    imageUrl: "/images/ai-image-generator.jpg"
  },
  {
    title: "포트폴리오 웹사이트",
    description: "Next.js와 Tailwind CSS로 구현한 반응형 포트폴리오",
    longDescription: "모던한 UI/UX를 적용한 개인 포트폴리오 웹사이트입니다. 다크 모드와 반응형 디자인을 지원하며, 프로젝트 갤러리와 기술 스택을 효과적으로 보여줍니다.",
    badges: ["Next.js", "TypeScript"],
    featured: false,
    githubUrl: "https://github.com/yourusername/portfolio",
    demoUrl: "https://your-portfolio.com",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    timeline: "2024.01 - 2024.02 (2개월)",
    role: "개인 프로젝트 (디자인 및 개발)",
    challenges: [
      "페이지 로딩 성능 최적화가 필요했습니다. Next.js의 Image 컴포넌트와 동적 임포트를 활용하여 초기 로딩 시간을 50% 단축했습니다.",
      "다양한 애니메이션 효과를 구현하면서 성능 저하가 발생했습니다. Framer Motion의 LazyMotion을 도입하여 애니메이션 번들 크기를 최적화했습니다."
    ],
    achievements: [
      "Lighthouse 성능 점수 95점 이상 달성",
      "GitHub 프로필 README에서 높은 호응",
      "여러 개발자 커뮤니티에서 디자인 레퍼런스로 공유됨"
    ],
    images: [
      {
        url: "/projects/portfolio/main.png",
        caption: "메인 페이지 - 다크 모드 지원"
      },
      {
        url: "/projects/portfolio/projects.png",
        caption: "프로젝트 갤러리 섹션"
      }
    ],
    imageUrl: "/images/portfolio-website.jpg"
  },
  {
    title: "AI 챗봇 API",
    description: "GPT 기반의 커스텀 챗봇 백엔드 API",
    longDescription: "FastAPI로 구현한 고성능 챗봇 API 서버입니다. 맞춤형 프롬프트와 컨텍스트 관리를 지원하며, 다양한 도메인에 적용 가능한 유연한 구조를 가지고 있습니다.",
    badges: ["Python", "FastAPI"],
    featured: false,
    githubUrl: "https://github.com/yourusername/chatbot-api",
    techStack: ["Python", "FastAPI", "OpenAI", "PostgreSQL", "Docker"],
    timeline: "2023.06 - 2023.08 (3개월)",
    role: "백엔드 개발 & DevOps 담당",
    challenges: [
      "대화 컨텍스트 관리에서 메모리 사용량이 증가하는 문제가 있었습니다. Redis를 도입하여 컨텍스트 캐싱 시스템을 구현했습니다.",
      "다중 사용자 환경에서 API 응답 시간이 느려지는 문제가 있었습니다. 비동기 처리와 커넥션 풀링을 최적화하여 처리량을 3배 향상시켰습니다."
    ],
    achievements: [
      "초당 100개 이상의 동시 요청 처리 달성",
      "평균 응답 시간 300ms 이하 유지",
      "여러 기업에서 도입하여 실제 서비스에 활용 중"
    ],
    images: [
      {
        url: "/projects/chatbot-api/architecture.png",
        caption: "시스템 아키텍처 다이어그램"
      },
      {
        url: "/projects/chatbot-api/monitoring.png",
        caption: "실시간 성능 모니터링 대시보드"
      }
    ],
    imageUrl: "/images/ai-chatbot-api.jpg"
  },
]

export function ProjectSection() {
  const [selectedProject, setSelectedProject] = useState<typeof PROJECTS[0] | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement | null>(null)

  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">주요 프로젝트</h2>
      <div className="relative">
        <ScrollArea ref={scrollAreaRef} className="w-full rounded-md border">
          <div className="flex space-x-4 p-4">
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onViewDetails={() => {
                  setSelectedProject(project)
                  setDialogOpen(true)
                }}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      <ProjectDialog
        project={selectedProject}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  )
} 