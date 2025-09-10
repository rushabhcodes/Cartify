import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";


export interface UserPayload {
  id: number;
  email: string;
}

export default function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "Missing Authorization header" });
  const token = header.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Invalid Authorization header" });
  try {
    const payload = verifyToken<UserPayload>(token);
    req.user = payload; // at minimum { id, email }
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
