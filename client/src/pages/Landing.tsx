import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { BookOpen, Sparkles, Users, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Landing() {
  const { user, isAuthenticated } = useAuth();

  const categories = [
    {
      id: 1,
      name: "Teologia",
      description: "Aprofunde-se nos fundamentos da teologia cristã e nas verdades eternas da Palavra de Deus.",
      icon: "📖",
      color: "from-blue-600 to-purple-600",
    },
    {
      id: 2,
      name: "Bíblia",
      description: "Explore as escrituras sagradas com uma perspectiva profunda e transformadora.",
      icon: "✨",
      color: "from-purple-600 to-pink-600",
    },
    {
      id: 3,
      name: "Mentalidade Cristã Extraordinária",
      description: "Desenvolva uma mentalidade alinhada com os princípios cristãos para uma vida extraordinária.",
      icon: "🚀",
      color: "from-pink-600 to-orange-600",
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Cursos Estruturados",
      description: "Aulas de até 60 minutos com conteúdo cuidadosamente preparado e organizado.",
    },
    {
      icon: Sparkles,
      title: "Suporte Inteligente",
      description: "Sistema de IA que responde suas dúvidas 24/7, com escalação para o professor quando necessário.",
    },
    {
      icon: Zap,
      title: "Progresso em Tempo Real",
      description: "Acompanhe seu progresso em cada aula e curso com métricas detalhadas.",
    },
    {
      icon: Users,
      title: "Comunidade Cristã",
      description: "Conecte-se com outros alunos em uma comunidade dedicada ao crescimento espiritual.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Fundo cósmico com efeito de nebulosa */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradiente de nebulosa */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

        {/* Efeito de estrelas */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random() * 3}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-purple-500/20 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Theos Academy Brasil
              </h1>
            </div>

            <nav className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button variant="ghost" className="text-cyan-400 hover:text-cyan-300">
                      Dashboard
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

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-lg">
              Theos Academy Brasil
            </h2>
            <p className="text-xl md:text-2xl text-purple-200 mb-4 font-light">
              Transforme sua vida através da Teologia, Bíblia e Mentalidade Cristã Extraordinária
            </p>
            <p className="text-lg text-purple-300 mb-8">
              Cursos imersivos e estruturados para o seu crescimento espiritual e intelectual
            </p>

            {!isAuthenticated ? (
              <a href={getLoginUrl()}>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg rounded-lg shadow-lg shadow-purple-500/50">
                  Comece Sua Jornada Agora
                </Button>
              </a>
            ) : (
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg rounded-lg shadow-lg shadow-purple-500/50">
                  Ir para Cursos
                </Button>
              </Link>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Por que escolher Theos Academy Brasil?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={idx}
                  className="bg-slate-900/50 border-purple-500/30 hover:border-cyan-400/50 transition-all duration-300 p-6 backdrop-blur-sm"
                >
                  <Icon className="w-12 h-12 text-cyan-400 mb-4" />
                  <h4 className="text-lg font-bold text-cyan-300 mb-2">{feature.title}</h4>
                  <p className="text-purple-200 text-sm">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-16">
          <h3 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Categorias de Cursos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/courses?category=${encodeURIComponent(category.name)}`}>
                <Card
                  className={`bg-gradient-to-br ${category.color} p-8 rounded-lg cursor-pointer hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 h-full`}
                >
                  <div className="text-5xl mb-4">{category.icon}</div>
                  <h4 className="text-2xl font-bold text-white mb-3">{category.name}</h4>
                  <p className="text-white/90 text-sm">{category.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg p-12 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">Pronto para começar?</h3>
            <p className="text-purple-200 mb-8 text-lg">
              Junte-se a milhares de alunos em sua jornada de transformação espiritual
            </p>
            {!isAuthenticated ? (
              <a href={getLoginUrl()}>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg rounded-lg shadow-lg shadow-purple-500/50">
                  Cadastre-se Gratuitamente
                </Button>
              </a>
            ) : (
              <Link href="/courses">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 px-8 py-6 text-lg rounded-lg shadow-lg shadow-purple-500/50">
                  Explorar Cursos
                </Button>
              </Link>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-purple-500/20 bg-slate-950/50 backdrop-blur-md mt-20">
          <div className="container mx-auto px-4 py-8 text-center text-purple-300">
            <p>&copy; 2026 Theos Academy Brasil. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
