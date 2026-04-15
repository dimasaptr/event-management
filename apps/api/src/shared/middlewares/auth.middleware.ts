/**
 * =========================================================
 * FILE INFO
 * =========================================================
 * File Name   : auth.middleware.ts
 * Type        : Middleware
 * Feature     : Feature 2 - Authentication
 * Source Path : apps/api/src/shared/middlewares/auth.middleware.ts
 * Used In     : Protected Routes, Role-based Routes
 * Description : JWT token verification middleware
 *               - Extract Bearer token from Authorization header
 *               - Verify JWT signature
 *               - Attach decoded user to request object
 * Status      : ACTIVE
 * =========================================================
 */

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: number;
  email: string;
  role: string; // 🔥 WAJIB TAMBAH INI
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * =========================================================
     * GET TOKEN
     * =========================================================
     */
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const token = authHeader.split(" ")[1];

    /**
     * =========================================================
     * VERIFY TOKEN
     * =========================================================
     */
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    /**
     * =========================================================
     * ATTACH USER TO REQUEST
     * =========================================================
     */
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};