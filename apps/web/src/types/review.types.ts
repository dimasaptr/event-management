/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : review.types.ts
 * Type        : Types
 * Feature     : Feature 1
 * Source Path : src/types/review.types.ts
 * Used In     : Review System
 * UI Section  : Event Reviews
 * Status      : DUMMY DATA
 * Notes       : Source of truth for review typing
 * =========================================
 */

export interface ReviewUser {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Review {
  id: string;
  eventId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
}

export interface ReviewEligibility {
  canReview: boolean;
  reason:
    | "ALREADY_REVIEWED"
    | "EVENT_NOT_FINISHED"
    | "TRANSACTION_NOT_DONE"
    | "NOT_ATTENDEE"
    | "ELIGIBLE";
  helperText: string;
}

export interface ReviewListResponse {
  success: boolean;
  data: Review[];
  message?: string;
}

export interface ReviewCreatePayload {
  eventId: string;
  rating: number;
  comment: string;
}

export interface ReviewCreateResponse {
  success: boolean;
  data: Review | null;
  message: string;
}