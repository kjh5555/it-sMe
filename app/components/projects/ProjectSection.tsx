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
    longDescription: "RAG를 활용한 문서기반 답변을 제공하는 기업형 챗봇 서비스 개발 collection이라는 문서를 Embbeding한 데이터를 담은 Store를 Category라는 프롬프트와 LLM을 선택하여 맵핑하여 채팅화면에서 Collection과 맵핑된 Category를 선택하여 답변을 제공하는 기업형 챗봇 서비스 입니다.",
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
    title: "MCP 번역 사이트",
    description: "Smithery MCP Store가 전부 영어로 되어있어 한글 버전으로 바꾼 사이트",
    longDescription: "스미더리 MCP Store가 전부 영어로 되어있어 영어를 못하는 사람들을 위해 한글 버전으로 바꾼 사이트 입니다. 스미더리에서 API를 통해 데이터를 가져오고 각 데이터의 설명을 LLM을 통해 번역하여 화면에 다시 그려주는 사이트 입니다.",
    badges: ["Next.js", "TypeScript","openAI","LLM","GPT","Python","FastAPI"],
    featured: false,
    githubUrl: "https://github.com/kjh5555/MCP-korean",
    demoUrl: "https://mcp-korean-cj0pvj3a1-jaehyeonkims-projects.vercel.app/",
    techStack: ["Next.js", "TypeScript","openAI","LLM","GPT","Python","FastAPI"],
    timeline: "2024.04 - 2024.04 (1개월)",
    role: "개인 프로젝트 (디자인 및 개발)",
    challenges: [
      "LLM의 응답을 배치성을 통해 한번에 호출하고 무한 스크롤로 분배.",
      "중복된 번역을 최소화 하기위해 cache로 중복 번역을 최소화 시켰습니다."
    ],
    achievements: [
      "한글 번역을 통해 UI가 나아짐",
    ],
    imageUrl: "/mcp.png"
  },
  {
    title: "webRTC를 활용한 화상 채팅방",
    description: "webRTC를 활용한 채팅 서비스 구현",
    longDescription: "채팅방목록 채팅방생성, 화상채팅, 사용자끼리 파일공유 등 기능을 구현한 채팅 서비스 입니다.",
    badges: ["Vue.js 3 ", "Socket.IO Client","PeerJS","Node.js","Express"],
    featured: false,
    githubUrl: "https://github.com/kjh5555/vibe",
    techStack: ["Vue.js 3 ", "Socket.IO Client","PeerJS","Node.js","Express"],
    timeline: "2024.04 - 2024.04 (1개월)",
    role: "개인 프로젝트 (VIBE코딩)",
    challenges: [
      "MCP와 VibeCoading으로 화상채팅 서비스 구현.",
      "기존 화상채팅 서비스의 기능 Clone코딩."
    ],
    achievements: [
      "사용자 인증",
      "채팅방 관리",
      "실시간 채팅"
    ],
    imageUrl: "/webchat.png"
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