import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/adminModel";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Unauthorized access." });
    return;
  }

  const token = authorization?.split(" ")[1];

  try {
    if (!token) {
      res.status(401).json({ error: "Unauthorized access." });
    }

    const decodedToken: any = jwt.decode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      res.status(401).json({ error: "Token expired." });
    }

    const { _id } = jwt.verify(token, process.env.SECRET as string) as {
      _id: string;
    };

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Unauthorized access." });
  }
};

export default requireAuth;
