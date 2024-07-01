import express from "express";

import { createModule } from "../controllers/moduleController/create";
import { getModules, getModule } from "../controllers/moduleController/get";
import { uploadFile } from "../controllers/moduleController/uploadPhoto";
import upload from "../config/multer";

const mod = express.Router();

mod.get("/", getModules);

mod.get("/:id", getModule);

mod.post("/create/:courseID", createModule);

mod.post(
  "/uploadFile",
  upload.single("picture"),
  (req, res, next) => {
    console.log("Multer processed file:", req.file);
    next();
  },
  uploadFile
);

export default mod;
