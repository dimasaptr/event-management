/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : AuthContext.tsx
 * Type        : Provider
 * Feature     : Feature 2
 * Source Path : src/features/auth/context/AuthContext.tsx
 * Used In     : Authentication State Management
 * Status      : ACTIVE
 * =========================================
 */

import { useMemo, useState, type ReactNode } from "react";
import { AuthContext, type AuthUser } from "./auth-context";

interface Props {
  children: ReactNode;
}

const STORAGE_KEY = "auth_user";

function getInitialUser(): AuthUser | null {
  const storedUser = localStorage.getItem(STORAGE_KEY);

  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser);

  const loginUser = (userData: AuthUser) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loginUser,
      logoutUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}