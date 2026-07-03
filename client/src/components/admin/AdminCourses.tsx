import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2, Video, Clock } from "lucide-react";
import { useState } from "react";
import AdminLessons from "./AdminLessons";

export default function AdminCourses() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Fundamentos da Teologia Cristã",
      category: "Teologia",
      description: "Explore os pilares fundamentais da teologia cristã.",
      lessons: 12,
      students: 234,
      duration: "8h 30min",
    },
    {
      id: 2,
      title: "Os Evangelhos: Uma Jornada Transformadora",
      category: "Bíblia",
      description: "Mergulhe profundamente nos quatro evangelhos.",
      lessons: 15,
      students: 156,
      duration: "10h 15min",
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Teologia",
    description: "",
  });

  const handleOpenDialog = (course?: (typeof courses)[0]) => {
    if (course) {
      setEditingId(course.id);
      setFormData({
        title: course.title,
        category: course.category,
        description: course.description,
      });
    } else {
      setEditingId(null);
      setFormData({ title: "", category: "Teologia", description: "" });
    }
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) return;

    if (editingId) {
      setCourses(
        courses.map((c) =>
          c.id === editingId
            ? { ...c, title: formData.title, category: formData.category, description: formData.description }
            : c
        )
      );
    } else {
      setCourses([
        ...courses,
        {
          id: Math.max(...courses.map((c) => c.id), 0) + 1,
          title: formData.title,
          category: formData.category,
          description: formData.description,
          lessons: 0,
          students: 0,
          duration: "0h 0min",
        },
      ]);
    }

    setIsOpen(false);
    setFormData({ title: "", category: "Teologia", description: "" });
  };

  const handleDelete = (id: number) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header com botão de novo curso */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Meus Cursos</h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Curso
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-purple-500/30 text-white">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar Curso" : "Criar Novo Curso"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-purple-300 mb-2 block">Título do Curso</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Fundamentos da Teologia Cristã"
                  className="bg-slate-800/50 border-purple-500/30 text-white placeholder-purple-400"
                />
              </div>

              <div>
                <label className="text-sm text-purple-300 mb-2 block">Categoria</label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger className="bg-slate-800/50 border-purple-500/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-purple-500/30">
                    <SelectItem value="Teologia">Teologia</SelectItem>
                    <SelectItem value="Bíblia">Bíblia</SelectItem>
                    <SelectItem value="Mentalidade Cristã Extraordinária">Mentalidade Cristã Extraordinária</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm text-purple-300 mb-2 block">Descrição</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva o conteúdo do curso..."
                  className="bg-slate-800/50 border-purple-500/30 text-white placeholder-purple-400 resize-none h-24"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
                >
                  {editingId ? "Atualizar" : "Criar"}
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="flex-1 border-purple-500/30 text-purple-300 hover:border-cyan-400/50"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de Cursos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="bg-slate-900/50 border-purple-500/30 p-6 hover:border-cyan-400/50 transition">
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-bold text-white">{course.title}</h4>
                <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-semibold">{course.category}</span>
              </div>
              <p className="text-purple-200 text-sm">{course.description}</p>
            </div>

            {/* Metadados */}
            <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-purple-500/20">
              <div>
                <p className="text-purple-400 text-xs mb-1">Aulas</p>
                <p className="text-white font-bold">{course.lessons}</p>
              </div>
              <div>
                <p className="text-purple-400 text-xs mb-1">Alunos</p>
                <p className="text-white font-bold">{course.students}</p>
              </div>
              <div>
                <p className="text-purple-400 text-xs mb-1">Duração</p>
                <p className="text-white font-bold text-sm">{course.duration}</p>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-2">
              <Button
                onClick={() => handleOpenDialog(course)}
                variant="outline"
                className="flex-1 border-purple-500/30 text-purple-300 hover:border-cyan-400/50"
              >
                <Edit2 className="w-4 h-4 mr-2" />
                Editar
              </Button>
              <Button
                onClick={() => handleDelete(course.id)}
                variant="outline"
                className="flex-1 border-red-500/30 text-red-300 hover:border-red-400/50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Deletar
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
                    <Video className="w-4 h-4 mr-2" />
                    Aulas
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-900 border-purple-500/30 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Gerenciar Aulas - {course.title}</DialogTitle>
                  </DialogHeader>
                  <AdminLessons courseId={course.id} courseName={course.title} />
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-purple-300 text-lg mb-4">Nenhum curso criado ainda</p>
          <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeiro Curso
          </Button>
        </div>
      )}
    </div>
  );
}
