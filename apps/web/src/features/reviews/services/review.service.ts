/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : review.service.ts
 * Type        : Service
 * Feature     : Feature 1
 * Source Path : src/features/reviews/services/review.service.ts
 * Used In     : Review System
 * UI Section  : Event Reviews
 * Status      : DUMMY DATA
 * Notes       : Dummy review service for Phase 4 frontend
 * =========================================
 */

import type {
  Review,
  ReviewCreatePayload,
  ReviewCreateResponse,
  ReviewEligibility,
  ReviewListResponse,
} from "@/types/review.types";

const dummyReviews: Review[] = [
  {
    id: "review-1",
    eventId: "event-1",
    userId: "user-1",
    rating: 5,
    comment:
      "Materinya padat, pembicaranya jelas, dan sesi tanya jawabnya sangat membantu untuk pemula.",
    createdAt: "2026-03-20T10:00:00.000Z",
    updatedAt: "2026-03-20T10:00:00.000Z",
    user: {
      id: "user-1",
      name: "Alya Pratama",
    },
  },
  {
    id: "review-2",
    eventId: "event-1",
    userId: "user-2",
    rating: 4,
    comment:
      "Overall bagus, cuma semoga next event durasi praktiknya bisa lebih panjang.",
    createdAt: "2026-03-21T14:30:00.000Z",
    updatedAt: "2026-03-21T14:30:00.000Z",
    user: {
      id: "user-2",
      name: "Raka Mahendra",
    },
  },
  {
    id: "review-3",
    eventId: "event-2",
    userId: "user-3",
    rating: 5,
    comment:
      "Worth it banget. Penjelasannya rapih dan dapat insight yang langsung bisa dipakai.",
    createdAt: "2026-03-22T09:15:00.000Z",
    updatedAt: "2026-03-22T09:15:00.000Z",
    user: {
      id: "user-3",
      name: "Nadia Putri",
    },
  },
];

function isEventFinished(eventEndDate: string) {
  return new Date(eventEndDate).getTime() < Date.now();
}

export const reviewService = {
  getReviewsByEventId(eventId: string): ReviewListResponse {
    const reviews = dummyReviews.filter((review) => review.eventId === eventId);

    return {
      success: true,
      data: reviews,
    };
  },

  getReviewEligibility(params: {
    eventId: string;
    eventEndDate: string;
    hasCompletedTransaction?: boolean;
    isAttendee?: boolean;
    hasReviewed?: boolean;
  }): ReviewEligibility {
    const {
      eventEndDate,
      hasCompletedTransaction = true,
      isAttendee = true,
      hasReviewed = false,
    } = params;

    if (!isAttendee) {
      return {
        canReview: false,
        reason: "NOT_ATTENDEE",
        helperText:
          "Hanya attendee yang berhasil membeli tiket yang bisa memberi review.",
      };
    }

    if (!hasCompletedTransaction) {
      return {
        canReview: false,
        reason: "TRANSACTION_NOT_DONE",
        helperText:
          "Review hanya bisa diberikan jika transaksi sudah berstatus DONE.",
      };
    }

    if (!isEventFinished(eventEndDate)) {
      return {
        canReview: false,
        reason: "EVENT_NOT_FINISHED",
        helperText:
          "Review baru bisa diberikan setelah event selesai berlangsung.",
      };
    }

    if (hasReviewed) {
      return {
        canReview: false,
        reason: "ALREADY_REVIEWED",
        helperText: "Kamu sudah pernah memberi review untuk event ini.",
      };
    }

    return {
      canReview: true,
      reason: "ELIGIBLE",
      helperText: "Kamu bisa memberikan review untuk event ini.",
    };
  },

  submitReview(payload: ReviewCreatePayload): ReviewCreateResponse {
    const newReview: Review = {
      id: `review-${Date.now()}`,
      eventId: payload.eventId,
      userId: "current-user-dummy",
      rating: payload.rating,
      comment: payload.comment,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      user: {
        id: "current-user-dummy",
        name: "Current User",
      },
    };

    return {
      success: true,
      data: newReview,
      message: "Review berhasil dikirim (dummy mode).",
    };
  },
};