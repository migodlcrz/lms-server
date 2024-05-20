"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courseControllers_1 = require("../controllers/courseControllers");
const course = express_1.default.Router();
course.get("/", courseControllers_1.getCourses);
course.post("/create", courseControllers_1.createCourse);
course.delete("/delete/:id", courseControllers_1.deleteCourse);
exports.default = course;
