import mongoose from "mongoose";
import { Request, Response } from "express";
import Course from "../../models/courseModel";
import User from "../../models/userModel";

// export const deleteCourse = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "Course not found." });
//   }

//   const course = await Course.findOneAndDelete({ _id: id });

//   if (!course) {
//     return res.status(404).json({ error: "Course not found." });
//   }

//   res.status(200).json({ message: "Course successfully deleted." });
// };

export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Course not found." });
  }

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    // Loop through all students enrolled in the course
    for (const studentId of course.students) {
      const student = await User.findById(studentId);

      if (student) {
        // Remove the course from the student's courses array
        student.courses = student.courses.filter(
          (courseId: { toString: () => string }) => courseId.toString() !== id
        );
        await student.save();
      }
    }

    // Now delete the course
    await Course.findOneAndDelete({ _id: id });

    res.status(200).json({ message: "Course successfully deleted." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
