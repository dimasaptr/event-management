/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : OrganizerEventListPage.tsx
 * Type        : Organizer Page
 * Feature     : Feature 1
 * Route       : /organizer/events
 * Source Path : src/pages/organizer/OrganizerEventListPage.tsx
 * Used In     : Organizer Event Management
 * UI Section  : Organizer Event List
 * Status      : ACTIVE
 * =========================================
 */

import { Link } from "react-router-dom";
import { eventService } from "@/features/events/services/event.service";

export default function OrganizerEventListPage() {
  const events = eventService.getAllEvents().data;

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Organizer Event List
          </p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Kelola Event Organizer
          </h1>
          <p className="mt-3 max-w-3xl leading-8 text-slate-600">
            Halaman ini menampilkan seluruh event milik organizer untuk dikelola,
            diedit, atau dilihat detailnya.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10">
        <div className="mb-6 flex justify-end">
          <Link
            to="/organizer/events/create"
            className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Buat Event Baru
          </Link>
        </div>

        <div className="grid gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
                    {event.category.name}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-slate-900">
                    {event.title}
                  </h2>

                  <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                    {event.shortDescription}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {event.status}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {event.location.type}
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1">
                      {event.availableSeats}/{event.totalSeats} seats
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/organizer/events/${event.id}`}
                    className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Detail
                  </Link>

                  <Link
                    to={`/organizer/events/${event.id}/edit`}
                    className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/organizer/events/${event.slug}/transactions`}
                    className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    Transactions
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}