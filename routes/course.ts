import express from "express";
import {
  getCourses,
  createCourse,
  deleteCourse,
  editCourse,
  getCourse,
} from "../controllers/courseControllers";

const course = express.Router();

course.get("/", getCourses);

course.get("/:id", getCourse);

course.post("/create", createCourse);

course.patch("/edit/:id", editCourse);

course.delete("/delete/:id", deleteCourse);

export default course;
