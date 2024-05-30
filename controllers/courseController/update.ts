import mongoose from "mongoose";
import { Request, Response } from "express";
import Course from "../../models/courseModel";

export const editCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID input." });
  }

  const { courseName, courseID, description, tier, isPublished } = req.body;

  const updateObject: any = {};

  if (courseName) {
    updateObject.courseName = courseName;
  }

  if (courseID) {
    updateObject.courseID = courseID;
  }

  if (description) {
    updateObject.description = description;
  }

  if (tier) {
    updateObject.tier = tier;
  }

  if (isPublished) {
    updateObject.isPublished = isPublished;
  }

  console.log(updateObject);

  try {
    const course = await Course.findOneAndUpdate(
      { _id: id },
      { ...updateObject },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ error: "Course does not exist." });
    }

    res.status(200).json({ message: "Course edited.", course });
  } catch (error) {
    console.error("Error editing course:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
