// multer.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary/cloudinary";

const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads/images",
    format: async (req: any, file: any) => "jpg",
    public_id: (req: any, file: { originalname: string }) =>
      file.originalname.split(".")[0],
  } as any,
});

const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads/videos",
    resource_type: "video",
    format: async (req: any, file: any) => "mp4",
    public_id: (req: any, file: { originalname: string }) =>
      file.originalname.split(".")[0],
  } as any,
});

const imageUpload = multer({ storage: imageStorage });
const videoUpload = multer({ storage: videoStorage });

export { imageUpload, videoUpload };
