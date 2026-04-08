/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : ManageTransactionsPage.tsx
 * Type        : Page
 * Feature     : Feature 1
 * Route       : /organizer/events/:slug/transactions
 * Source Path : src/pages/organizer/ManageTransactionsPage.tsx
 * Used In     : Organizer Event Management
 * UI Section  : Manage Transactions Page
 * Status      : ACTIVE
 * =========================================
 */

import { Link, useParams } from "react-router-dom";

const dummyTransactions = [
  {
    id: "trx-001",
    customerName: "Budi Santoso",
    ticketCount: 1,
    totalPaid: 299000,
    paymentStatus: "PAID",
  },
  {
    id: "trx-002",
    customerName: "Siti Rahma",
    ticketCount: 1,
    totalPaid: 149000,
    paymentStatus: "WAITING_PAYMENT",
  },
  {
    id: "trx-003",
    customerName: "Raka Pratama",
    ticketCount: 1,
    totalPaid: 0,
    paymentStatus: "FREE_CLAIMED",
  },
];

export default function ManageTransactionsPage() {
  const { slug } = useParams();

  return (
    <main className="min-h-[calc(100vh-104px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-zinc-900">
            Manage Transactions Page
          </h1>

          <p className="mt-4 text-sm font-semibold text-zinc-600">
            Feature 1
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            src/pages/organizer/ManageTransactionsPage.tsx
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to={`/organizer/events/${slug}`}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
            >
              Back to Organizer Detail
            </Link>
          </div>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Organizer Transactions
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              Event Transactions
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Ini masih dummy data untuk preview dashboard organizer sebelum
              backend transaction system disambungkan.
            </p>
          </div>

          <div className="space-y-4">
            {dummyTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {transaction.customerName}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Transaction ID: {transaction.id}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Ticket: {transaction.ticketCount}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-lg font-bold text-slate-900">
                      Rp {transaction.totalPaid.toLocaleString("id-ID")}
                    </p>
                    <span className="mt-2 inline-flex rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                      {transaction.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}