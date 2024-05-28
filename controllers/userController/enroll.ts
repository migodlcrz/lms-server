import User from "../../models/userModel";
import Course from "../../models/courseModel";
import { Request, Response } from "express";
import mongoose from "mongoose";

export const enrollUser = async (req: Request, res: Response) => {
  const { courseId, userId } = req.params;

  try {
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({ error: "Course or User not found." });
    }

    const isUserAlreadyEnrolled = course.students.includes(userId);
    const isCourseAlreadyAdded = user.courses.includes(courseId);

    if (isUserAlreadyEnrolled || isCourseAlreadyAdded) {
      return res
        .status(400)
        .json({ error: "You're already enrolled in this course." });
    }

    course.students.push(userId);
    await course.save();

    user.courses.push(courseId);
    await user.save();

    res.status(200).json({ message: "Enrolled successfully", user, course });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const unEnrollUser = async (req: Request, res: Response) => {
  const { courseId, userId } = req.params;

  try {
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course || !user) {
      return res.status(404).json({ error: "Course or User not found." });
    }

    const isUserEnrolled = course.students.includes(userId);
    const isCourseAdded = user.courses.includes(courseId);

    if (!isUserEnrolled || !isCourseAdded) {
      return res
        .status(400)
        .json({ error: "User is not enrolled in this course." });
    }

    // Remove userId from course's students array
    course.students = course.students.filter((id: string) => id !== userId);
    await course.save();

    // Remove courseId from user's courses array
    user.courses = user.courses.filter((id: string) => id !== courseId);
    await user.save();

    res.status(200).json({ message: "Unenrolled successfully", user, course });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
