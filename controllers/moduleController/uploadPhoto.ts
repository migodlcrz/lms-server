import { Request, Response } from "express";

export const uploadFile = async (req: Request, res: Response) => {
  console.log("File received:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ url: (req.file as any).path, id: (req.file as any).filename });
};
