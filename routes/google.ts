import express from "express";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();

const google = express.Router();

google.post("/", async function (req, res, next) {});
