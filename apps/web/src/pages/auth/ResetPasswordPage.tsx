import DisclaimerNote from "@/components/shared/DisclaimerNote";
import { Link } from "react-router-dom";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden rounded-[2rem] bg-slate-900 p-10 text-white shadow-2xl lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
            New Password Setup
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight">
            Buat password baru untuk melanjutkan akses ke akunmu
          </h1>

          <p className="mt-6 max-w-xl leading-8 text-slate-300">
            Setelah token reset tervalidasi, user bisa memasukkan password baru agar akun kembali bisa dipakai.
          </p>

          <DisclaimerNote
            className="mt-8 text-slate-200"
            editPath="src/pages/auth/ResetPasswordPage.tsx"
            text="Konten frontend ini dikerjakan oleh Feature 2."
          />
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Reset Password
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Atur Password Baru
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Masukkan password baru dan konfirmasi ulang. Nantinya token reset akan divalidasi di backend.
          </p>

          <DisclaimerNote
            className="mt-6"
            editPath="src/pages/auth/ResetPasswordPage.tsx"
            text="Konten frontend ini dikerjakan oleh Feature 2."
          />

          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Password Baru
              </label>
              <input
                type="password"
                placeholder="Masukkan password baru"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Konfirmasi Password
              </label>
              <input
                type="password"
                placeholder="Ulangi password baru"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <DisclaimerNote
              editPath="src/pages/auth/ResetPasswordPage.tsx"
              text="Password baru di form ini nantinya akan diproses oleh backend auth bersama token reset yang valid."
            />

            <button className="w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white hover:bg-slate-800">
              Simpan Password Baru
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Kembali ke{" "}
            <Link to="/login" className="font-semibold text-indigo-600">
              halaman login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
