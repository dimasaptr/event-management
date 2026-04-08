/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : auth.service.ts
 * Type        : Service
 * Feature     : Feature 2
 * Source Path : src/features/auth/services/auth.service.ts
 * Used In     : Authentication Logic
 * Status      : ACTIVE
 * =========================================
 */

import type {
  LoginFormValues,
  RegisterFormValues,
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
  VerifyEmailFormValues,
} from "@/types/auth.types";

const generateReferralCode = (firstName: string) => {
  const base = firstName.toUpperCase().replace(/\s/g, "");
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${base}${suffix}`;
};

/**
 * Dummy login
 */
export const login = async (payload: LoginFormValues) => {
  console.log("LOGIN API:", payload);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const role: "CUSTOMER" | "ORGANIZER" = payload.email
    .toLowerCase()
    .includes("organizer")
    ? "ORGANIZER"
    : "CUSTOMER";

  const firstName = role === "ORGANIZER" ? "Organizer" : "John";
  const lastName = role === "ORGANIZER" ? "User" : "Doe";

  const referralCode = generateReferralCode(firstName);

  return {
    success: true,
    data: {
      id: "user-1",
      email: payload.email,
      role,
      firstName,
      lastName,
      profilePicture: "",
      referralCode,
      points: 25000,
    },
  };
};

/**
 * Dummy register
 */
export const register = async (payload: RegisterFormValues) => {
  console.log("REGISTER API:", payload);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Registration successful. Please verify your email.",
  };
};

/**
 * Dummy forgot password
 */
export const forgotPassword = async (payload: ForgotPasswordFormValues) => {
  console.log("FORGOT PASSWORD API:", payload);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Reset token sent to your email.",
  };
};

/**
 * Dummy reset password
 */
export const resetPassword = async (payload: ResetPasswordFormValues) => {
  console.log("RESET PASSWORD API:", payload);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Password reset successful. You can now log in.",
  };
};

/**
 * Dummy verify email
 */
export const verifyEmail = async (payload: VerifyEmailFormValues) => {
  console.log("VERIFY EMAIL API:", payload);

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Email verified successfully. You can now log in.",
  };
};