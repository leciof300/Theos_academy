import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Clock, Users, BookOpen } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useMemo, useState } from "react";

export default function Courses() {
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Dados de exemplo dos cursos
  const allCourses = [
    {
      id: 1,
      title: "Fundamentos da Teologia Cristã",
      category: "Teologia",
      description: "Explore os pilares fundamentais da teologia cristã e suas aplicações práticas na vida contemporânea.",
      thumbnail: "🏛️",
      lessons: 12,
      students: 234,
      duration: "8h 30min",
      level: "Iniciante",
    },
    {
      id: 2,
      title: "Os Evangelhos: Uma Jornada Transformadora",
      category: "Bíblia",
      description: "Mergulhe profundamente nos quatro evangelhos e descubra as mensagens transformadoras de Cristo.",
      thumbnail: "📕",
      lessons: 15,
      students: 156,
      duration: "10h 15min",
      level: "Intermediário",
    },
    {
      id: 3,
      title: "Mentalidade de Fé Extraordinária",
      category: "Mentalidade Cristã Extraordinária",
      description: "Desenvolva uma mentalidade de fé que transforma desafios em oportunidades de crescimento.",
      thumbnail: "✨",
      lessons: 10,
      students: 189,
      duration: "7h 45min",
      level: "Intermediário",
    },
    {
      id: 4,
      title: "Epístolas de Paulo: Sabedoria Prática",
      category: "Bíblia",
      description: "Estude as cartas de Paulo e aplique seus ensinamentos à vida moderna.",
      thumbnail: "📖",
      lessons: 14,
      students: 145,
      duration: "9h 20min",
      level: "Avançado",
    },
    {
      id: 5,
      title: "Cristologia: Quem é Jesus?",
      category: "Teologia",
      description: "Uma exploração profunda sobre a pessoa, natureza e obra de Jesus Cristo.",
      thumbnail: "✝️",
      lessons: 16,
      students: 267,
      duration: "11h 40min",
      level: "Avançado",
    },
    {
      id: 6,
      title: "Propósito Divino: Descobrindo Seu Chamado",
      category: "Mentalidade Cristã Extraordinária",
      description: "Identifique e cumpra o propósito divino para sua vida com clareza e confiança.",
      thumbnail: "🎯",
      lessons: 8,
      students: 198,
      duration: "6h 30min",
      level: "Iniciante",
    },
  ];

  const categories = ["Teologia", "Bíblia", "Mentalidade Cristã Extraordinária"];

  const filteredCourses = useMemo(() => {
    if (!selectedCategory) return allCourses;
    return allCourses.filter((course) => course.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Fundo cósmico */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-purple-500/20 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Theos Academy Brasil
                </h1>
              </div>
            </Link>

            <nav className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                      Meus Cursos
                    </Button>
                  </Link>
                  {user?.role === "admin" && (
                    <Link href="/admin">
                      <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                        Painel Admin
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <a href={getLoginUrl()}>
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
                    Entrar
                  </Button>
                </a>
              )}
            </nav>
          </div>
        </header>

        {/* Título da seção */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Catálogo de Cursos
          </h2>
          <p className="text-purple-200 text-lg">
            Escolha entre {allCourses.length} cursos estruturados para sua transformação espiritual
          </p>
        </section>

        {/* Filtros */}
        <section className="container mx-auto px-4 mb-12">
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? "default" : "outline"}
              className={`${
                selectedCategory === null
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0"
                  : "border-purple-500/30 text-purple-300 hover:border-cyan-400/50"
              }`}
            >
              Todos os Cursos
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-0"
                    : "border-purple-500/30 text-purple-300 hover:border-cyan-400/50"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Grid de Cursos */}
        <section className="container mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Link key={course.id} href={`/course/${course.id}`}>
                <Card className="bg-slate-900/50 border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 h-full flex flex-col">
                  {/* Thumbnail */}
                  <div className="h-40 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-6xl">
                    {course.thumbnail}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-2">
                      <span className="inline-block px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold">
                        {course.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-purple-200 text-sm mb-4 flex-grow">{course.description}</p>

                    {/* Metadados */}
                    <div className="space-y-2 mb-4 pt-4 border-t border-purple-500/20">
                      <div className="flex items-center gap-2 text-purple-300 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-300 text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} aulas</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-300 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{course.students} alunos</span>
                      </div>
                    </div>

                    {/* Nível */}
                    <div className="mb-4">
                      <span
                        className={`inline-block px-3 py-1 rounded text-xs font-semibold ${
                          course.level === "Iniciante"
                            ? "bg-green-500/20 text-green-300"
                            : course.level === "Intermediário"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {course.level}
                      </span>
                    </div>

                    {/* CTA */}
                    {isAuthenticated ? (
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
                        Acessar Curso
                      </Button>
                    ) : (
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
                        Ver Detalhes
                      </Button>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-purple-300 text-lg">Nenhum curso encontrado nesta categoria.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
