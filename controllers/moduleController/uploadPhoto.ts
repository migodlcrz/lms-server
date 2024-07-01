import { UTApi } from "uploadthing/server";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

export const utapi = new UTApi({
  apiKey: process.env.UPLOADTHING_SECRET,
});

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    console.log(req.body);

    res.status(200).json(req.body);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};
