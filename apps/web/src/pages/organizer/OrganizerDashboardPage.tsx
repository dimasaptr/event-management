/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : OrganizerDashboardPage.tsx
 * Type        : Page
 * Feature     : Feature 2
 * Route       : /organizer/dashboard
 * Source Path : src/pages/organizer/OrganizerDashboardPage.tsx
 * Used In     : Organizer Area
 * UI Section  : Organizer Dashboard
 * Status      : ACTIVE
 * Notes       : Real dashboard content for Phase 5
 * =========================================
 */

import DisclaimerNote from "@/components/shared/DisclaimerNote";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { dashboardService } from "@/features/dashboard/services/dashboard.service";
import type { OrganizerDashboardData } from "@/features/dashboard/services/dashboard.service";

export default function OrganizerDashboardPage() {
  const [dashboard, setDashboard] = useState<OrganizerDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true);
        const result = await dashboardService.getOrganizerDashboard();
        setDashboard(result);
      } catch (error) {
        console.error("Failed to load organizer dashboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-[calc(100vh-104px)] bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm text-slate-500">Loading organizer dashboard...</p>
          </section>
        </div>
      </main>
    );
  }

  if (!dashboard) {
    return (
      <main className="min-h-[calc(100vh-104px)] bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <section className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-900">
              Dashboard Not Available
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Gagal memuat dashboard organizer.
            </p>
          </section>
        </div>
      </main>
    );
  }

  const { stats, recentEvents, recentTransactions } = dashboard;

  return (
    <main className="min-h-[calc(100vh-104px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* HEADER */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Organizer Dashboard
          </p>

          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Ringkasan Performa Organizer
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Pantau performa event, transaksi, peserta, dan revenue dari satu dashboard utama.
              </p>
            </div>

            <DisclaimerNote
              className="md:max-w-xs"
              editPath="src/pages/organizer/OrganizerDashboardPage.tsx"
              text="Konten frontend ini dikerjakan oleh Feature 2."
            />
          </div>
        </section>

        {/* HERO CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white shadow-lg">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                Dashboard Actions
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Kelola Event Kamu dengan Lebih Cepat
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/85">
                Masuk ke halaman event organizer untuk edit event, cek transaksi,
                dan pantau attendee tiap event.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/organizer/events"
                className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-indigo-600 transition hover:bg-slate-100"
              >
                Kelola Event Saya
              </Link>

              <Link
                to="/organizer/events/create"
                className="rounded-2xl border border-white/30 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                + Buat Event Baru
              </Link>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Total Events"
            value={stats.totalEvents.toString()}
            helper="Jumlah semua event organizer"
          />
          <StatCard
            label="Published Events"
            value={stats.publishedEvents.toString()}
            helper="Event aktif yang tampil ke publik"
          />
          <StatCard
            label="Total Transactions"
            value={stats.totalTransactions.toString()}
            helper="Semua transaksi terkait event organizer"
          />
          <StatCard
            label="Total Revenue"
            value={`Rp ${stats.totalRevenue.toLocaleString("id-ID")}`}
            helper="Akumulasi revenue dari transaksi DONE"
          />
        </section>

        {/* SECONDARY STATS */}
        <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Attendance Snapshot
            </p>

            <h3 className="mt-3 text-2xl font-bold text-slate-900">
              Total Peserta Terkonfirmasi
            </h3>

            <div className="mt-6 rounded-3xl bg-slate-900 px-6 py-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-300">
                Confirmed Attendees
              </p>
              <p className="mt-4 text-5xl font-extrabold">
                {stats.totalAttendees}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                Data ini dihitung dari transaksi dengan status <span className="font-semibold text-white">DONE</span>.
              </p>
            </div>

            <DisclaimerNote
              className="mt-6"
              editPath="src/pages/organizer/OrganizerDashboardPage.tsx"
              text="Konten frontend ini dikerjakan oleh Feature 2."
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
              Quick Actions
            </p>

            <h3 className="mt-3 text-2xl font-bold text-slate-900">
              Aksi Cepat Organizer
            </h3>

            <div className="mt-6 grid gap-3">
              <ActionLink
                to="/organizer/events"
                title="My Events"
                desc="Lihat semua event kamu"
              />
              <ActionLink
                to="/organizer/events/create"
                title="Create Event"
                desc="Buat event baru"
              />
              <ActionLink
                to="/events"
                title="Lihat Public Events"
                desc="Cek tampilan event publik"
              />
            </div>
          </div>
        </section>

        {/* RECENT EVENTS + RECENT TRANSACTIONS */}
        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* RECENT EVENTS */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                  Recent Events
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Event Organizer Terbaru
                </h3>
              </div>

              <Link
                to="/organizer/events"
                className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
              >
                View All →
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {recentEvents.length > 0 ? (
                recentEvents.map((event) => (
                  <div
                    key={event.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-lg font-bold text-slate-900">
                          {event.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {event.category.name} • {event.location.type}
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                          Start: {formatDate(event.startDate)}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 sm:items-end">
                        <StatusBadge status={event.status} />
                        <Link
                          to={`/organizer/events/${event.slug}`}
                          className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                        >
                          View Detail →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyBlock text="Belum ada event organizer yang bisa ditampilkan." />
              )}
            </div>
          </section>

          {/* RECENT TRANSACTIONS */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                  Recent Transactions
                </p>
                <h3 className="mt-2 text-2xl font-bold text-slate-900">
                  Transaksi Terkait Event Kamu
                </h3>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {recentTransactions.length > 0 ? (
                recentTransactions.map((trx) => (
                  <div
                    key={trx.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                            {trx.invoiceNumber}
                          </p>
                          <p className="mt-2 text-lg font-bold text-slate-900">
                            {trx.event.title}
                          </p>
                          <p className="mt-1 text-sm text-slate-600">
                            Final Total:{" "}
                            <span className="font-semibold text-slate-900">
                              Rp {trx.payment.finalTotal.toLocaleString("id-ID")}
                            </span>
                          </p>
                        </div>

                        <StatusBadge status={trx.status} />
                      </div>

                      <div className="flex flex-col gap-2 text-sm text-slate-600">
                        <p>Created: {formatDate(trx.createdAt)}</p>
                        <p>Payment Proof: {trx.paymentProofStatus}</p>
                      </div>

                      <Link
                        to={`/organizer/events/${trx.event.slug}/transactions`}
                        className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-500"
                      >
                        Open Transactions →
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyBlock text="Belum ada transaksi yang terkait dengan event organizer." />
              )}
            </div>
          </section>
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
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
        {label}
      </p>
      <p className="mt-4 text-3xl font-extrabold text-slate-900">{value}</p>
      <p className="mt-3 text-sm leading-6 text-slate-600">{helper}</p>
    </div>
  );
}

function ActionLink({
  to,
  title,
  desc,
}: {
  to: string;
  title: string;
  desc: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:bg-slate-100"
    >
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{desc}</p>
    </Link>
  );
}

function StatusBadge({ status }: { status: string }) {
  const baseClass =
    "inline-flex rounded-full px-3 py-1 text-xs font-semibold";

  if (status === "PUBLISHED" || status === "DONE") {
    return (
      <span className={`${baseClass} bg-emerald-100 text-emerald-700`}>
        {status}
      </span>
    );
  }

  if (status === "WAITING_FOR_PAYMENT" || status === "WAITING_FOR_CONFIRMATION") {
    return (
      <span className={`${baseClass} bg-amber-100 text-amber-700`}>
        {status}
      </span>
    );
  }

  if (status === "ARCHIVED" || status === "REJECTED") {
    return (
      <span className={`${baseClass} bg-rose-100 text-rose-700`}>
        {status}
      </span>
    );
  }

  if (status === "EXPIRED" || status === "CANCELED") {
    return (
      <span className={`${baseClass} bg-slate-100 text-slate-700`}>
        {status}
      </span>
    );
  }

  return (
    <span className={`${baseClass} bg-slate-100 text-slate-700`}>
      {status}
    </span>
  );
}

function EmptyBlock({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
      {text}
    </div>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
