import { Request, Response } from "express";
import { stripe } from "../../lib/stripe";

export const createSubscription = async (req: Request, res: Response) => {
  const { name, description, price } = req.body;

  try {
    const product = await stripe.products.create({
      name,
      description,
    });

    const productPrice = await stripe.prices.create({
      unit_amount: price * 100,
      currency: "usd",
      product: product.id,
      nickname: name,
    });

    res.status(200).json({
      price: productPrice,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error.",
    });
  }
};
