/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : users.controller.ts
 * Type        : Controller
 * Feature     : Feature 2 - User Profile
 * Source Path : apps/api/src/features/users/controllers/users.controller.ts
 * =========================================
 */

import { Request, Response } from "express";
import { UsersService } from "../services/users.service.js";

export class UsersController {
  static async getProfile(req: Request, res: Response) {
    try {
      const userPayload = (req as any).user;

      const user = await UsersService.getProfile(userPayload.userId);

      return res.status(200).json({
        message: "Get profile success 🔥",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const userPayload = (req as any).user;
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({
          message: "Name is required",
        });
      }

      const user = await UsersService.updateProfile(
        userPayload.userId,
        name
      );

      return res.status(200).json({
        message: "Update profile success 🚀",
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  static async changePassword(req: Request, res: Response) {
    try {
      const userPayload = (req as any).user;
      const { currentPassword, newPassword } = req.body;

      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          message: "Current and new password are required",
        });
      }

      await UsersService.changePassword(
        userPayload.userId,
        currentPassword,
        newPassword
      );

      return res.status(200).json({
        message: "Password updated successfully 🔐",
      });
    } catch (error: any) {
      if (error.message === "Current password is incorrect") {
        return res.status(400).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}