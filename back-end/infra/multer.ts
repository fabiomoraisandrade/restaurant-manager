import multer from "multer";
import path from "path";
import crypto from "crypto";
import fs from "fs";
import { ApiError } from "../src/errors/apiError";

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: (_req, _file, callback) => {
          const uploadPath = path.resolve(__dirname, "..", folder);

          // Verifica se a pasta existe, se não existir, cria a pasta
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          callback(null, uploadPath);
        },
        filename: (_req, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`;
          callback(null, fileName);
        },
      }),
      limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB
      },
      fileFilter: (_req, file, callback) => {
        const allowedMimes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedMimes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(ApiError.badRequest("Formato de arquivo inválido."));
        }
      },
    };
  },
};
