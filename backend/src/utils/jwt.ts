import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET as string;

if (!SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
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
