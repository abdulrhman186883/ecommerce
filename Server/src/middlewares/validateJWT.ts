import type { Request,Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/userModel.js";
import type {ExtendRequest} from "../types/extendedRequests.js";

 interface JWTPayload {
  email: string;
  role: "user" | "admin";
}



const validateJWT = async (req: ExtendRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.get("authorization");

    if (!authorizationHeader) {
      return res.status(403).send("Authorization not provided");
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(403).send("Token not provided");
    }

    // Verify token
    const secret = process.env.JWT_SECRET || "oK1294959932948Fck812911012i";

    const payload = jwt.verify(token, secret) as JWTPayload;

    if (!payload || !payload.email) {
      return res.status(403).send("Invalid token payload");
    }

    // Find user in DB
    const user = await UserModel.findOne({ email: payload.email });

    if (!user) {
      return res.status(403).send("User not found");
    }

    // Attach full user document to request
    req.user = user;

    next();
  } catch (err) {
    return res.status(403).send("Invalid or expired token");
  }
};

export default validateJWT;
