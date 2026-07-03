import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Users, Search, Eye, Ban } from "lucide-react";
import { useState } from "react";

export default function AdminStudents() {
  const [students] = useState([
    {
      id: 1,
      name: "Maria Silva",
      email: "maria@example.com",
      enrolledCourses: 3,
      progress: 75,
      lastActive: "2 horas atrás",
      status: "active",
    },
    {
      id: 2,
      name: "João Santos",
      email: "joao@example.com",
      enrolledCourses: 2,
      progress: 45,
      lastActive: "1 dia atrás",
      status: "active",
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana@example.com",
      enrolledCourses: 1,
      progress: 90,
      lastActive: "30 minutos atrás",
      status: "active",
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      email: "pedro@example.com",
      enrolledCourses: 4,
      progress: 60,
      lastActive: "3 dias atrás",
      status: "inactive",
    },
    {
      id: 5,
      name: "Carla Mendes",
      email: "carla@example.com",
      enrolledCourses: 2,
      progress: 35,
      lastActive: "1 hora atrás",
      status: "active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[0] | null>(null);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header com busca */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar aluno por nome ou email..."
            className="bg-slate-800/50 border-purple-500/30 text-white placeholder-purple-400 pl-10"
          />
        </div>
        <div className="text-right">
          <p className="text-purple-300 text-sm">Total de Alunos</p>
          <p className="text-2xl font-bold text-white">{students.length}</p>
        </div>
      </div>

      {/* Grid de Alunos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de Alunos */}
        <div className="lg:col-span-2 space-y-3">
          {filteredStudents.map((student) => (
            <Card
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className={`bg-slate-900/50 border-purple-500/30 p-4 cursor-pointer transition hover:border-cyan-400/50 ${
                selectedStudent?.id === student.id ? "border-cyan-400 bg-slate-900/70" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-white font-bold">{student.name}</h4>
                  <p className="text-purple-300 text-sm">{student.email}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    student.status === "active"
                      ? "bg-green-500/20 text-green-300"
                      : "bg-gray-500/20 text-gray-300"
                  }`}
                >
                  {student.status === "active" ? "Ativo" : "Inativo"}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3 py-3 border-t border-purple-500/20">
                <div>
                  <p className="text-purple-400 text-xs mb-1">Cursos</p>
                  <p className="text-white font-bold">{student.enrolledCourses}</p>
                </div>
                <div>
                  <p className="text-purple-400 text-xs mb-1">Progresso</p>
                  <p className="text-white font-bold">{student.progress}%</p>
                </div>
                <div>
                  <p className="text-purple-400 text-xs mb-1">Último Acesso</p>
                  <p className="text-white font-bold text-xs">{student.lastActive}</p>
                </div>
              </div>

              <Progress value={student.progress} className="h-2" />
            </Card>
          ))}
        </div>

        {/* Detalhes do Aluno */}
        {selectedStudent && (
          <Card className="bg-slate-900/50 border-purple-500/30 p-6 sticky top-24 h-fit">
            <h3 className="text-xl font-bold text-white mb-4">Detalhes do Aluno</h3>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-purple-400 text-sm mb-1">Nome</p>
                <p className="text-white font-semibold">{selectedStudent.name}</p>
              </div>

              <div>
                <p className="text-purple-400 text-sm mb-1">Email</p>
                <p className="text-white font-semibold">{selectedStudent.email}</p>
              </div>

              <div>
                <p className="text-purple-400 text-sm mb-1">Status</p>
                <p
                  className={`font-semibold ${
                    selectedStudent.status === "active" ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  {selectedStudent.status === "active" ? "Ativo" : "Inativo"}
                </p>
              </div>

              <div>
                <p className="text-purple-400 text-sm mb-1">Cursos Inscritos</p>
                <p className="text-white font-semibold">{selectedStudent.enrolledCourses}</p>
              </div>

              <div>
                <p className="text-purple-400 text-sm mb-2">Progresso Geral</p>
                <Progress value={selectedStudent.progress} className="h-3 mb-1" />
                <p className="text-white font-bold">{selectedStudent.progress}%</p>
              </div>

              <div>
                <p className="text-purple-400 text-sm mb-1">Último Acesso</p>
                <p className="text-white font-semibold">{selectedStudent.lastActive}</p>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="space-y-2">
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
                <Eye className="w-4 h-4 mr-2" />
                Ver Progresso Detalhado
              </Button>
              <Button
                variant="outline"
                className="w-full border-red-500/30 text-red-300 hover:border-red-400/50"
              >
                <Ban className="w-4 h-4 mr-2" />
                Bloquear Acesso
              </Button>
            </div>
          </Card>
        )}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-purple-400 mx-auto mb-4 opacity-50" />
          <p className="text-purple-300 text-lg">Nenhum aluno encontrado</p>
        </div>
      )}
    </div>
  );
}
