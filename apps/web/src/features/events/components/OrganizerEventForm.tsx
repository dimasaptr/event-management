/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : OrganizerEventForm.tsx
 * Type        : Component
 * Feature     : Feature 1
 * Source Path : src/features/events/components/OrganizerEventForm.tsx
 * Used In     : CreateEventPage, EditEventPage
 * UI Section  : Organizer Event Form
 * Status      : DUMMY DATA
 * Notes       : Reusable form for organizer event management
 * =========================================
 */

import { useMemo, useState } from "react";

export type OrganizerEventStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED"
  | "CANCELED";

export type OrganizerEventCategory =
  | "WORKSHOP"
  | "SEMINAR"
  | "BOOTCAMP"
  | "WEBINAR"
  | "COURSE"
  | "NETWORKING"
  | "COMPETITION"
  | "OTHER";

export type OrganizerLocationType = "ONLINE" | "OFFLINE";

export interface OrganizerEventFormValues {
  title: string;
  category: OrganizerEventCategory;
  shortDescription: string;
  thumbnailUrl: string;
  bannerUrl: string;
  price: number;
  totalSeats: number;
  startDate: string;
  endDate: string;
  locationType: OrganizerLocationType;
  city: string;
  province: string;
  platform: string;
  address: string;
  isFeatured: boolean;
  status: OrganizerEventStatus;
}

interface OrganizerEventFormProps {
  mode?: "create" | "edit";
  initialValues?: Partial<OrganizerEventFormValues>;
  onSubmit?: (values: OrganizerEventFormValues) => void;
  isSubmitting?: boolean;
}

const DEFAULT_VALUES: OrganizerEventFormValues = {
  title: "",
  category: "WORKSHOP",
  shortDescription: "",
  thumbnailUrl: "",
  bannerUrl: "",
  price: 0,
  totalSeats: 10,
  startDate: "",
  endDate: "",
  locationType: "ONLINE",
  city: "",
  province: "",
  platform: "",
  address: "",
  isFeatured: false,
  status: "DRAFT",
};

const CATEGORY_OPTIONS: OrganizerEventCategory[] = [
  "WORKSHOP",
  "SEMINAR",
  "BOOTCAMP",
  "WEBINAR",
  "COURSE",
  "NETWORKING",
  "COMPETITION",
  "OTHER",
];

const STATUS_OPTIONS: OrganizerEventStatus[] = [
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
  "CANCELED",
];

const formatOptionLabel = (value: string) => {
  return value.split("_").join(" ");
};

