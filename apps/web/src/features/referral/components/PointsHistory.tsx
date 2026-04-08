/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : PointsHistory.tsx
 * Type        : Component
 * Feature     : Feature 2
 * Source Path : src/features/referral/components/PointsHistory.tsx
 * Used In     : CustomerDashboardPage, ProfilePage
 * Status      : ACTIVE
 * =========================================
 */

import type { PointsHistory as PointsHistoryType } from "@/types/referral.types";

interface PointsHistoryProps {
  history: PointsHistoryType[];
}

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function PointsHistory({ history }: PointsHistoryProps) {
  if (history.length === 0) {
    return <p className="text-sm text-slate-500">No points history yet.</p>;
  }

  return (
    <div className="space-y-3">
      {history.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
        >
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {item.type === "EARNED" ? "+ " : "- "}
              {item.amount.toLocaleString("id-ID")} pts
            </p>
            <p className="text-xs text-slate-500">{formatDate(item.createdAt)}</p>
            {item.expiresAt && item.type === "EARNED" && (
              <p className="text-xs text-amber-600">
                Expires: {formatDate(item.expiresAt)}
              </p>
            )}
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              item.type === "EARNED"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-rose-100 text-rose-700"
            }`}
          >
            {item.type}
          </span>
        </div>
      ))}
    </div>
  );
}
