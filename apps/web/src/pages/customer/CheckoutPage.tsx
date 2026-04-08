/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : CheckoutPage.tsx
 * Type        : Page
 * Feature     : Feature 1
 * Route       : /checkout/:slug
 * Source Path : src/pages/customer/CheckoutPage.tsx
 * Used In     : Customer Checkout Flow
 * UI Section  : Checkout Page
 * Status      : ACTIVE
 * Notes       : Synced with latest global event types
 * =========================================
 */

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { eventService } from "@/features/events/services/event.service";
import { transactionService } from "@/features/transactions/services/transaction.service";
import { useAuth } from "@/features/auth/hooks/useAuth";
import type { PaymentMethod } from "@/types/transaction.types";
import DisclaimerNote from "@/components/shared/DisclaimerNote";

const USER_DUMMY_POINTS = 25000;
const USER_DUMMY_COUPON = 15000;
const USER_DUMMY_VOUCHER = 20000;
const DEFAULT_EVENT_IMAGE =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useVoucher, setUseVoucher] = useState(true);
  const [useCoupon, setUseCoupon] = useState(true);
  const [usePoints, setUsePoints] = useState(true);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("MANUAL_TRANSFER");
  const event = eventService.getEventBySlug(slug ?? "");

  if (!event) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center">
        {/* =========================================
            PLACEHOLDER INFO - DO NOT REMOVE
           ========================================= */}
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Checkout Placeholder
        </p>

        <p className="text-sm font-semibold text-slate-600">Feature 1</p>

        <p className="mt-1 text-xs text-slate-500">
          src/pages/customer/CheckoutPage.tsx
        </p>

        <h1 className="mb-4 mt-6 text-3xl font-bold text-slate-900">
          Event checkout tidak ditemukan
        </h1>

        <p className="mb-8 max-w-xl text-slate-600">
          Event yang ingin dibeli tidak tersedia atau slug tidak valid.
        </p>

        <Link
          to="/events"
          className="rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Kembali ke Daftar Event
        </Link>
      </section>
    );
  }

  const isFree = event.isFree || event.price === 0;

  const subtotal = event.price;
  const voucherDiscount = isFree || !useVoucher ? 0 : USER_DUMMY_VOUCHER;
  const couponDiscount = isFree || !useCoupon ? 0 : USER_DUMMY_COUPON;
  const pointsUsed = isFree || !usePoints ? 0 : 10000;

  const totalAfterVoucher = Math.max(subtotal - voucherDiscount, 0);
  const totalAfterCoupon = Math.max(totalAfterVoucher - couponDiscount, 0);
  const finalTotal = Math.max(totalAfterCoupon - pointsUsed, 0);

  const eventImage =
    event.thumbnailUrl ||
    event.bannerUrl ||
    event.thumbnail ||
    DEFAULT_EVENT_IMAGE;

  const eventDateLabel = formatDateTimeRange(event.startDate, event.endDate);
  const locationLabel = getLocationLabel(event.location);
  const locationHelper = getLocationHelper(event.location);

  const handleCheckout = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      setIsSubmitting(true);

      const transaction = transactionService.createTransaction({
        userId: user.id,
        event,
        voucherDiscount,
        couponDiscount,
        pointsUsed,
        finalTotal,
        paymentMethod,
      });

      if (transaction.status === "DONE") {
        navigate("/customer/tickets");
        return;
      }

      navigate(`/customer/transactions/${transaction.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* =========================================
          PLACEHOLDER INFO - DO NOT REMOVE
         ========================================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Checkout Placeholder
          </p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Feature 1
          </p>

          <p className="mt-2 text-sm text-slate-500">
            src/pages/customer/CheckoutPage.tsx
          </p>

          <h1 className="mt-5 text-4xl font-bold text-slate-900">
            Checkout Tiket Event
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Halaman ini akan menjadi pusat pembelian tiket event customer,
            termasuk penggunaan voucher, coupon referral, dan points.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* ================================
              LEFT CONTENT
             ================================ */}
          <div className="space-y-8">
            {/* EVENT SUMMARY */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Event Summary
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Ringkasan Event yang Akan Dibeli
                </h2>

                <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                  Data event ini diambil dari event detail yang dipilih customer
                  sebelum masuk ke halaman checkout.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-[220px_1fr]">
                <img
                  src={eventImage}
                  alt={event.title}
                  className="h-56 w-full rounded-2xl object-cover"
                />

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {event.organizer.name}
                    </p>

                    <h3 className="mt-2 text-2xl font-bold text-slate-900">
                      {event.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {event.shortDescription}
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <CheckoutInfoItem
                      label="Kategori"
                      value={event.category.name}
                    />

                    <CheckoutInfoItem
                      label="Status Event"
                      value={event.status}
                    />

                    <CheckoutInfoItem
                      label="Tipe Lokasi"
                      value={event.location.type}
                    />

                    <CheckoutInfoItem
                      label="Sisa Seat"
                      value={`${event.availableSeats} / ${event.totalSeats}`}
                    />
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                    <p className="font-semibold text-slate-900">
                      Rule checkout mini project
                    </p>

                    <ul className="mt-2 space-y-1">
                      <li>• 1 account = 1 ticket per event</li>
                      <li>• Voucher hanya bisa dipakai 1x per account</li>
                      <li>• Referral coupon akan masuk ke checkout flow</li>
                      <li>• Points bisa dipakai jika masih aktif</li>
                    </ul>
                  </div>

                  <DisclaimerNote
                    text="Data dummy ini nantinya akan diisi oleh role: ORGANIZER. Data event akan disimpan di backend lalu ditampilkan ke frontend."
                    editPath="src/pages/customer/CheckoutPage.tsx"
                  />
                </div>
              </div>
            </section>

            {/* DATE & LOCATION */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Event Access Info
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Detail Akses Event
                </h2>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <CheckoutInfoItem label="Jadwal Event" value={eventDateLabel} />

                <CheckoutInfoItem label="Lokasi Event" value={locationLabel} />
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                <p className="font-semibold text-slate-900">Catatan Akses</p>
                <p className="mt-2">{locationHelper}</p>
              </div>

              <DisclaimerNote
                text="Konten frontend ini dikerjakan oleh Feature 1"
                editPath="src/pages/customer/CheckoutPage.tsx"
                className="mt-4"
              />
            </section>

            {/* PAYMENT TOOLS */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Voucher, Coupon & Points
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Simulasi Potongan Checkout
                </h2>

                <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                  Section ini nanti akan dihubungkan ke voucher event, coupon
                  referral, dan points customer dari backend.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <CheckoutToolCard
                  title="Voucher Event"
                  value={
                    isFree ? "Tidak diperlukan" : formatCurrency(voucherDiscount)
                  }
                  helper="Voucher berlaku khusus untuk event ini"
                  checked={useVoucher}
                  disabled={isFree}
                  onChange={() => setUseVoucher((current) => !current)}
                />

                <CheckoutToolCard
                  title="Coupon Referral"
                  value={
                    isFree ? "Tidak diperlukan" : formatCurrency(couponDiscount)
                  }
                  helper="Coupon reward dari referral / promo sistem"
                  checked={useCoupon}
                  disabled={isFree}
                  onChange={() => setUseCoupon((current) => !current)}
                />

                <CheckoutToolCard
                  title="Available Points"
                  value={formatCurrency(USER_DUMMY_POINTS)}
                  helper="Points customer aktif"
                  checked={usePoints}
                  disabled={isFree}
                  onChange={() => setUsePoints((current) => !current)}
                />
              </div>

              <DisclaimerNote
                text="Data dummy ini nantinya akan diisi oleh role: CUSTOMER. Voucher, coupon, dan points akan disimpan di backend lalu dipakai saat checkout."
                editPath="src/pages/customer/CheckoutPage.tsx"
                className="mt-5"
              />
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Payment Method
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Pilih Opsi Pembayaran
                </h2>

                <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                  Customer memilih metode pembayaran sebelum transaksi dibuat
                  dan dilanjutkan ke halaman upload bukti bayar.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <PaymentMethodCard
                  title="Manual Transfer"
                  description="Transfer ke rekening tujuan lalu upload bukti bayar."
                  value="MANUAL_TRANSFER"
                  selected={paymentMethod}
                  onSelect={setPaymentMethod}
                  disabled={isFree}
                />
                <PaymentMethodCard
                  title="Virtual Account"
                  description="Disiapkan untuk integrasi payment gateway berikutnya."
                  value="VIRTUAL_ACCOUNT"
                  selected={paymentMethod}
                  onSelect={setPaymentMethod}
                  disabled={isFree}
                />
                <PaymentMethodCard
                  title="E-Wallet"
                  description="Disiapkan untuk pembayaran digital berbasis e-wallet."
                  value="E_WALLET"
                  selected={paymentMethod}
                  onSelect={setPaymentMethod}
                  disabled={isFree}
                />
              </div>

              <DisclaimerNote
                text={`Metode aktif saat ini: ${
                  isFree
                    ? "Event gratis tidak membutuhkan pembayaran."
                    : getPaymentMethodLabel(paymentMethod)
                }`}
                className="mt-5"
              />
            </section>
          </div>

          {/* ================================
              RIGHT SIDEBAR
             ================================ */}
          <aside className="self-start space-y-6 lg:sticky lg:top-24">
            {/* ORDER SUMMARY */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Order Summary
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Ringkasan Pembayaran
              </h3>

              <div className="mt-6 space-y-4 text-sm">
                <SummaryRow label="Harga Tiket" value={formatCurrency(subtotal)} />

                <SummaryRow
                  label="Voucher Event"
                  value={`- ${formatCurrency(voucherDiscount)}`}
                  muted
                />

                <SummaryRow
                  label="Coupon Referral"
                  value={`- ${formatCurrency(couponDiscount)}`}
                  muted
                />

                <SummaryRow
                  label="Points Digunakan"
                  value={`- ${formatCurrency(pointsUsed)}`}
                  muted
                />

                <div className="border-t border-dashed border-slate-300 pt-4">
                  <SummaryRow
                    label="Total Bayar"
                    value={isFree ? "Gratis" : formatCurrency(finalTotal)}
                    strong
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {isSubmitting
                  ? "Memproses..."
                  : isFree
                  ? "Daftar Event Gratis"
                  : "Lanjut Bayar"}
              </button>

              <Link
                to={`/events/${event.slug}`}
                className="mt-3 inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Kembali ke Detail Event
              </Link>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                <p className="font-semibold text-slate-900">Flow selanjutnya</p>
                <ul className="mt-2 space-y-1">
                  <li>• Buat transaksi</li>
                  <li>• Kurangi seat event</li>
                  <li>• Simpan voucher/coupon usage</li>
                  <li>• Generate ticket customer</li>
                </ul>
              </div>

              <DisclaimerNote
                text="Konten frontend ini dikerjakan oleh Feature 1"
                editPath="src/pages/customer/CheckoutPage.tsx"
                className="mt-5"
              />
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* =========================================
   SUB COMPONENTS
========================================= */

type CheckoutInfoItemProps = {
  label: string;
  value: string;
};

function CheckoutInfoItem({ label, value }: CheckoutInfoItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-base font-bold text-slate-900">{value}</p>
    </div>
  );
}

type CheckoutToolCardProps = {
  title: string;
  value: string;
  helper: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
};

function CheckoutToolCard({
  title,
  value,
  helper,
  checked = false,
  disabled = false,
  onChange,
}: CheckoutToolCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
          {title}
        </p>
        <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          />
          Gunakan
        </label>
      </div>

      <p className="mt-3 text-xl font-bold text-slate-900">{value}</p>

      <p className="mt-2 text-sm leading-6 text-slate-600">{helper}</p>
    </div>
  );
}

type PaymentMethodCardProps = {
  title: string;
  description: string;
  value: PaymentMethod;
  selected: PaymentMethod;
  onSelect: (value: PaymentMethod) => void;
  disabled?: boolean;
};

function PaymentMethodCard({
  title,
  description,
  value,
  selected,
  onSelect,
  disabled = false,
}: PaymentMethodCardProps) {
  const isSelected = selected === value;

  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      disabled={disabled}
      className={`rounded-2xl border p-5 text-left transition ${
        isSelected
          ? "border-indigo-500 bg-indigo-50"
          : "border-slate-200 bg-slate-50 hover:bg-slate-100"
      } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
        {isSelected ? "Dipilih" : "Pilih metode ini"}
      </p>
    </button>
  );
}

