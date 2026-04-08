/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : ReferralCard.tsx
 * Type        : Component
 * Feature     : Feature 2
 * Source Path : src/features/referral/components/ReferralCard.tsx
 * Used In     : CustomerDashboardPage, ProfilePage
 * Status      : ACTIVE
 * =========================================
 */

import { useState } from "react";

interface ReferralCardProps {
  referralCode: string;
  points: number;
}

export default function ReferralCard({ referralCode, points }: ReferralCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="rounded-3xl bg-indigo-600 p-6 text-white shadow-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-200">
        Your Referral Code
      </p>

      <div className="mt-4 flex items-center gap-3">
        <p className="text-3xl font-extrabold tracking-wide">{referralCode}</p>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <p className="mt-3 text-sm leading-6 text-indigo-100">
        Share this code to invite new users and earn reward points.
      </p>

      <div className="mt-5 rounded-2xl border border-white/15 bg-white/10 px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-200">
          Available Points
        </p>
        <p className="mt-2 text-2xl font-extrabold">
          {points.toLocaleString("id-ID")}
        </p>
        <p className="mt-1 text-xs text-indigo-200">
          Points can be used at checkout. Expires in 3 months.
        </p>
      </div>
    </div>
  );
}
