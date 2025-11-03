"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectSection } from "./components/projects/ProjectSection"
import { Navigation } from "./components/Navigation"
import { useRef } from 'react'

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null)
  const resumeRef = useRef<HTMLElement | null>(null)
  const skillsRef = useRef<HTMLElement | null>(null)
  const projectSectionRef = useRef<HTMLElement | null>(null)
  const contactRef = useRef<HTMLElement | null>(null)

  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLElement | null>> = {
      hero: heroRef,
      resume: resumeRef,
      skills: skillsRef,
      projects: projectSectionRef,
      contact: contactRef,
    }
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const stats = [
    { label: "경력 기간", value: "4+", sublabel: "년" },
    { label: "프로젝트", value: "8+", sublabel: "개" },
    { label: "기술 스택", value: "20+", sublabel: "개" },
    { label: "협업 기업", value: "3+", sublabel: "개" },
  ]

  return (
    <>
      <Navigation onScrollTo={scrollToSection} />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Hero Section */}
        <section ref={heroRef} id="hero" className="container mx-auto px-4 pt-32 pb-20 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
          
          <div className="flex flex-col items-center text-center space-y-10 relative z-10">
            {/* Profile Avatar with Animation */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity animate-pulse" />
              <div className="relative">
                <Avatar className="w-36 h-36 border-4 border-white shadow-2xl relative z-10">
                  <AvatarImage src="/me.png" alt="Profile" />
                  <AvatarFallback className="text-3xl bg-gradient-to-r from-blue-500 to-purple-500 text-white">JH</AvatarFallback>
                </Avatar>
                <Badge className="absolute -bottom-2 -right-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all border-none text-white shadow-xl text-sm animate-bounce">
                  🚀 Available
                </Badge>
              </div>
            </div>

            {/* Title with Gradient */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                AI & Web Developer
              </h1>
              <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl font-medium">
                AI 기술과 웹 개발을 결합하여 혁신적인 솔루션을 만드는
                <span className="text-blue-600 dark:text-blue-400 font-semibold"> 풀스택 개발자</span>
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                하나은행 챗봇 운영부터 최신 LLM 기반 RAG 시스템까지, 실무 경험과 기술 학습을 통해 지속적으로 성장하고 있습니다.
              </p>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mt-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-slate-200 dark:border-slate-700 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                  <CardContent className="pt-6 pb-6">
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {stat.value}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.sublabel}</div>
                      <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">{stat.label}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all border-none text-white shadow-xl hover:shadow-2xl hover:scale-105 text-lg px-8 py-6"
                onClick={() => scrollToSection('projects')}
              >
                프로젝트 보기
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-blue-500/50 hover:border-purple-500/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 text-lg px-8 py-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur"
                onClick={() => scrollToSection('contact')}
              >
                연락하기
              </Button>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section ref={resumeRef} id="resume" className="container mx-auto px-4 py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-yellow-500/5 rounded-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-600 dark:from-green-400 dark:to-yellow-400">
              이력
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* 경력 */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-slate-200 dark:border-slate-700 hover:border-green-500/50 dark:hover:border-green-400/50 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-200">경력</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-green-500 pl-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">AI & Web Developer</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">프리랜서 (2024-현재)</div>
                      <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">하나은행 개인/기업 챗봇 운영</div>
                    </div>
                    <div className="border-l-2 border-green-500 pl-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">AI 솔루션 개발자</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">파인트리 시스템 (2021-2024)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 학력 */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-slate-200 dark:border-slate-700 hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-200">학력</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border-l-2 border-blue-500 pl-4">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">선박해양 공학 학사</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">조선대학교 (2013-2020)</div>
                  </div>
                </CardContent>
              </Card>

              {/* 교육이력 */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-slate-200 dark:border-slate-700 hover:border-purple-500/50 dark:hover:border-purple-400/50 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    <CardTitle className="text-xl text-slate-800 dark:text-slate-200">교육이력</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-2 border-purple-500 pl-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">IOT융합 SW전문가 과정</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">스마트미디어인재개발원 (2020.03-2020.07)</div>
                    </div>
                    <div className="border-l-2 border-purple-500 pl-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200">AI 과정</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">멋쟁이사자처럼 (2020.10-2020.12)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section ref={skillsRef} id="skills" className="container mx-auto px-4 py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
              기술 스택
            </h2>
            <Tabs defaultValue="frontend" className="w-full max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur shadow-lg">
                <TabsTrigger value="frontend" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all">
                  Frontend
                </TabsTrigger>
                <TabsTrigger value="ai" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all">
                  AI & ML
                </TabsTrigger>
                <TabsTrigger value="backend" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all">
                  Backend
                </TabsTrigger>
              </TabsList>
              <TabsContent value="frontend">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-slate-200 dark:border-slate-700 hover:border-purple-500/50 dark:hover:border-purple-400/50 transition-all shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-slate-800 dark:text-slate-200">Frontend Development</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">웹 프론트엔드 기술</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Core Technologies</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            Vue.js & Vite.js
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            React & Next.js
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            JavaScript
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Beginner</Badge>
                            TypeScript
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            Tailwind CSS
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            SASS
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Additional Skills</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            AG-Grid
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            Pinia
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            JQUERY
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="ai">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-slate-200 dark:border-slate-700 hover:border-purple-500/50 dark:hover:border-purple-400/50 transition-all shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-slate-800 dark:text-slate-200">AI & Machine Learning</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">인공지능 & 머신러닝 기술</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Frameworks & Libraries</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            TensorFlow/Keras
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            PyTorch
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            LangChain
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Beginner</Badge>
                            LangSmith
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            YOLO
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            OpenCV
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">AI Services</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            OpenAI API
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            Hugging Face
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="backend">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur border-slate-200 dark:border-slate-700 hover:border-purple-500/50 dark:hover:border-purple-400/50 transition-all shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-slate-800 dark:text-slate-200">Backend Development</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">서버 & 데이터베이스 기술</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Core Technologies</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            Node.js/Express
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            Python/FastAPI
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-3 text-slate-700 dark:text-slate-300">Databases & Cloud</h3>
                        <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            MySQL
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                            MongoDB
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Beginner</Badge>
                            AWS/Vercel
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Projects Section */}
        <section ref={projectSectionRef} id="projects" className="container mx-auto px-4 py-32 relative">
          <ProjectSection />
        </section>

        {/* Contact Section */}
        <section ref={contactRef} id="contact" className="container mx-auto px-4 py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-blue-500/5 rounded-3xl" />
          <div className="relative z-10">
            <Card className="max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/80 backdrop-blur border-slate-200 dark:border-slate-700 hover:border-pink-500/50 dark:hover:border-pink-400/50 transition-all shadow-xl">
              <CardHeader>
                <CardTitle className="text-center text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600 dark:from-pink-400 dark:to-blue-400">
                  연락하기
                </CardTitle>
                <CardDescription className="text-center text-slate-600 dark:text-slate-400 text-lg">
                  프로젝트 협업이나 채용 관련 문의를 환영합니다
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4 items-center">
                  <Button 
                    asChild
                    className="w-full max-w-sm bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 transition-all border-none text-white shadow-lg hover:shadow-xl hover:scale-105"
                    size="lg"
                  >
                    <a href="mailto:s650422@gmail.com">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    이메일 보내기
                    </a>
                  </Button>
                  <Button 
                    className="w-full max-w-sm border-2 border-pink-500/50 hover:border-blue-500/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur" 
                    variant="outline"
                    size="lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
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
                    GitHub 방문하기
                  </Button>
                  <Button 
                    className="w-full max-w-sm border-2 border-pink-500/50 hover:border-blue-500/50 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 transition-all shadow-lg hover:shadow-xl hover:scale-105 bg-white/80 dark:bg-slate-800/80 backdrop-blur" 
                    variant="outline"
                    size="lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect width="4" height="12" x="2" y="9" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                    LinkedIn 프로필
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  )
}