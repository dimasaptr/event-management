/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : OrganizerEventDetailPage.tsx
 * Type        : Organizer Page
 * Feature     : Feature 1
 * Route       : /organizer/events/:id
 * Source Path : src/pages/organizer/OrganizerEventDetailPage.tsx
 * Used In     : Organizer Event Detail
 * UI Section  : Organizer Event Detail
 * Status      : ACTIVE
 * =========================================
 */

import { Link, useParams } from "react-router-dom";
import { eventService } from "@/features/events/services/event.service";

export default function OrganizerEventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const event = eventService.getEventById(id ?? "");

  if (!event) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Event tidak ditemukan
        </h1>
        <p className="mt-3 text-slate-600">
          Event organizer yang dicari tidak tersedia.
        </p>
        <Link
          to="/organizer/events"
          className="mt-6 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Kembali ke Event List
        </Link>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Organizer Event Detail
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            {event.title}
          </h1>
          <p className="mt-3 max-w-3xl leading-8 text-slate-600">
            {event.shortDescription}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                Informasi Event
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <DetailItem label="Kategori" value={event.category.name} />
                <DetailItem label="Status" value={event.status} />
                <DetailItem label="Lokasi" value={event.location.type} />
                <DetailItem
                  label="Harga"
                  value={
                    event.isFree
                      ? "Gratis"
                      : `Rp ${event.price.toLocaleString("id-ID")}`
                  }
                />
                <DetailItem
                  label="Seat"
                  value={`${event.availableSeats}/${event.totalSeats}`}
                />
                <DetailItem
                  label="Rating"
                  value={`${event.averageRating ?? 0} / 5`}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">
                Deskripsi Lengkap
              </h2>
              <p className="mt-4 leading-8 text-slate-700">
                {event.description}
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900">Aksi Cepat</h3>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  to={`/organizer/events/${event.id}/edit`}
                  className="rounded-2xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Edit Event
                </Link>

                <Link
                  to={`/organizer/events/${event.slug}/transactions`}
                  className="rounded-2xl bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Lihat Transactions
                </Link>

                <Link
                  to="/organizer/events"
                  className="rounded-2xl border border-slate-300 px-5 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Kembali ke List
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

type DetailItemProps = {
  label: string;
  value: string;
};

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}