import User from "../../models/userModel";
import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt, { Secret } from "jsonwebtoken";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });

    if (!users || users.length === 0) {
      return res.status(400).json({ error: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User not found." });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "No user found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
