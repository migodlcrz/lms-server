import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

interface User extends Document {
  name: string;
  email: string;
  password: string;
  courses: string[];
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    courses: [
      {
        courseCode: {
          type: Number,
        },
        courseName: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<User>("User", userSchema);
