/**
 * =========================================================
 * FILE INFO
 * =========================================================
 * File Name   : auth.repository.ts
 * Type        : Repository
 * Feature     : Feature 2 - Authentication
 * Source Path : apps/api/src/features/auth/repositories/auth.repository.ts
 * Used In     : Auth Service
 * Description : Database access layer for user-related queries
 *               - Create new user
 * Status      : ACTIVE
 * =========================================================
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepository {
  /**
   * =========================================================
   * CREATE USER
   * =========================================================
   */
  static async createUser(data: {
    email: string;
    password: string;
    name: string;
  }) {
    return prisma.user.create({
      data,
    });
  }
}