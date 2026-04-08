/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : CouponList.tsx
 * Type        : Component
 * Feature     : Feature 2
 * Source Path : src/features/referral/components/CouponList.tsx
 * Used In     : CustomerDashboardPage, ProfilePage
 * Status      : ACTIVE
 * =========================================
 */

import type { Coupon } from "@/types/referral.types";

interface CouponListProps {
  coupons: Coupon[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function CouponList({ coupons }: CouponListProps) {
  const active = coupons.filter((c) => !c.isUsed);
  const used = coupons.filter((c) => c.isUsed);

  return (
    <div className="space-y-3">
      {active.length === 0 && (
        <p className="text-sm text-slate-500">No active coupons available.</p>
      )}

      {active.map((coupon) => (
        <div
          key={coupon.id}
          className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3"
        >
          <div>
            <p className="text-sm font-bold text-slate-900">{coupon.code}</p>
            <p className="text-xs text-slate-600">
              Discount {formatCurrency(coupon.discountAmount)}
            </p>
          </div>
          <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
            Active
          </span>
        </div>
      ))}

      {used.map((coupon) => (
        <div
          key={coupon.id}
          className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 opacity-60"
        >
          <div>
            <p className="text-sm font-bold text-slate-500 line-through">{coupon.code}</p>
            <p className="text-xs text-slate-400">
              Discount {formatCurrency(coupon.discountAmount)}
            </p>
          </div>
          <span className="rounded-full bg-slate-300 px-3 py-1 text-xs font-semibold text-slate-600">
            Used
          </span>
        </div>
      ))}
    </div>
  );
}
