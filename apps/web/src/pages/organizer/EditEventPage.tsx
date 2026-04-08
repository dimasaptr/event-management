/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : EditEventPage.tsx
 * Type        : Organizer Page
 * Feature     : Feature 1
 * Route       : /organizer/events/:id/edit
 * Source Path : src/pages/organizer/EditEventPage.tsx
 * Used In     : Organizer Edit Event
 * UI Section  : Edit Event Form
 * Status      : ACTIVE
 * =========================================
 */

import { Link, useParams } from "react-router-dom";
import { eventService } from "@/features/events/services/event.service";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const event = eventService.getEventById(id ?? "");

  if (!event) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          Event tidak ditemukan
        </h1>
        <p className="mt-3 text-slate-600">
          Event yang ingin diedit tidak tersedia.
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
        <div className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Edit Event
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Edit {event.title}
          </h1>
          <p className="mt-3 max-w-3xl leading-8 text-slate-600">
            Halaman ini akan menjadi form edit event organizer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pt-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Judul Event" value={event.title} />
            <Field label="Kategori" value={event.category.name} />
            <Field label="Status" value={event.status} />
            <Field label="Tipe Lokasi" value={event.location.type} />
            <Field
              label="Harga"
              value={
                event.isFree
                  ? "Gratis"
                  : `Rp ${event.price.toLocaleString("id-ID")}`
              }
            />
            <Field
              label="Seat"
              value={`${event.availableSeats}/${event.totalSeats}`}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Deskripsi
            </p>
            <p className="mt-3 leading-8 text-slate-700">{event.description}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Simpan Perubahan
            </button>

            <Link
              to={`/organizer/events/${event.id}`}
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Kembali ke Detail
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

type FieldProps = {
  label: string;
  value: string;
};

function Field({ label, value }: FieldProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-bold text-slate-900">{value}</p>
    </div>
  );
}