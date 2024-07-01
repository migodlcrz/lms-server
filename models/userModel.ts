import mongoose from "mongoose";

const todoItemSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  date: {
    type: Date,
  },
});

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
      default: "Free",
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
