"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const courseSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.default = mongoose_1.default.model("Course", courseSchema);
