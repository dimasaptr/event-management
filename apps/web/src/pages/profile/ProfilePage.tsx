/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : ProfilePage.tsx
 * Type        : Page
 * Feature     : Feature 2
 * Route       : /profile
 * Source Path : src/pages/profile/ProfilePage.tsx
 * Used In     : User Profile Area
 * UI Section  : Profile Overview
 * Status      : ACTIVE
 * Notes       : Final real profile overview page for Phase 5
 * =========================================
 */

import DisclaimerNote from "@/components/shared/DisclaimerNote";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="min-h-[calc(100vh-104px)] bg-slate-50 px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-3xl border border-red-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">User Not Found</h1>

          <p className="mt-3 text-sm text-slate-600">
            Data user tidak tersedia. Silakan login kembali.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Back to Login
          </Link>
        </div>
      </main>
    );
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const initials = `${user.firstName?.charAt(0) ?? ""}${user.lastName?.charAt(0) ?? ""}`.toUpperCase();

  return (
    <main className="min-h-[calc(100vh-104px)] bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Profile Overview
          </p>

          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                Akun & Informasi Profil
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Halaman ini menampilkan ringkasan identitas akun, role user, email,
                referral code, poin reward, dan data profil lain yang nantinya akan
                terhubung ke backend.
              </p>
            </div>

            <DisclaimerNote
              className="md:max-w-xs"
              editPath="src/pages/profile/ProfilePage.tsx"
              text="Konten frontend ini dikerjakan oleh Feature 2."
            />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <section className="rounded-3xl bg-slate-900 px-6 py-10 text-white shadow-xl md:px-10">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={fullName}
                      className="h-24 w-24 rounded-full object-cover ring-4 ring-white/10"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-2xl font-bold text-white ring-4 ring-white/10">
                      {initials || "U"}
                    </div>
                  )}

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                      Account Identity
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">{fullName}</h2>

                    <p className="mt-2 text-slate-300">{user.email}</p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <Badge label={`Role: ${user.role}`} />
                      <Badge label="Status: Active" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    to="/profile/edit"
                    className="rounded-2xl bg-white px-5 py-3 text-center text-sm font-semibold text-slate-900 transition hover:bg-slate-200"
                  >
                    Edit Profile
                  </Link>

                  <Link
                    to="/profile/change-password"
                    className="rounded-2xl border border-white/20 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Change Password
                  </Link>
                </div>
              </div>

              <DisclaimerNote
                className="mt-6"
                editPath="src/pages/profile/ProfilePage.tsx"
                text="Konten frontend ini dikerjakan oleh Feature 2."
              />
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                Profile Details
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                Informasi Profil Lengkap
              </h3>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Semua data ini nantinya berasal dari backend dan akan berubah sesuai akun yang login.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <InfoCard
                  label="First Name"
                  value={user.firstName}
                  helper="Nama depan user • Data akun backend"
                />
                <InfoCard
                  label="Last Name"
                  value={user.lastName}
                  helper="Nama belakang user • Data akun backend"
                />
                <InfoCard
                  label="Email"
                  value={user.email}
                  helper="Email login user • Data auth backend"
                />
                <InfoCard
                  label="Role"
                  value={user.role}
                  helper="Role user • Data otorisasi backend"
                />
              </div>

              <DisclaimerNote
                className="mt-6"
                editPath="src/pages/profile/ProfilePage.tsx"
                text="Data profil user ini nantinya akan diisi oleh role CUSTOMER / ORGANIZER lalu ditampilkan di frontend."
              />
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                  Referral
                </p>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  Referral Code
                </h3>

                <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
                    Your Code
                  </p>
                  <p className="mt-3 text-2xl font-extrabold tracking-wide text-indigo-700">
                    {user.referralCode || "-"}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Bagikan kode ini ke user baru. Owner referral akan mendapatkan points.
                  </p>
                </div>

                <DisclaimerNote
                  className="mt-5"
                  editPath="src/pages/profile/ProfilePage.tsx"
                  text="Referral code di section ini akan mengikuti data akun user yang sedang login."
                />
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                  Reward Points
                </p>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  Points Balance
                </h3>

                <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-600">
                    Available Points
                  </p>
                  <p className="mt-3 text-3xl font-extrabold text-emerald-700">
                    {(user.points ?? 0).toLocaleString("id-ID")}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Points dapat dipakai saat checkout dan akan expired sesuai rule backend.
                  </p>
                </div>

                <DisclaimerNote
                  className="mt-5"
                  editPath="src/pages/profile/ProfilePage.tsx"
                  text="Points balance di section ini nantinya akan mengikuti reward point user dari backend."
                />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                Coupon / Voucher
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                Ringkasan Benefit User
              </h3>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <QuickBenefit
                  title="Voucher User"
                  value="Voucher single-use per account"
                />
                <QuickBenefit
                  title="Referral Benefit"
                  value="Kode referral bisa dipakai banyak akun baru"
                />
                <QuickBenefit
                  title="Points Reward"
                  value="Points bisa dipakai saat checkout"
                />
                <QuickBenefit
                  title="Points Expiry"
                  value="Points expire 3 bulan setelah dikreditkan"
                />
              </div>

              <DisclaimerNote
                className="mt-6"
                editPath="src/pages/profile/ProfilePage.tsx"
                text="Ringkasan benefit user di section ini akan mengikuti voucher, coupon, referral, dan points yang tersimpan di backend."
              />
            </section>
          </div>

          <div className="space-y-8">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                Account Status
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                Ringkasan Akun
              </h3>

              <div className="mt-6 space-y-4">
                <QuickItem
                  title="Email Verification"
                  value="Akan terhubung ke backend auth"
                />
                <QuickItem
                  title="Password"
                  value="Dikelola via change password flow"
                />
                <QuickItem
                  title="Profile Photo"
                  value="Bisa upload file atau URL foto"
                />
                <QuickItem
                  title="Referral System"
                  value="Kode referral tampil otomatis"
                />
              </div>

              <DisclaimerNote
                className="mt-6"
                editPath="src/pages/profile/ProfilePage.tsx"
                text="Konten frontend ini dikerjakan oleh Feature 2."
              />
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
                Quick Actions
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                Aksi Cepat
              </h3>

              <div className="mt-5 grid gap-3">
                <Link
                  to="/profile/edit"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Edit Profile
                </Link>

                <Link
                  to="/profile/change-password"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Change Password
                </Link>

                {user.role === "ORGANIZER" && (
                  <Link
                    to="/organizer/dashboard"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Go to Organizer Dashboard
                  </Link>
                )}

                {user.role === "CUSTOMER" && (
                  <Link
                    to="/customer/dashboard"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Go to Customer Dashboard
                  </Link>
                )}
              </div>

              <DisclaimerNote
                className="mt-6"
                editPath="src/pages/profile/ProfilePage.tsx"
                text="Aksi cepat di section ini mengarahkan user ke flow edit profil, ganti password, dan dashboard sesuai role."
              />
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-300">
                System Notes
              </p>

              <h3 className="mt-3 text-2xl font-bold">
                Integrasi backend yang akan terhubung
              </h3>

              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
                <p>• Data profil akan diambil dari akun user yang sedang login</p>
                <p>• Profile photo akan mendukung upload file dan URL gambar</p>
                <p>• Referral code akan di-generate dan tersimpan di backend</p>
                <p>• Change password butuh current password + new password + confirm</p>
                <p>• Points akan terhubung ke checkout flow dan history transaksi</p>
              </div>

              <DisclaimerNote
                className="mt-6"
                editPath="src/pages/profile/ProfilePage.tsx"
                text="Data backend akan ditampilkan ke frontend di halaman ini."
              />
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white">
      {label}
    </span>
  );
}

type InfoCardProps = {
  label: string;
  value: string;
  helper: string;
};

function InfoCard({ label, value, helper }: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-3 text-lg font-bold text-slate-900">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{helper}</p>
    </div>
  );
}

function QuickItem({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{value}</p>
    </div>
  );
}

function QuickBenefit({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-5">
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{value}</p>
    </div>
  );
}
