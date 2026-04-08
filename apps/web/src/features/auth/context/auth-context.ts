/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : auth-context.ts
 * Type        : Context Types
 * Feature     : Feature 2
 * Source Path : src/features/auth/context/auth-context.ts
 * Used In     : AuthContext + useAuth
 * Status      : ACTIVE
 * =========================================
 */

import { createContext } from "react";
import type { AuthUser } from "@/types/auth.types";

export type { AuthUser };

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginUser: (userData: AuthUser) => void;
  logoutUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);