import User from "../../models/userModel";
import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt, { Secret } from "jsonwebtoken";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  if (!users) {
    res.status(400).json({ error: "No users found" });
  }

  res.status(200).json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    res.status(400).json({ error: "No users found" });
  }

  res.status(200).json(user);
};
