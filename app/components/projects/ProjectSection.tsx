"use client";

import { useState } from "react";
import { ProjectDialog } from "./ProjectDialog";
import { ProjectStack3D } from "./ProjectStack3D";
import { SideProjectsGrid } from "./SideProjectsGrid";
import { Reveal } from "../scroll/Reveal";
import type { Project } from "./types";

const PROJECTS: Project[] = [
  {
    title: "내 아이디가 여기에? — 토스 미니앱",
    description:
      "사용자명 기반으로 200+ 소셜 플랫폼에서 동일 계정을 찾아주는 토스(Apps in Toss) 미니앱",
    longDescription:
      "‘내 아이디가 여기에?’는 단일 사용자명으로 200여 개 이상의 소셜 네트워크에서 동일 계정을 검색해주는 오픈소스 OSINT 도구 Sherlock을 기반으로 토스(Apps in Toss) 슈퍼앱 안에서 실행되도록 포팅한 미니앱입니다. React 18 + Vite로 프론트엔드를 구축하고 @apps-in-toss/web-framework SDK를 통해 토스 네이티브 기능과 연동했으며, 기존 Sherlock 코어 로직을 FastAPI 백엔드로 래핑하여 Railway에 배포했습니다. 토스 앱 사용자는 별도 설치 없이 ‘내 아이디가 여기에?’ 미니앱을 통해 자신의 사용자명이 어떤 소셜 서비스에 등록되어 있는지 한 번에 확인할 수 있으며, 2026년 4월 정식 출시 후 안정적인 일일 활성 사용자(DAU)를 확보하며 실서비스로 운영되고 있습니다.",
    badges: ["Apps in Toss", "React", "Vite", "TypeScript", "OSINT", "Python", "FastAPI"],
    featured: true,
    githubUrl: "https://github.com/kjh5555/my-footprint",
    techStack: [
      "@apps-in-toss/web-framework",
      "React 18",
      "Vite",
      "TypeScript",
      "Python",
      "FastAPI",
      "Railway",
      "Docker",
    ],
    timeline: "2026.04 정식 출시 · 운영 중",
    role: "토스 미니앱 프론트엔드 개발, 백엔드 API 구축, Apps in Toss SDK 연동, 배포 및 운영",
    challenges: [
      "Python CLI 기반의 Sherlock 코어 로직을 웹 환경에서 실행 가능하도록 FastAPI 비동기 API로 래핑하면서 200+ 사이트 병렬 검색의 응답 시간을 최적화하는 것이 까다로웠습니다.",
      "Apps in Toss 플랫폼은 일반 웹 환경과 다른 보안/렌더링 제약이 있어, 토스 SDK API와 호환되도록 라우팅과 상태 관리 패턴을 재설계해야 했습니다.",
      "토스 앱 심사 가이드라인에 맞춰 OSINT 도구의 UX를 단순화하고, 결과 노출 방식을 사용자 친화적으로 정제했습니다.",
    ],
    achievements: [
      "Sherlock OSINT 엔진을 토스 슈퍼앱 안에서 작동하는 미니앱으로 성공적으로 이식했습니다.",
      "토스 사용자가 별도 앱 설치 없이 사용자명만으로 200+ 소셜 플랫폼을 동시에 검색하는 경험을 제공합니다.",
      "Railway 기반 무중단 배포 파이프라인을 구축하여 안정적인 운영 환경을 확보했습니다.",
      "2026년 4월 정식 출시 후 첫 20일간 일평균 약 18명의 활성 사용자(DAU)를 기록했으며, 일일 최대 27명·누적 370+ 활성 세션을 달성하며 실서비스로 안정 운영 중입니다.",
    ],
    imageUrl: "/sherlock.png",
  },
  {
    title: "PageIndex — 한국어 RAG 문서 챗봇",
    description:
      "PDF를 트리 구조로 시각화하고 RAG 챗봇으로 질의하는 한국어 문서 처리 시스템",
    longDescription:
      "VectifyAI의 PageIndex(Vectorless Reasoning-based RAG)를 기반으로, 한국어 PDF 문서 처리에 최적화된 풀스택 RAG 서비스를 구축했습니다. Next.js 16 + React 19로 PDF 뷰어, 트리 구조 시각화, 채팅 패널을 구현했고, FastAPI 백엔드에서 Google Gemini 2.5 Flash를 사용하여 문서를 트리 형태로 인덱싱한 뒤 SSE 스트리밍으로 실시간 트리 빌딩 애니메이션을 제공합니다. 한국어 PDF 추출 안정성을 위해 PyPDF2 → PyMuPDF로 교체했고, Gemini 토큰 계산을 글자 수 기반으로 추정해 API 호출을 최소화했습니다.",
    badges: ["Next.js 16", "React 19", "FastAPI", "Gemini API", "RAG", "PDF", "Korean"],
    featured: true,
    githubUrl: "https://github.com/kjh5555/pageIndexTest",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "FastAPI",
      "Python",
      "Google Gemini 2.5",
      "PyMuPDF",
      "SSE Streaming",
      "react-pdf",
    ],
    timeline: "2025 - 현재",
    role: "프로젝트 기획 및 한국어 처리 커스터마이징, Next.js 프론트엔드 개발, FastAPI 백엔드 개발, Gemini API 연동, PDF 캐싱 시스템 구현",
    challenges: [
      "원본 PageIndex의 PyPDF2가 한글 PDF에서 텍스트 추출 누락이 잦아, 안정성이 더 좋은 PyMuPDF로 교체하고 한국어 문서 인덱싱 정확도를 개선했습니다.",
      "Gemini 2.5 모델의 토큰 카운팅 API 호출이 대용량 문서에서 병목이 되어, 글자 수 기반 추정(`len(text) // 4`)으로 변경하여 처리 속도를 크게 향상시켰습니다.",
      "PDF 트리 빌딩이 비동기로 진행되는 동안 사용자가 진행 상황을 시각적으로 인지할 수 있도록 SSE 기반 실시간 스트리밍 UI를 설계했습니다.",
      "동일 PDF 재업로드 시 비용/시간을 절감하기 위해 `.pageindex_cache/` 기반 캐싱 시스템을 구현했습니다.",
    ],
    achievements: [
      "한국어 PDF 문서에 대해 안정적인 트리 인덱싱과 RAG 답변을 제공하는 풀스택 시스템을 완성했습니다.",
      "SSE 스트리밍으로 트리 빌딩 과정을 실시간 시각화하여 대기 시간 동안의 사용자 이탈을 줄였습니다.",
      "PDF 캐싱 시스템으로 동일 문서 재처리 시 즉시 로드가 가능하도록 하여 운영 비용과 응답 시간을 모두 절감했습니다.",
    ],
    imageUrl: "/pageindex.png",
  },
  {
    title: "TradingAgents — Multi-Agent LLM 트레이딩",
    description:
      "다중 에이전트 LLM 기반 금융 트레이딩 프레임워크에 Next.js 프론트엔드 + FastAPI 백엔드 추가",
    longDescription:
      "TauricResearch의 TradingAgents 멀티 에이전트 LLM 트레이딩 프레임워크를 기반으로, 펀더멘털 분석가·기술적 분석가·리스크 매니저·트레이더 등 전문 역할을 가진 LLM 에이전트들이 협업하여 매매 의사결정을 내리는 시스템에 웹 인터페이스와 API 서버를 추가했습니다. Next.js 15 + Zustand로 에이전트 토론 결과를 실시간으로 시각화하고, FastAPI 백엔드에서 GPT/Gemini/Claude/Grok 다중 LLM 프로바이더를 지원합니다. Railway 기반으로 배포되어 실제 서비스로 운영 중입니다.",
    badges: [
      "Next.js 15",
      "React 19",
      "FastAPI",
      "Multi-Agent LLM",
      "Zustand",
      "Railway",
    ],
    featured: true,
    demoUrl: "https://www.linkedai.co.kr",
    techStack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "Zustand",
      "react-markdown",
      "FastAPI",
      "Python",
      "Multi-LLM (GPT/Gemini/Claude/Grok)",
      "Railway",
    ],
    timeline: "2025 - 현재",
    role: "프레임워크 분석 및 웹 어댑터 설계, Next.js 프론트엔드 개발(에이전트 토론/리포트 시각화), FastAPI 백엔드 개발, 다중 LLM 프로바이더 통합, Railway 배포 및 운영",
    challenges: [
      "다수의 LLM 에이전트가 비동기로 협업하는 흐름을 사용자가 실시간으로 따라갈 수 있도록, 에이전트별 메시지 스트리밍과 단계 진행 상태를 Zustand 스토어로 동기화하는 설계가 까다로웠습니다.",
      "GPT-5/Gemini 3/Claude 4/Grok 4 등 서로 다른 SDK 인터페이스를 단일 API 엔드포인트로 추상화하면서 각 모델의 reasoning effort 등 고유 파라미터를 보존하는 어댑터 계층을 설계했습니다.",
      "장시간 실행되는 에이전트 토론 세션을 안정적으로 유지하기 위해 Railway 환경에 맞춘 헬스체크/재시작 정책과 로깅 인프라를 구성했습니다.",
    ],
    achievements: [
      "원본 CLI 전용 프레임워크에 웹 UI/API 레이어를 추가하여 비개발자도 멀티 에이전트 트레이딩을 시각적으로 사용할 수 있도록 했습니다.",
      "다중 LLM 프로바이더 추상화로 모델 단가/성능에 따른 자유로운 선택과 A/B 비교가 가능한 구조를 만들었습니다.",
      "Railway 기반 24/7 운영 환경을 구축하여 실서비스 트래픽을 안정적으로 처리하고 있습니다.",
    ],
    imageUrl: "/trading.png",
  },
  {
    title: "손안에 정치 (Hands on Policy)",
    description:
      "국회의원 재산·병역, 논쟁 중인 정치 이슈, 정부·국회 정책을 진영 편들지 않고 출처와 함께 모아두는 비영리 정치 투명성 플랫폼",
    longDescription:
      "‘손안에 정치’는 국회의원의 재산·병역을 공개 자료 그대로 조회하고, 논쟁 중인 정치 이슈를 진영을 편들지 않고 정리하며, 정부·국회가 실제로 내놓은 정책을 원문 그대로 모아두는 비영리 정치 투명성 플랫폼입니다. 어느 쪽이 옳은지는 판정하지 않고 모든 서술에 출처를 남기는 것을 핵심 원칙으로 삼아, '주장·사실 분리'와 '판정하지 않는 AI' 설계 원칙 아래 이슈 초안은 AI가 작성하되 사람이 검수한 뒤에만 게시합니다. pnpm 워크스페이스 모노레포로 Next.js 15(App Router) + Tailwind v4 프론트엔드와 Fastify 5 + Prisma 6 + PostgreSQL API/ingest 서버, 공유 DTO 타입 패키지를 구성했고, 열린국회정보 OpenAPI·공직자윤리위원회/newstapa 재산공개·행안부 관보 병역사항·정책브리핑·네이버 뉴스 검색 등 다중 데이터 소스를 통합했습니다.",
    badges: [
      "Next.js 15",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Turborepo",
      "TypeScript",
      "LLM Grounding",
      "정치 투명성",
    ],
    featured: true,
    demoUrl: "https://www.handspolitics.co.kr",
    techStack: [
      "Next.js 15 (App Router)",
      "React",
      "TypeScript",
      "Tailwind CSS 4",
      "Fastify 5",
      "Prisma 6",
      "PostgreSQL",
      "pnpm Workspaces",
      "Turborepo",
      "Vercel",
      "Railway",
      "LLM Grounding",
    ],
    timeline: "2026 - 현재",
    role:
      "프로젝트 기획 및 풀스택 개발 — Next.js 프론트엔드, Fastify/Prisma API·ingest 서버, PostgreSQL 스키마 설계, 다중 공공데이터 소스 통합, 이슈 초안 LLM grounding 파이프라인 설계, Vercel(웹)·Railway(API) 분리 배포 운영",
    challenges: [
      "정당·단체의 주장과 검증 가능한 사실을 뒤섞지 않도록, 이슈 상세 화면에서 찬반 두 컬럼을 항상 같은 형식·크기로 대비시키고 진영 프레이밍(좌/우) 없이 라벨만으로 구분하는 UI/데이터 모델을 설계해야 했습니다.",
      "AI가 작성한 이슈 초안이 어느 주장이 옳은지 판정하지 않으면서도 유용한 요약이 되도록, LLM grounding에 출처를 강제하고 사람 검수를 거쳐야만 게시되는 워크플로를 구축했습니다. LLM이 비활성화된 상태에서도 핵심 조회 기능은 정상 동작하도록 best-effort 아키텍처로 분리했습니다.",
      "열린국회정보 OpenAPI, 공직자윤리위원회/newstapa 재산공개, 행안부 관보 병역사항 등 형식이 제각각인 공공 데이터를 의원 단위로 정합성 있게 매칭해 재산·병역 이력을 대표발의 법안·표결 기록과 함께 보여주는 데이터 파이프라인을 설계했습니다.",
    ],
    achievements: [
      "국회의원 재산·병역 공개 자료를 발의 법안·표결 이력과 함께 대조해서 볼 수 있는 시민 정보 플랫폼을 구축했습니다.",
      "'주장·사실 분리' 원칙에 따라 정당·단체 입장과 시민 개인의 찬반 투표를 별도 트랙으로 분리하고, 댓글은 득표 경쟁 구도가 생기지 않도록 '공감' 한 종류만 남기는 설계를 완성했습니다.",
      "이슈 초안 AI 작성 + 사람 검수 파이프라인과 법안·정책 원문 그대로 인용하는 정책 허브를 구축해, 판정 없는 정치 투명성 플랫폼을 handspolitics.co.kr 도메인으로 공개 운영 중입니다.",
      "pnpm workspaces + Turborepo 모노레포로 웹(Vercel)·API/크론(Railway)을 분리 자동 배포하는 파이프라인을 운영하고 있습니다.",
    ],
    imageUrl: "/handsonpolicy.jpg",
  },
  {
    title: "하나은행 AICC 프로젝트 개발",
    description: "하나은행 대고객 서비스 챗봇 고도화 개발 참여",
    longDescription:
      "하나은행의 기존 챗봇 서비스를 AI와 접목하여 고도화 개발 MindWareWorks소속으로 참여하였습니다. Dialogflow를 활용하여 Intent에 따른 최적화된 시나리오를 개발하고 restAPI를 활용하여 이체성 서비스를 구현 및 Intent에 따른 학습데이터 분류하였습니다",
    badges: ["ML", "JavaScript", "restAPI", "MongoDB"],
    featured: true,
    demoUrl:
      "https://haitalk.kebhana.com/aicc/views/index.do?projectId=9d8ba989-4878-42ad-9546-4def008cab98",
    techStack: ["JavaScript", "restAPI", "CSS", "Node.js", "MongoDB", "Google Dialogflow"],
    timeline: "2021.12 - 2022.12 (12개월)",
    role: "프론트엔드 개발 참여 & 시나리오 개발 및 담당",
    challenges: [
      "ML 모델의 학습 데이터 관리를 통해 Intent 분류의 정확도를 높이는 작업은 매우 복잡하고 세심한 조정이 필요했습니다.",
      "Dialogflow 시나리오 개발 및 테스트 환경 구축은 다양한 사용자 시나리오를 지원하기 위해 필수적이었습니다.",
      "NLP의 Intent 및 Entity 분류와 시나리오 구현은 고도의 기술적 이해와 지속적인 개선이 요구되었습니다.",
    ],
    achievements: [
      "기존 하나은행의 600여 개의 답변을 2000개로 확장하여 고객 서비스의 폭을 넓혔습니다.",
      "이체성 거래, 즉시이체, 환전, 거래내역 조회 등 개인화 서비스 시나리오를 성공적으로 개발하였습니다.",
      "2022년 하나은행 챗봇 서비스의 정식 런칭을 통해 고객 만족도를 크게 향상시켰습니다.",
    ],
    imageUrl: "/hai1.jpeg",
  },
  {
    title: "하나은행 AICC 프로젝트 개인 & 기업 챗봇 운영",
    description: "하나은행 대고객&기업 서비스 챗봇 운영 업무",
    longDescription:
      "하나은행 앱, 웹 개인 & 기업 챗봇 개발 및 운영 모니터링 및 유지보수 앱과 웹에 대한 접근성 개선 요청에 따른 UI개선 기존 서비스에 장애대응 및 주기적인 배포로 장애 대응",
    badges: ["ML", "JavaScript", "restAPI", "MongoDB", "Dialogflow", "Node.js", "Docker", "Kubernetes"],
    featured: true,
    demoUrl:
      "https://haitalk.kebhana.com/aicc/views/index.do?projectId=9d8ba989-4878-42ad-9546-4def008cab98",
    techStack: [
      "ML",
      "JavaScript",
      "restAPI",
      "MongoDB",
      "Dialogflow",
      "Node.js",
      "Docker",
      "Kubernetes",
    ],
    timeline: "2022.1 ~ 현재 (30개월)",
    role:
      "하나은행 개인챗봇 web,app 개발 및 운영 모니터링 및 유지보수와 기업챗봇 개발 및 운영과 Frontend 개발",
    challenges: [
      "시나리오 에러 모니터링 및 장애 개선은 실시간으로 이루어져야 하며, 이는 시스템의 안정성을 유지하는 데 필수적입니다.",
      "하나은행 고객 챗봇의 전반적인 운영을 담당하며, 새로운 시나리오 및 UI, 웹 접근성, 보안 유지보수는 지속적인 업데이트가 필요합니다.",
    ],
    achievements: [
      "3년간 하나은행 챗봇 서비스를 정상적으로 운영하며 금융사고를 예방하였습니다.",
      "2000개의 시나리오를 2600개로 확장하여 고객의 다양한 요구를 충족시켰습니다.",
      "개인 및 기업 챗봇의 추가 개발 및 운영을 통해 서비스의 범위를 확장하였습니다.",
    ],
    imageUrl: "/hai.png",
  },
  {
    title: "PARAMOS(RAG) 프로젝트 개발",
    description: "RAG 기반의 기업형 챗봇 서비스 개발",
    longDescription:
      "RAG를 활용한 문서기반 답변을 제공하는 기업형 챗봇 서비스 개발 collection이라는 문서를 Embbeding한 데이터를 담은 Store를 Category라는 프롬프트와 LLM을 선택하여 맵핑하여 채팅화면에서 Collection과 맵핑된 Category를 선택하여 답변을 제공하는 기업형 챗봇 서비스 입니다.",
    badges: ["AI", "HuggingFace", "Python", "FastAPI", "MySQL", "vue.js", "LLM", "RAG"],
    featured: true,
    demoUrl: "http://110.9.117.10:8501/#/login",
    techStack: ["AI", "HuggingFace", "Python", "FastAPI", "MySQL", "vue.js", "LLM", "RAG"],
    timeline: "2024.09 - 2025.03 (6개월)",
    role: "프론트엔드 & AI 개발 참여",
    challenges: [
      "PDF 로더 및 PDF 내 이미지와 테이블을 추출하여 요약하는 작업은 데이터의 질을 향상시키는 데 중요한 역할을 했습니다.",
      "Spliter를 통해 데이터 정제 후 Faiss & ChromaDB에 저장하는 과정은 데이터의 효율적인 검색을 가능하게 했습니다.",
      "다양한 Embedding 모델을 활용하여 데이터 임베딩을 최적화하였습니다.",
    ],
    achievements: [
      "테이블과 이미지 요약을 통해 답변의 정확도를 크게 향상시켰습니다.",
      "LangChain을 활용하여 특정 값 이하의 답변은 다시 Retriever를 진행하여 보다 높은 답변의 결과를 추출하였습니다.",
      "문서 기반의 정확한 답변 제공이 가능해졌습니다.",
    ],
    imageUrl: "/ragImg.jpeg",
  },
  {
    title: "MCP 번역 사이트",
    description: "Smithery MCP Store가 전부 영어로 되어있어 한글 버전으로 바꾼 사이트",
    longDescription:
      "스미더리 MCP Store는 영어로만 제공되어 한국어 사용자들이 접근하기 어려웠습니다. 이 프로젝트는 Next.js와 TypeScript를 활용한 프론트엔드와 Python FastAPI 기반의 백엔드를 구축하여, 스미더리 API를 통해 MCP 서버 데이터를 가져온 후 OpenAI API를 활용한 LLM 번역 서비스를 제공합니다. 사용자는 영어로 된 MCP 서버 설명을 실시간으로 한글로 번역하여 확인할 수 있으며, 번역 캐시 기능을 통해 불필요한 API 호출을 최소화하여 효율적인 번역 서비스를 제공합니다.",
    badges: ["Next.js", "TypeScript", "OpenAI API", "LLM", "Python", "FastAPI"],
    featured: false,
    githubUrl: "https://github.com/kjh5555/MCP-korean",
    demoUrl: "https://mcp-korean-cj0pvj3a1-jaehyeonkims-projects.vercel.app/",
    techStack: ["Next.js", "TypeScript", "OpenAI API", "LLM", "Python", "FastAPI"],
    timeline: "2024.04 - 2024.04 (1개월)",
    role:
      "전체 프로젝트 기획 및 설계, Next.js 기반 프론트엔드 개발, Python FastAPI 백엔드 개발, OpenAI API 연동 및 번역 로직 구현, 번역 캐시 시스템 설계 및 구현, UI/UX 디자인",
    challenges: [
      "대량의 MCP 서버 데이터를 효율적으로 처리하기 위해 OpenAI API의 배치 요청(batch processing) 기능을 활용하여 한 번에 여러 번역 요청을 처리하고, 무한 스크롤 방식으로 결과를 점진적으로 화면에 렌더링하여 초기 로딩 시간을 단축했습니다.",
      "동일한 텍스트의 반복 번역을 방지하기 위해 클라이언트와 서버 양쪽에서 번역 결과를 캐시에 저장하고 조회하는 시스템을 구현하여 API 비용을 절감하고 응답 속도를 향상시켰습니다.",
      "Next.js의 서버 사이드 렌더링과 클라이언트 사이드 상호작용을 적절히 조합하여 번역 상태 관리 및 실시간 UI 업데이트를 구현했습니다.",
      "스미더리 API와 OpenAI API의 응답 지연 및 에러 처리를 위한 재시도 로직과 폴백 메커니즘을 구현하여 안정적인 서비스를 제공했습니다.",
    ],
    achievements: [
      "한글 번역 기능을 통해 한국어 사용자들이 MCP 서버를 쉽게 이해하고 활용할 수 있도록 하여 사용자 접근성을 크게 향상시켰습니다.",
      "번역 캐시 시스템을 통해 API 호출 횟수를 약 60% 이상 감소시켜 운영 비용을 절감하고 응답 속도를 개선했습니다.",
      "Next.js와 TypeScript를 활용한 타입 안정성 확보 및 코드 품질 향상으로 유지보수성을 높였습니다.",
      "FastAPI를 활용한 비동기 번역 API 서버 구축으로 높은 동시 처리 성능을 달성했습니다.",
      "프로젝트 전체를 단독으로 기획하고 개발하여 풀스택 개발 역량을 입증했습니다.",
    ],
    imageUrl: "/mcp.png",
  },
  {
    title: "webRTC를 활용한 화상 채팅방",
    description: "webRTC를 활용한 채팅 서비스 구현",
    longDescription:
      "Vue.js 3와 Socket.IO를 활용하여 실시간 화상 채팅 및 텍스트 채팅 기능을 제공하는 웹 애플리케이션입니다. PeerJS를 통해 webRTC의 Peer-to-Peer 통신을 구현하여 브라우저 간 직접 영상/음성 스트리밍을 지원하며, Node.js와 Express를 기반으로 한 백엔드 서버를 구축하여 Socket.IO를 통해 실시간 메시징, 채팅방 관리, 사용자 인증 등의 기능을 제공합니다. 사용자는 채팅방을 생성하고 참여하여 화상 통화와 함께 텍스트 메시지 및 파일 공유를 할 수 있습니다.",
    badges: ["Vue.js 3", "Socket.IO Client", "PeerJS", "Node.js", "Express"],
    featured: false,
    githubUrl: "https://github.com/kjh5555/vibe",
    techStack: ["Vue.js 3", "Socket.IO Client", "PeerJS", "Node.js", "Express"],
    timeline: "2024.04 - 2024.04 (1개월)",
    role:
      "프로젝트 전체 기획 및 설계, Vue.js 3 기반 프론트엔드 개발, Node.js/Express 백엔드 서버 구축, Socket.IO를 활용한 실시간 통신 구현, PeerJS를 통한 webRTC P2P 연결 구현, 사용자 인증 및 채팅방 관리 시스템 개발, 파일 공유 기능 구현, UI/UX 디자인",
    challenges: [
      "webRTC의 P2P 연결을 안정적으로 구축하기 위해 STUN/TURN 서버 설정과 시그널링 과정에서 발생하는 NAT 트래버설 문제를 해결하기 위해 PeerJS와 Socket.IO를 조합하여 신호 전달 방식을 최적화했습니다.",
      "다수의 사용자가 동시에 화상 통화를 할 때 발생하는 성능 문제를 해결하기 위해 Peer 연결 관리를 효율적으로 구현하고, 미디어 스트림의 품질을 동적으로 조절하는 기능을 추가했습니다.",
      "Socket.IO를 활용한 실시간 메시징에서 서버 연결이 끊어졌을 때의 재연결 로직과 메시지 큐 관리, 그리고 채팅방 상태 동기화 문제를 해결했습니다.",
      "다양한 브라우저와 네트워크 환경에서 webRTC가 작동하도록 크로스 브라우저 호환성과 폴백 메커니즘을 구현하는 것이 어려웠습니다.",
    ],
    achievements: [
      "webRTC P2P 통신을 성공적으로 구현하여 별도의 미디어 서버 없이도 브라우저 간 직접 화상 통화가 가능한 시스템을 구축했습니다.",
      "Socket.IO를 활용한 실시간 채팅 시스템을 통해 여러 사용자가 동시에 메시지를 주고받을 수 있는 안정적인 통신 환경을 제공했습니다.",
      "Vue.js 3의 Composition API를 활용하여 컴포넌트 기반의 모듈화된 코드 구조를 설계하여 유지보수성을 향상시켰습니다.",
      "사용자 인증 및 채팅방 관리 기능을 통해 보안과 사용성을 강화하여 실용적인 채팅 애플리케이션을 완성했습니다.",
      "파일 공유 기능을 추가하여 단순한 화상 통화를 넘어 협업 도구로서의 기능을 확장했습니다.",
      "Node.js와 Express를 활용한 RESTful API 설계로 확장 가능한 백엔드 아키텍처를 구축했습니다.",
    ],
    imageUrl: "/webchat.png",
  },
  {
    title: "SmartParm 관리자 사이트",
    description: "농장 내 온습도 및 카메라를 확인 및 제어할 수 있는 스마트팜 관리자 사이트.",
    longDescription:
      "Vue.js 3와 Vite를 활용한 스마트팜 관리 시스템입니다. Composition API를 통해 컴포넌트 기반의 모듈화된 구조를 설계했으며, Pinia를 활용하여 전역 상태 관리를 구현했습니다. Vuetify와 Tailwind CSS를 조합하여 일관성 있는 UI/UX를 제공하며, TypeScript를 통해 타입 안정성을 확보했습니다. 관리자는 각 농장의 센서 데이터(온도, 습도, CO2, 조명, pH, EC 등)를 실시간으로 모니터링하고, 관수 및 환기 시스템을 원격으로 제어할 수 있습니다. 각 재배층별로 개별 환경 설정이 가능하며, 카메라를 통한 영상 모니터링 기능을 제공합니다. 대시보드를 통해 모든 농장의 현황을 한눈에 파악하고, 데이터 로그를 통해 환경 변화 추이를 분석할 수 있습니다.",
    badges: [
      "Vue.js 3",
      "Vite",
      "JavaScript",
      "TypeScript",
      "Pinia",
      "Vuetify",
      "Tailwind CSS",
      "Vuex",
    ],
    featured: false,
    githubUrl: "https://github.com/kjh5555/smartParmDashboard",
    techStack: [
      "Vue.js 3",
      "Vite",
      "JavaScript",
      "TypeScript",
      "Pinia",
      "Vuetify",
      "Tailwind CSS",
      "Vuex",
    ],
    timeline: "2024.04 - 2024.04 (1개월)",
    role:
      "프로젝트 전체 기획 및 설계, Vue.js 3 기반 프론트엔드 개발, Vite를 활용한 빌드 시스템 구성, Composition API를 통한 컴포넌트 구조 설계, Pinia를 통한 전역 상태 관리 구현, Vuetify와 Tailwind CSS를 조합한 UI/UX 디자인, TypeScript를 활용한 타입 안정성 확보, 센서 데이터 실시간 모니터링 시스템 개발, 원격 제어 기능 구현, 카메라 영상 모니터링 시스템 개발, 대시보드 및 데이터 로그 기능 구현, 사용자 인증 및 권한 관리 시스템 개발",
    challenges: [
      "온도, 습도, CO2, 조명, EC, pH, 관수 및 환기 설정을 포함한 다양한 환경 제어 기능을 통합하기 위해 Pinia 스토어를 설계하고, 각 센서별 상태 관리를 효율적으로 구현하는 것이 도전적이었습니다.",
      "각 재배층에 대한 개별 설정 및 제어 기능을 지원하기 위해 복잡한 중첩 데이터 구조를 설계하고, Vue의 반응성 시스템을 최적화하여 실시간 업데이트를 구현했습니다.",
      "다수의 농장과 센서로부터 들어오는 실시간 데이터를 효율적으로 처리하기 위해 WebSocket 연결 관리와 데이터 스트리밍을 구현하는 것이 어려웠습니다.",
      "Vuetify와 Tailwind CSS를 함께 사용하면서 스타일 충돌을 방지하고 일관성 있는 디자인 시스템을 구축하는 것이 도전적이었습니다.",
      "카메라 영상 스트리밍과 센서 데이터를 동시에 처리하면서도 UI 성능을 유지하기 위해 가상화(Virtualization)와 지연 로딩(Lazy Loading) 기법을 적용했습니다.",
    ],
    achievements: [
      "Vue.js 3의 Composition API와 Pinia를 활용하여 모듈화되고 확장 가능한 상태 관리 시스템을 구축하여 코드 재사용성과 유지보수성을 크게 향상시켰습니다.",
      "실시간 대시보드를 통해 모든 농장의 센서 데이터와 환경 상태를 한눈에 파악할 수 있어 관리 효율성을 크게 향상시켰습니다.",
      "각 농장 및 재배층별로 개별 환경 설정이 가능한 유연한 시스템을 구축하여 다양한 작물 재배 환경에 대응할 수 있도록 했습니다.",
      "Vuetify와 Tailwind CSS를 조합하여 접근성 높고 반응형인 UI를 구현하여 다양한 디바이스에서 사용할 수 있는 인터페이스를 제공했습니다.",
      "TypeScript를 활용하여 타입 안정성을 확보하고, 개발 단계에서 오류를 사전에 방지하여 안정적인 애플리케이션을 구축했습니다.",
      "실시간 센서 데이터 모니터링과 원격 제어 기능을 통해 농장 관리자가 물리적으로 현장에 가지 않고도 모든 환경을 제어할 수 있는 시스템을 완성했습니다.",
      "카메라 영상 모니터링 기능을 추가하여 시각적으로 농작물의 상태를 확인하고, 필요시 원격으로 제어할 수 있는 통합 관리 시스템을 구현했습니다.",
      "데이터 로그 기능을 통해 환경 변화 추이를 분석하고, 최적의 재배 환경을 찾기 위한 데이터 기반 의사결정을 지원했습니다.",
    ],
    imageUrl: "/smart.png",
  },
  {
    title: "SmartFactory 관리자 사이트",
    description: "공장 내 설비 및 작업에 대한 관리자 사이트.",
    longDescription:
      "Next.js와 React를 기반으로 한 스마트 팩토리 관리 시스템입니다. TypeScript와 Prisma ORM을 활용하여 타입 안정성과 데이터베이스 관리를 구현했으며, React Query와 Recoil을 통해 서버 상태 관리와 클라이언트 상태 관리를 분리하여 효율적인 상태 관리를 달성했습니다. Zod를 활용한 스키마 검증과 React Hook Form을 통한 폼 관리로 사용자 입력의 안정성을 확보했고, Radix UI와 Lucide React로 접근성이 높은 UI 컴포넌트를 구축했습니다. Three.js를 활용하여 공장의 3D 시각화를 구현하여 설비 및 작업 현황을 직관적으로 파악할 수 있도록 했습니다. 관리자는 각 공장의 설비 상태를 실시간으로 모니터링하고, 작업 스케줄을 관리하며, 설비를 원격으로 제어할 수 있습니다.",
    badges: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "Tailwind CSS",
      "Recoil",
      "React Query",
      "Zod",
      "Axios",
      "React Hook Form",
      "Radix UI",
      "Lucide React",
      "Three.js",
    ],
    featured: false,
    githubUrl: "https://github.com/kjh5555/smartParmDashboard",
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma",
      "Tailwind CSS",
      "Recoil",
      "MySQL",
      "React Query",
      "Zod",
      "Axios",
      "React Hook Form",
      "Radix UI",
      "Lucide React",
      "Three.js",
    ],
    timeline: "2024.04 - 2024.04 (1개월)",
    role:
      "프로젝트 전체 기획 및 설계, Next.js 기반 풀스택 개발, TypeScript를 활용한 타입 안정성 확보, Prisma ORM을 통한 데이터베이스 스키마 설계 및 관리, React Query와 Recoil을 통한 상태 관리 시스템 구축, Zod를 활용한 데이터 검증 로직 구현, React Hook Form을 통한 복잡한 폼 관리, Radix UI를 활용한 접근성 높은 UI 컴포넌트 개발, Three.js를 통한 3D 공장 시각화 구현, Axios를 통한 API 통신 로직 구현, UI/UX 디자인",
    challenges: [
      "다양한 설비와 작업을 실시간으로 모니터링하고 제어하기 위해 React Query의 캐싱 및 무효화 전략을 설계하고, 서버 상태와 클라이언트 상태를 적절히 분리하여 복잡한 상태 관리를 구현했습니다.",
      "Prisma ORM을 활용하여 복잡한 관계형 데이터베이스 스키마를 설계하고, 효율적인 쿼리 최적화를 통해 대량의 설비 데이터를 빠르게 조회할 수 있도록 했습니다.",
      "Three.js를 활용한 3D 시각화에서 실시간 데이터와 3D 모델을 동기화하는 것이 어려웠으며, WebGL 성능 최적화를 통해 부드러운 렌더링을 구현했습니다.",
      "Zod 스키마와 React Hook Form을 조합하여 복잡한 중첩 폼 데이터의 타입 안정성과 검증을 보장하는 것이 도전적이었습니다.",
      "다수의 설비를 동시에 모니터링하고 제어할 때 발생하는 성능 문제를 해결하기 위해 React Query의 배치 요청과 가상화(Virtualization) 기법을 활용했습니다.",
    ],
    achievements: [
      "React Query와 Recoil을 조합한 효율적인 상태 관리 시스템을 구축하여 서버 상태와 클라이언트 상태를 명확히 분리하고, 자동 캐싱 및 동기화 기능을 통해 사용자 경험을 향상시켰습니다.",
      "Prisma ORM을 활용하여 타입 안전한 데이터베이스 쿼리를 구현하고, 관계형 데이터 모델링을 통해 확장 가능한 데이터베이스 구조를 설계했습니다.",
      "Three.js를 활용한 3D 공장 시각화를 구현하여 설비의 위치와 상태를 직관적으로 파악할 수 있는 대시보드를 제공했습니다.",
      "Zod와 React Hook Form을 조합한 강력한 폼 검증 시스템을 구축하여 사용자 입력의 안정성을 확보하고, 타입 안전성을 보장했습니다.",
      "Next.js의 서버 사이드 렌더링과 클라이언트 사이드 상호작용을 적절히 조합하여 빠른 초기 로딩 시간과 부드러운 사용자 경험을 제공했습니다.",
      "Radix UI를 활용하여 접근성(accessibility)이 높은 UI 컴포넌트를 구축하여 다양한 사용자가 쉽게 사용할 수 있는 인터페이스를 구현했습니다.",
      "타입스크립트를 전면 적용하여 타입 안정성을 확보하고, 개발 단계에서 오류를 사전에 방지하여 코드 품질과 유지보수성을 향상시켰습니다.",
    ],
    imageUrl: "/factory.png",
  },
];

