import DisclaimerNote from "@/components/shared/DisclaimerNote";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="hidden rounded-[2rem] bg-slate-900 p-10 text-white shadow-2xl lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-300">
            Account Recovery
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight">
            Lupa password? Tenang, kamu bisa reset akunmu dengan aman
          </h1>

          <p className="mt-6 max-w-xl leading-8 text-slate-300">
            Masukkan email yang terdaftar dan sistem akan mengirim link reset password
            melalui email.
          </p>

          <DisclaimerNote
            className="mt-8 text-slate-200"
            editPath="src/pages/auth/ForgotPasswordPage.tsx"
            text="Konten frontend ini dikerjakan oleh Feature 2."
          />

          <div className="mt-10 space-y-4">
            <Info text="Reset password menggunakan token JWT" />
            <Info text="Link reset akan dikirim melalui email" />
            <Info text="Flow ini akan terhubung langsung ke backend auth" />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Forgot Password
          </p>

          <h2 className="mt-2 text-3xl font-bold text-slate-900">
            Reset Password
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            Masukkan email akun kamu. Jika valid, sistem akan mengirimkan link reset password.
          </p>

          <DisclaimerNote
            className="mt-6"
            editPath="src/pages/auth/ForgotPasswordPage.tsx"
            text="Konten frontend ini dikerjakan oleh Feature 2."
          />

          <form className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-800">
                Email
              </label>
              <input
                type="email"
                placeholder="Masukkan email terdaftar"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900"
              />
            </div>

            <DisclaimerNote
              editPath="src/pages/auth/ForgotPasswordPage.tsx"
              text="Email di form ini nantinya akan divalidasi oleh backend untuk mengirim reset link ke user."
            />

            <button className="w-full rounded-2xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white hover:bg-slate-800">
              Kirim Link Reset
            </button>

            <DisclaimerNote
              editPath="src/pages/auth/ForgotPasswordPage.tsx"
              text="Konten frontend ini dikerjakan oleh Feature 2."
            />
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Sudah ingat password?{" "}
            <Link to="/login" className="font-semibold text-indigo-600">
              Kembali ke login
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}

function Info({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
      • {text}
    </div>
  );
}
