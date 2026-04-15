/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : users.service.ts
 * Type        : Service
 * Feature     : Feature 2 - User Profile
 * Source Path : apps/api/src/features/users/services/users.service.ts
 * Description : Handle user profile logic
 * =========================================
 */

import { prisma } from "../../../shared/config/prisma.js";
import bcrypt from "bcrypt";

export class UsersService {
  static async getProfile(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        referralCode: true,
        points: true,
        pointsExpiry: true,
      },
    });
  }

  static async updateProfile(userId: number, name: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { name },
    });
  }

  static async changePassword(
    userId: number,
    currentPassword: string,
    newPassword: string
  ) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      throw new Error("Current password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return true;
  }
}