/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : CreateEventPage.tsx
 * Type        : Page
 * Feature     : Feature 1
 * Route       : /organizer/events/create
 * Source Path : src/pages/organizer/CreateEventPage.tsx
 * Used In     : Organizer Event Management
 * UI Section  : Create Event Page
 * Status      : ACTIVE
 * Notes       : Reserved for Feature 1 developer
 * =========================================
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OrganizerEventForm, {
  type OrganizerEventFormValues,
} from "@/features/events/components/OrganizerEventForm";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateEvent = async (values: OrganizerEventFormValues) => {
    try {
      setIsSubmitting(true);

      console.log("Create Event Payload:", values);

      // TODO:
      // connect create event service later

      navigate("/organizer/events");
    } catch (error) {
      console.error("Create event failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-104px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          {/* =========================================
              PLACEHOLDER INFO - DO NOT REMOVE
             ========================================= */}
          <h1 className="text-3xl font-bold text-zinc-900">
            Create Event Page
          </h1>

          <p className="mt-4 text-sm font-semibold text-zinc-600">
            Feature 1
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            src/pages/organizer/CreateEventPage.tsx
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/organizer/events"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
            >
              Back to My Events
            </Link>

            <Link
              to="/organizer/dashboard"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Organizer Event Management
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              Create New Event
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Isi form di bawah untuk membuat event baru milik organizer.
            </p>
          </div>

          <OrganizerEventForm
            mode="create"
            onSubmit={handleCreateEvent}
            isSubmitting={isSubmitting}
          />
        </section>
      </div>
    </main>
  );
}