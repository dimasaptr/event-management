/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : ReviewForm.tsx
 * Type        : Component
 * Feature     : Feature 1
 * Source Path : src/features/reviews/components/ReviewForm.tsx
 * Used In     : Event Review Section
 * UI Section  : Review Form
 * Status      : BACKEND READY
 * Notes       : Dummy review submission form for eligible attendee
 * =========================================
 */

import DisclaimerNote from "@/components/shared/DisclaimerNote";
import RatingStars from "@/features/reviews/components/RatingStars";
import { reviewService } from "@/features/reviews/services/review.service";
import { useMemo, useState } from "react";

type ReviewFormProps = {
  eventId: string;
  eventEndDate: string;
};

export default function ReviewForm({
  eventId,
  eventEndDate,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submittedMessage, setSubmittedMessage] = useState("");

  const eligibility = useMemo(() => {
    return reviewService.getReviewEligibility({
      eventId,
      eventEndDate,
      hasCompletedTransaction: true,
      isAttendee: true,
      hasReviewed: false,
    });
  }, [eventEndDate, eventId]);

  const isFormValid = rating >= 1 && comment.trim().length >= 10;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!eligibility.canReview || !isFormValid) {
      return;
    }

    const response = reviewService.submitReview({
      eventId,
      rating,
      comment: comment.trim(),
    });

    setSubmittedMessage(response.message);
    setRating(0);
    setComment("");
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Tulis Review
        </p>

        <h3 className="mt-2 text-2xl font-bold text-slate-900">
          Bagikan pengalamanmu
        </h3>

        <p className="mt-3 leading-7 text-slate-700">
          Review hanya tersedia untuk attendee yang sudah menyelesaikan transaksi
          dan event sudah selesai.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-700">
        <p className="font-semibold text-slate-900">Status Review</p>
        <p className="mt-1">{eligibility.helperText}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-900">
            Rating
          </label>
          <RatingStars
            rating={rating}
            interactive
            onChange={setRating}
            size="lg"
          />
        </div>

        <div>
          <label
            htmlFor="review-comment"
            className="mb-2 block text-sm font-semibold text-slate-900"
          >
            Review
          </label>

          <textarea
            id="review-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            rows={5}
            placeholder="Tulis pengalamanmu setelah mengikuti event ini..."
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
            disabled={!eligibility.canReview}
          />

          <p className="mt-2 text-xs text-slate-500">
            Minimal 10 karakter • Maksimal 500 karakter
          </p>
        </div>

        <button
          type="submit"
          disabled={!eligibility.canReview || !isFormValid}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Kirim Review
        </button>

        {submittedMessage ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {submittedMessage}
          </div>
        ) : null}
      </form>

      <DisclaimerNote
        className="mt-6"
        editPath="src/features/reviews/components/ReviewForm.tsx"
        text="Dummy form ini sudah backend-ready dan eligibility nantinya akan dicek dari transaksi DONE serta event completed."
      />
    </section>
  );
}
