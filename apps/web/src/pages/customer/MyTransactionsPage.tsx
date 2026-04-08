/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : MyTransactionsPage.tsx
 * Type        : Page
 * Feature     : Feature 1
 * Route       : /customer/transactions
 * Source Path : src/pages/customer/MyTransactionsPage.tsx
 * Used In     : Customer Transaction Flow
 * UI Section  : My Transactions Page
 * Status      : ACTIVE
 * Notes       : Reserved for Feature 1 developer
 * =========================================
 */

import { Link } from "react-router-dom";
import { transactionService } from "@/features/transactions/services/transaction.service";
import type { TransactionStatus } from "@/types/transaction.types";

export default function MyTransactionsPage() {
  const transactions = transactionService.getTransactions().data;

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Customer Transaction Placeholder
          </p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Feature 1
          </p>

          <p className="mt-2 text-sm text-slate-500">
            src/pages/customer/MyTransactionsPage.tsx
          </p>

          <h1 className="mt-5 text-4xl font-bold text-slate-900">
            Riwayat Transaksi Saya
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Halaman ini menampilkan seluruh transaksi pembelian tiket customer
            beserta status pembayaran dan progress validasinya.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Transaction Flow Info
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            Alur Status Pembayaran Customer
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Data transaksi ini nantinya akan diambil dari backend berdasarkan
            customer yang sedang login, lalu ditampilkan sebagai histori
            transaksi dan progres pembayaran.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <FlowCard
              title="Menunggu Pembayaran"
              description="Customer belum upload / menyelesaikan pembayaran."
            />
            <FlowCard
              title="Menunggu Konfirmasi"
              description="Bukti pembayaran sudah diupload dan menunggu verifikasi."
            />
            <FlowCard
              title="Berhasil"
              description="Transaksi sukses dan tiket aktif di akun customer."
            />
            <FlowCard
              title="Ditolak"
              description="Pembayaran ditolak dan perlu upload ulang / bayar ulang."
            />
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Belum ada transaksi
            </h2>
            <p className="mt-3 text-slate-600">
              Kamu belum memiliki transaksi event. Silakan beli event terlebih
              dahulu.
            </p>

            <Link
              to="/events"
              className="mt-6 inline-flex items-center justify-center rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Jelajahi Event
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {transactions.map((transaction) => (
              <article
                key={transaction.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                        {transaction.invoiceNumber}
                      </p>

                      <h2 className="mt-2 text-2xl font-bold text-slate-900">
                        {transaction.event.title}
                      </h2>

                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        Organizer: {transaction.event.organizerName}
                      </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <TransactionInfoItem
                        label="Tanggal Event"
                        value={formatDate(transaction.event.eventDate)}
                      />
                      <TransactionInfoItem
                        label="Tanggal Checkout"
                        value={formatDate(transaction.createdAt)}
                      />
                      <TransactionInfoItem
                        label="Metode Pembayaran"
                        value={transaction.payment.paymentMethod}
                      />
                      <TransactionInfoItem
                        label="Total Pembayaran"
                        value={formatCurrency(transaction.payment.finalTotal)}
                      />
                    </div>
                  </div>

                  <div className="w-full max-w-sm space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Status
                      </p>

                      <div className="mt-3">
                        <StatusBadge status={transaction.status} />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-700">
                      <p className="font-semibold text-slate-900">
                        Ringkasan transaksi
                      </p>
                      <ul className="mt-2 space-y-1">
                        <li>• Invoice: {transaction.invoiceNumber}</li>
                        <li>• Event: {transaction.event.title}</li>
                        <li>
                          • Total:{" "}
                          {formatCurrency(transaction.payment.finalTotal)}
                        </li>
                      </ul>
                    </div>

                    <div className="grid gap-3">
                      <Link
                        to={`/customer/transactions/${transaction.id}`}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        Lihat Detail Transaksi
                      </Link>

                      <Link
                        to={`/events/${transaction.event.slug}`}
                        className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                      >
                        Lihat Detail Event
                      </Link>

                      {transaction.status === "WAITING_FOR_PAYMENT" && (
                        <Link
                          to={`/checkout/${transaction.event.slug}`}
                          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          Bayar Sekarang
                        </Link>
                      )}

                      {transaction.status === "WAITING_FOR_CONFIRMATION" && (
                        <button
                          type="button"
                          className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                        >
                          Menunggu Konfirmasi
                        </button>
                      )}

                      {transaction.status === "DONE" && (
                        <Link
                          to="/customer/tickets"
                          className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                        >
                          Lihat Tiket
                        </Link>
                      )}

                      {transaction.status === "REJECTED" && (
                        <Link
                          to={`/checkout/${transaction.event.slug}`}
                          className="inline-flex items-center justify-center rounded-2xl bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
                        >
                          Bayar Ulang
                        </Link>
                      )}

                      {transaction.status === "EXPIRED" && (
                        <Link
                          to={`/checkout/${transaction.event.slug}`}
                          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          Buat Transaksi Baru
                        </Link>
                      )}

                      {transaction.status === "CANCELED" && (
                        <Link
                          to={`/checkout/${transaction.event.slug}`}
                          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                          Checkout Ulang
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

type FlowCardProps = {
  title: string;
  description: string;
};

function FlowCard({ title, description }: FlowCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
    </div>
  );
}

type TransactionInfoItemProps = {
  label: string;
  value: string;
};

function TransactionInfoItem({ label, value }: TransactionInfoItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}

type StatusBadgeProps = {
  status: TransactionStatus;
};

function StatusBadge({ status }: StatusBadgeProps) {
  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] ${config.className}`}
    >
      {config.label}
    </span>
  );
}

function getStatusConfig(status: TransactionStatus) {
  switch (status) {
    case "WAITING_FOR_PAYMENT":
      return {
        label: "Menunggu Pembayaran",
        className: "border-amber-200 bg-amber-50 text-amber-700",
      };
    case "WAITING_FOR_CONFIRMATION":
      return {
        label: "Menunggu Konfirmasi",
        className: "border-indigo-200 bg-indigo-50 text-indigo-700",
      };
    case "DONE":
      return {
        label: "Berhasil",
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
      };
    case "REJECTED":
      return {
        label: "Ditolak",
        className: "border-rose-200 bg-rose-50 text-rose-700",
      };
    case "EXPIRED":
      return {
        label: "Expired",
        className: "border-zinc-300 bg-zinc-100 text-zinc-700",
      };
    case "CANCELED":
      return {
        label: "Dibatalkan",
        className: "border-slate-300 bg-slate-100 text-slate-700",
      };
    default:
      return {
        label: status,
        className: "border-slate-300 bg-slate-100 text-slate-700",
      };
  }
}

function formatDate(isoString: string) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function formatCurrency(value: number) {
  if (value <= 0) return "Gratis";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
