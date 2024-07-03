import express from "express";

import { createModule } from "../controllers/moduleController/create";
import { getModules, getModule } from "../controllers/moduleController/get";
import { uploadFile } from "../controllers/moduleController/uploadFile";
import { uploadVideo } from "../controllers/moduleController/uploadVideo";
import { deleteFile } from "../controllers/moduleController/deleteFile";
import { imageUpload, videoUpload } from "../config/multer";

const mod = express.Router();

mod.get("/", getModules);

mod.get("/:id", getModule);

mod.post("/create/:courseID", createModule);

mod.post("/uploadFile/:moduleID", imageUpload.single("picture"), uploadFile);
mod.post("/uploadVideo/:moduleID", videoUpload.single("video"), uploadVideo);

mod.delete("/deleteFile/:moduleID", deleteFile);

export default mod;