type SummaryRowProps = {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
};

function SummaryRow({
  label,
  value,
  strong = false,
  muted = false,
}: SummaryRowProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p
        className={`text-sm ${
          strong
            ? "font-semibold text-slate-900"
            : muted
            ? "text-slate-500"
            : "text-slate-700"
        }`}
      >
        {label}
      </p>

      <p
        className={`text-sm ${
          strong
            ? "text-lg font-bold text-slate-900"
            : muted
            ? "font-semibold text-slate-500"
            : "font-semibold text-slate-900"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* =========================================
   HELPERS
========================================= */

function formatCurrency(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDateTimeRange(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime())
  ) {
    return `${start} - ${end}`;
  }

  return `${new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(startDate)} - ${new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(endDate)}`;
}

function getLocationLabel(location: {
  type: "ONLINE" | "OFFLINE";
  city?: string;
  province?: string;
  country?: string;
  address?: string;
  meetingUrl?: string;
  platform?: string;
}) {
  if (location.type === "ONLINE") {
    return `Online • ${location.platform ?? "Platform belum ditentukan"}`;
  }

  const parts = [location.city, location.province, location.country].filter(
    Boolean
  );

  return parts.length > 0 ? parts.join(", ") : "Offline location";
}

function getLocationHelper(location: {
  type: "ONLINE" | "OFFLINE";
  city?: string;
  province?: string;
  country?: string;
  address?: string;
  meetingUrl?: string;
  platform?: string;
}) {
  if (location.type === "ONLINE") {
    return location.meetingUrl ?? "Link meeting akan tersedia setelah checkout";
  }

  return location.address ?? "Alamat venue akan ditampilkan di sini";
}

function getPaymentMethodLabel(paymentMethod: PaymentMethod) {
  switch (paymentMethod) {
    case "MANUAL_TRANSFER":
      return "Manual Transfer";
    case "VIRTUAL_ACCOUNT":
      return "Virtual Account";
    case "E_WALLET":
      return "E-Wallet";
    default:
      return paymentMethod;
  }
}
