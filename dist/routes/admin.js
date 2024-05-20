"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminControllers_1 = require("../controllers/adminControllers");
const admin = express_1.default.Router();
admin.get("/", adminControllers_1.getAdmins);
admin.post("/register", adminControllers_1.registerAdmin);
admin.post("/login", adminControllers_1.loginAdmin);
admin.post("/login/google", adminControllers_1.googleLoginAdmin);
admin.patch("/update/:id", adminControllers_1.updateAdmin);
admin.delete("/delete/:id", adminControllers_1.deleteAdmin);
exports.default = admin;
