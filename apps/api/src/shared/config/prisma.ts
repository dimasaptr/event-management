/**
 * =========================================================
 * FILE INFO
 * =========================================================
 * File Name   : prisma.ts
 * Type        : Config
 * Feature     : Feature 1 & 2 - Database
 * Source Path : apps/api/src/shared/config/prisma.ts
 * Used In     : All services and repositories
 * Description : Prisma client singleton configuration
 *               - Neon adapter for serverless PostgreSQL
 *               - Global singleton for development
 *               - Exported prisma instance
 * Status      : ACTIVE
 * =========================================================
 */

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const connectionString = process.env.DATABASE_URL!;

const adapter = new PrismaNeon({
  connectionString,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}