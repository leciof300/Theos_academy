import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, X, CheckCircle2, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface VideoUploadProps {
  onUploadComplete: (url: string, key: string, fileName: string) => void;
  maxSizeMB?: number;
}

export default function VideoUpload({ onUploadComplete, maxSizeMB = 500 }: VideoUploadProps) {
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validações
    if (!file.type.startsWith("video/")) {
      setError("Por favor, selecione um arquivo de vídeo válido");
      setStatus("error");
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      setError(`O arquivo deve ter no máximo ${maxSizeMB}MB. Seu arquivo tem ${fileSizeMB.toFixed(2)}MB`);
      setStatus("error");
      return;
    }

    setFileName(file.name);
    setError(null);
    setStatus("uploading");
    setProgress(0);

    try {
      // Simular progresso de upload
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 30;
        });
      }, 500);

      // Fazer upload para o servidor
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload/video", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Erro ao fazer upload do vídeo");
      }

      const data = await response.json();
      setProgress(100);
      setStatus("success");

      // Chamar callback com os dados do upload
      onUploadComplete(data.url, data.key, file.name);

      // Fechar diálogo após 2 segundos
      setTimeout(() => {
        setIsOpen(false);
        resetForm();
      }, 2000);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Erro desconhecido ao fazer upload");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setProgress(0);
    setError(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
          <Upload className="w-4 h-4 mr-2" />
          Upload de Vídeo
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-slate-900 border-purple-500/30 text-white max-w-md">
        <DialogHeader>
          <DialogTitle>Fazer Upload de Vídeo</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Zona de Upload */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
              status === "uploading"
                ? "border-purple-500 bg-purple-500/10"
                : status === "success"
                  ? "border-green-500 bg-green-500/10"
                  : status === "error"
                    ? "border-red-500 bg-red-500/10"
                    : "border-purple-500/30 hover:border-purple-500/60"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              disabled={status === "uploading"}
              className="hidden"
            />

            {status === "idle" && (
              <div className="space-y-2">
                <Upload className="w-8 h-8 text-purple-400 mx-auto" />
                <p className="text-white font-semibold">Clique para selecionar ou arraste um vídeo</p>
                <p className="text-purple-300 text-sm">Máximo {maxSizeMB}MB</p>
              </div>
            )}

            {status === "uploading" && (
              <div className="space-y-3">
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-white font-semibold">{Math.round(progress)}%</p>
                <p className="text-purple-300 text-sm">Enviando {fileName}...</p>
              </div>
            )}

            {status === "success" && (
              <div className="space-y-2">
                <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
                <p className="text-white font-semibold">Upload Concluído!</p>
                <p className="text-green-300 text-sm">{fileName}</p>
              </div>
            )}

            {status === "error" && (
              <div className="space-y-2">
                <AlertCircle className="w-8 h-8 text-red-400 mx-auto" />
                <p className="text-white font-semibold">Erro no Upload</p>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Informações */}
          <Card className="bg-slate-800/50 border-purple-500/20 p-3">
            <p className="text-purple-300 text-xs">
              <strong>Formatos suportados:</strong> MP4, WebM, MOV, AVI
            </p>
            <p className="text-purple-300 text-xs mt-1">
              <strong>Recomendação:</strong> Vídeos em 1080p ou 720p funcionam melhor
            </p>
          </Card>

          {/* Botões */}
          <div className="flex gap-2">
            {status === "error" && (
              <Button
                onClick={resetForm}
                variant="outline"
                className="flex-1 border-purple-500/30 text-purple-300 hover:border-cyan-400/50"
              >
                Tentar Novamente
              </Button>
            )}

            {status !== "success" && (
              <Button
                onClick={() => setIsOpen(false)}
                variant="outline"
                className="flex-1 border-purple-500/30 text-purple-300 hover:border-cyan-400/50"
              >
                Cancelar
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
