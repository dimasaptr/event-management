/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : EditProfilePage.tsx
 * Type        : Page
 * Feature     : Feature 2
 * Route       : /profile/edit
 * Source Path : src/pages/profile/EditProfilePage.tsx
 * Used In     : User Profile
 * UI Section  : Edit Profile Page
 * Status      : ACTIVE
 * Notes       : Final connected version for Phase 5
 * =========================================
 */

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import type { EditProfileFormValues } from "@/types/auth.types";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { profileService } from "@/features/profile/services/profile.service";
import { validateProfile } from "@/features/profile/validations/profile.validation";

import DisclaimerNote from "@/components/shared/DisclaimerNote";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

type SafeProfileUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  profilePicture?: string;
};

export default function EditProfilePage() {
  const { user, loginUser } = useAuth();
  const safeUser = (user ?? {}) as SafeProfileUser;

  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    defaultValues: {
      firstName: safeUser.firstName ?? "",
      lastName: safeUser.lastName ?? "",
      profilePicture: safeUser.profilePicture ?? "",
    },
  });

  const watchedProfilePicture = watch("profilePicture");
  const watchedFirstName = watch("firstName");
  const watchedLastName = watch("lastName");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("File harus berupa gambar.");
      event.target.value = "";
      return;
    }

    const maxFileSizeInBytes = 2 * 1024 * 1024;

    if (file.size > maxFileSizeInBytes) {
      setUploadError("Ukuran gambar maksimal 2MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";

      setValue("profilePicture", result, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      clearErrors("profilePicture");
      setUploadError("");
    };

    reader.onerror = () => {
      setUploadError("Gagal membaca file gambar.");
    };

    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setValue("profilePicture", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    clearErrors("profilePicture");
    setUploadError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (values: EditProfileFormValues) => {
    try {
      setIsLoading(true);

      const updated = await profileService.updateProfile(values);

      if (user) {
        loginUser({
          ...user,
          ...updated,
        });
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Edit profile failed:", error);
      alert("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* ================================
          PAGE HEADER
         ================================ */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-14">
          <p className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Edit Profile
          </p>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Feature 2
          </p>

          <p className="mt-2 text-sm text-slate-500">
            src/pages/profile/EditProfilePage.tsx
          </p>

          <h1 className="mt-5 text-4xl font-bold text-slate-900">
            Edit Profil Akun
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Halaman ini digunakan user untuk memperbarui identitas akun seperti
            first name, last name, dan foto profil yang nantinya akan
            tersimpan di backend lalu ditampilkan kembali ke frontend.
          </p>

          <DisclaimerNote
            className="mt-8"
            editPath="src/pages/profile/EditProfilePage.tsx"
            text="Konten frontend ini dikerjakan oleh Feature 2."
          />
        </div>
      </section>

      {/* ================================
          MAIN CONTENT
         ================================ */}
      <section className="mx-auto max-w-4xl px-4 pt-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              Profile Settings
            </p>

            <h2 className="mt-2 text-2xl font-bold text-slate-900">
              Perbarui Informasi Profil
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              User bisa mengubah data dasar akun di halaman ini sebelum nantinya
              data tersebut diproses dan divalidasi lewat backend.
            </p>
          </div>

          {/* PROFILE PREVIEW */}
          <div className="mb-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col items-center gap-4 text-center">
              {watchedProfilePicture ? (
                <img
                  src={watchedProfilePicture}
                  alt="Profile Preview"
                  className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-sm"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600 ring-4 ring-white shadow-sm">
                  {(watchedFirstName ?? "U").charAt(0)}
                  {(watchedLastName ?? "").charAt(0)}
                </div>
              )}

              <div>
                <p className="text-xl font-bold text-slate-900">
                  {watchedFirstName || "User"} {watchedLastName || ""}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {safeUser.email ?? "-"}
                </p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.15em] text-indigo-600">
                  {safeUser.role ?? "CUSTOMER"}
                </p>
              </div>
            </div>

            <DisclaimerNote
              className="mt-6"
              editPath="src/pages/profile/EditProfilePage.tsx"
              text="Konten frontend ini dikerjakan oleh Feature 2."
            />
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  First Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your first name"
                  {...register("firstName", validateProfile.firstName)}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Last Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your last name"
                  {...register("lastName", validateProfile.lastName)}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Profile Picture
              </label>

              <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4">
                <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
                  <p className="font-semibold">Note upload foto profil</p>
                  <p>
                    Gunakan file gambar dari device kamu dengan ukuran maksimal
                    2MB agar website tetap ringan saat memuat foto profil.
                  </p>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-zinc-600 file:mr-4 file:rounded-xl file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-zinc-800"
                />

                <p className="mt-3 text-xs leading-6 text-zinc-500">
                  Pilih gambar dari device lokal. Format umum seperti JPG, PNG,
                  atau WebP didukung dengan ukuran maksimal 2MB.
                </p>

                {watchedProfilePicture ? (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="mt-3 text-sm font-medium text-rose-600 transition hover:text-rose-500"
                  >
                    Hapus foto saat ini
                  </button>
                ) : null}
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-zinc-700">
                  Atau gunakan URL gambar
                </label>
                <Input
                  type="text"
                  placeholder="https://your-image-url.com/photo.jpg"
                  {...register("profilePicture", validateProfile.profilePicture)}
                />
              </div>

              {errors.profilePicture && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.profilePicture.message}
                </p>
              )}
              {uploadError && (
                <p className="mt-1 text-xs text-red-500">{uploadError}</p>
              )}
              <p className="mt-2 text-xs leading-6 text-zinc-500">
                Untuk frontend saat ini, file lokal akan dikonversi menjadi data
                URL agar bisa dipreview dan disimpan di local storage. Saat backend
                siap, alurnya bisa diganti ke upload API.
              </p>
            </div>

            <DisclaimerNote
              editPath="src/pages/profile/EditProfilePage.tsx"
              text="Data profile di form ini nantinya akan diisi oleh role CUSTOMER / ORGANIZER lalu ditampilkan kembali di frontend."
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>

            <DisclaimerNote
              editPath="src/pages/profile/EditProfilePage.tsx"
              text="Konten frontend ini dikerjakan oleh Feature 2."
            />
          </form>

          {/* FOOTER ACTION */}
          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/profile"
              className="text-sm font-medium text-zinc-600 transition hover:text-zinc-900"
            >
              ← Back to Profile
            </Link>

            <Link
              to="/profile/change-password"
              className="text-sm font-medium text-indigo-600 transition hover:text-indigo-500"
            >
              Change Password →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
