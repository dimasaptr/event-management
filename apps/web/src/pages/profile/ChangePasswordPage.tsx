/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : ChangePasswordPage.tsx
 * Type        : Page
 * Feature     : Feature 2
 * Route       : /profile/change-password
 * Source Path : src/pages/profile/ChangePasswordPage.tsx
 * Used In     : User Profile
 * UI Section  : Change Password Page
 * Status      : ACTIVE
 * Notes       : Final connected version for Phase 5
 * =========================================
 */

import DisclaimerNote from "@/components/shared/DisclaimerNote";
import { profileService } from "@/features/profile/services/profile.service";
import type { ChangePasswordFormValues } from "@/types/auth.types";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function ChangePasswordPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const watchedNewPassword = watch("newPassword");

  const onSubmit = async (values: ChangePasswordFormValues) => {
    try {
      setIsLoading(true);

      await profileService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      alert("Password updated successfully!");
    } catch (error) {
      console.error("Change password failed:", error);
      alert("Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-104px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto mb-8 flex w-full max-w-xl justify-center">
        <div className="w-full rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-zinc-900">
            Change Password
          </h1>

          <p className="mt-4 text-sm font-semibold text-zinc-600">
            Feature 2
          </p>

          <p className="mt-2 text-sm text-zinc-500">
            src/pages/profile/ChangePasswordPage.tsx
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Security Settings
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              Change Your Password
            </h2>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Ubah password akun kamu dengan aman menggunakan password lama.
            </p>

            <DisclaimerNote
              className="mt-4 text-center"
              editPath="src/pages/profile/ChangePasswordPage.tsx"
              text="Change password flow ini diisi oleh Feature 2."
            />
          </div>

          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm font-semibold text-amber-800">
              Security Rule
            </p>
            <p className="mt-2 text-sm leading-7 text-amber-700">
              Sesuai keputusan project, change password harus memakai:
              <span className="font-semibold">
                {" "}current password + new password + confirm password
              </span>.
            </p>

            <DisclaimerNote
              className="mt-3"
              editPath="src/pages/profile/ChangePasswordPage.tsx"
              text="Rule keamanan di section ini dipegang oleh Feature 2."
            />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Current Password
              </label>
              <Input
                type="password"
                placeholder="Enter your current password"
                {...register("currentPassword", {
                  required: "Current password is required",
                })}
              />
              {errors.currentPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                New Password
              </label>
              <Input
                type="password"
                placeholder="Enter your new password"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.newPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Confirm New Password
              </label>
              <Input
                type="password"
                placeholder="Repeat your new password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watchedNewPassword || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>

            <DisclaimerNote
              className="text-center"
              editPath="src/pages/profile/ChangePasswordPage.tsx"
              text="Change password save logic diisi oleh Feature 2."
            />
          </form>

          <div className="mt-8 flex justify-between">
            <Link
              to="/profile"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
            >
              {"<- Back to Profile"}
            </Link>

            <Link
              to="/profile/edit"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {"Edit Profile ->"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
