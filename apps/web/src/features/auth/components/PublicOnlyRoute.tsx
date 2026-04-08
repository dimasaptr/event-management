/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : PublicOnlyRoute.tsx
 * Type        : Route Guard
 * Feature     : Feature 2
 * Source Path : src/features/auth/components/PublicOnlyRoute.tsx
 * Used In     : Auth Pages Guard
 * Status      : ACTIVE
 * =========================================
 */

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface Props {
  children: ReactNode;
}

export default function PublicOnlyRoute({ children }: Props) {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    if (user?.role === "ORGANIZER") {
      return <Navigate to="/organizer/dashboard" replace />;
    }

    return <Navigate to="/customer/dashboard" replace />;
  }

  return <>{children}</>;
}
