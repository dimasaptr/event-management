/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : review.validation.ts
 * Type        : Validation
 * Feature     : Feature 1
 * Source Path : src/features/reviews/validations/review.validation.ts
 * Used In     : Review Form
 * UI Section  : Event Reviews
 * Status      : ACTIVE
 * Notes       : Frontend validation for review form
 * =========================================
 */

import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating minimal 1 bintang")
    .max(5, "Rating maksimal 5 bintang"),

  comment: z
    .string()
    .min(10, "Review minimal 10 karakter")
    .max(500, "Review maksimal 500 karakter"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;