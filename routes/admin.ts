import express from "express";
import requireAuth from "../middleware/requireAuth";
import {
  registerAdmin,
  loginAdmin,
  deleteAdmin,
  getAdmins,
  updateAdmin,
} from "../controllers/adminControllers";

const admin = express.Router();

admin.get("/", getAdmins);

admin.post("/signup", registerAdmin);

admin.post("/login", loginAdmin);

admin.patch("/update/:id", updateAdmin);

admin.delete("/delete/:id", deleteAdmin);

export default admin;
