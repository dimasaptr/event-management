/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : TransactionDetailPage.tsx
 * Type        : Page
 * Feature     : Feature 1
 * Route       : /customer/transactions/:id
 * Source Path : src/pages/customer/TransactionDetailPage.tsx
 * Used In     : Customer Transaction Detail
 * UI Section  : Transaction Detail Page
 * Status      : ACTIVE
 * Notes       : Reserved for Feature 1 developer
 * =========================================
 */

import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { transactionService } from "@/features/transactions/services/transaction.service";
import type { TransactionStatus } from "@/types/transaction.types";

export default function TransactionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [transactionVersion, setTransactionVersion] = useState(0);
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [uploadError, setUploadError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const transaction = transactionService.getTransactionById(id ?? "").data;

  useEffect(() => {
    if (!transaction || transaction.status !== "WAITING_FOR_PAYMENT") {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setCurrentTime(Date.now());

      const latestTransaction = transactionService.getTransactionById(id ?? "").data;

      if (latestTransaction?.status !== transaction.status) {
        setTransactionVersion((currentVersion) => currentVersion + 1);
      }
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [id, transaction, transactionVersion]);

  const statusConfig = transaction
    ? getStatusConfig(transaction.status)
    : null;
  const paymentDeadline = transaction
    ? new Date(transaction.createdAt).getTime() + 2 * 60 * 60 * 1000
    : null;
  const remainingTimeLabel =
    paymentDeadline !== null
      ? getRemainingTimeLabel(paymentDeadline, currentTime)
      : "";

  if (!transaction || !statusConfig) {
    return (
      <main className="min-h-screen bg-slate-50 pb-20">
        <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Transaction Not Found
          </p>

          <h1 className="mb-4 text-3xl font-bold text-slate-900">
            Transaksi tidak ditemukan
          </h1>

          <p className="mb-8 max-w-xl text-slate-600">
            Data transaksi ini nantinya akan diambil berdasarkan transaction ID
            milik customer yang sedang login.
          </p>

          <Link
            to="/customer/transactions"
            className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Kembali ke Riwayat Transaksi
          </Link>
        </section>
      </main>
    );
  }

  const handlePaymentProofChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Bukti pembayaran harus berupa file gambar.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Ukuran bukti pembayaran maksimal 2MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    setIsUploading(true);
    setUploadError("");

    reader.onload = () => {
      const paymentProofUrl =
        typeof reader.result === "string" ? reader.result : "";
      const updatedTransaction = transactionService.uploadPaymentProof({
        transactionId: transaction.id,
        paymentProofUrl,
      });

      if (!updatedTransaction) {
        setUploadError("Gagal mengunggah bukti pembayaran.");
        setIsUploading(false);
        return;
      }

      setTransactionVersion((currentVersion) => currentVersion + 1);
      setIsUploading(false);
      event.target.value = "";
    };

    reader.onerror = () => {
      setUploadError("File bukti pembayaran gagal dibaca.");
      setIsUploading(false);
      event.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Customer Transaction Detail Placeholder
          </p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Feature 1
          </p>

          <p className="mt-2 text-sm text-slate-500">
            src/pages/customer/TransactionDetailPage.tsx
          </p>

          <h1 className="mt-5 text-4xl font-bold text-slate-900">
            Detail Transaksi
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Halaman ini menampilkan detail lengkap transaksi customer, termasuk
            invoice, status pembayaran, breakdown harga, dan akses ke event.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-10">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Invoice Detail
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {transaction.invoiceNumber}
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <InfoCard
                  label="Nama Event"
                  value={transaction.event.title}
                  helper="Event yang dibeli customer"
                />
                <InfoCard
                  label="Organizer"
                  value={transaction.event.organizerName}
                  helper="Penyelenggara event"
                />
                <InfoCard
                  label="Tanggal Event"
                  value={formatDate(transaction.event.eventDate)}
                  helper="Jadwal event"
                />
                <InfoCard
                  label="Tanggal Checkout"
                  value={formatDate(transaction.createdAt)}
                  helper="Waktu transaksi dibuat"
                />
                <InfoCard
                  label="Metode Pembayaran"
                  value={transaction.payment.paymentMethod}
                  helper="Metode pembayaran aktif"
                />
                <InfoCard
                  label="Status Pembayaran"
                  value={statusConfig.label}
                  helper="Progress transaksi customer"
                />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Breakdown Pembayaran
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                Ringkasan Harga
              </h2>

              <div className="mt-6 space-y-4">
                <PriceRow
                  label="Subtotal"
                  value={formatCurrency(transaction.payment.subtotal)}
                />
                <PriceRow
                  label="Diskon Voucher"
                  value={formatCurrency(transaction.discount.voucherDiscount)}
                />
                <PriceRow
                  label="Diskon Coupon"
                  value={formatCurrency(transaction.discount.couponDiscount)}
                />
                <PriceRow
                  label="Points Digunakan"
                  value={formatCurrency(transaction.discount.pointsUsed)}
                />
                <PriceRow
                  label="Total Diskon"
                  value={formatCurrency(transaction.payment.totalDiscount)}
                />

                <div className="border-t border-dashed border-slate-300 pt-4">
                  <PriceRow
                    label="Total Bayar"
                    value={formatCurrency(transaction.payment.finalTotal)}
                    highlight
                  />
                </div>
              </div>
            </section>

            {transaction.status === "WAITING_FOR_PAYMENT" && (
              <section
                id="payment-proof-section"
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Pembayaran Manual
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Upload Bukti Pembayaran
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  Selesaikan transfer lalu upload bukti pembayaran sebelum waktu
                  habis agar transaksi tidak berubah menjadi expired.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <InfoCard
                    label="Bank Tujuan"
                    value="BCA 1234567890"
                    helper="a.n. Event Management Platform"
                  />
                  <InfoCard
                    label="Batas Upload"
                    value={remainingTimeLabel}
                    helper="Countdown 2 jam sejak transaksi dibuat"
                  />
                </div>

                <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
                  <label className="block text-sm font-semibold text-slate-900">
                    Upload Bukti Pembayaran
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePaymentProofChange}
                    className="mt-3 block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-800"
                  />
                  <p className="mt-3 text-xs leading-6 text-slate-500">
                    Format gambar seperti JPG, PNG, atau WebP didukung dengan
                    ukuran maksimal 2MB.
                  </p>
                  {uploadError ? (
                    <p className="mt-2 text-xs text-rose-600">{uploadError}</p>
                  ) : null}
                  {isUploading ? (
                    <p className="mt-2 text-xs text-slate-500">
                      Mengunggah bukti pembayaran...
                    </p>
                  ) : null}
                </div>
              </section>
            )}
          </div>

          <aside className="self-start space-y-6 lg:sticky lg:top-24">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Status Transaksi
              </p>

              <div className="mt-4">
                <span
                  className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] ${statusConfig.className}`}
                >
                  {statusConfig.label}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {statusConfig.description}
              </p>

              <div className="mt-6 grid gap-3">
                <Link
                  to={`/events/${transaction.event.slug}`}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Lihat Detail Event
                </Link>

                {transaction.status === "WAITING_FOR_PAYMENT" && (
                  <a
                    href="#payment-proof-section"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Bayar Sekarang
                  </a>
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

              <Link
                to="/customer/transactions"
                className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Kembali ke Riwayat Transaksi
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

type InfoCardProps = {
  label: string;
  value: string;
  helper: string;
};

function InfoCard({ label, value, helper }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-lg font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{helper}</p>
    </div>
  );
}

type PriceRowProps = {
  label: string;
  value: string;
  highlight?: boolean;
};

function PriceRow({ label, value, highlight = false }: PriceRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className={highlight ? "text-base font-bold text-slate-900" : "text-sm text-slate-600"}>
        {label}
      </p>
      <p className={highlight ? "text-lg font-bold text-slate-900" : "text-sm font-semibold text-slate-900"}>
        {value}
      </p>
    </div>
  );
}

function getStatusConfig(status: TransactionStatus) {
  switch (status) {
    case "WAITING_FOR_PAYMENT":
      return {
        label: "Menunggu Pembayaran",
        description: "Customer belum menyelesaikan pembayaran untuk transaksi ini.",
        className: "border-amber-200 bg-amber-50 text-amber-700",
      };
    case "WAITING_FOR_CONFIRMATION":
      return {
        label: "Menunggu Konfirmasi",
        description: "Bukti pembayaran sudah dikirim dan sedang diperiksa admin.",
        className: "border-indigo-200 bg-indigo-50 text-indigo-700",
      };
    case "DONE":
      return {
        label: "Berhasil",
        description: "Pembayaran berhasil diverifikasi dan tiket sudah aktif.",
        className: "border-emerald-200 bg-emerald-50 text-emerald-700",
      };
    case "REJECTED":
      return {
        label: "Ditolak",
        description: "Pembayaran ditolak dan customer perlu melakukan pembayaran ulang.",
        className: "border-rose-200 bg-rose-50 text-rose-700",
      };
    case "EXPIRED":
      return {
        label: "Expired",
        description:
          "Batas 2 jam untuk upload bukti pembayaran sudah habis sehingga transaksi kedaluwarsa.",
        className: "border-zinc-300 bg-zinc-100 text-zinc-700",
      };
    case "CANCELED":
      return {
        label: "Dibatalkan",
        description:
          "Transaksi dibatalkan otomatis karena tidak dikonfirmasi dalam 3 hari.",
        className: "border-slate-300 bg-slate-100 text-slate-700",
      };
    default:
      return {
        label: status,
        description: "Status transaksi tidak diketahui.",
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

function getRemainingTimeLabel(deadline: number, currentTime: number) {
  const diff = deadline - currentTime;

  if (diff <= 0) {
    return "Waktu habis";
  }

  const totalSeconds = Math.floor(diff / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
}
