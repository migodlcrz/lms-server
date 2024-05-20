"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var admin_1 = require("./dist/routes/adminadmin");
var user_1 = require("./dist/routes/user/user");
var course_1 = require("./dist/routes/courseourse");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(function (req, res, next) {
  console.log(req.path, req.method);
  next();
});
app.use("/api/admin", admin_1.default);
app.use("/api/user", user_1.default);
app.use("/api/course", course_1.default);
var mongoUri = process.env.MONGO_URL;
if (!mongoUri) {
  console.error(
    "MongoDB connection string is missing in the environment variables."
  );
  process.exit(1);
}
mongoose_1.default
  .connect(mongoUri)
  .then(function () {
    app.listen(process.env.PORT, function () {
      console.log(
        "Database and server is running on http://localhost:".concat(
          process.env.PORT,
          "/"
        )
      );
    });
  })
  .catch(function (error) {
    console.log(error);
  });
