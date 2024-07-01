import express from "express";

import { createModule } from "../controllers/moduleController/create";
import { getModules, getModule } from "../controllers/moduleController/get";
import { uploadFile } from "../controllers/moduleController/uploadPhoto";
const mod = express.Router();

mod.get("/", getModules);

mod.get("/:id", getModule);

mod.post("/create/:courseID", createModule);

mod.post("/uploadFile", uploadFile);

export default mod;
