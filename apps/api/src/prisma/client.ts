/**
 * =========================================================
 * FILE INFO
 * =========================================================
 * File Name   : client.ts
 * Type        : Config
 * Feature     : Feature 1 & 2 - Prisma Client
 * Source Path : apps/api/src/prisma/client.ts
 * Used In     : Services, Repositories
 * Description : Simple Prisma client instance
 *               - Basic Prisma client without adapter
 * Status      : ACTIVE (Alternative to shared/config/prisma.ts)
 * =========================================================
 */

import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();