import mongoose, { Schema, Document } from "mongoose";

interface Topic {
  name: string;
  isComplete: boolean;
}

interface Quiz {
  name: string;
  isComplete: boolean;
}

interface Module {
  topics: Topic[];
  quiz: Quiz[];
}

interface Course extends Document {
  courseID: string;
  courseName: string;
  publisher: string;
  tier: string;
  description: string;
  isPublished: boolean;
  modules: Module[];
  students: string[];
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
    publisher: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    modules: {
      type: [String],
    },
    students: {
      type: [String],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Course>("Course", courseSchema);
