/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : CustomerProfilePage.tsx
 * Type        : Page
 * Feature     : Feature 2
 * Route       : /customer/profile
 * Source Path : src/pages/customer/CustomerProfilePage.tsx
 * Used In     : Customer Area
 * UI Section  : Customer Profile
 * Status      : ACTIVE
 * Notes       : Customer-specific profile with referral, points, and coupons
 * =========================================
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { referralService } from "@/features/referral/services/referral.service";
import ReferralCard from "@/features/referral/components/ReferralCard";
import CouponList from "@/features/referral/components/CouponList";
import PointsHistory from "@/features/referral/components/PointsHistory";
import type { ReferralSummary } from "@/types/referral.types";

export default function CustomerProfilePage() {
  const { user } = useAuth();
  const [referral, setReferral] = useState<ReferralSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.referralCode) return;
    referralService
      .getReferralSummary(user.referralCode)
      .then(setReferral)
      .finally(() => setIsLoading(false));
  }, [user?.referralCode]);

  if (!user) {
    return (
      <main className="min-h-[calc(100vh-104px)] bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Not Logged In</h1>
          <p className="mt-3 text-sm text-slate-600">
            Please log in to view your profile.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const initials = `${user.firstName?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* ================================
          HEADER
         ================================ */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Customer Profile
          </p>

          <h1 className="mt-5 text-4xl font-bold text-slate-900">
            My Profile & Rewards
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Manage your account, referral code, reward points, and available coupons.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {/* ================================
              LEFT COLUMN
             ================================ */}
          <div className="space-y-8">
            {/* IDENTITY CARD */}
            <div className="rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-xl md:px-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={fullName}
                      className="h-20 w-20 rounded-full object-cover ring-4 ring-white/10"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-white ring-4 ring-white/10">
                      {initials || "U"}
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                      Customer Account
                    </p>
                    <h2 className="mt-2 text-2xl font-bold">{fullName}</h2>
                    <p className="mt-1 text-slate-300">{user.email}</p>
                    <span className="mt-3 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/profile/edit"
                    className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/profile/change-password"
                    className="rounded-2xl border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Change Password
                  </Link>
                </div>
              </div>
            </div>

            {/* PROFILE DETAILS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Account Details
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Personal Information
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoCard label="First Name" value={user.firstName} />
                <InfoCard label="Last Name" value={user.lastName} />
                <InfoCard label="Email" value={user.email} />
                <InfoCard label="Role" value={user.role} />
              </div>
            </div>

            {/* POINTS HISTORY */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Points History
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Reward Points Activity
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Track your earned and used reward points.
              </p>

              <div className="mt-6">
                {isLoading ? (
                  <p className="text-sm text-slate-500">Loading history...</p>
                ) : (
                  <PointsHistory history={referral?.history ?? []} />
                )}
              </div>
            </div>
          </div>

          {/* ================================
              RIGHT COLUMN
             ================================ */}
          <div className="space-y-8">
            {/* REFERRAL + POINTS */}
            {isLoading ? (
              <div className="rounded-3xl bg-indigo-600 p-6 text-white shadow-xl">
                <p className="text-sm text-indigo-200">Loading referral data...</p>
              </div>
            ) : (
              <ReferralCard
                referralCode={referral?.referralCode ?? user.referralCode ?? "-"}
                points={referral?.points ?? user.points ?? 0}
              />
            )}

            {/* COUPONS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                My Coupons
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Available Coupons
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Coupons from referrals and promotions.
              </p>

              <div className="mt-6">
                {isLoading ? (
                  <p className="text-sm text-slate-500">Loading coupons...</p>
                ) : (
                  <CouponList coupons={referral?.coupons ?? []} />
                )}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Quick Actions
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Navigate
              </h3>

              <div className="mt-5 grid gap-3">
                <Link
                  to="/customer/dashboard"
                  className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Customer Dashboard
                </Link>
                <Link
                  to="/customer/transactions"
                  className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  My Transactions
                </Link>
                <Link
                  to="/customer/tickets"
                  className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  My Tickets
                </Link>
                <Link
                  to="/events"
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Browse Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}
