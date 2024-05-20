"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for a to-do item
const todoItemSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    date: {
        type: Date,
        // type: Number,
    },
});
// Define the user schema
const userSchema = new mongoose_1.default.Schema({
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
    image: {
        type: String,
        default: "",
    },
    todos: [todoItemSchema],
}, { timestamps: true });
const User = mongoose_1.default.models.user || mongoose_1.default.model("user", userSchema);
exports.default = User;
