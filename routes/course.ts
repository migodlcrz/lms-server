import express from "express";
import {
  getCourses,
  createCourse,
  deleteCourse,
} from "../controllers/courseControllers";

const course = express.Router();

course.get("/", getCourses);

course.post("/create", createCourse);

course.delete("/delete/:id", deleteCourse);

export default course;
