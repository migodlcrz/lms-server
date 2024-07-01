import { Request, Response } from "express";
import Module from "../../models/moduleModel";
import Course from "../../models/courseModel";

export const createModule = async (req: Request, res: Response) => {
  try {
    const { courseID } = req.params;
    const { moduleName, moduleDescription } = req.body;

    if (!moduleName || !moduleDescription) {
      return res.status(400).json({ error: "Incomplete module details." });
    }

    const sameModuleName = await Module.findOne({ moduleName });

    if (sameModuleName) {
      return res.status(400).json({ error: "Module name already exists." });
    }

    const moduleData = {
      name: moduleName,
      description: moduleDescription,
      course: courseID,
    };

    const newModule = await Module.create(moduleData);

    const course = await Course.findById(courseID);
    if (!course) {
      return res.status(400).json({ error: "Course not found." });
    }

    course.modules.push(newModule._id);
    await course.save();

    return res.status(200).json({ message: "Module successfully created." });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
