import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, BookOpen, CheckCircle2, PlayCircle, MessageCircle } from "lucide-react";
import { Link, useParams } from "wouter";
import { useState } from "react";

export default function CourseDetail() {
  const { user, isAuthenticated } = useAuth();
  const params = useParams();
  const courseId = params.id;

  const [selectedLesson, setSelectedLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  // Dados de exemplo do curso
  const course = {
    id: 1,
    title: "Fundamentos da Teologia Cristã",
    category: "Teologia",
    description:
      "Explore os pilares fundamentais da teologia cristã e suas aplicações práticas na vida contemporânea. Este curso oferece uma visão abrangente dos conceitos teológicos essenciais.",
    thumbnail: "🏛️",
    lessons: 12,
    students: 234,
    duration: "8h 30min",
    level: "Iniciante",
    instructor: "Prof. João Silva",
    instructorBio: "Teólogo com 20 anos de experiência em ensino bíblico.",
    rating: 4.8,
    reviews: 156,
    lessonsData: [
      {
        id: 1,
        title: "Introdução à Teologia",
        duration: "45min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Uma visão geral dos conceitos fundamentais da teologia cristã.",
      },
      {
        id: 2,
        title: "A Natureza de Deus",
        duration: "52min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Explorando os atributos e características de Deus.",
      },
      {
        id: 3,
        title: "Cristologia: Quem é Jesus?",
        duration: "58min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Uma análise profunda sobre a pessoa e obra de Jesus Cristo.",
      },
      {
        id: 4,
        title: "Soteriologia: A Obra da Salvação",
        duration: "48min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Entendendo o plano de salvação divino.",
      },
      {
        id: 5,
        title: "Pneumatologia: O Espírito Santo",
        duration: "50min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "A pessoa e obra do Espírito Santo na vida do cristão.",
      },
      {
        id: 6,
        title: "Eclesiologia: A Igreja",
        duration: "55min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        description: "Compreendendo a natureza e propósito da Igreja.",
      },
    ],
  };

  const currentLesson = course.lessonsData[selectedLesson];
  const progressPercentage = (completedLessons.length / course.lessonsData.length) * 100;

  const handleMarkAsComplete = () => {
    if (!completedLessons.includes(selectedLesson)) {
      setCompletedLessons([...completedLessons, selectedLesson]);
    }
  };

  const handleNextLesson = () => {
    if (selectedLesson < course.lessonsData.length - 1) {
      setSelectedLesson(selectedLesson + 1);
    }
  };

  const handlePreviousLesson = () => {
    if (selectedLesson > 0) {
      setSelectedLesson(selectedLesson - 1);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Acesso Restrito</h2>
          <p className="text-purple-300 mb-8">Você precisa estar logado para acessar este curso.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
              Voltar para Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
            <Link href="/courses">
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                <BookOpen className="w-6 h-6 text-cyan-400" />
                <span className="text-cyan-400 font-semibold">Voltar aos Cursos</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Conteúdo principal */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Player e Conteúdo Principal */}
            <div className="lg:col-span-2">
              {/* Player de Vídeo */}
              <Card className="bg-slate-900/50 border-purple-500/30 overflow-hidden mb-6">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={currentLesson.videoUrl}
                    title={currentLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </Card>

              {/* Informações da Aula */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">{currentLesson.title}</h2>
                <div className="flex items-center gap-4 text-purple-300 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentLesson.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Aula {selectedLesson + 1} de {course.lessonsData.length}
                  </span>
                </div>
                <p className="text-purple-200">{currentLesson.description}</p>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-4 mb-8">
                <Button
                  onClick={handleMarkAsComplete}
                  disabled={completedLessons.includes(selectedLesson)}
                  className={`${
                    completedLessons.includes(selectedLesson)
                      ? "bg-green-600 text-white"
                      : "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
                  } border-0`}
                >
                  {completedLessons.includes(selectedLesson) ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Concluída
                    </>
                  ) : (
                    "Marcar como Concluída"
                  )}
                </Button>

                <Link href={`/support?course=${course.id}`}>
                  <Button variant="outline" className="border-purple-500/30 text-purple-300 hover:border-cyan-400/50">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Suporte
                  </Button>
                </Link>
              </div>

              {/* Navegação entre aulas */}
              <div className="flex gap-4">
                <Button
                  onClick={handlePreviousLesson}
                  disabled={selectedLesson === 0}
                  variant="outline"
                  className="border-purple-500/30 text-purple-300 hover:border-cyan-400/50 disabled:opacity-50"
                >
                  ← Aula Anterior
                </Button>
                <Button
                  onClick={handleNextLesson}
                  disabled={selectedLesson === course.lessonsData.length - 1}
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 disabled:opacity-50"
                >
                  Próxima Aula →
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              {/* Progresso */}
              <Card className="bg-slate-900/50 border-purple-500/30 p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">Seu Progresso</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-purple-300 mb-2">
                    <span>{completedLessons.length} de {course.lessonsData.length} aulas</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </Card>

              {/* Informações do Curso */}
              <Card className="bg-slate-900/50 border-purple-500/30 p-6 mb-6">
                <h3 className="text-lg font-bold text-white mb-4">Sobre o Curso</h3>
                <div className="space-y-3 text-purple-300 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Instrutor:</span>
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Nível:</span>
                    <span>{course.level}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Alunos:</span>
                    <span>{course.students}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Duração:</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </Card>

              {/* Lista de Aulas */}
              <Card className="bg-slate-900/50 border-purple-500/30 p-6">
                <h3 className="text-lg font-bold text-white mb-4">Aulas do Curso</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {course.lessonsData.map((lesson, idx) => (
                    <button
                      key={lesson.id}
                      onClick={() => setSelectedLesson(idx)}
                      className={`w-full text-left p-3 rounded transition-all ${
                        selectedLesson === idx
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/50"
                          : "hover:bg-purple-500/10 border border-purple-500/20"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {completedLessons.includes(idx) ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <PlayCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-grow min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{lesson.title}</p>
                          <p className="text-xs text-purple-400">{lesson.duration}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
