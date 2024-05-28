import User from "../../models/userModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "User not found." });
  }

  const user = await User.findOneAndDelete({ _id: id });

  if (!user) {
    res.status(400).json({ error: "User not found." });
  }

  res.status(200).json({ message: "User deleted" });
};