export default function OrganizerEventForm({
  mode = "create",
  initialValues,
  onSubmit,
  isSubmitting = false,
}: OrganizerEventFormProps) {
  const mergedValues = useMemo<OrganizerEventFormValues>(
    () => ({
      ...DEFAULT_VALUES,
      ...initialValues,
    }),
    [initialValues]
  );

  const [formValues, setFormValues] =
    useState<OrganizerEventFormValues>(mergedValues);

  const [errors, setErrors] = useState<
    Partial<Record<keyof OrganizerEventFormValues, string>>
  >({});

  const isEditMode = mode === "edit";

  const handleChange = <K extends keyof OrganizerEventFormValues>(
    key: K,
    value: OrganizerEventFormValues[K]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof OrganizerEventFormValues, string>> =
      {};

    if (!formValues.title.trim()) {
      newErrors.title = "Event title is required.";
    }

    if (!formValues.shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required.";
    }

    if (!formValues.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!formValues.endDate) {
      newErrors.endDate = "End date is required.";
    }

    if (
      formValues.startDate &&
      formValues.endDate &&
      new Date(formValues.endDate) < new Date(formValues.startDate)
    ) {
      newErrors.endDate = "End date cannot be earlier than start date.";
    }

    if (formValues.price < 0) {
      newErrors.price = "Price cannot be negative.";
    }

    if (formValues.totalSeats < 1) {
      newErrors.totalSeats = "Available seats must be at least 1.";
    }

    if (formValues.totalSeats > 1000) {
      newErrors.totalSeats = "Available seats cannot exceed 1000.";
    }

    if (formValues.locationType === "ONLINE" && !formValues.platform.trim()) {
      newErrors.platform = "Platform is required for online event.";
    }

    if (formValues.locationType === "OFFLINE" && !formValues.city.trim()) {
      newErrors.city = "City is required for offline event.";
    }

    if (formValues.locationType === "OFFLINE" && !formValues.address.trim()) {
      newErrors.address = "Address is required for offline event.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return;

    onSubmit?.(formValues);
  };

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-4 py-3 text-center">
        <h2 className="text-lg font-bold text-zinc-900">
          Organizer Event Form
        </h2>
        <p className="mt-1 text-sm font-semibold text-zinc-600">Feature 1</p>
        <p className="mt-1 text-xs text-zinc-500">
          src/features/events/components/OrganizerEventForm.tsx
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Event Title
            </label>
            <input
              type="text"
              value={formValues.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter event title"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            />
            {errors.title ? (
              <p className="mt-2 text-xs text-red-500">{errors.title}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Category
            </label>
            <select
              value={formValues.category}
              onChange={(e) =>
                handleChange(
                  "category",
                  e.target.value as OrganizerEventCategory
                )
              }
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            >
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {formatOptionLabel(category)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-zinc-800">
            Short Description
          </label>
          <textarea
            rows={5}
            value={formValues.shortDescription}
            onChange={(e) => handleChange("shortDescription", e.target.value)}
            placeholder="Write a short description for your event"
            className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
          />
          {errors.shortDescription ? (
            <p className="mt-2 text-xs text-red-500">
              {errors.shortDescription}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Thumbnail URL
            </label>
            <input
              type="text"
              value={formValues.thumbnailUrl}
              onChange={(e) => handleChange("thumbnailUrl", e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Banner URL (Optional)
            </label>
            <input
              type="text"
              value={formValues.bannerUrl}
              onChange={(e) => handleChange("bannerUrl", e.target.value)}
              placeholder="https://example.com/banner.jpg"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Ticket Price (IDR)
            </label>
            <input
              type="number"
              min={0}
              value={formValues.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            />
            {errors.price ? (
              <p className="mt-2 text-xs text-red-500">{errors.price}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Total Seats
            </label>
            <input
              type="number"
              min={1}
              max={1000}
              value={formValues.totalSeats}
              onChange={(e) =>
                handleChange("totalSeats", Number(e.target.value))
              }
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            />
            {errors.totalSeats ? (
              <p className="mt-2 text-xs text-red-500">
                {errors.totalSeats}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Start Date & Time
            </label>
            <input
              type="datetime-local"
              value={formValues.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            />
            {errors.startDate ? (
              <p className="mt-2 text-xs text-red-500">{errors.startDate}</p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              End Date & Time
            </label>
            <input
              type="datetime-local"
              value={formValues.endDate}
              onChange={(e) => handleChange("endDate", e.target.value)}
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            />
            {errors.endDate ? (
              <p className="mt-2 text-xs text-red-500">{errors.endDate}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Location Type
            </label>
            <select
              value={formValues.locationType}
              onChange={(e) =>
                handleChange(
                  "locationType",
                  e.target.value as OrganizerLocationType
                )
              }
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            >
              <option value="ONLINE">Online</option>
              <option value="OFFLINE">Offline</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Event Status
            </label>
            <select
              value={formValues.status}
              onChange={(e) =>
                handleChange("status", e.target.value as OrganizerEventStatus)
              }
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {formatOptionLabel(status)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {formValues.locationType === "ONLINE" ? (
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-800">
              Platform
            </label>
            <input
              type="text"
              value={formValues.platform}
              onChange={(e) => handleChange("platform", e.target.value)}
              placeholder="e.g. Zoom, Google Meet"
              className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
            />
            {errors.platform ? (
              <p className="mt-2 text-xs text-red-500">{errors.platform}</p>
            ) : null}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-800">
                City
              </label>
              <input
                type="text"
                value={formValues.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Jakarta"
                className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
              />
              {errors.city ? (
                <p className="mt-2 text-xs text-red-500">{errors.city}</p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-800">
                Province
              </label>
              <input
                type="text"
                value={formValues.province}
                onChange={(e) => handleChange("province", e.target.value)}
                placeholder="DKI Jakarta"
                className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-zinc-800">
                Address
              </label>
              <input
                type="text"
                value={formValues.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Enter full address"
                className="w-full rounded-2xl border border-zinc-300 px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
              />
              {errors.address ? (
                <p className="mt-2 text-xs text-red-500">{errors.address}</p>
              ) : null}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <label className="flex items-center gap-3 text-sm font-medium text-zinc-700">
            <input
              type="checkbox"
              checked={formValues.isFeatured}
              onChange={(e) => handleChange("isFeatured", e.target.checked)}
              className="h-4 w-4"
            />
            Mark as Featured Event
          </label>
        </div>

        <div className="flex flex-col gap-3 border-t border-zinc-200 pt-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-2xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
            onClick={() => setFormValues(mergedValues)}
          >
            Reset Form
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Saving..."
              : isEditMode
              ? "Update Event"
              : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}