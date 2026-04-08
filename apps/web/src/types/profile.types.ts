/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : profile.types.ts
 * Type        : Types
 * Feature     : Feature 2
 * Source Path : src/types/profile.types.ts
 * =========================================
 */

export interface UserProfile {
  id: string;
  email: string;

  firstName: string;
  lastName: string;

  profilePicture?: string;

  role: "CUSTOMER" | "ORGANIZER";

  referralCode: string;

  points: number;
}