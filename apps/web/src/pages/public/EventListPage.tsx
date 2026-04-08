/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : EventListPage.tsx
 * Type        : Public Page
 * Feature     : Feature 1
 * Route       : /events
 * Source Path : src/pages/public/EventListPage.tsx
 * Used In     : Public Event Browsing
 * UI Section  : Event List Page
 * Status      : ACTIVE
 * Notes       : Synced with latest global event types
 * =========================================
 */

import { useEffect, useMemo, useState } from "react";
import EventCard from "@/features/events/components/EventCard";
import { eventService } from "@/features/events/services/event.service";
import DisclaimerNote from "@/components/shared/DisclaimerNote";
import { useSearchParams } from "react-router-dom";
import type {
  EventCategory,
  EventLocationType,
  EventSortOption,
} from "@/features/events/types/event.types";

const categoryOptions: Array<EventCategory | "ALL"> = [
  "ALL",
  "WORKSHOP",
  "SEMINAR",
  "BOOTCAMP",
  "WEBINAR",
  "COURSE",
  "NETWORKING",
  "COMPETITION",
  "OTHER",
];

const locationOptions: Array<EventLocationType | "ALL"> = [
  "ALL",
  "ONLINE",
  "OFFLINE",
];

const sortOptions: EventSortOption[] = [
  "NEWEST",
  "OLDEST",
  "PRICE_LOW_TO_HIGH",
  "PRICE_HIGH_TO_LOW",
  "START_DATE_ASC",
  "START_DATE_DESC",
  "TITLE_ASC",
  "TITLE_DESC",
];

export default function EventListPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<EventCategory | "ALL">("ALL");
  const [locationType, setLocationType] = useState<EventLocationType | "ALL">(
    "ALL"
  );
  const [sortBy, setSortBy] = useState<EventSortOption>("NEWEST");

  useEffect(() => {
    const categoryFromQuery = searchParams.get("category");

    if (!categoryFromQuery) {
      return;
    }

    const normalizedCategory = categoryFromQuery.toUpperCase() as EventCategory;

    if (categoryOptions.includes(normalizedCategory)) {
      setCategory(normalizedCategory);
    }
  }, [searchParams]);

  const { data: events, total } = useMemo(() => {
    return eventService.filterEvents({
      search,
      category,
      locationType,
      sortBy,
    });
  }, [search, category, locationType, sortBy]);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* ================================
          HERO + SEARCH — ONE UNIFIED SECTION
         ================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-800 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1800&q=80"
            alt="Event collaboration background"
            className="h-full w-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-slate-900/90 to-slate-800/95" />
        </div>

        {/* HERO TEXT */}
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10">
          <h1 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-4xl">
            Every Event You Need, All in One Place
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            Filter by what excites you and find your next experience.
          </p>
        </div>

        {/* SEARCH CARD — still inside the dark section */}
        <div className="relative mx-auto max-w-7xl px-4 pb-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
              Search & Filter
            </p>

            <h2 className="mt-1 text-lg font-bold text-white md:text-xl">
              Find Your Next Experience
            </h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-300">
              Search by keyword, filter by category or location, and sort by what matters most to you.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {/* SEARCH */}
            <div className="space-y-2">
              <label
                htmlFor="search"
                className="text-sm font-semibold text-slate-300"
              >
                Search Events
              </label>

              <input
                id="search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by title, category, organizer..."
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
              />
            </div>

            {/* CATEGORY */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-semibold text-slate-300"
              >
                Category
              </label>

              <select
                id="category"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value as EventCategory | "ALL")
                }
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
              >
                {categoryOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-800 text-white">
                    {formatOptionLabel(option)}
                  </option>
                ))}
              </select>
            </div>

            {/* LOCATION */}
            <div className="space-y-2">
              <label
                htmlFor="locationType"
                className="text-sm font-semibold text-slate-300"
              >
                Location
              </label>

              <select
                id="locationType"
                value={locationType}
                onChange={(event) =>
                  setLocationType(
                    event.target.value as EventLocationType | "ALL"
                  )
                }
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
              >
                {locationOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-800 text-white">
                    {formatOptionLabel(option)}
                  </option>
                ))}
              </select>
            </div>

            {/* SORT */}
            <div className="space-y-2">
              <label
                htmlFor="sortBy"
                className="text-sm font-semibold text-slate-300"
              >
                Sort By
              </label>

              <select
                id="sortBy"
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as EventSortOption)
                }
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-800 text-white">
                    {formatOptionLabel(option)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          RESULT SUMMARY
         ================================ */}
      <section className="mx-auto max-w-7xl px-4 pt-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
                Result Summary
              </p>
              <h2 className="mt-1 text-lg font-bold text-slate-900">
                {total} Events Ready to Explore
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Showing results based on your active filters. Adjust anytime to discover more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================
          EVENT GRID
         ================================ */}
      <section className="mx-auto max-w-7xl px-4 pt-8">
        {events.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            <DisclaimerNote
              text="Konten frontend ini dikerjakan oleh Feature 1"
              editPath="src/pages/public/EventListPage.tsx"
              className="mt-8"
            />
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">
              Nothing here yet
            </h3>

            <p className="mt-3 text-slate-600">
              Looks like no events match your current filters. Try broadening your search.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("ALL");
                  setLocationType("ALL");
                  setSortBy("NEWEST");
                }}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Reset Filters
              </button>

              <a
                href="#search"
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Change Search
              </a>
            </div>

            <DisclaimerNote
              text="Data dummy ini nantinya akan diisi oleh role: ORGANIZER. Data akan disimpan di backend lalu ditampilkan di frontend."
              editPath="src/pages/public/EventListPage.tsx"
              className="mt-6"
            />
          </div>
        )}
      </section>
    </main>
  );
}

function formatOptionLabel(value: string) {
  if (value === "ALL") return "All";

  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

