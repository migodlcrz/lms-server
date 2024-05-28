import User from "../../models/userModel";
import { Request, Response } from "express";
import validator from "validator";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt, { Secret } from "jsonwebtoken";

const createToken = (_id: string, email: string) => {
  const secretOrPrivateKey: Secret = process.env.SECRET || "";
  return jwt.sign({ _id: _id, email: email }, secretOrPrivateKey, {
    expiresIn: "1h",
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All fields must be filled." });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ error: "Invalid credentials." });
    return;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(400).json({ error: "Invalid credentials." });
    return;
  }

  try {
    const token = createToken(user._id, user.email);
    const user_ = user;
    res.status(200).json({ message: "Logged in.", user_, token: token });
  } catch (error) {
    res.status(400).json({ error: "Server error." });
  }
};

export const googleLoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ error: "Incomplete details." });
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ error: "No user found. Sign up first" });
      return;
    }

    console.log(password, user.password);

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(400).json({ error: "Invalid credentials." });
      return;
    }

    try {
      const token = createToken(user._id, user.email);
      const user_ = user;
      res.status(200).json({ message: "Logged in.", user_, token: token });
    } catch (error) {
      res.status(400).json({ error: "Server error." });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Server error." });
  }
};
