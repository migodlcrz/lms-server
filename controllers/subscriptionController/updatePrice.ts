import { Request, Response } from "express";
import { stripe } from "../../lib/stripe";

export const updatePrice = async (req: Request, res: Response) => {
  const priceId = req.params;
  const { unit_amount } = req.body;
};
