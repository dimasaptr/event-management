/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : profile.service.ts
 * =========================================
 */

import type { UserProfile } from "@/types/profile.types";
import type { EditProfileFormValues } from "@/types/auth.types";

const generateReferralCode = (firstName: string) => {
  const base = firstName.toUpperCase().replace(/\s/g, "");
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `${base}${suffix}`;
};

let mockProfile: UserProfile = {
  id: "user-1",
  email: "user@mail.com",
  firstName: "John",
  lastName: "Doe",
  role: "CUSTOMER",
  profilePicture: "",
  referralCode: generateReferralCode("John"),
  points: 25000,
};

export const profileService = {
  async getMyProfile(): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 500));
    return mockProfile;
  },

  async updateProfile(
    payload: EditProfileFormValues
  ): Promise<UserProfile> {
    await new Promise((r) => setTimeout(r, 500));

    mockProfile = {
      ...mockProfile,
      ...payload,
    };

    return mockProfile;
  },

  async changePassword(payload: {
    currentPassword: string;
    newPassword: string;
  }) {
    await new Promise((r) => setTimeout(r, 500));

    console.log("CHANGE PASSWORD:", payload);

    return {
      success: true,
      message: "Password updated successfully",
    };
  },
};