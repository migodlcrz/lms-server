import { Request, Response } from "express";
import { stripe } from "../../lib/stripe";
import User from "../../models/userModel";

export const createSession = async (req: Request, res: Response) => {
  try {
    const { email, priceId } = req.body;

    if (!email || !priceId) {
      return res.status(400).json({ error: "Missing email or priceId" });
    }

    const user = await User.findOne({ email });

    if (!user || !user.stripeCustomerId) {
      return res
        .status(404)
        .json({ error: "User not found or missing stripeCustomerId" });
    }

    const price = await stripe.prices.retrieve(priceId);
    if (!price) {
      return res.status(400).json({ error: "Invalid priceId" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3002/pricing",
      cancel_url: "http://localhost:3002/pricing",
      customer: user.stripeCustomerId,
    });

    return res.json(session);
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
