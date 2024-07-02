import { Request, Response } from "express";
import Module from "../../models/moduleModel";
import cloudinary from "../../cloudinary/cloudinary";

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { moduleID } = req.params;
    const { fileName } = req.body;

    const module = await Module.findById(moduleID);

    if (!module) {
      return res.status(400).json({ error: "Module not found." });
    }

    const index = module.lessons.indexOf(fileName);

    if (index === -1) {
      return res.status(404).json({ error: "File not found in module." });
    }

    module.lessons.splice(index, 1);
    await module.save();

    const publicIdMatch = fileName.match(/\/(?:v[0-9]+\/)?(.+)\.[a-z]+$/);
    const publicId = publicIdMatch ? publicIdMatch[1] : null;

    if (!publicId) {
      return res.status(400).json({ error: "Invalid file URL." });
    }

    cloudinary.uploader.destroy(publicId, (error: any, result: any) => {
      if (error) {
        console.error("Cloudinary deletion error:", error);
        return res
          .status(500)
          .json({ error: "Failed to delete file from Cloudinary." });
      }

      res.status(200).json({
        message: "File deleted successfully.",
        result,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error." });
  }
};
