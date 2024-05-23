import express from "express";
import {
  getCourses,
  createCourse,
  deleteCourse,
  editCourse,
} from "../controllers/courseControllers";

const course = express.Router();

course.get("/", getCourses);

course.post("/create", createCourse);

course.patch("/edit/:id", editCourse);

course.delete("/delete/:id", deleteCourse);

export default course;
