/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : RegisterPage.tsx
 * Type        : Auth Page
 * Feature     : Feature 2
 * Source Path : src/pages/auth/RegisterPage.tsx
 * Used In     : Register Route
 * UI Section  : Authentication - Register
 * Status      : ACTIVE
 * Notes       : Register page placeholder with final frontend/backend note format
 * =========================================
 */

import { Link } from "react-router-dom";
import DisclaimerNote from "@/components/shared/DisclaimerNote";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT */}
        <div className="hidden rounded-[2rem] bg-slate-900 p-10 text-white shadow-2xl lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
            Get Started
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight">
            Buat akun untuk mulai ikut event dan mengelola aktivitas kamu
          </h1>

          <p className="mt-6 max-w-xl leading-8 text-slate-300">
            Customer dapat mendaftar untuk membeli tiket dan mengikuti event.
            Organizer dapat membuat akun untuk mengelola event yang mereka selenggarakan.
          </p>

          <DisclaimerNote
            text="Konten frontend ini dikerjakan oleh Feature 2"
            editPath="src/pages/auth/RegisterPage.tsx"
            className="mt-8 text-slate-300"
          />

          <div className="mt-10 space-y-4">
            <Point text="1 akun untuk customer & organizer" />
            <Point text="Referral system akan aktif setelah register" />
            <Point text="Welcome email akan dikirim setelah register" />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Register
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Buat Akun Baru
          </h2>

          <p className="mt-3 text-slate-600">
            Isi data berikut untuk membuat akun baru.
          </p>

          <DisclaimerNote
            text="Konten frontend ini dikerjakan oleh Feature 2"
            editPath="src/pages/auth/RegisterPage.tsx"
            className="mt-6"
          />

          <form className="mt-8 space-y-5">
            <Input label="Nama Lengkap" placeholder="Masukkan nama" />
            <Input label="Email" placeholder="Masukkan email" />
            <Input label="Password" placeholder="Masukkan password" type="password" />
            <Input label="Konfirmasi Password" placeholder="Ulangi password" type="password" />
            <Input label="Referral Code (Opsional)" placeholder="Masukkan kode referral" />

            <DisclaimerNote
              text="Data dummy ini nantinya akan diisi oleh role: CUSTOMER. Data registrasi akan dikirim ke backend, disimpan, dan digunakan untuk login."
              editPath="src/pages/auth/RegisterPage.tsx"
            />

            <button className="w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white hover:bg-slate-800">
              Register
            </button>
          </form>

          <DisclaimerNote
            text="Konten frontend ini dikerjakan oleh Feature 2"
            editPath="src/pages/auth/RegisterPage.tsx"
            className="mt-6"
          />

          <p className="mt-8 text-center text-sm text-slate-600">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-semibold text-indigo-600">
              Login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

function Input({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
      />
    </div>
  );
}

function Point({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
      • {text}
    </div>
  );
}
