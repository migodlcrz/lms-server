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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ error: "Unauthorized access." });
        return;
    }
    const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
    try {
        if (!token) {
            res.status(401).json({ error: "Unauthorized access." });
        }
        const decodedToken = jsonwebtoken_1.default.decode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            res.status(401).json({ error: "Token expired." });
        }
        const { _id } = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.user = yield adminModel_1.default.findOne({ _id }).select("_id");
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: "Unauthorized access." });
    }
});
exports.default = requireAuth;
