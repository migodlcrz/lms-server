import { Request, Response } from "express";
import { stripe } from "../../lib/stripe";

export const getSubscription = async (req: Request, res: Response) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  return res.status(200).json(prices);
};
