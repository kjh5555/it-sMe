"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectSection } from "./components/projects/ProjectSection"
import { useRef } from 'react'

export default function Home() {
  const projectSectionRef = useRef<HTMLElement | null>(null)

  const scrollToProjects = () => {
    projectSectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl" />
        <div className="flex flex-col items-center text-center space-y-8 relative">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-75" />
            <Avatar className="w-32 h-32 border-4 border-white relative">
              <AvatarImage src="/avatar.jpg" alt="Profile" />
              <AvatarFallback>JH</AvatarFallback>
            </Avatar>
            <Badge className="absolute -bottom-2 -right-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors border-none text-white shadow-lg">
              Available for hire
            </Badge>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            AI & Web Developer
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            AI 기술과 웹 개발을 결합하여 혁신적인 솔루션을 만드는 개발자입니다.
            최신 기술 트렌드를 따라가며 지속적으로 성장하고 있습니다.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-colors border-none text-white shadow-lg" onClick={scrollToProjects}>
              프로젝트 보기
            </Button>
            <Button size="lg" variant="outline" className="border-blue-500/50 hover:border-purple-500/50 text-slate-700 hover:text-slate-900 transition-colors shadow-lg">
              연락하기
            </Button>
          </div>
        </div>
      </section>

      {/* Resume Section */}
      <section className="container mx-auto px-4 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-yellow-500/5 rounded-3xl" />
        <h2 className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-600">
          이력
        </h2>
        <div className="space-y-8">
          <div className="bg-white/50 backdrop-blur border-slate-200 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-800">경력</h3>
            <ul className="list-disc list-inside text-slate-600">
              <li>2020-현재: AI 솔루션 개발자, ABC 회사</li>
              <li>2018-2020: 웹 개발자, XYZ 회사</li>
            </ul>
          </div>
          <div className="bg-white/50 backdrop-blur border-slate-200 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-800">학력</h3>
            <ul className="list-disc list-inside text-slate-600">
              <li>2016-2018: 컴퓨터 공학 석사, DEF 대학교</li>
              <li>2012-2016: 컴퓨터 공학 학사, GHI 대학교</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container mx-auto px-4 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl" />
        <h2 className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          기술 스택
        </h2>
        <Tabs defaultValue="frontend" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/50 backdrop-blur shadow-lg">
            <TabsTrigger value="frontend" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-colors">
              Frontend
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-colors">
              AI & ML
            </TabsTrigger>
            <TabsTrigger value="backend" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-colors">
              Backend
            </TabsTrigger>
          </TabsList>
          <TabsContent value="frontend">
            <Card className="bg-white/50 backdrop-blur border-slate-200 hover:border-purple-500/50 transition-colors shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Frontend Development</CardTitle>
                <CardDescription className="text-slate-600">웹 프론트엔드 기술</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-700">Core Technologies</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Advanced</Badge>
                        React & Next.js
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Advanced</Badge>
                        TypeScript
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Advanced</Badge>
                        Tailwind CSS
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-700">Additional Skills</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-pink-500/50 text-pink-600 bg-pink-50">Intermediate</Badge>
                        Framer Motion
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Advanced</Badge>
                        Redux/Zustand
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-pink-500/50 text-pink-600 bg-pink-50">Intermediate</Badge>
                        Testing (Jest/RTL)
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="ai">
            <Card className="bg-white/50 backdrop-blur border-slate-200 hover:border-purple-500/50 transition-colors shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">AI & Machine Learning</CardTitle>
                <CardDescription className="text-slate-600">인공지능 & 머신러닝 기술</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-700">Frameworks & Libraries</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Advanced</Badge>
                        TensorFlow/Keras
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                        PyTorch
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Advanced</Badge>
                        Scikit-learn
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-700">AI Services</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Advanced</Badge>
                        OpenAI API
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                        Hugging Face
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                        Azure AI
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="backend">
            <Card className="bg-white/50 backdrop-blur border-slate-200 hover:border-purple-500/50 transition-colors shadow-lg">
              <CardHeader>
                <CardTitle className="text-slate-800">Backend Development</CardTitle>
                <CardDescription className="text-slate-600">서버 & 데이터베이스 기술</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-700">Core Technologies</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Advanced</Badge>
                        Node.js/Express
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Advanced</Badge>
                        Python/FastAPI
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                        GraphQL
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 text-slate-700">Databases & Cloud</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Advanced</Badge>
                        PostgreSQL
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                        MongoDB
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline" className="border-purple-500/50 text-purple-600 bg-purple-50">Intermediate</Badge>
                        AWS/Vercel
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Projects Section */}
      <section ref={projectSectionRef} className="container mx-auto px-4 py-32 relative">
        <ProjectSection />
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-blue-500/5 rounded-3xl" />
        <Card className="max-w-2xl mx-auto bg-white/50 backdrop-blur border-slate-200 hover:border-pink-500/50 transition-colors shadow-lg">
          <CardHeader>
            <CardTitle className="text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600">
              연락하기
            </CardTitle>
            <CardDescription className="text-center text-slate-600">
              프로젝트 협업이나 채용 관련 문의를 환영합니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 items-center">
              <Button className="w-full max-w-sm bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 transition-colors border-none text-white shadow-lg">
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
              </Button>
              <Button className="w-full max-w-sm border-pink-500/50 hover:border-blue-500/50 text-slate-700 hover:text-slate-900 transition-colors shadow-lg" variant="outline">
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
              <Button className="w-full max-w-sm border-pink-500/50 hover:border-blue-500/50 text-slate-700 hover:text-slate-900 transition-colors shadow-lg" variant="outline">
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
      </section>
    </main>
  )
}
