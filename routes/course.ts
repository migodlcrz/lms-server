import express from "express";
import { getCourses, createCourse } from "../controllers/courseControllers";

const course = express.Router();

course.get("/", getCourses);

course.post("/create", createCourse);

export default course;
