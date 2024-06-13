// import { Request, Response } from "express";
// import { stripe } from "../../lib/stripe";

// export const  = async (req: Request, res: Response) => {
//   const { productId, price } = req.body;

//   // Validate input
//   if (!productId || !price) {
//     return res.status(400).json({ error: "ProductId and price are required." });
//   }

//   try {
//     // Retrieve the product from Stripe
//     const product = await stripe.products.retrieve(productId);

//     // Update the existing price
//     const updatedPrice = await stripe.prices.update(product.metadata.priceId, {
//       unit_amount: price * 100, // Stripe expects amount in cents
//     });

//     res.status(200).json({
//       price: updatedPrice,
//     });
//   } catch (error) {
//     console.error("Error editing price:", error);
//     res.status(500).json({
//       error: "Internal server error.",
//     });
//   }
// };
