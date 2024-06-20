import { Request, Response } from "express";
import { stripe } from "../../lib/stripe";
import Tier from "../../models/tierModel"; // Assuming Tier model is correctly imported

export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params; // Assuming productId is passed as a route parameter
    const { nickname, unit_amount, currency } = req.body; // Assuming currency is also passed in the request body

    // Find the tier based on productId (assuming Tier is a MongoDB model)
    const tier = await Tier.findOne({ productId: productId });
    if (!tier) {
      return res
        .status(404)
        .json({ error: "Tier not found for the provided productId" });
    }

    // Fetch all prices for the product
    const prices = await stripe.prices.list({
      product: productId,
      active: true,
    });

    // Archive all active prices
    const archivePromises = prices.data.map((price) => {
      return stripe.prices.update(price.id, {
        active: false,
      });
    });
    await Promise.all(archivePromises);

    // Create a new price for the product
    const newPrice = await stripe.prices.create({
      nickname,
      unit_amount,
      currency,
      product: productId,
    });

    // Update the tier price in MongoDB
    tier.price = unit_amount; // Update tier price with the new unit_amount
    await tier.save(); // Save the updated tier document

    // Send the new price details and updated tier as the response
    res.status(200).json({ newPrice, tier });
  } catch (error) {
    console.error("Error updating price:", error);
    res.status(500).json({ error: error });
  }
};
