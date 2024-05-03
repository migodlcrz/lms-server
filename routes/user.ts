import express from "express";
import { getUsers } from "../controllers/userControllers";

const user = express.Router();

user.get("/", getUsers);

export default user;
