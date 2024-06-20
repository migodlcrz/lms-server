import { Request, Response } from "express";
import { stripe } from "../../lib/stripe";

export const getSubscription = async (req: Request, res: Response) => {
  try {
    // Retrieve all products from Stripe
    const productsResponse = await stripe.products.list();

    // Extract products from the response
    const products = productsResponse.data;

    // Fetch latest active prices for each product
    const productsWithPrices = await Promise.all(
      products.map(async (product) => {
        // Retrieve prices for the current product
        const pricesResponse = await stripe.prices.list({
          product: product.id,
          active: true,
          limit: 1, // Limit to 1 price (latest)
          expand: ["data.product"], // Expand to include the product information
        });

        // Extract the latest active price
        const latestPrice = pricesResponse.data[0];

        // Return product with latest price
        return {
          ...product,
          latest_price: latestPrice,
        };
      })
    );

    // Send the list of products with their latest prices as the response
    res.status(200).json(productsWithPrices);
  } catch (error) {
    console.error("Error fetching products and prices:", error);
    res.status(500).json({ error: error });
  }
};
