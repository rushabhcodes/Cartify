export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'fallback_secret',
  databaseUrl: process.env.DATABASE_URL,
};

export { prisma } from '../lib/prisma';
