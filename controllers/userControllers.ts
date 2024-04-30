import User from "../models/userModel";
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
export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  if (!users) {
    res.status(400).json({ error: "No users found" });
  }

  res.status(200).json(users);
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "All fields must be filled." });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ message: "Invalid email." });
    return;
  }

  if (!validator.isStrongPassword(password)) {
    res.status(400).json({
      error:
        "Password must be at least 8 characters long, should contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.",
    });
    return;
  }

  const exist = await User.findOne({ email });

  if (exist) {
    res.status(400).json({ message: "Email already linked." });
    return;
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = createToken(user._id, user.email);

    const user_ = user.email;

    res.status(200).json({ message: "User created.", user_, token });
  } catch (error) {
    res.status(400).json({ message: "Server error." });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "All fields must be filled." });
    return;
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400).json({ error: "Email Invalid." });
    return;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(400).json({ error: "Incorrect password." });
    return;
  }

  try {
    const token = createToken(user._id, user.email);
    const user_ = user.email;
    const pass_ = user.password;
    // res.status(200).json({ user_, jwt: token });
    res.status(200).json({ message: "Logged in.", user_, token: token });
  } catch (error) {
    res.status(400).json({ error: "Server error." });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "User does not exist." });
  }

  const card = await User.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!card) {
    return res.status(404).json({ error: "User does not exist." });
  }

  res.status(200).json(card);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id." });
  }

  const card = await User.findOneAndDelete({ _id: id });

  if (!card) {
    return res.status(404).json({ error: "User does not exist." });
  }

  res.status(200).json({ message: "User successfully deleted." });
};
