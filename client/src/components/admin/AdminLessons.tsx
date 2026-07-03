import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import VideoUpload from "@/components/VideoUpload";
import { Edit, Trash2, Plus, Video, Clock } from "lucide-react";
import { useState } from "react";

interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  materialUrl?: string;
  durationMinutes: number;
  order: number;
}

interface AdminLessonsProps {
  courseId: number;
  courseName: string;
}

export default function AdminLessons({ courseId, courseName }: AdminLessonsProps) {
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 1,
      title: "Introdução à Teologia",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      durationMinutes: 45,
      order: 1,
    },
    {
      id: 2,
      title: "Os Pilares da Fé",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      durationMinutes: 52,
      order: 2,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    videoUrl: "",
    materialUrl: "",
    durationMinutes: 0,
  });

  const handleAddLesson = () => {
    setEditingId(null);
    setFormData({
      title: "",
      videoUrl: "",
      materialUrl: "",
      durationMinutes: 0,
    });
    setIsOpen(true);
  };

  const handleEditLesson = (lesson: Lesson) => {
    setEditingId(lesson.id);
    setFormData({
      title: lesson.title,
      videoUrl: lesson.videoUrl,
      materialUrl: lesson.materialUrl || "",
      durationMinutes: lesson.durationMinutes,
    });
    setIsOpen(true);
  };

  const handleSaveLesson = () => {
    if (!formData.title || !formData.videoUrl || !formData.durationMinutes) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    if (editingId) {
      setLessons(
        lessons.map((l) =>
          l.id === editingId
            ? {
                ...l,
                title: formData.title,
                videoUrl: formData.videoUrl,
                materialUrl: formData.materialUrl,
                durationMinutes: formData.durationMinutes,
              }
            : l
        )
      );
    } else {
      const newLesson: Lesson = {
        id: Math.max(...lessons.map((l) => l.id), 0) + 1,
        title: formData.title,
        videoUrl: formData.videoUrl,
        materialUrl: formData.materialUrl,
        durationMinutes: formData.durationMinutes,
        order: lessons.length + 1,
      };
      setLessons([...lessons, newLesson]);
    }

    setIsOpen(false);
    setFormData({
      title: "",
      videoUrl: "",
      materialUrl: "",
      durationMinutes: 0,
    });
  };

  const handleDeleteLesson = (id: number) => {
    if (confirm("Tem certeza que deseja deletar esta aula?")) {
      setLessons(lessons.filter((l) => l.id !== id));
    }
  };

  const handleVideoUpload = (url: string, key: string, fileName: string) => {
    setFormData({
      ...formData,
      videoUrl: url,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{courseName}</h2>
          <p className="text-purple-300 text-sm">Gerenciar aulas e vídeos</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleAddLesson}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Aula
            </Button>
          </DialogTrigger>

          <DialogContent className="bg-slate-900 border-purple-500/30 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Editar Aula" : "Criar Nova Aula"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Título */}
              <div>
                <label className="text-purple-300 text-sm mb-1 block">Título da Aula *</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex: Introdução à Teologia"
                  className="bg-slate-800/50 border-purple-500/30 text-white placeholder-purple-400"
                />
              </div>

              {/* Duração */}
              <div>
                <label className="text-purple-300 text-sm mb-1 block">Duração (minutos) *</label>
                <Input
                  type="number"
                  value={formData.durationMinutes}
                  onChange={(e) =>
                    setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 0 })
                  }
                  placeholder="Ex: 45"
                  max={60}
                  className="bg-slate-800/50 border-purple-500/30 text-white placeholder-purple-400"
                />
                <p className="text-purple-400 text-xs mt-1">Máximo: 60 minutos</p>
              </div>

              {/* Upload de Vídeo */}
              <div>
                <label className="text-purple-300 text-sm mb-1 block">Vídeo da Aula *</label>
                {formData.videoUrl ? (
                  <div className="bg-slate-800/50 border border-green-500/30 rounded p-3 flex items-center gap-2">
                    <Video className="w-5 h-5 text-green-400" />
                    <div className="flex-1">
                      <p className="text-green-300 text-sm font-semibold">Vídeo enviado com sucesso</p>
                      <p className="text-purple-300 text-xs">{formData.videoUrl}</p>
                    </div>
                  </div>
                ) : (
                  <VideoUpload onUploadComplete={handleVideoUpload} maxSizeMB={500} />
                )}
              </div>

              {/* Material Complementar */}
              <div>
                <label className="text-purple-300 text-sm mb-1 block">Material Complementar (opcional)</label>
                <Input
                  value={formData.materialUrl}
                  onChange={(e) => setFormData({ ...formData, materialUrl: e.target.value })}
                  placeholder="URL do PDF ou documento"
                  className="bg-slate-800/50 border-purple-500/30 text-white placeholder-purple-400"
                />
              </div>

              {/* Botões */}
              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleSaveLesson}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
                >
                  {editingId ? "Atualizar Aula" : "Criar Aula"}
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

      {/* Lista de Aulas */}
      <div className="space-y-3">
        {lessons.length === 0 ? (
          <Card className="bg-slate-900/50 border-purple-500/30 p-8 text-center">
            <Video className="w-12 h-12 text-purple-400 mx-auto mb-3 opacity-50" />
            <p className="text-purple-300">Nenhuma aula criada ainda</p>
          </Card>
        ) : (
          lessons.map((lesson) => (
            <Card key={lesson.id} className="bg-slate-900/50 border-purple-500/30 p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-purple-500/20 text-purple-300 border-0">Aula {lesson.order}</Badge>
                    <h4 className="text-white font-bold">{lesson.title}</h4>
                  </div>
                  <div className="flex items-center gap-4 text-purple-300 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {lesson.durationMinutes} minutos
                    </div>
                    {lesson.materialUrl && (
                      <div className="flex items-center gap-1">
                        <Video className="w-4 h-4" />
                        Material disponível
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleEditLesson(lesson)}
                    variant="outline"
                    size="sm"
                    className="border-purple-500/30 text-purple-300 hover:border-cyan-400/50"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteLesson(lesson.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-300 hover:border-red-400/50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Resumo */}
      {lessons.length > 0 && (
        <Card className="bg-slate-900/50 border-purple-500/30 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-purple-400 text-sm">Total de Aulas</p>
              <p className="text-2xl font-bold text-white">{lessons.length}</p>
            </div>
            <div>
              <p className="text-purple-400 text-sm">Duração Total</p>
              <p className="text-2xl font-bold text-white">
                {Math.round(lessons.reduce((sum, l) => sum + l.durationMinutes, 0) / 60)}h
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
