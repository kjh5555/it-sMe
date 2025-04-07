"use client"

import { useState, useRef } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ProjectCard } from "./ProjectCard"
import { ProjectDialog } from "./ProjectDialog"

const PROJECTS = [
  {
    title: "하나은행 AICC 프로젝트 개발",
    description: "하나은행 대고객 서비스 챗봇 고도화 개발 참여",
    longDescription: "하나은행의 기존 챗봇 서비스를 AI와 접목하여 고도화 개발 MindWareWorks소속으로 참여하였습니다. Dialogflow를 활용하여 Intent에 따른 최적화된 시나리오를 개발하고 restAPI를 활용하여 이체성 서비스를 구현 및 Intent에 따른 학습데이터 분류하였습니다",
    badges: ["ML", "JavaScript", "restAPI","MongoDB"],
    featured: true,
    // githubUrl: "https://github.com/yourusername/ai-image-generator",
    demoUrl: "https://haitalk.kebhana.com/aicc/views/index.do?projectId=9d8ba989-4878-42ad-9546-4def008cab98",
    techStack: ["JavaScript", "restAPI", "CSS", "Node.js", "MongoDB", "Google Dialogflow"],
    timeline: "2021.12 - 2022.12 (12개월)",
    role: "프론트엔드 개발 참여 & 시나리오 개발 및 담당",
    challenges: [
      "ML모델의 학습 데이터 관리하여 Intent 분류 정확도 향상",
      "Dialogflow 시나리오 개발 및 테스트 환경 구축",
      "NLP의 Intent 및 Entity분류 및 시나리오 구현."
    ],
    achievements: [
      "기존 하나은행의 600여개의 답변에서 2000개의 답변으로 시나리오 확장",
      "이체성 거래 즉시이체, 환전, 거래내역조회등 개인화 서비스 시나리오 개발",
      "2022년 하나은행 챗봇 서비스 정식 서비스 런칭"
    ],
    imageUrl: "/hai1.jpeg"
  },
  {
    title: "하나은행 AICC 프로젝트 개인 & 기업 챗봇 운영",
    description: "하나은행 대고객&기업 서비스 챗봇 운영 업무",
    longDescription: "하나은행 앱, 웹 개인 & 기업 챗봇 개발 및 운영 모니터링 및 유지보수 앱과 웹에 대한 접근성 개선 요청에 따른 UI개선 기존 서비스에 장애대응 및 주기적인 배포로 장애 대응",
    badges: ["ML", "JavaScript", "restAPI","MongoDB","Dialogflow","Node.js","Docker",'Kubernetes'],
    featured: true,
    // githubUrl: "https://github.com/yourusername/ai-image-generator",
    demoUrl: "https://haitalk.kebhana.com/aicc/views/index.do?projectId=9d8ba989-4878-42ad-9546-4def008cab98",
    techStack: ["ML", "JavaScript", "restAPI","MongoDB","Dialogflow","Node.js","Docker",'Kubernetes'],
    timeline: "2022.1 ~ 현재 (30개월)",
    role: "하나은행 개인챗봇 web,app 개발 및 운영 모니터링 및 유지보수와 기업챗봇 개발 및 운영과 Frontend 개발",
    challenges: [
      "시나리오 에러 모니터링 및 장애 개선",
      "하나은행 고객 챗봇 전반적인 담당",
      "새로운 시나리오 및 UI, 웹접근성, 보안 전반적인 유지보수"
    ],
    achievements: [
      "3년간 하나은행 챗봇 서비스 정상 운영 및 금융사고 예방",
      "2000개의 시나리오 -> 2600개의 시나리오 확장",
      "개인 챗봇 추가 개발 및 기업 챗봇 개발 및 운영"
    ],
    imageUrl: "/hai.png"
  },
  {
    title: "PARAMOS(RAG) 프로젝트 개발",
    description: "RAG 기반의 기업형 챗봇 서비스 개발",
    longDescription: "RAG를 활용한 문서기반 답변을 제공하는 기업형 챗봇 서비스 개발 collection이라는 문서를 Embbeding한 데이터를 Category라는 프롬프트와 LLM을 선택하여 맵핑하여 채팅화면에서 Collection과 맵핑된 Category를 선택하여 답변을 제공하는 기업형 챗봇 서비스 입니다.",
    badges: ["AI", "HuggingFace", "Python","FastAPI","MySQL","vue.js","LLM","RAG"],
    featured: true,
    // githubUrl: "https://github.com/yourusername/ai-image-generator",
    demoUrl: "http://110.9.117.10:8501/#/login",
    techStack: ["AI", "HuggingFace", "Python","FastAPI","MySQL","vue.js","LLM","RAG"],
    timeline: "2024.09 - 2025.03 (6개월)",
    role: "프론트엔드 & AI 개발 참여",
    challenges: [
      "PDF로더 및 PDF 내 이미지&테이블 추출하여 요약하여 데이터 질 향상 후 MarkDown 형식으로 저장",
      "Spliter를 통해 Chunking 및 데이터 정제 후 Faiss & ChromaDB에 저장",
      "openAI Embedding 모델과 HuggingFace의 Embedding 모델을 활용하여 데이터 임베딩",
      "앙상블 retriever를 통해 보다 사용자 질문의 가장 맞는 답변을 제공",
      "Vue.js를 활용하여 프론트엔드 개발, AG-Grid를 활용하여 데이터 시각화, 권한 관리 및 데이터 조회 화면 개발"
    ],
    achievements: [
      "테이블과 이미지요약을 통한 답변의 정확도 향상",
      "LangChain을 활용하여 특정 값 이하의 답변은 다시 Retriever를 진행하여 보다 높은 답변의 결과를 추출하여 답변 정확도 향상",
      "문서기반의 정확한 답변 제공가능"
    ],
    imageUrl: "/ragImg.jpeg"
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

const MAIN_PROJECTS = PROJECTS.filter(project => project.featured);
const SIDE_PROJECTS = PROJECTS.filter(project => !project.featured);

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
            {MAIN_PROJECTS.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${index}`}
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

      <h2 className="text-3xl font-bold text-center mb-10 mt-20">사이드 프로젝트</h2>
      <div className="relative">
        <ScrollArea ref={scrollAreaRef} className="w-full rounded-md border">
          <div className="flex space-x-4 p-4">
            {SIDE_PROJECTS.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${index}`}
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