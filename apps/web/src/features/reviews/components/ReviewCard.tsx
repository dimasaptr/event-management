/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : ReviewCard.tsx
 * Type        : Component
 * Feature     : Feature 1
 * Source Path : src/features/reviews/components/ReviewCard.tsx
 * Used In     : Event Review List
 * UI Section  : Review Card
 * Status      : ACTIVE
 * Notes       : Displays a single user review card
 * =========================================
 */

import DisclaimerNote from "@/components/shared/DisclaimerNote";
import RatingStars from "@/features/reviews/components/RatingStars";
import type { Review } from "@/types/review.types";

type ReviewCardProps = {
  review: Review;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-bold text-slate-900">{review.user.name}</p>
          <p className="mt-1 text-sm text-slate-500">
            {formatReviewDate(review.createdAt)}
          </p>
        </div>

        <RatingStars rating={review.rating} size="sm" />
      </div>

      <p className="mt-5 leading-8 text-slate-700">{review.comment}</p>

      <DisclaimerNote
        className="mt-6"
        editPath="src/features/reviews/components/ReviewCard.tsx"
        text="Data review di card ini masih dummy dan backend nantinya akan menyimpan review attendee yang valid."
      />
    </article>
  );
}

function formatReviewDate(isoString: string) {
  const date = new Date(isoString);

  if (Number.isNaN(date.getTime())) {
    return isoString;
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}
