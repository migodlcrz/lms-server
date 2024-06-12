import mongoose from "mongoose";

// Define the schema for a to-do item
const todoItemSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: Date,
    // type: Number,
  },
});

const CourseIdSchema = new mongoose.Schema({});

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    tier: {
      type: String,
      required: true,
      default: "free",
    },
    courses: {
      type: [String],
    },
    todos: [todoItemSchema],
  },
  { timestamps: true }
);

const User = mongoose.models.user || mongoose.model("user", userSchema);

export default User;
