/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : EventDetailPage.tsx
 * Type        : Public Page
 * Feature     : Feature 1
 * Source Path : src/pages/public/EventDetailPage.tsx
 * Used In     : Public Event Detail Route
 * UI Section  : Event Detail Page
 * Status      : ACTIVE
 * Notes       : Safe public event detail page synced with latest event types
 * =========================================
 */

import DisclaimerNote from "@/components/shared/DisclaimerNote";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { eventService } from "@/features/events/services/event.service";
import { Link, useParams } from "react-router-dom";

const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80";

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const event = eventService.getEventBySlug(slug ?? "");
  const isCustomer = user?.role === "CUSTOMER";

  if (!event) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Event Not Found
        </p>

        <h1 className="mb-4 text-3xl font-bold text-slate-900">
          Event yang kamu cari tidak tersedia
        </h1>

        <p className="mb-8 max-w-xl text-slate-600">
          Data event ini nantinya akan diambil berdasarkan slug event yang
          dibuat oleh role: ORGANIZER, disimpan di backend, lalu ditampilkan di
          frontend.
        </p>

        <DisclaimerNote
          className="w-full max-w-xl text-left"
          editPath="src/pages/public/EventDetailPage.tsx"
          text="Konten frontend ini dikerjakan oleh Feature 1."
        />

        <Link
          to="/events"
          className="mt-8 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Kembali ke Daftar Event
        </Link>
      </section>
    );
  }

  const startDateLabel = formatDateTime(event.startDate);
  const endDateLabel = formatDateTime(event.endDate);
  const isSingleDayEvent = isSameCalendarDay(event.startDate, event.endDate);
  const singleDayDateLabel = formatDateOnly(event.startDate);
  const singleDayTimeRangeLabel = `${formatTimeOnly(event.startDate)} - ${formatTimeOnly(event.endDate)}`;
  const seatLabel = `${event.availableSeats} / ${event.totalSeats}`;
  const locationLabel = getLocationLabel(event.location);
  const locationHelper = getLocationHelper(event.location);

  const bannerImage =
    event.bannerUrl || event.thumbnailUrl || event.thumbnail || DEFAULT_BANNER;

  return (
    <div className="bg-slate-50 pb-20">
      <section className="relative min-h-[28rem] overflow-hidden md:min-h-[34rem]">
        <img
          src={bannerImage}
          alt={event.title}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/60 to-slate-950/30" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-32 md:pb-24">
          <div className="max-w-4xl">
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm">
              Event Detail
            </p>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
              {event.title}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
              {event.shortDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <HeroStat label="Organizer" value={event.organizer.name} />
              <HeroStat label="Kategori" value={event.category.name} />
              <HeroStat label="Lokasi" value={locationLabel} />
              <HeroStat
                label="Jadwal"
                value={isSingleDayEvent ? singleDayTimeRangeLabel : "Multi-day"}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-4 max-w-7xl px-4 md:-mt-6 xl:-mt-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.75fr)_22rem]">
          <div className="space-y-8">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-8 border-b border-slate-100 pb-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Detail Event
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-900">
                  {event.title}
                </h2>

                <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                  {event.shortDescription}
                </p>

                <DisclaimerNote
                  className="mt-5"
                  editPath="src/pages/public/EventDetailPage.tsx"
                  text="Data detail event ini nantinya akan diisi oleh role ORGANIZER lalu ditampilkan di frontend."
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                <InfoCard
                  label="Organizer"
                  value={event.organizer.name}
                  helper={event.organizer.email}
                />

                <InfoCard
                  label="Kategori"
                  value={event.category.name}
                  helper="Kategori event"
                />

                <InfoCard
                  label="Status Event"
                  value={event.status}
                  helper="Status publish event"
                />

                {isSingleDayEvent ? (
                  <InfoCard
                    label="Tanggal Event"
                    value={singleDayDateLabel}
                    helper={singleDayTimeRangeLabel}
                  />
                ) : (
                  <>
                    <InfoCard
                      label="Tanggal Mulai"
                      value={startDateLabel}
                      helper="Waktu mulai event"
                    />

                    <InfoCard
                      label="Tanggal Selesai"
                      value={endDateLabel}
                      helper="Waktu selesai event"
                    />
                  </>
                )}

                <InfoCard
                  label="Lokasi"
                  value={locationLabel}
                  helper={locationHelper}
                />

                <InfoCard
                  label="Sisa Seat"
                  value={seatLabel}
                  helper="Seat availability"
                />

              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Deskripsi Event
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Tentang Event Ini
                </h3>
              </div>

              <p className="leading-8 text-slate-700">{event.description}</p>

              <DisclaimerNote
                className="mt-6"
                editPath="src/pages/public/EventDetailPage.tsx"
                text="Deskripsi event ini akan dikelola organizer dari backend lalu ditampilkan di halaman publik."
              />
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Review Snapshot
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Ringkasan Review Event
                </h3>
              </div>

              <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50/70 px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                  Rating Event
                </p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <p className="text-3xl font-bold text-slate-900">
                    {event.averageRating ?? 0} / 5
                  </p>
                  <p className="text-sm text-slate-600">
                    {event.totalReviews ?? 0} review
                  </p>
                </div>
              </div>

              {event.reviews && event.reviews.length > 0 ? (
                <div className="space-y-4">
                  {event.reviews.slice(0, 3).map((review) => (
                    <div
                      key={review.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-semibold text-slate-900">
                          {review.user?.name ?? "Anonymous User"}
                        </p>

                        <p className="text-sm font-semibold text-amber-600">
                          ★ {review.rating}/5
                        </p>
                      </div>

                      <p className="mt-3 leading-7 text-slate-700">
                        {review.comment || "Belum ada komentar."}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                  <p className="text-lg font-semibold text-slate-900">
                    Belum ada review
                  </p>
                  <p className="mt-2 text-slate-600">
                    Review akan muncul setelah customer membeli dan menghadiri
                    event.
                  </p>
                </div>
              )}

              <DisclaimerNote
                className="mt-6"
                editPath="src/pages/public/EventDetailPage.tsx"
                text="Review event ini nantinya berasal dari customer yang sudah hadir dan akan ditampilkan kembali di frontend."
              />
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                  Informasi Tampilan
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Struktur Halaman Frontend
                </h3>
              </div>

              <p className="leading-8 text-slate-700">
                Halaman ini berfungsi sebagai renderer detail event untuk
                publik. Nantinya data event akan diambil dari backend
                menggunakan slug event yang dibuat oleh role: ORGANIZER, lalu
                ditampilkan ke frontend untuk customer maupun visitor.
              </p>

              <DisclaimerNote
                className="mt-6"
                editPath="src/pages/public/EventDetailPage.tsx"
                text="Konten frontend halaman detail event ini dikerjakan oleh Feature 1."
              />
            </section>
          </div>

          <aside className="self-start space-y-6 xl:sticky xl:top-24">
            <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 bg-slate-950 px-6 py-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                  Harga Tiket
                </p>

                <h3 className="mt-3 text-4xl font-bold text-white">
                  {event.isFree
                    ? "Gratis"
                    : `Rp ${event.price.toLocaleString("id-ID")}`}
                </h3>
              </div>

              <div className="space-y-5 p-6">
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                  <SidebarMiniCard
                    label="Status"
                    value={event.status}
                  />
                  <SidebarMiniCard
                    label="Seat Tersisa"
                    value={seatLabel}
                  />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
                  <p className="font-semibold text-slate-900">Info Cepat</p>
                  <ul className="mt-2 space-y-1">
                    <li>• 1 akun = 1 tiket per event</li>
                    <li>• Checkout tersedia setelah login sebagai customer</li>
                    <li>• Voucher dan coupon dipakai di checkout flow</li>
                  </ul>
                </div>

                <Link
                  to={isCustomer ? `/checkout/${event.slug}` : "/login"}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {isCustomer ? "Beli Tiket" : "Login untuk Beli Tiket"}
                </Link>

                {!isCustomer ? (
                  <p className="text-sm leading-6 text-slate-600">
                    Kamu perlu login sebagai customer sebelum lanjut ke checkout.
                  </p>
                ) : null}

                <DisclaimerNote
                  className=""
                  editPath="src/pages/public/EventDetailPage.tsx"
                  text="Harga, seat, dan CTA pembelian di sidebar ini mengikuti data event dari organizer."
                />
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Alur Customer
              </p>

              <h3 className="mt-2 text-2xl font-bold text-slate-900">
                Checkout & Akses Event
              </h3>

              <p className="mt-3 leading-7 text-slate-700">
                Setelah customer melakukan pembelian, data transaksi, tiket,
                attendance, dan review akan tersimpan di backend lalu
                ditampilkan kembali ke frontend pada dashboard customer.
              </p>

              <DisclaimerNote
                className="mt-5"
                editPath="src/pages/public/EventDetailPage.tsx"
                text="Alur pembelian dan akses event ini mengikuti flow customer yang terhubung ke transaksi, tiket, dan review."
              />

              <Link
                to="/events"
                className="mt-6 inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Lihat Event Lain
              </Link>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
}

type InfoCardProps = {
  label: string;
  value: string;
  helper: string;
  emphasis?: "default" | "highlight";
};

function InfoCard({
  label,
  value,
  helper,
  emphasis = "default",
}: InfoCardProps) {
  return (
    <div
      className={`rounded-2xl border p-5 transition ${
        emphasis === "highlight"
          ? "border-amber-200 bg-amber-50/70"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-lg font-bold leading-snug text-slate-900">
        {value}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-600">{helper}</p>
    </div>
  );
}

type HeroStatProps = {
  label: string;
  value: string;
};

function HeroStat({ label, value }: HeroStatProps) {
  return (
    <div className="min-w-[9rem] rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

type SidebarMiniCardProps = {
  label: string;
  value: string;
};

function SidebarMiniCard({ label, value }: SidebarMiniCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function formatDateTime(isoString: string) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

function formatDateOnly(isoString: string) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatTimeOnly(isoString: string) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function isSameCalendarDay(startIsoString: string, endIsoString: string) {
  const startDate = new Date(startIsoString);
  const endDate = new Date(endIsoString);

  if (
    Number.isNaN(startDate.getTime()) ||
    Number.isNaN(endDate.getTime())
  ) {
    return false;
  }

  return (
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate()
  );
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
    return "Link meeting akan tersedia setelah checkout";
  }

  return location.address ?? "Alamat venue akan ditampilkan di sini";
}
