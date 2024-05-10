import express from "express";
import {
  deleteUser,
  getUsers,
  googleLoginUser,
  googleRegisterUser,
  loginUser,
  registerUser,
} from "../controllers/userControllers";

const user = express.Router();

user.get("/", getUsers);

user.post("/login", loginUser);

user.post("/login/google", googleLoginUser);

user.post("/register", registerUser);

user.post("/register/google", googleRegisterUser);

user.delete("/delete/:id", deleteUser);

export default user;
