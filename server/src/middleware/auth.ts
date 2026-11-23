import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { verifyAccessToken } from "../utils/jwt";

export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authorization = req.header("authorization");
  const [scheme, token, extra] = authorization?.split(" ") ?? [];

  if (scheme?.toLowerCase() !== "bearer" || !token || extra) {
    res.status(401).json({ message: "Требуется Bearer-токен" });
    return;
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Недействительный или просроченный токен" });
      return;
    }
    next(error);
  }
};
