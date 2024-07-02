import express from "express";

import { createModule } from "../controllers/moduleController/create";
import { getModules, getModule } from "../controllers/moduleController/get";
import { uploadFile } from "../controllers/moduleController/uploadFile";
import { deleteFile } from "../controllers/moduleController/deleteFile";
import upload from "../config/multer";

const mod = express.Router();

mod.get("/", getModules);

mod.get("/:id", getModule);

mod.post("/create/:courseID", createModule);

mod.post("/uploadFile/:moduleID", upload.single("picture"), uploadFile);

mod.delete("/deleteFile/:moduleID", deleteFile);

export default mod;
