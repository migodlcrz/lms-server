import { Request, Response } from "express";
import Module from "../../models/moduleModel";
import mongoose from "mongoose";

export const getModules = async (req: Request, res: Response) => {
  try {
    const mods = await Module.find({}).sort({ createdAt: -1 });

    if (!mods || mods.length === 0) {
      return res.status(400).json({ error: "No users found" });
    }

    res.status(200).json(mods);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getModule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "User not found." });
    }

    const mod = await Module.findById(id);

    if (!mod) {
      return res.status(400).json({ error: "No module found." });
    }

    res.status(200).json(mod);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
