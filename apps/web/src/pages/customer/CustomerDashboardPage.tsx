/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : CustomerDashboardPage.tsx
 * Type        : Page
 * Feature     : Feature 2
 * Route       : /customer/dashboard
 * Source Path : src/pages/customer/CustomerDashboardPage.tsx
 * Used In     : Customer Area
 * UI Section  : Dashboard
 * Status      : ACTIVE
 * Notes       : Real dashboard content for Phase 5
 * =========================================
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { transactionService } from "@/features/transactions/services/transaction.service";
import { referralService } from "@/features/referral/services/referral.service";
import ReferralCard from "@/features/referral/components/ReferralCard";
import CouponList from "@/features/referral/components/CouponList";
import type { Transaction } from "@/types/transaction.types";
import type { ReferralSummary } from "@/types/referral.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function StatusBadge({ status }: { status: string }) {
  const base = "inline-flex rounded-full px-3 py-1 text-xs font-semibold";
  if (status === "DONE")
    return <span className={`${base} bg-emerald-100 text-emerald-700`}>{status}</span>;
  if (status === "WAITING_FOR_PAYMENT" || status === "WAITING_FOR_CONFIRMATION")
    return <span className={`${base} bg-amber-100 text-amber-700`}>{status.replace(/_/g, " ")}</span>;
  if (status === "REJECTED" || status === "CANCELED" || status === "EXPIRED")
    return <span className={`${base} bg-rose-100 text-rose-700`}>{status}</span>;
  return <span className={`${base} bg-slate-100 text-slate-700`}>{status}</span>;
}

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [referral, setReferral] = useState<ReferralSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trxData = transactionService.getTransactions().data;
    setTransactions(trxData);

    if (user?.referralCode) {
      referralService
        .getReferralSummary(user.referralCode)
        .then(setReferral)
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [user?.referralCode]);

  const activeTickets = transactions.filter((t) => t.status === "DONE").length;
  const doneTransactions = transactions.filter((t) => t.status === "DONE").length;
  const pendingTransactions = transactions.filter(
    (t) => t.status === "WAITING_FOR_PAYMENT" || t.status === "WAITING_FOR_CONFIRMATION"
  );
  const recentTransactions = [...transactions].slice(0, 4);
  const activeCoupons = referral?.coupons.filter((c) => !c.isUsed) ?? [];

  return (
    <main className="min-h-[calc(100vh-104px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* ================================
            HEADER
           ================================ */}
        <section className="rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-xl md:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-300">
                Customer Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">
                Welcome back, {user?.firstName ?? "Customer"}
              </h1>
              <p className="mt-4 max-w-2xl leading-8 text-slate-300">
                Manage your tickets, transactions, reward points, and referral code from one place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/events"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Browse Events
              </Link>
              <Link
                to="/customer/profile"
                className="inline-flex items-center justify-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                My Profile
              </Link>
            </div>
          </div>
        </section>

        {/* ================================
            SUMMARY CARDS
           ================================ */}
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Active Tickets"
            value={activeTickets.toString()}
            helper="Tickets from completed transactions"
          />
          <StatCard
            label="Reward Points"
            value={(referral?.points ?? user?.points ?? 0).toLocaleString("id-ID")}
            helper="Points available for checkout"
          />
          <StatCard
            label="Active Coupons"
            value={activeCoupons.length.toString()}
            helper="Coupons from referrals and promos"
          />
          <StatCard
            label="Completed Transactions"
            value={doneTransactions.toString()}
            helper="Total transactions with DONE status"
          />
        </section>

        {/* ================================
            MAIN CONTENT
           ================================ */}
        <section className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
          {/* LEFT */}
          <div className="space-y-8">
            {/* PENDING TRANSACTIONS */}
            {pendingTransactions.length > 0 && (
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                  Action Required
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  Pending Transactions
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  These transactions need your attention.
                </p>

                <div className="mt-5 space-y-3">
                  {pendingTransactions.map((trx) => (
                    <div
                      key={trx.id}
                      className="flex items-center justify-between rounded-2xl border border-amber-200 bg-white px-4 py-4"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{trx.event.title}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {formatCurrency(trx.payment.finalTotal)} • {formatDate(trx.createdAt)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <StatusBadge status={trx.status} />
                        <Link
                          to={`/customer/transactions/${trx.id}`}
                          className="text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          View →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RECENT TRANSACTIONS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                    Recent Transactions
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900">
                    Transaction History
                  </h3>
                </div>
                <Link
                  to="/customer/transactions"
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  View All
                </Link>
              </div>

              <div className="mt-6 space-y-4">
                {recentTransactions.length > 0 ? (
                  recentTransactions.map((trx) => (
                    <div
                      key={trx.id}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 px-5 py-4"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{trx.event.title}</p>
                        <p className="mt-1 text-sm text-slate-600">
                          {formatCurrency(trx.payment.finalTotal)} • {formatDate(trx.createdAt)}
                        </p>
                      </div>
                      <StatusBadge status={trx.status} />
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No transactions yet.</p>
                )}
              </div>
            </div>

            {/* ACTIVE COUPONS */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                My Coupons
              </p>
              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Available Coupons
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Use these coupons at checkout for discounts.
              </p>

              <div className="mt-6">
                {isLoading ? (
                  <p className="text-sm text-slate-500">Loading coupons...</p>
                ) : (
                  <CouponList coupons={referral?.coupons ?? []} />
                )}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-8">
            {/* REFERRAL + POINTS */}
            {isLoading ? (
              <div className="rounded-3xl bg-indigo-600 p-6 text-white shadow-xl">
                <p className="text-sm text-indigo-200">Loading referral data...</p>
              </div>
            ) : (
              <ReferralCard
                referralCode={referral?.referralCode ?? user?.referralCode ?? "-"}
                points={referral?.points ?? user?.points ?? 0}
              />
            )}

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
                  to="/events"
                  className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Browse Events
                </Link>
                <Link
                  to="/customer/tickets"
                  className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  My Tickets
                </Link>
                <Link
                  to="/customer/transactions"
                  className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  My Transactions
                </Link>
                <Link
                  to="/customer/profile"
                  className="rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  My Profile
                </Link>
                <Link
                  to="/profile/edit"
                  className="rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <h3 className="mt-3 text-4xl font-bold text-slate-900">{value}</h3>
      <p className="mt-2 text-sm text-slate-600">{helper}</p>
    </div>
  );
}
