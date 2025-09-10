import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { config } from "../config";

const SECRET = config.jwtSecret;

if (!SECRET || SECRET === 'fallback_secret') {
  throw new Error("Missing or invalid JWT_SECRET in environment variables");
}

export function signToken(
  payload: object,
  expiresIn: SignOptions["expiresIn"] = "1d"
): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET, options);
}

export function verifyToken<T extends object = any>(
  token: string
): T | JwtPayload {
  return jwt.verify(token, SECRET) as T | JwtPayload;
}
