/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : MyTicketsPage.tsx
 * Type        : Page
 * Feature     : Feature 1
 * Route       : /customer/tickets
 * Source Path : src/pages/customer/MyTicketsPage.tsx
 * Used In     : Customer Ticket Access
 * UI Section  : My Tickets Page
 * Status      : ACTIVE
 * Notes       : Reserved for Feature 1 developer
 * =========================================
 */

import { Link } from "react-router-dom";
import { transactionService } from "@/features/transactions/services/transaction.service";

export default function MyTicketsPage() {
  const tickets = transactionService.getTickets().data;

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Customer Tickets Placeholder
          </p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Feature 1
          </p>

          <p className="mt-2 text-sm text-slate-500">
            src/pages/customer/MyTicketsPage.tsx
          </p>

          <h1 className="mt-5 text-4xl font-bold text-slate-900">
            Tiket Event Saya
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Halaman ini menampilkan tiket event yang sudah berhasil dibeli dan
            siap diakses oleh customer.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10">
        {tickets.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              Belum ada tiket
            </h2>
            <p className="mt-3 text-slate-600">
              Kamu belum memiliki tiket event. Silakan beli event terlebih
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
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tickets.map((ticket) => (
              <article
                key={ticket.id}
                className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                      Ticket Active
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-slate-900">
                      {ticket.event.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-600">
                      Organizer: {ticket.event.organizerName}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase text-slate-500">
                      Tanggal Event
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {formatDate(ticket.event.eventDate)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase text-slate-500">
                      Tipe Event
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">
                      {ticket.event.locationType === "ONLINE"
                        ? "Online Event"
                        : "Offline Event"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {ticket.event.locationType === "ONLINE" &&
                    ticket.event.meetingUrl && (
                      <a
                        href={ticket.event.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                      >
                        Join Event
                      </a>
                    )}

                  <Link
                    to={`/events/${ticket.event.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Lihat Detail Event
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function formatDate(isoString: string) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}