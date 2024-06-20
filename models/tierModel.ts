import mongoose from "mongoose";

const tierSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Tier = mongoose.models.tier || mongoose.model("tier", tierSchema);

export default Tier;
