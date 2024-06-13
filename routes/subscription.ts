import { getSubscription } from "../controllers/subscriptionController/get";
import { createSession } from "../controllers/subscriptionController/createSession";
import { getTier } from "../controllers/subscriptionController/getTier";
import { createSubscription } from "../controllers/subscriptionController/create";
// import { updateSubscription } from "../controllers/subscriptionController/update";
import User from "../models/userModel";
import express from "express";

const subscription = express.Router();

subscription.get("/prices", getSubscription);

subscription.post("/tier", getTier);

subscription.post("/session", createSession);

subscription.post("/create", createSubscription);

// subscription.post("/update", updateSubscription);

export default subscription;
