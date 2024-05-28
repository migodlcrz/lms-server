import express from "express";
import {
  getToDoList,
  addToDoList,
  deleteToDoList,
} from "../controllers/userController/todo";

import { getUsers, getUser } from "../controllers/userController/get";

import {
  loginUser,
  googleLoginUser,
} from "../controllers/userController/login";

import {
  registerUser,
  googleRegisterUser,
} from "../controllers/userController/register";

import { deleteUser } from "../controllers/userController/delete";

import { enrollUser, unEnrollUser } from "../controllers/userController/enroll";

const user = express.Router();

user.get("/", getUsers);
user.get("/:id", getUser);

user.post("/login", loginUser);
user.post("/login/google", googleLoginUser);

user.post("/register", registerUser);
user.post("/register/google", googleRegisterUser);

user.delete("/delete/:id", deleteUser);

user.get("/todo/:id", getToDoList);
user.post("/todo/add/:id", addToDoList);
user.delete("/:id/todo/delete/:todoId", deleteToDoList);

user.post("/enroll/:userId/:courseId", enrollUser);
user.post("/unenroll/:userId/:courseId", unEnrollUser);

export default user;
