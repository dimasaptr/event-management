/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : referral.types.ts
 * =========================================
 */

export interface Coupon {
  id: string;
  code: string;
  discountAmount: number;
  isUsed: boolean;
}

export interface PointsHistory {
  id: string;
  amount: number;
  type: "EARNED" | "USED";
  createdAt: string;
  expiresAt?: string;
}

export interface ReferralSummary {
  referralCode: string;
  points: number;
  coupons: Coupon[];
  history: PointsHistory[];
}