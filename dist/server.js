"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const course_1 = __importDefault(require("./routes/course"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});
app.use("/api/admin", admin_1.default);
app.use("/api/user", user_1.default);
app.use("/api/course", course_1.default);
const mongoUri = process.env.MONGO_URL;
if (!mongoUri) {
    console.error("MongoDB connection string is missing in the environment variables.");
    process.exit(1);
}
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Database and server is running on http://localhost:${process.env.PORT}/`);
    });
})
    .catch((error) => {
    console.log(error);
});
