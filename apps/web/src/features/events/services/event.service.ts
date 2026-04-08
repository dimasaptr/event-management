/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : event.service.ts
 * Type        : Service
 * Feature     : Feature 1
 * Source Path : src/features/events/services/event.service.ts
 * Used In     : Event Browsing, Event Detail, Organizer Pages
 * Status      : ACTIVE
 * Notes       : Synced with latest event object structure
 * =========================================
 */

import { dummyEvents } from "@/features/events/utils/dummyEvents";
import type {
  Event,
  EventFilters,
  EventListResponse,
} from "@/features/events/types/event.types";

function sortEvents(events: Event[], sortBy?: EventFilters["sortBy"]): Event[] {
  const sorted = [...events];

  switch (sortBy) {
    case "NEWEST":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    case "OLDEST":
      return sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    case "PRICE_LOW_TO_HIGH":
      return sorted.sort((a, b) => a.price - b.price);

    case "PRICE_HIGH_TO_LOW":
      return sorted.sort((a, b) => b.price - a.price);

    case "START_DATE_ASC":
      return sorted.sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      );

    case "START_DATE_DESC":
      return sorted.sort(
        (a, b) =>
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
      );

    case "TITLE_ASC":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case "TITLE_DESC":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    default:
      return sorted;
  }
}

export const eventService = {
  getAllEvents(): EventListResponse {
    return {
      success: true,
      data: [...dummyEvents],
      total: dummyEvents.length,
    };
  },

  getPublishedEvents(): EventListResponse {
    const publishedEvents = dummyEvents.filter(
      (event: Event) => event.status === "PUBLISHED"
    );

    return {
      success: true,
      data: publishedEvents,
      total: publishedEvents.length,
    };
  },

  getFeaturedEvents(): EventListResponse {
    const featuredEvents = dummyEvents.filter(
      (event: Event) => event.status === "PUBLISHED" && event.isFeatured
    );

    return {
      success: true,
      data: featuredEvents,
      total: featuredEvents.length,
    };
  },

  getEventById(id: string): Event | undefined {
    return dummyEvents.find((event: Event) => event.id === id);
  },

  getEventBySlug(slug: string): Event | undefined {
    return dummyEvents.find((event: Event) => event.slug === slug);
  },

  searchEvents(keyword: string): EventListResponse {
    const normalizedKeyword = keyword.trim().toLowerCase();

    const results = dummyEvents.filter((event: Event) => {
      return (
        event.status === "PUBLISHED" &&
        (event.title.toLowerCase().includes(normalizedKeyword) ||
          event.shortDescription.toLowerCase().includes(normalizedKeyword) ||
          event.description.toLowerCase().includes(normalizedKeyword) ||
          event.category.name.toLowerCase().includes(normalizedKeyword) ||
          event.organizer.name.toLowerCase().includes(normalizedKeyword))
      );
    });

    return {
      success: true,
      data: results,
      total: results.length,
    };
  },

  filterEvents(filters: EventFilters): EventListResponse {
    let filteredEvents = dummyEvents.filter(
      (event: Event) => event.status === "PUBLISHED"
    );

    if (filters.search?.trim()) {
      const keyword = filters.search.trim().toLowerCase();

      filteredEvents = filteredEvents.filter((event: Event) => {
        return (
          event.title.toLowerCase().includes(keyword) ||
          event.shortDescription.toLowerCase().includes(keyword) ||
          event.description.toLowerCase().includes(keyword) ||
          event.category.name.toLowerCase().includes(keyword) ||
          event.organizer.name.toLowerCase().includes(keyword)
        );
      });
    }

    if (filters.category && filters.category !== "ALL") {
      filteredEvents = filteredEvents.filter(
        (event: Event) => event.category.name === filters.category
      );
    }

    if (filters.locationType && filters.locationType !== "ALL") {
      filteredEvents = filteredEvents.filter(
        (event: Event) => event.location.type === filters.locationType
      );
    }

    if (filters.status && filters.status !== "ALL") {
      filteredEvents = filteredEvents.filter(
        (event: Event) => event.status === filters.status
      );
    }

    if (typeof filters.isFeatured === "boolean") {
      filteredEvents = filteredEvents.filter(
        (event: Event) => event.isFeatured === filters.isFeatured
      );
    }

    if (typeof filters.minPrice === "number") {
      filteredEvents = filteredEvents.filter(
        (event: Event) => event.price >= filters.minPrice!
      );
    }

    if (typeof filters.maxPrice === "number") {
      filteredEvents = filteredEvents.filter(
        (event: Event) => event.price <= filters.maxPrice!
      );
    }

    const sortedEvents = sortEvents(filteredEvents, filters.sortBy);

    return {
      success: true,
      data: sortedEvents,
      total: sortedEvents.length,
    };
  },
};