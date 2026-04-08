/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : RoleRoute.tsx
 * Type        : Route Guard
 * Feature     : Feature 2
 * Source Path : src/features/auth/components/RoleRoute.tsx
 * Used In     : Role Based Access
 * Status      : ACTIVE
 * =========================================
 */

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface Props {
  children: ReactNode;
  allowedRole: "CUSTOMER" | "ORGANIZER";
}

export default function RoleRoute({ children, allowedRole }: Props) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== allowedRole) {
    if (user?.role === "ORGANIZER") {
      return <Navigate to="/organizer/dashboard" replace />;
    }

    return <Navigate to="/customer/dashboard" replace />;
  }

  return <>{children}</>;
}