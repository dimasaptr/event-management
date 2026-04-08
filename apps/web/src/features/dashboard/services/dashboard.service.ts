/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : dashboard.service.ts
 * Type        : Service
 * Feature     : Feature 2
 * Source Path : src/features/dashboard/services/dashboard.service.ts
 * Used In     : Organizer Dashboard
 * Status      : ACTIVE
 * =========================================
 */

import { dummyEvents } from "@/features/events/utils/dummyEvents";
import type { Event } from "@/features/events/types/event.types";
import { transactionService } from "@/features/transactions/services/transaction.service";
import type { Transaction } from "@/types/transaction.types";

export interface OrganizerDashboardStats {
  totalEvents: number;
  publishedEvents: number;
  totalTransactions: number;
  totalAttendees: number;
  totalRevenue: number;
}

export interface OrganizerDashboardData {
  stats: OrganizerDashboardStats;
  recentEvents: Event[];
  recentTransactions: Transaction[];
}

const ORGANIZER_NAME_FALLBACKS = ["Creative Skill Academy", "CodeSprint Studio"];

export const dashboardService = {
  async getOrganizerDashboard(): Promise<OrganizerDashboardData> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const organizerEvents = dummyEvents.filter((event) =>
      ORGANIZER_NAME_FALLBACKS.includes(event.organizer.name)
    );

    const transactions = transactionService.getTransactions().data;

    const organizerEventIds = new Set(organizerEvents.map((event) => event.id));

    const relatedTransactions = transactions.filter((trx) =>
      organizerEventIds.has(trx.event.id)
    );

    const totalRevenue = relatedTransactions
      .filter((trx) => trx.status === "DONE")
      .reduce((sum, trx) => sum + trx.payment.finalTotal, 0);

    const totalAttendees = relatedTransactions.filter(
      (trx) => trx.status === "DONE"
    ).length;

    const publishedEvents = organizerEvents.filter(
      (event) => event.status === "PUBLISHED"
    ).length;

    const recentEvents = [...organizerEvents]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 4);

    const recentTransactions = [...relatedTransactions]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);

    return {
      stats: {
        totalEvents: organizerEvents.length,
        publishedEvents,
        totalTransactions: relatedTransactions.length,
        totalAttendees,
        totalRevenue,
      },
      recentEvents,
      recentTransactions,
    };
  },
};