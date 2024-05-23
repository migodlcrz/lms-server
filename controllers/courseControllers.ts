import mongoose from "mongoose";
import { Request, Response } from "express";
import Course from "../models/courseModel";

export const getCourses = async (req: Request, res: Response) => {
  const courses = await Course.find({}).sort({ createdAt: -1 });

  if (!courses) {
    res.status(404).json({ error: "No courses exist." });
  }

  res.status(200).json(courses);
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { courseID, courseName, publisher, tier, description } = req.body;

    const exist = await Course.findOne({ courseID });

    if (exist) {
      return res.status(400).json({ error: "Course code already registered." });
    }

    if (!courseID || !courseName || !publisher || !tier || !description) {
      return res.status(400).json({ error: "Incomplete course details." });
    }

    const courseData = {
      courseID,
      courseName,
      publisher,
      tier,
      description,
    };

    const course = await Course.create(courseData);

    return res
      .status(200)
      .json({ message: "Course successfully created.", course });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Course not found." });
  }

  const course = await Course.findOneAndDelete({ _id: id });

  if (!course) {
    return res.status(404).json({ error: "Course not found." });
  }

  res.status(200).json({ message: "Course successfully deleted." });
};

export const editCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID input." });
  }

  const course = await Course.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!course) {
    return res.status(404).json({ error: "Card does not exist." });
  }

  res.status(200).json({ message: "Course edited." });
};
