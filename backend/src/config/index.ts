import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const config = {
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`,
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret',
  databaseUrl: process.env.DATABASE_URL,
};
