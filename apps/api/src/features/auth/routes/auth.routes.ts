/**
 * =========================================================
 * FILE INFO
 * =========================================================
 * File Name   : auth.routes.ts
 * Type        : Route
 * Feature     : Feature 2 - Authentication
 * Source Path : apps/api/src/features/auth/routes/auth.routes.ts
 * Used In     : App Router (api/auth/*)
 * Description : Route definitions for auth endpoints
 *               - POST /register - User registration
 *               - POST /login - User login
 *               - GET /me - Get current user (protected)
 *               - GET /organizer-only - Role test (protected)
 * Status      : ACTIVE
 * =========================================================
 */

import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../../../shared/middlewares/auth.middleware.js";
import { roleMiddleware } from "../../../shared/middlewares/role.middleware.js"; // 🔥 TAMBAH INI

const router = Router();

/**
 * =========================================================
 * TEST ROUTE
 * =========================================================
 */
router.get("/", (req, res) => {
  res.json({
    message: "Auth route is working 🚀",
  });
});

/**
 * =========================================================
 * REGISTER
 * =========================================================
 */
router.post("/register", AuthController.register);

/**
 * =========================================================
 * LOGIN
 * =========================================================
 */
router.post("/login", AuthController.login);

/**
 * =========================================================
 * PROTECTED ROUTE (JWT → DB)
 * =========================================================
 */
router.get("/me", authMiddleware, AuthController.me);

/**
 * =========================================================
 * ROLE TEST ROUTE 🔥
 * =========================================================
 */
router.get(
  "/organizer-only",
  authMiddleware,
  roleMiddleware(["ORGANIZER"]),
  (req, res) => {
    return res.json({
      message: "Organizer only 🚀",
    });
  }
);

export default router;