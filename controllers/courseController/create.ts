import { Request, Response } from "express";
import Course from "../../models/courseModel";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { courseID, courseName, publisher, tier, description } = req.body;

    const sameCourseId = await Course.findOne({ courseID });

    const sameCourseName = await Course.findOne({ courseName });

    if (sameCourseId && sameCourseName) {
      return res
        .status(400)
        .json({ error: "Course name and code already registered." });
    }

    if (sameCourseId) {
      return res.status(400).json({ error: "Course code already registered." });
    }

    if (sameCourseName) {
      return res.status(400).json({ error: "Course name already registered." });
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
