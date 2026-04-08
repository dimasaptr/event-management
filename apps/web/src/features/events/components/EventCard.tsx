/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : EventCard.tsx
 * Type        : Component
 * Feature     : Feature 1
 * Source Path : src/features/events/components/EventCard.tsx
 * Used In     : Event Listing / Homepage Featured / Event Preview
 * UI Section  : Event Card
 * Status      : ACTIVE
 * Notes       : Synced with global event types
 * =========================================
 */

import type { Event } from "@/types/event.types";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

const formatPrice = (price: number) => {
  if (price === 0) return "Gratis";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const getLocationText = (event: Event) => {
  if (event.location.type === "ONLINE") {
    return event.location.platform
      ? `Online � ${event.location.platform}`
      : "Online";
  }

  const locationParts = [event.location.city, event.location.province].filter(
    Boolean
  );

  return locationParts.length > 0 ? locationParts.join(", ") : "Offline";
};

export default function EventCard({ event }: EventCardProps) {
  const imageUrl =
    event.thumbnailUrl ||
    event.bannerUrl ||
    event.thumbnail ||
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        <img
          src={imageUrl}
          alt={event.title}
          className="h-40 w-full object-cover"
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow">
            {event.category.name}
          </span>
          {event.isFeatured ? (
            <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-semibold text-white shadow">
              Featured
            </span>
          ) : null}
          {event.isFree ? (
            <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow">
              Free
            </span>
          ) : null}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-slate-500">{event.organizer.name}</p>
          <h3 className="line-clamp-2 text-base font-bold text-slate-900">
            {event.title}
          </h3>
          <p className="line-clamp-2 text-xs text-slate-600">
            {event.shortDescription}
          </p>
        </div>

        <div className="space-y-1 text-xs text-slate-600">
          <p>
            <span className="font-semibold text-slate-800">Date:</span>{" "}
            {formatDate(event.startDate)}
          </p>
          <p>
            <span className="font-semibold text-slate-800">Location:</span>{" "}
            {getLocationText(event)}
          </p>
          <p>
            <span className="font-semibold text-slate-800">Seats Left:</span>{" "}
            {event.availableSeats} / {event.totalSeats}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Price</p>
            <p className="text-sm font-bold text-indigo-700">
              {formatPrice(event.price)}
            </p>
          </div>
          <Link
            to={`/events/${event.slug}`}
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800"
          >
            View Detail
          </Link>
        </div>
      </div>
    </article>
  );
}
