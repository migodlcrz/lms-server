import express from "express";
import { deleteUser, getUsers } from "../controllers/userControllers";

const user = express.Router();

user.get("/", getUsers);

user.delete("/delete/:id", deleteUser);

export default user;
