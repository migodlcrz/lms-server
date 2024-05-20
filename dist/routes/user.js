"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const user = express_1.default.Router();
user.get("/", userControllers_1.getUsers);
user.post("/login", userControllers_1.loginUser);
user.post("/login/google", userControllers_1.googleLoginUser);
user.post("/register", userControllers_1.registerUser);
user.post("/register/google", userControllers_1.googleRegisterUser);
user.delete("/delete/:id", userControllers_1.deleteUser);
user.get("/todo/:id", userControllers_1.getToDoList);
user.post("/todo/add/:id", userControllers_1.addToDoList);
user.delete("/:id/todo/delete/:todoId", userControllers_1.deleteToDoList);
exports.default = user;
