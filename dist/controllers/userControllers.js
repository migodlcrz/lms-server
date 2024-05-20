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
exports.deleteToDoList = exports.addToDoList = exports.getToDoList = exports.deleteUser = exports.googleLoginUser = exports.googleRegisterUser = exports.registerUser = exports.loginUser = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = __importDefault(require("validator"));
const createToken = (_id, email) => {
    const secretOrPrivateKey = process.env.SECRET || "";
    return jsonwebtoken_1.default.sign({ _id: _id, email: email }, secretOrPrivateKey, {
        expiresIn: "1h",
    });
};
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.default.find({}).sort({ createdAt: -1 });
    if (!users) {
        res.status(400).json({ error: "No users found" });
    }
    res.status(200).json(users);
});
exports.getUsers = getUsers;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "All fields must be filled." });
        return;
    }
    const user = yield userModel_1.default.findOne({ email });
    if (!user) {
        res.status(400).json({ error: "Invalid credentials." });
        return;
    }
    const match = yield bcrypt_1.default.compare(password, user.password);
    if (!match) {
        res.status(400).json({ error: "Invalid credentials." });
        return;
    }
    try {
        const token = createToken(user._id, user.email);
        const user_ = user;
        res.status(200).json({ message: "Logged in.", user_, token: token });
    }
    catch (error) {
        res.status(400).json({ error: "Server error." });
    }
});
exports.loginUser = loginUser;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    console.log("PUMASOK");
    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ error: "All fields must be filled." });
        return;
    }
    if (!validator_1.default.isEmail(email)) {
        res.status(400).json({ message: "Invalid email." });
        return;
    }
    if (!validator_1.default.isStrongPassword(password)) {
        res.status(400).json({
            error: "Password must be at least 8 characters long, should contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.",
        });
        return;
    }
    const exist = yield userModel_1.default.findOne({ email });
    if (exist) {
        res.status(400).json({ error: "User already exist. Go to login." });
        return;
    }
    try {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const user = yield userModel_1.default.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        const token = createToken(user._id, user.email);
        const user_ = user;
        res.status(200).json({ message: "User created.", user_, email, token });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.registerUser = registerUser;
const googleRegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        if (!firstName || !lastName || !email || !password) {
            res.status(400).json({ error: "Incomplete details." });
            return;
        }
        const exist = yield userModel_1.default.findOne({ email });
        if (exist) {
            res.status(400).json({ error: "Account is already registered." });
            return;
        }
        try {
            const saltRounds = 10;
            const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
            const user = yield userModel_1.default.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
            });
            const user_ = user;
            res.status(200).json({ message: "User created.", user_, email });
        }
        catch (error) {
            res.status(400).json({ message: "Server error." });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Server error." });
    }
});
exports.googleRegisterUser = googleRegisterUser;
const googleLoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({ error: "Incomplete details." });
            return;
        }
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "No user found. Sign up first" });
            return;
        }
        console.log(password, user.password);
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            res.status(400).json({ error: "Invalid credentials." });
            return;
        }
        try {
            const token = createToken(user._id, user.email);
            const user_ = user;
            res.status(200).json({ message: "Logged in.", user_, token: token });
        }
        catch (error) {
            res.status(400).json({ error: "Server error." });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ error: "Server error." });
    }
});
exports.googleLoginUser = googleLoginUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        res.status(404).json({ error: "User not found." });
    }
    const user = yield userModel_1.default.findOneAndDelete({ _id: id });
    if (!user) {
        res.status(400).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User deleted" });
});
exports.deleteUser = deleteUser;
const getToDoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ todos: user.todos });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving to-do list", error });
    }
});
exports.getToDoList = getToDoList;
const addToDoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, date } = req.body;
    try {
        const user = yield userModel_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const newTodo = { title, date };
        user.todos.push(newTodo);
        yield user.save();
        res.status(201).json({ message: "To-do item added", todo: newTodo });
    }
    catch (error) {
        res.status(500).json({ message: "Error adding to-do item", error });
    }
});
exports.addToDoList = addToDoList;
const deleteToDoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, todoId } = req.params;
    try {
        const updatedUser = yield userModel_1.default.findOneAndUpdate({ _id: id }, { $pull: { todos: { _id: todoId } } }, { new: true });
        if (!updatedUser) {
            return res
                .status(404)
                .json({ message: "User not found or to-do item not found" });
        }
        res.status(200).json({ message: "To-do item deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting to-do item", error });
    }
});
exports.deleteToDoList = deleteToDoList;
