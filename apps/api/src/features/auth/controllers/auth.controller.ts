/**
 * =========================================================
 * FILE INFO
 * =========================================================
 * File Name   : auth.controller.ts
 * Type        : Controller
 * Feature     : Feature 2 - Authentication
 * Source Path : apps/api/src/features/auth/controllers/auth.controller.ts
 * Used In     : Auth Routes (register, login, me)
 * Description : HTTP request handlers for authentication endpoints
 *               - Register with optional referral
 *               - Login with JWT
 *               - Get current user profile
 * Status      : ACTIVE
 * =========================================================
 */

import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.js";
import { prisma } from "../../../shared/config/prisma.js";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const { email, password, name, referralCode } = req.body; // 🔥 TAMBAH

      if (!email || !password || !name) {
        return res.status(400).json({
          message: "Email, password, and name are required",
        });
      }

      const user = await AuthService.register({
        email,
        password,
        name,
        referralCode, // 🔥 PASS KE SERVICE
      });

      return res.status(201).json({
        message: "Register success 🚀",
        data: {
          email: user.email,
          name: user.name,
          referralCode: user.referralCode,
        },
      });
    } catch (error: any) {
      console.error("REGISTER ERROR:", error);

      if (error.message === "Email already exists") {
        return res.status(400).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      const result = await AuthService.login({
        email,
        password,
      });

      return res.status(200).json({
        message: "Login success 🔥",
        data: result,
      });
    } catch (error: any) {
      console.error("LOGIN ERROR:", error);

      if (
        error.message === "User not found" ||
        error.message === "Invalid password"
      ) {
        return res.status(400).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async me(req: Request, res: Response) {
    try {
      const userPayload = (req as any).user;

      const user = await prisma.user.findUnique({
        where: { id: userPayload.userId },
        select: {
          id: true,
          email: true,
          name: true,
          referralCode: true,
        },
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "Get profile success 🔥",
        data: user,
      });
    } catch (error) {
      console.error("ME ERROR:", error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}