import { Request, Response } from "express";
import { stripe } from "../../lib/stripe";
import User from "../../models/userModel";
import Tier from "../../models/tierModel"; // Assuming Tier model is correctly imported

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

    const amount = latestPayment.data[0].amount;

    // Fetch tier prices from MongoDB
    const tiers = await Tier.find(); // Retrieve all tiers from MongoDB

    // console.log("AMOUNT: ", amount);
    // console.log("TIERS: ", tiers);

    let userTier = "Free"; // Default tier if no matching price is found

    // Determine user's tier based on the latest payment amount
    for (const tier of tiers) {
      if (amount === tier.price) {
        userTier = tier.nickname; // Assuming `nickname` corresponds to tier name
        break;
      }
    }

    // Update user's tier in the database
    user.tier = userTier;
    await user.save();

    res.json({ tier: userTier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
