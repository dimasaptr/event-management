/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : ProtectedRoute.tsx
 * Type        : Route Guard
 * Feature     : Feature 2
 * Source Path : src/features/auth/components/ProtectedRoute.tsx
 * Used In     : Protected Pages
 * Status      : ACTIVE
 * =========================================
 */

import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";

interface Props {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}