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
  modules: Module[];
  students: { id: string }[];
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
    modules: [
      {
        topics: [
          {
            name: {
              type: String,
              default: "Topic - 0! Welcome",
              required: true,
            },
            isComplete: { type: Boolean, default: false, required: true },
            dateCreated: {
              type: Date,
              default: Date.now,
              required: true,
            },
          },
        ],
        quiz: [
          {
            name: {
              type: String,
              default: "Quiz - 0! Welcome",
              required: true,
            },
            isComplete: { type: Boolean, default: false, required: true },
            dateCreated: {
              type: Date,
              default: Date.now,
              required: true,
            },
          },
        ],
      },
    ],
    students: [
      {
        id: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<Course>("Course", courseSchema);
