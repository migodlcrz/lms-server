import { Request, Response } from "express";
import Module from "../../models/moduleModel";

export const uploadVideo = async (req: Request, res: Response) => {
  try {
    const { moduleID } = req.params;

    const module = await Module.findById(moduleID);

    if (!module) {
      return res.status(400).json({ error: "Module not found." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    module.lessons.push((req.file as any).path);
    await module.save();

    res.status(200).json({ message: "Video uploaded!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
