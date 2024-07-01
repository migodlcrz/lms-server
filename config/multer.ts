import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../cloudinary/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    format: async (req: any, file: any) => "jpg",
    public_id: (req: any, file: { originalname: string }) =>
      file.originalname.split(".")[0],
  } as any,
});

const upload = multer({ storage: storage });

export default upload;
