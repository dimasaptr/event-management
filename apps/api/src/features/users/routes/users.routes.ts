/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : users.routes.ts
 * Type        : Routes
 * Feature     : Feature 2 - User Profile
 * Source Path : apps/api/src/features/users/routes/users.routes.ts
 * =========================================
 */

import { Router } from "express";
import { UsersController } from "../controllers/users.controller.js";
import { authMiddleware } from "../../../shared/middlewares/auth.middleware.js";

const router = Router();

router.get("/me", authMiddleware, UsersController.getProfile);
router.patch("/update", authMiddleware, UsersController.updateProfile);
router.patch(
  "/change-password",
  authMiddleware,
  UsersController.changePassword
);

export default router;