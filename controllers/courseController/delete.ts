import mongoose from "mongoose";
import { Request, Response } from "express";
import Course from "../../models/courseModel";

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
