/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : auth.types.ts
 * Type        : Types
 * Feature     : Feature 2
 * Source Path : src/types/auth.types.ts
 * Used In     : Authentication
 * Status      : ACTIVE
 * Notes       : Source of truth for auth form + auth user typing
 * =========================================
 */

export type UserRole = "CUSTOMER" | "ORGANIZER";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;

  // Profile basic fields
  firstName: string;
  lastName: string;

  // Optional future profile field
  profilePicture?: string;

  // Phase 5 additions
  referralCode?: string;
  points?: number;
}

export interface AuthResponse {
  success: boolean;
  data: AuthUser;
  message?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordFormValues {
  email: string;
}

export interface ResetPasswordFormValues {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailFormValues {
  email: string;
  token: string;
}

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface EditProfileFormValues {
  firstName: string;
  lastName: string;
  profilePicture?: string;
}