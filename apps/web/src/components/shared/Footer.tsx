/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : Footer.tsx
 * Type        : Layout Component
 * Feature     : Shared
 * Source Path : src/components/shared/Footer.tsx
 * Used In     : MainLayout
 * Status      : ACTIVE
 * =========================================
 */

import { Link } from "react-router-dom";

const footerLinks = {
  Explore: [
    { label: "Browse Events", to: "/events" },
    { label: "Workshops", to: "/events?category=WORKSHOP" },
    { label: "Bootcamps", to: "/events?category=BOOTCAMP" },
    { label: "Webinars", to: "/events?category=WEBINAR" },
    { label: "Seminars", to: "/events?category=SEMINAR" },
  ],
  Account: [
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" },
    { label: "My Profile", to: "/profile" },
    { label: "My Tickets", to: "/customer/tickets" },
    { label: "My Transactions", to: "/customer/transactions" },
  ],
  Organizer: [
    { label: "Host an Event", to: "/register" },
    { label: "Organizer Dashboard", to: "/organizer/dashboard" },
    { label: "Manage Events", to: "/organizer/events" },
    { label: "Create Event", to: "/organizer/events/create" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xl font-bold text-white"
            >
              <span>Learn</span>
              <span className="rounded-lg bg-indigo-600 px-2 py-0.5 text-white">
                Hub
              </span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
              Your go-to platform for discovering workshops, bootcamps, webinars, and events that help you grow — personally and professionally.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                Online Events
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                Offline Events
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                Free & Paid
              </span>
            </div>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                {group}
              </p>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} LearnHub. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built for learners, creators, and organizers.
          </p>
        </div>
      </div>
    </footer>
  );
}
