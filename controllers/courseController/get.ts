import mongoose from "mongoose";
import { Request, Response } from "express";
import Course from "../../models/courseModel";

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ error: "No courses exist." });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses." });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Course not found." });
  }

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course." });
  }
};
