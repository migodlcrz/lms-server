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
    publisher: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    modules: [
      {
        topics: [
          {
            name: {
              type: String,
            },
            isComplete: { type: Boolean, default: false },
            dateCreated: {
              type: Date,
              default: Date.now,
            },
          },
        ],
        quiz: [
          {
            name: {
              type: String,
            },
            isComplete: { type: Boolean, default: false },
            dateCreated: {
              type: Date,
              default: Date.now,
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
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Course>("Course", courseSchema);
