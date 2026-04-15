/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : app.ts
 * Type        : App Setup
 * Feature     : Feature 1 & 2 - App Setup
 * Source Path : apps/api/src/app.ts
 * Used In     : Backend API Server
 * Status      : ACTIVE
 * Notes       : Added users route (Feature 2 - User Profile)
 * =========================================
 */

import express from "express";

/**
 * =========================================
 * ROUTES IMPORT
 * =========================================
 */
import authRoutes from "./features/auth/routes/auth.routes.js";
import usersRoutes from "./features/users/routes/users.routes.js"; // ✅ TAMBAHAN (JANGAN DIHAPUS)

export function createApp() {
  const app = express();

  /**
   * =========================================
   * MIDDLEWARE
   * =========================================
   */
  app.use(express.json());

  /**
   * =========================================
   * BASE ROUTES
   * =========================================
   */

  app.get("/", (req, res) => {
    res.send("API is running 🚀");
  });

  app.get("/health", (req, res) => {
    res.json({
      status: "OK",
      message: "Server is healthy 🚀",
    });
  });

  app.get("/api", (req, res) => {
    res.json({
      message: "Welcome to Event Management API 🚀",
    });
  });

  /**
   * =========================================
   * FEATURE ROUTES
   * =========================================
   */
  app.use("/api/auth", authRoutes);

  app.use("/api/users", usersRoutes); // ✅ WAJIB (FIX 404 users/me)

  return app;
}