import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";

import adminRoute from "./routes/admin";
import userRoute from "./routes/user";
import courseRoute from "./routes/course";
import subscriptionRoute from "./routes/subscription";
import moduleRoute from "./routes/module";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/admin", adminRoute);
app.use("/api/user", userRoute);
app.use("/api/course", courseRoute);
app.use("/api/subs", subscriptionRoute);
app.use("/api/module", moduleRoute);

const mongoUri = process.env.MONGO_URL;
const port = process.env.PORT || 4000;

if (!mongoUri) {
  console.error(
    "MongoDB connection string is missing in the environment variables."
  );
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Database and server is running on http://localhost:${port}/`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
