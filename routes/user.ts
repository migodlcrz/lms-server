import express from "express";
import {
  deleteUser,
  getUsers,
  googleLoginUser,
  loginUser,
  registerUser,
} from "../controllers/userControllers";

const user = express.Router();

user.get("/", getUsers);

user.post("/login", loginUser);

user.post("/login/google", googleLoginUser);

user.post("/register", registerUser);

user.delete("/delete/:id", deleteUser);

export default user;
