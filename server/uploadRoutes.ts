import { Express, Request, Response } from "express";
import { storagePut } from "./storage";
import multer from "multer";

// Configurar multer para upload em memória
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 500 * 1024 * 1024, // 500MB
  },
  fileFilter: (req: any, file: any, cb: any) => {
    // Validar tipo de arquivo
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Apenas arquivos de vídeo são permitidos"));
    }
  },
});

export function registerUploadRoutes(app: Express) {
  // Rota para upload de vídeo
  app.post("/api/upload/video", upload.single("file"), async (req: any, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo foi enviado" });
      }

      const { originalname, buffer, mimetype } = req.file;

      // Gerar nome único para o arquivo
      const timestamp = Date.now();
      const fileKey = `videos/${timestamp}-${originalname}`;

      // Fazer upload para S3
      const { key, url } = await storagePut(fileKey, buffer, mimetype);

      return res.json({
        success: true,
        key,
        url,
        fileName: originalname,
        size: buffer.length,
      });
    } catch (error) {
      console.error("Erro ao fazer upload de vídeo:", error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Erro ao fazer upload do vídeo",
      });
    }
  });

  // Rota para upload de materiais (PDFs, documentos, etc)
  app.post("/api/upload/material", upload.single("file"), async (req: any, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "Nenhum arquivo foi enviado" });
      }

      const { originalname, buffer, mimetype } = req.file;

      // Validar tipos de arquivo permitidos
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
      ];

      if (!allowedTypes.includes(mimetype)) {
        return res.status(400).json({
          error: "Tipo de arquivo não permitido. Use PDF, Word, Excel ou TXT",
        });
      }

      // Gerar nome único para o arquivo
      const timestamp = Date.now();
      const fileKey = `materials/${timestamp}-${originalname}`;

      // Fazer upload para S3
      const { key, url } = await storagePut(fileKey, buffer, mimetype);

      return res.json({
        success: true,
        key,
        url,
        fileName: originalname,
        size: buffer.length,
      });
    } catch (error) {
      console.error("Erro ao fazer upload de material:", error);
      return res.status(500).json({
        error: error instanceof Error ? error.message : "Erro ao fazer upload do material",
      });
    }
  });
}
