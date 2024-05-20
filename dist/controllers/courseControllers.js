"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.createCourse = exports.getCourses = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const courseModel_1 = __importDefault(require("../models/courseModel"));
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield courseModel_1.default.find({}).sort({ createdAt: -1 });
    if (!courses) {
        res.status(404).json({ error: "No courses exist." });
    }
    res.status(200).json(courses);
});
exports.getCourses = getCourses;
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseID, courseName, publisher, price } = req.body;
        const exist = yield courseModel_1.default.findOne({ courseID });
        if (exist) {
            return res.status(400).json({ error: "Course code already registered." });
        }
        if (!courseID || !courseName) {
            return res.status(400).json({ error: "Incomplete course details." });
        }
        const courseData = {
            courseID,
            courseName,
            publisher,
            price,
        };
        const course = yield courseModel_1.default.create(courseData);
        return res
            .status(200)
            .json({ message: "Course successfully created.", course });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error." });
    }
});
exports.createCourse = createCourse;
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Course not found." });
    }
    const course = yield courseModel_1.default.findOneAndDelete({ _id: id });
    if (!course) {
        return res.status(404).json({ error: "Course not found." });
    }
    res.status(200).json({ message: "Course successfully deleted." });
});
exports.deleteCourse = deleteCourse;
