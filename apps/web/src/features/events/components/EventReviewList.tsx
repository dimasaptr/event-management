/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : EventReviewList.tsx
 * Type        : Component
 * Feature     : Feature 1
 * Source Path : src/features/events/components/EventReviewList.tsx
 * Used In     : Event Detail Page
 * UI Section  : Event Review List
 * Status      : ACTIVE
 * Notes       : Review summary and review list for event detail page
 * =========================================
 */

import type { Review } from "@/types/review.types";
import ReviewCard from "@/features/reviews/components/ReviewCard";
import RatingStars from "@/features/reviews/components/RatingStars";

type EventReviewListProps = {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
};

export default function EventReviewList({
  averageRating,
  totalReviews,
  reviews,
}: EventReviewListProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8 flex flex-col gap-5 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Review & Rating
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">
            Pendapat attendee
          </h3>

          <p className="mt-3 max-w-2xl leading-7 text-slate-700">
            Review hanya bisa diberikan oleh attendee yang sudah berhasil
            membeli tiket, transaksi DONE, dan event sudah selesai.
          </p>
        </div>

        <div className="rounded-3xl border border-white bg-white px-6 py-5 shadow-sm">
          <p className="text-4xl font-bold text-slate-900">
            {averageRating.toFixed(1)}
          </p>
          <div className="mt-2">
            <RatingStars rating={Math.round(averageRating)} />
          </div>
          <p className="mt-2 text-sm text-slate-500">
            {totalReviews} review terverifikasi
          </p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center">
          <p className="text-lg font-semibold text-slate-900">
            Belum ada review
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Review attendee akan tampil di sini setelah event selesai dan
            peserta yang valid memberikan penilaian.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}