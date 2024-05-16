import express from "express";
import {
  addToDoList,
  deleteToDoList,
  deleteUser,
  getToDoList,
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

user.get("/todo/:id", getToDoList);

user.post("/todo/add/:id", addToDoList);

user.delete("/:id/todo/delete/:todoId", deleteToDoList);

export default user;
