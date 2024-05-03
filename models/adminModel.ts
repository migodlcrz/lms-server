import mongoose, { Schema, Document, Model } from "mongoose";

interface Admin extends Document {
  name: string;
  email: string;
  password: string;
  courses: string[];
}

const adminSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Admin>("Admin", adminSchema);
