import express from "express";
import requireAuth from "../middleware/requireAuth";
import {
  registerUser,
  loginUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/userControllers";

const user = express.Router();

user.get("/", requireAuth, getUsers);

user.post("/signup", registerUser);

user.post("/login", loginUser);

user.patch("/update/:id", updateUser);

user.delete("/delete/:id", deleteUser);

export default user;
