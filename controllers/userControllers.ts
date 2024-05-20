import mongoose from "mongoose";
import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import validator from "validator";

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

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("PUMASOK");

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ error: "All fields must be filled." });
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
    res.status(400).json({ error: "User already exist. Go to login." });
    return;
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id, user.email);

    const user_ = user;
    res.status(200).json({ message: "User created.", user_, email, token });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export const googleRegisterUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      res.status(400).json({ error: "Incomplete details." });
      return;
    }

    const exist = await User.findOne({ email });

    if (exist) {
      res.status(400).json({ error: "Account is already registered." });
      return;
    }

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      const user_ = user;
      res.status(200).json({ message: "User created.", user_, email });
    } catch (error) {
      res.status(400).json({ message: "Server error." });
    }
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

export const getToDoList = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving to-do list", error });
  }
};

export const addToDoList = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, date } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTodo = { title, date };
    user.todos.push(newTodo);
    await user.save();

    res.status(201).json({ message: "To-do item added", todo: newTodo });
  } catch (error) {
    res.status(500).json({ message: "Error adding to-do item", error });
  }
};

export const deleteToDoList = async (req: Request, res: Response) => {
  const { id, todoId } = req.params;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { $pull: { todos: { _id: todoId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ message: "User not found or to-do item not found" });
    }

    res.status(200).json({ message: "To-do item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting to-do item", error });
  }
};
