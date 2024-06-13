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

    if (latestPayment.data[0].amount / 100 === 10) {
      return res.json({ tier: "Basic" });
    } else if (latestPayment.data[0].amount / 100 === 20) {
      return res.json({ tier: "Premium" });
    }

    res.json({ message: "None" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
