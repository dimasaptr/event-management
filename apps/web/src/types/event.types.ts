/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : event.types.ts
 * Type        : Global Types
 * Source Path : src/types/event.types.ts
 * Used In     : Event System (Public + Organizer)
 * Status      : FINAL
 * Notes       : SINGLE SOURCE OF TRUTH
 * =========================================
 */

export type EventCategory =
  | "WORKSHOP"
  | "SEMINAR"
  | "BOOTCAMP"
  | "WEBINAR"
  | "COURSE"
  | "NETWORKING"
  | "COMPETITION"
  | "OTHER";

export type EventLocationType = "ONLINE" | "OFFLINE";

export type EventStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED"
  | "CANCELED";

export type EventCategoryObject = {
  id: string;
  name: EventCategory;
};

export type EventOrganizer = {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
};

export type EventReview = {
  id: string;
  eventId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
  };
};

export type Event = {
  id: string;
  slug: string;
  title: string;

  category: EventCategoryObject;

  description: string;
  shortDescription: string;

  thumbnail?: string;
  thumbnailUrl?: string;
  bannerUrl?: string;

  organizer: EventOrganizer;

  price: number;
  isFree: boolean;

  totalSeats: number;
  availableSeats: number;

  startDate: string;
  endDate: string;

  location: {
    type: EventLocationType;
    city?: string;
    province?: string;
    country?: string;
    address?: string;
    meetingUrl?: string;
    platform?: string;
  };

  isFeatured?: boolean;

  status: EventStatus;

  averageRating?: number;
  totalReviews?: number;

  reviews?: EventReview[];

  createdAt: string;
  updatedAt: string;
};

export type EventSortOption =
  | "NEWEST"
  | "OLDEST"
  | "PRICE_LOW_TO_HIGH"
  | "PRICE_HIGH_TO_LOW"
  | "START_DATE_ASC"
  | "START_DATE_DESC"
  | "TITLE_ASC"
  | "TITLE_DESC";

export type EventFilters = {
  search?: string;
  category?: EventCategory | "ALL";
  locationType?: EventLocationType | "ALL";
  status?: EventStatus | "ALL";
  minPrice?: number;
  maxPrice?: number;
  isFeatured?: boolean;
  sortBy?: EventSortOption;
};

export type EventListResponse = {
  success: boolean;
  data: Event[];
  total: number;
};