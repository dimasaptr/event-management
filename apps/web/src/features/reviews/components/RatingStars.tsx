/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : RatingStars.tsx
 * Type        : Component
 * Feature     : Feature 1
 * Source Path : src/features/reviews/components/RatingStars.tsx
 * Used In     : Review Card, Review Form, Event Detail
 * UI Section  : Rating Stars
 * Status      : ACTIVE
 * Notes       : Reusable star rating display/input component
 * =========================================
 */

type RatingStarsProps = {
  rating: number;
  interactive?: boolean;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
};

export default function RatingStars({
  rating,
  interactive = false,
  onChange,
  size = "md",
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= rating;

        if (interactive) {
          return (
            <button
              key={starValue}
              type="button"
              onClick={() => onChange?.(starValue)}
              className={`transition ${sizeClasses[size]} ${
                isActive ? "text-amber-400" : "text-slate-300"
              }`}
              aria-label={`Pilih ${starValue} bintang`}
            >
              ★
            </button>
          );
        }

        return (
          <span
            key={starValue}
            className={`${sizeClasses[size]} ${
              isActive ? "text-amber-400" : "text-slate-300"
            }`}
            aria-hidden="true"
          >
            ★
          </span>
        );
      })}
    </div>
  );
}