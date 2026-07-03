import { Card } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, BookOpen, Award } from "lucide-react";

export default function AdminAnalytics() {
  // Dados de progresso dos alunos por semana
  const progressData = [
    { week: "Sem 1", students: 45, completed: 12 },
    { week: "Sem 2", students: 58, completed: 28 },
    { week: "Sem 3", students: 72, completed: 45 },
    { week: "Sem 4", students: 89, completed: 62 },
    { week: "Sem 5", students: 112, completed: 85 },
    { week: "Sem 6", students: 134, completed: 98 },
  ];

  // Dados de inscrições por curso
  const courseData = [
    { name: "Teologia", value: 234 },
    { name: "Bíblia", value: 156 },
    { name: "Mentalidade", value: 189 },
  ];

  // Dados de taxa de conclusão
  const completionData = [
    { course: "Fundamentos da Teologia", completion: 78 },
    { course: "Os Evangelhos", completion: 65 },
    { course: "Mentalidade de Fé", completion: 82 },
    { course: "Epístolas de Paulo", completion: 54 },
    { course: "Cristologia", completion: 71 },
    { course: "Propósito Divino", completion: 89 },
  ];

  const COLORS = ["#06b6d4", "#a855f7", "#ec4899"];

  return (
    <div className="space-y-6">
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-purple-500/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm mb-1">Alunos Totais</p>
              <p className="text-3xl font-bold text-white">1,234</p>
              <p className="text-green-400 text-xs mt-1">+12% este mês</p>
            </div>
            <Users className="w-12 h-12 text-cyan-400 opacity-20" />
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-purple-500/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm mb-1">Taxa Média de Conclusão</p>
              <p className="text-3xl font-bold text-white">73%</p>
              <p className="text-green-400 text-xs mt-1">+5% este mês</p>
            </div>
            <Award className="w-12 h-12 text-green-400 opacity-20" />
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-purple-500/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm mb-1">Cursos Ativos</p>
              <p className="text-3xl font-bold text-white">6</p>
              <p className="text-gray-400 text-xs mt-1">Sem mudanças</p>
            </div>
            <BookOpen className="w-12 h-12 text-purple-400 opacity-20" />
          </div>
        </Card>

        <Card className="bg-slate-900/50 border-purple-500/30 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm mb-1">Crescimento</p>
              <p className="text-3xl font-bold text-white">+18%</p>
              <p className="text-green-400 text-xs mt-1">Comparado ao mês anterior</p>
            </div>
            <TrendingUp className="w-12 h-12 text-yellow-400 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Progresso */}
        <Card className="bg-slate-900/50 border-purple-500/30 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Progresso de Alunos (Últimas 6 Semanas)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#6b21a8" />
              <XAxis stroke="#a78bfa" />
              <YAxis stroke="#a78bfa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #6b21a8",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="students"
                stroke="#06b6d4"
                strokeWidth={2}
                name="Alunos Inscritos"
                dot={{ fill: "#06b6d4", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#a855f7"
                strokeWidth={2}
                name="Cursos Concluídos"
                dot={{ fill: "#a855f7", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Gráfico de Distribuição por Curso */}
        <Card className="bg-slate-900/50 border-purple-500/30 p-6">
          <h3 className="text-lg font-bold text-white mb-4">Inscrições por Categoria</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {courseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #6b21a8",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Gráfico de Taxa de Conclusão por Curso */}
      <Card className="bg-slate-900/50 border-purple-500/30 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Taxa de Conclusão por Curso</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={completionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#6b21a8" />
            <XAxis stroke="#a78bfa" angle={-45} textAnchor="end" height={100} />
            <YAxis stroke="#a78bfa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e293b",
                border: "1px solid #6b21a8",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#fff" }}
            />
            <Bar dataKey="completion" fill="#06b6d4" radius={[8, 8, 0, 0]} name="Taxa de Conclusão (%)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Tabela de Insights */}
      <Card className="bg-slate-900/50 border-purple-500/30 p-6">
        <h3 className="text-lg font-bold text-white mb-4">Insights Principais</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded">
            <div className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <p className="text-white font-semibold">Curso Mais Popular</p>
              <p className="text-purple-300 text-sm">Fundamentos da Teologia Cristã com 234 inscrições</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded">
            <div className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <p className="text-white font-semibold">Melhor Taxa de Conclusão</p>
              <p className="text-purple-300 text-sm">Propósito Divino com 89% de conclusão</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <p className="text-white font-semibold">Crescimento Semanal</p>
              <p className="text-purple-300 text-sm">Média de 22 novos alunos por semana</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-800/50 rounded">
            <div className="w-2 h-2 bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
            <div>
              <p className="text-white font-semibold">Tempo Médio de Conclusão</p>
              <p className="text-purple-300 text-sm">Aproximadamente 3-4 semanas por curso</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
