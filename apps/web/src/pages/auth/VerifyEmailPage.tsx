import DisclaimerNote from "@/components/shared/DisclaimerNote";
import { Link } from "react-router-dom";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden rounded-[2rem] bg-slate-900 p-10 text-white shadow-2xl lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
            Email Verification
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight">
            Verifikasi email untuk mengaktifkan akunmu sepenuhnya
          </h1>

          <p className="mt-6 max-w-xl leading-8 text-slate-300">
            Setelah register, user akan menerima email verifikasi untuk memastikan akun aktif dan aman digunakan.
          </p>

          <DisclaimerNote
            className="mt-8 text-slate-200"
            editPath="src/pages/auth/VerifyEmailPage.tsx"
            text="Konten frontend ini dikerjakan oleh Feature 2."
          />
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Verify Email
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Verifikasi Email
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Halaman ini nantinya digunakan untuk memproses token verifikasi email yang dikirim setelah registrasi.
          </p>

          <DisclaimerNote
            className="mt-6"
            editPath="src/pages/auth/VerifyEmailPage.tsx"
            text="Konten frontend ini dikerjakan oleh Feature 2."
          />

          <div className="mt-8 rounded-3xl border border-indigo-100 bg-indigo-50 p-6">
            <div className="rounded-2xl border border-indigo-100 bg-white px-5 py-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                Verification Status Placeholder
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                Menunggu Verifikasi
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Nantinya status di sini akan berubah sesuai hasil verifikasi token: berhasil, gagal, expired, atau sudah pernah dipakai.
              </p>
            </div>

            <DisclaimerNote
              className="mt-5"
              editPath="src/pages/auth/VerifyEmailPage.tsx"
              text="Status verifikasi di section ini nantinya akan diproses oleh backend auth system."
            />
          </div>

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
