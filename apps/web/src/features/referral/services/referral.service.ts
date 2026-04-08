/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : referral.service.ts
 * Type        : Service
 * Feature     : Feature 2
 * Source Path : src/features/referral/services/referral.service.ts
 * Used In     : Profile, Customer Dashboard, Checkout
 * Status      : DUMMY DATA
 * Notes       : Mock referral, coupon, and points service
 * =========================================
 */

import type { Coupon, PointsHistory, ReferralSummary } from "@/types/referral.types";

const dummyCoupons: Coupon[] = [
  {
    id: "coupon-001",
    code: "WELCOME10",
    discountAmount: 10000,
    isUsed: false,
  },
  {
    id: "coupon-002",
    code: "REFERRAL15",
    discountAmount: 15000,
    isUsed: false,
  },
  {
    id: "coupon-003",
    code: "PROMO20",
    discountAmount: 20000,
    isUsed: true,
  },
];

const dummyPointsHistory: PointsHistory[] = [
  {
    id: "pts-001",
    amount: 10000,
    type: "EARNED",
    createdAt: "2026-03-15T08:00:00.000Z",
    expiresAt: "2026-06-15T08:00:00.000Z",
  },
  {
    id: "pts-002",
    amount: 5000,
    type: "EARNED",
    createdAt: "2026-03-28T10:00:00.000Z",
    expiresAt: "2026-06-28T10:00:00.000Z",
  },
  {
    id: "pts-003",
    amount: 10000,
    type: "USED",
    createdAt: "2026-04-01T09:00:00.000Z",
  },
  {
    id: "pts-004",
    amount: 15000,
    type: "EARNED",
    createdAt: "2026-04-05T11:00:00.000Z",
    expiresAt: "2026-07-05T11:00:00.000Z",
  },
  {
    id: "pts-005",
    amount: 5000,
    type: "EARNED",
    createdAt: "2026-04-07T14:00:00.000Z",
    expiresAt: "2026-07-07T14:00:00.000Z",
  },
];

export const referralService = {
  async getReferralSummary(referralCode: string): Promise<ReferralSummary> {
    await new Promise((r) => setTimeout(r, 400));

    const totalPoints = dummyPointsHistory.reduce((sum, h) => {
      return h.type === "EARNED" ? sum + h.amount : sum - h.amount;
    }, 0);

    return {
      referralCode,
      points: Math.max(totalPoints, 0),
      coupons: dummyCoupons,
      history: dummyPointsHistory,
    };
  },

  async getActiveCoupons(): Promise<Coupon[]> {
    await new Promise((r) => setTimeout(r, 300));
    return dummyCoupons.filter((c) => !c.isUsed);
  },

  async getPointsHistory(): Promise<PointsHistory[]> {
    await new Promise((r) => setTimeout(r, 300));
    return dummyPointsHistory;
  },

  async getPointsBalance(): Promise<number> {
    await new Promise((r) => setTimeout(r, 200));
    const total = dummyPointsHistory.reduce((sum, h) => {
      return h.type === "EARNED" ? sum + h.amount : sum - h.amount;
    }, 0);
    return Math.max(total, 0);
  },
};
