import { Request, Response } from "express";
import { stripe } from "../../lib/stripe";
import User from "../../models/userModel";

export const getTier = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const latestPayment = await stripe.paymentIntents.list(
      {
        customer: user.stripeCustomerId,
      },
      {
        apiKey: process.env.STRIPE_SECRET_KEY,
      }
    );

    const amount = latestPayment.data[0].amount / 100;

    if (!latestPayment.data || latestPayment.data.length === 0) {
      user.tier = "Free";
      await user.save();
      return res.json({ tier: "Free" });
    }

    if (amount === 10) {
      user.tier = "Basic";
      await user.save();
      return res.json({ tier: "Basic" });
    }

    if (amount === 20) {
      user.tier = "Premium";
      await user.save();
      return res.json({ tier: "Premium" });
    }

    res.json({ message: "None" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
