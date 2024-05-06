import mongoose, { Schema, Document, Model } from "mongoose";

interface Course extends Document {
  courseId: string;
  courseName: string;
  students: any[];
}

const courseSchema = new mongoose.Schema(
  {
    courseID: {
      type: String,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },
    students: [
      {
        id: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Course>("Course", courseSchema);
