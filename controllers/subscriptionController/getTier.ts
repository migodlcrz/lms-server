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

    res.json(latestPayment.data[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
