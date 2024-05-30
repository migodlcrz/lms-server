import express from "express";

import { getCourse, getCourses } from "../controllers/courseController/get";
import { createCourse } from "../controllers/courseController/create";
import { deleteCourse } from "../controllers/courseController/delete";
import { editCourse } from "../controllers/courseController/update";

const course = express.Router();

course.get("/", getCourses);

course.get("/:id", getCourse);

course.post("/create", createCourse);

course.patch("/edit/:id", editCourse);

course.delete("/delete/:id", deleteCourse);

export default course;
