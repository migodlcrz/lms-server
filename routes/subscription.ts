import { getSubscription } from "../controllers/subscriptionController/get";
import { createSession } from "../controllers/subscriptionController/createSession";
import User from "../models/userModel";
import express from "express";

const subscription = express.Router();

subscription.get("/prices", getSubscription);

subscription.post("/session", createSession);

export default subscription;
