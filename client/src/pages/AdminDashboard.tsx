import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Users, MessageSquare, BarChart3, Plus, LogOut } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import AdminCourses from "@/components/admin/AdminCourses";
import AdminStudents from "@/components/admin/AdminStudents";
import AdminSupport from "@/components/admin/AdminSupport";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("courses");

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Acesso Restrito</h2>
          <p className="text-purple-300 mb-8">Apenas professores podem acessar o painel administrativo.</p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
              Voltar para Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
  };

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

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white font-semibold">{user?.name || "Professor"}</p>
                <p className="text-cyan-400 text-sm">Painel Administrativo</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-purple-500/30 text-purple-300 hover:border-cyan-400/50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </header>

        {/* Conteúdo principal */}
        <div className="container mx-auto px-4 py-8">
          {/* Título */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-2">Painel de Controle</h2>
            <p className="text-purple-300">Gerencie seus cursos, alunos e suporte</p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-900/50 border-purple-500/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm mb-1">Total de Cursos</p>
                  <p className="text-3xl font-bold text-white">6</p>
                </div>
                <BookOpen className="w-12 h-12 text-cyan-400 opacity-20" />
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm mb-1">Total de Alunos</p>
                  <p className="text-3xl font-bold text-white">1,234</p>
                </div>
                <Users className="w-12 h-12 text-green-400 opacity-20" />
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm mb-1">Chamados Pendentes</p>
                  <p className="text-3xl font-bold text-white">12</p>
                </div>
                <MessageSquare className="w-12 h-12 text-yellow-400 opacity-20" />
              </div>
            </Card>

            <Card className="bg-slate-900/50 border-purple-500/30 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm mb-1">Taxa de Conclusão</p>
                  <p className="text-3xl font-bold text-white">68%</p>
                </div>
                <BarChart3 className="w-12 h-12 text-blue-400 opacity-20" />
              </div>
            </Card>
          </div>

          {/* Abas de Conteúdo */}
          <Card className="bg-slate-900/50 border-purple-500/30 overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-slate-800/50 border-b border-purple-500/20 rounded-none p-0 w-full justify-start">
                <TabsTrigger
                  value="courses"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-400 data-[state=active]:bg-transparent px-6 py-4"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Cursos
                </TabsTrigger>
                <TabsTrigger
                  value="students"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-400 data-[state=active]:bg-transparent px-6 py-4"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Alunos
                </TabsTrigger>
                <TabsTrigger
                  value="support"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-400 data-[state=active]:bg-transparent px-6 py-4"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Suporte
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-cyan-400 data-[state=active]:bg-transparent px-6 py-4"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Análises
                </TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="p-6">
                <AdminCourses />
              </TabsContent>

              <TabsContent value="students" className="p-6">
                <AdminStudents />
              </TabsContent>

              <TabsContent value="support" className="p-6">
                <AdminSupport />
              </TabsContent>

              <TabsContent value="analytics" className="p-6">
                <AdminAnalytics />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
