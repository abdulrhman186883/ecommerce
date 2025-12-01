import type { Response, NextFunction } from "express";
import type { ExtendRequest } from "../types/extendedRequests.js";

export const isAdmin = (req: ExtendRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send("Not authenticated");
  }

  if (req.user.role !== "admin") {
    return res.status(403).send("Access denied. Admin only.");
  }

  next();
};
