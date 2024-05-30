import mongoose from "mongoose";
import { Request, Response } from "express";
import Course from "../../models/courseModel";

export const getCourses = async (req: Request, res: Response) => {
  const courses = await Course.find({}).sort({ createdAt: -1 });

  if (!courses) {
    res.status(404).json({ error: "No courses exist." });
  }

  res.status(200).json(courses);
};

export const getCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Course not found." });
  }

  const courses = await Course.findById(id).sort({ createdAt: -1 });

  if (!courses) {
    res.status(404).json({ error: "No courses exist." });
  }

  res.status(200).json(courses);
};
