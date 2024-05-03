import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

import adminRoute from "./routes/admin";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/admin", adminRoute);

const mongoUri = process.env.MONGO_URL;

if (!mongoUri) {
  console.error(
    "MongoDB connection string is missing in the environment variables."
  );
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Database and server is running on http://localhost:${process.env.PORT}/`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
