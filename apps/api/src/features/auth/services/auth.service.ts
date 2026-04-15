/**
 * =========================================================
 * FILE INFO
 * =========================================================
 * File Name   : auth.service.ts
 * Type        : Service
 * Feature     : Feature 2 - Authentication + Referral + Reward System
 * Source Path : apps/api/src/features/auth/services/auth.service.ts
 * Used In     : Auth Routes (register, login)
 * Description : Business logic for user auth, referral tracking, 
 *               points system, and coupon generation
 * Status      : ACTIVE (UPGRADED with Referral System)
 * =========================================================
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../shared/config/prisma.js";

/**
 * =========================================================
 * GENERATORS 🔥
 * =========================================================
 */
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const generateCouponCode = () => {
  return "REF-" + Math.random().toString(36).substring(2, 8).toUpperCase();
};

export class AuthService {
  static async register(data: {
    email: string;
    password: string;
    name: string;
    referralCode?: string;
  }) {
    const { email, password, name, referralCode } = data;

    /**
     * =========================================================
     * VALIDATE USER
     * =========================================================
     */
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newReferralCode = generateReferralCode();

    /**
     * =========================================================
     * TRANSACTION (IMPORTANT 🔥)
     * =========================================================
     */
    const result = await prisma.$transaction(async (tx) => {
      /**
       * =========================================================
       * CREATE USER
       * =========================================================
       */
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          referralCode: newReferralCode,
        },
      });

      /**
       * =========================================================
       * HANDLE REFERRAL (SAFE VERSION 🚀)
       * =========================================================
       */
      if (referralCode?.trim()) {
        const referrer = await tx.user.findUnique({
          where: { referralCode },
        });

        // ❌ SELF REFERRAL BLOCK
        if (referrer && referrer.email === email) {
          throw new Error("Cannot use your own referral code");
        }

        // ❌ PREVENT DOUBLE REFERRAL
        const existingReferral = await tx.referral.findUnique({
          where: { referredUserId: user.id },
        });

        if (referrer && !existingReferral) {
          // ✅ CREATE REFERRAL
          await tx.referral.create({
            data: {
              referrerId: referrer.id,
              referredUserId: user.id,
            },
          });

          /**
           * 🎯 POINTS + EXPIRY
           */
          const expiryDate = new Date();
          expiryDate.setMonth(expiryDate.getMonth() + 3);

          await tx.user.update({
            where: { id: referrer.id },
            data: {
              points: {
                increment: 10000,
              },
              pointsExpiry: expiryDate,
            },
          });

          /**
           * 🎟 COUPON
           */
          const couponExpiry = new Date();
          couponExpiry.setMonth(couponExpiry.getMonth() + 3);

          await tx.coupon.create({
            data: {
              userId: referrer.id,
              code: generateCouponCode(),
              discountAmount: 10000,
              expiryDate: couponExpiry,
            },
          });
        }
      }

      return user;
    });

    /**
     * =========================================================
     * RESPONSE
     * =========================================================
     */
    return {
      id: result.id,
      email: result.email,
      name: result.name,
      referralCode: result.referralCode,
    };
  }

  /**
   * =========================================================
   * LOGIN
   * =========================================================
   */
  static async login(data: {
    email: string;
    password: string;
  }) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}