const MAIN_PROJECTS = PROJECTS.filter((p) => p.featured);
const SIDE_PROJECTS = PROJECTS.filter((p) => !p.featured);

export function ProjectSection() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (project: Project) => {
    setSelected(project);
    setOpen(true);
  };

  return (
    <div className="space-y-32">
      {/* Featured projects: 3D stack */}
      <div>
        <Reveal className="mb-12 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.4em] text-[hsl(var(--accent-cyan))]">
            ◆ 주요 프로젝트
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            <span className="text-gradient-iris">Featured</span>{" "}
            <span className="text-foreground">Work</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            실제 서비스에 적용된 프로젝트와 핵심 성과
          </p>
        </Reveal>

        <ProjectStack3D projects={MAIN_PROJECTS} onOpenDetails={handleOpen} />
      </div>

      {/* Side projects: tilt grid */}
      <div>
        <Reveal className="mb-12 text-center">
          <span className="inline-block text-xs uppercase tracking-[0.4em] text-[hsl(var(--accent-coral))]">
            ◇ 사이드 프로젝트
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight md:text-6xl">
            <span className="text-gradient-coral">Side</span>{" "}
            <span className="text-foreground">Quests</span>
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            개인 학습과 기술 탐구를 위한 프로젝트
          </p>
        </Reveal>

        <SideProjectsGrid projects={SIDE_PROJECTS} onOpenDetails={handleOpen} />
      </div>

      <ProjectDialog project={selected} open={open} onOpenChange={setOpen} />
    </div>
  );
}
