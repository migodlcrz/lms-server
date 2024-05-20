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
exports.deleteAdmin = exports.updateAdmin = exports.loginAdmin = exports.googleLoginAdmin = exports.registerAdmin = exports.getAdmins = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const validator_1 = __importDefault(require("validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (_id, email) => {
    const secretOrPrivateKey = process.env.SECRET || "";
    return jsonwebtoken_1.default.sign({ _id: _id, email: email }, secretOrPrivateKey, {
        expiresIn: "1h",
    });
};
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield adminModel_1.default.find({}).sort({ createdAt: -1 });
    if (!users) {
        res.status(400).json({ error: "No users found" });
    }
    res.status(200).json(users);
});
exports.getAdmins = getAdmins;
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: "All fields must be filled." });
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
    const exist = yield adminModel_1.default.findOne({ email });
    if (exist) {
        res.status(400).json({ message: "Email already linked." });
        return;
    }
    try {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        const user = yield adminModel_1.default.create({ name, email, password: hashedPassword });
        const token = createToken(user._id, user.email);
        const name_ = user.name;
        const user_ = user.email;
        res
            .status(200)
            .json({ message: "User created.", name_, user_, email, token });
    }
    catch (error) {
        res.status(400).json({ message: "Server error." });
    }
});
exports.registerAdmin = registerAdmin;
const googleLoginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        if (!name || !email) {
            res.status(400).json({ error: "Incomplete details." });
            return;
        }
        const user = yield adminModel_1.default.findOne({ email });
        if (!user) {
            res.status(404).json({ error: "No admin found." });
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
        res.status(400).json({ error: "Server error." });
    }
});
exports.googleLoginAdmin = googleLoginAdmin;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "All fields must be filled." });
        return;
    }
    const user = yield adminModel_1.default.findOne({ email });
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
        const name_ = user.name;
        const user_ = user.email;
        // res.status(200).json({ user_, jwt: token });
        res.status(200).json({ message: "Logged in.", name_, user_, token: token });
    }
    catch (error) {
        res.status(400).json({ error: "Server error." });
    }
});
exports.loginAdmin = loginAdmin;
const updateAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "User does not exist." });
    }
    const card = yield adminModel_1.default.findOneAndUpdate({ _id: id }, Object.assign({}, req.body));
    if (!card) {
        return res.status(404).json({ error: "User does not exist." });
    }
    res.status(200).json(card);
});
exports.updateAdmin = updateAdmin;
const deleteAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Admin not found." });
    }
    const card = yield adminModel_1.default.findOneAndDelete({ _id: id });
    if (!card) {
        return res.status(404).json({ error: "User does not exist." });
    }
    res.status(200).json({ message: "User successfully deleted." });
});
exports.deleteAdmin = deleteAdmin;
