import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Module = mongoose.models.module || mongoose.model("module", moduleSchema);

export default Module;
