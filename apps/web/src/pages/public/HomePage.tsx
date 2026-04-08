/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : HomePage.tsx
 * Type        : Public Page
 * Feature     : Feature 1
 * Source Path : src/pages/public/HomePage.tsx
 * Used In     : Public Home Route
 * UI Section  : Homepage
 * Status      : ACTIVE
 * Notes       : Homepage placeholder synced with event service
 * =========================================
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "@/features/events/components/EventCard";
import { eventService } from "@/features/events/services/event.service";
import DisclaimerNote from "@/components/shared/DisclaimerNote";
import type { Event as AppEvent } from "@/types/event.types";

export default function HomePage() {
  const publishedEvents = eventService.getPublishedEvents().data;
  const featuredEvents = eventService.getFeaturedEvents().data.slice(0, 3);
  const newestEvents = [...publishedEvents]
    .sort(
      (firstEvent, secondEvent) =>
        new Date(secondEvent.createdAt).getTime() -
        new Date(firstEvent.createdAt).getTime()
    )
    .slice(0, 8);
  const [activeNewestEventIndex, setActiveNewestEventIndex] = useState(0);
  const [visibleNewestEventCount, setVisibleNewestEventCount] = useState(() =>
    getVisibleNewestEventCount()
  );
  const organizerCount = new Set(
    publishedEvents.map((event) => event.organizer.id)
  ).size;
  const categoryCount = new Set(
    publishedEvents.map((event) => event.category.name)
  ).size;
  const onlineCount = publishedEvents.filter(
    (event) => event.location.type === "ONLINE"
  ).length;
  const offlineCount = publishedEvents.filter(
    (event) => event.location.type === "OFFLINE"
  ).length;

  const highlights = [
    {
      title: "Live Events",
      value: `${publishedEvents.length}+`,
      description:
        "Active events ready to join — from online sessions to in-person experiences across the country.",
    },
    {
      title: "Trusted Organizers",
      value: `${organizerCount}+`,
      description:
        "Verified organizers bringing quality events across industries, skills, and interests.",
    },
    {
      title: "Categories",
      value: `${categoryCount}`,
      description:
        "From tech bootcamps to creative workshops — there's something for every kind of learner.",
    },
    {
      title: "Formats",
      value: `${onlineCount} Online • ${offlineCount} Offline`,
      description:
        "Attend from anywhere or show up in person — your choice, your schedule.",
    },
  ];

  const categories = Array.from(
    new Set(publishedEvents.map((event) => event.category.name))
  );

  useEffect(() => {
    if (newestEvents.length <= 1) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveNewestEventIndex((currentIndex) =>
        currentIndex === newestEvents.length - 1 ? 0 : currentIndex + 1
      );
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, [newestEvents.length]);

  useEffect(() => {
    const handleResize = () => {
      setVisibleNewestEventCount(getVisibleNewestEventCount());
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleNewestEvents = getVisibleNewestEvents(
    newestEvents,
    activeNewestEventIndex,
    visibleNewestEventCount
  );

  return (
    <main className="bg-slate-50 pb-20">
      {/* ================================
          HERO SECTION
         ================================ */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-950 to-slate-950" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* LEFT */}
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Your Next Big Opportunity Starts with the Right Event
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              Workshops, bootcamps, seminars, webinars — thousands of events curated for people who never stop growing. Find yours today.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/events"
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
              >
                Browse Events
              </Link>

              <Link
                to="/register"
                className="rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Join for Free
              </Link>

              <Link
                to="/register"
                className="rounded-xl border border-emerald-300/30 bg-emerald-500/15 px-5 py-2.5 text-sm font-semibold text-emerald-50 backdrop-blur-sm transition hover:bg-emerald-500/25"
              >
                Host an Event
              </Link>
            </div>

            <DisclaimerNote
              text="Konten frontend ini dikerjakan oleh Feature 1"
              editPath="src/pages/public/HomePage.tsx"
              className="mt-6 text-slate-300"
            />
          </div>

          {/* RIGHT */}
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-sm">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80"
              alt="Event platform hero"
              className="h-72 w-full rounded-2xl object-cover lg:h-80"
            />

            <DisclaimerNote
              text="Konten frontend ini dikerjakan oleh Feature 1"
              editPath="src/pages/public/HomePage.tsx"
              className="mt-4 text-slate-300"
            />
          </div>
        </div>
      </section>

      {/* ================================
          NEWEST EVENTS CAROUSEL
         ================================ */}
      <section className="bg-slate-950 pb-10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
                Newest Events
              </p>
              <h2 className="mt-1 text-xl font-bold text-white md:text-2xl">
                Just Dropped — Fresh Events for You
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Hot off the press. These are the latest events added to the platform — don't miss your spot.
              </p>
            </div>
            <DisclaimerNote
              text="Data event terbaru di carousel ini mengikuti event publik dengan createdAt paling baru."
              editPath="src/pages/public/HomePage.tsx"
              className="text-slate-400"
            />
          </div>

          {newestEvents.length > 0 ? (
            <>
              <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {visibleNewestEvents.map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.slug}`}
                    className="group block overflow-hidden rounded-2xl"
                  >
                    <div className="relative h-56 overflow-hidden rounded-2xl lg:h-64">
                      <img
                        src={event.bannerUrl || event.thumbnailUrl || event.thumbnail}
                        alt={event.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h3 className="line-clamp-2 text-base font-bold leading-snug text-white md:text-lg">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {newestEvents.length > 1 ? (
                <div className="mt-4 flex items-center justify-center gap-2">
                  {newestEvents.map((event, index) => (
                    <button
                      key={event.id}
                      type="button"
                      aria-label={`Go to carousel page ${index + 1}`}
                      onClick={() => setActiveNewestEventIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === activeNewestEventIndex
                          ? "w-6 bg-white"
                          : "w-2 bg-white/35 hover:bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-white/15 bg-white/5 p-8 text-center">
              <p className="text-base font-semibold text-white">No new events yet</p>
              <p className="mt-1 text-sm text-slate-300">Latest public events will appear here.</p>
            </div>
          )}
        </div>
      </section>

      {/* ================================
          PLATFORM HIGHLIGHTS
         ================================ */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Platform Highlights
          </p>
          <h2 className="mt-1 text-xl font-bold text-slate-900 md:text-2xl">
            Numbers That Speak for Themselves
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            A growing community of learners, creators, and organizers — all in one place.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                {item.title}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {item.value}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================================
          CATEGORY SECTION
         ================================ */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Event Categories
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900 md:text-2xl">
              What Are You Into?
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              From coding to creativity, from career growth to networking — pick a category and dive in.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/events?category=${category}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                {toTitleCase(category)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================================
          FEATURED EVENTS
         ================================ */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Featured Events
            </p>
            <h2 className="mt-1 text-xl font-bold text-slate-900 md:text-2xl">
              Handpicked Events Worth Your Time
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Carefully selected — these are the events people are talking about right now.
            </p>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            See All Events →
          </Link>
        </div>

        {featuredEvents.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">No featured events yet</h3>
            <p className="mt-2 text-sm text-slate-600">
              Featured events will appear here once organizers publish them.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

function toTitleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function getVisibleNewestEventCount() {
  if (typeof window === "undefined") {
    return 3;
  }

  if (window.innerWidth >= 1280) {
    return 3;
  }

  if (window.innerWidth >= 768) {
    return 2;
  }

  return 1;
}

function getVisibleNewestEvents(
  events: AppEvent[],
  startIndex: number,
  visibleCount: number
) {
  if (events.length === 0) {
    return [];
  }

  return Array.from({ length: Math.min(visibleCount, events.length) }, (_, offset) => {
    return events[(startIndex + offset) % events.length];
  });
}
