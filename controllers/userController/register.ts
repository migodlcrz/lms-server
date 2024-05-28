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

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("PUMASOK");

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ error: "All fields must be filled." });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ error: "Invalid email." });
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
