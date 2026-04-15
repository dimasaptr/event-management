/**
 * =========================================================
 * FILE INFO
 * =========================================================
 * File Name   : role.middleware.ts
 * Type        : Middleware
 * Feature     : Feature 2 - Authorization (RBAC)
 * Source Path : apps/api/src/shared/middlewares/role.middleware.ts
 * Used In     : Role-protected routes (organizer-only, admin routes)
 * Description : Role-based access control middleware
 *               - Check if user role is in allowed roles list
 *               - Return 403 Forbidden if unauthorized
 * Status      : ACTIVE
 * =========================================================
 */

import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }

    next();
  };
};