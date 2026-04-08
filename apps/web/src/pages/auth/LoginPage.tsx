/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : LoginPage.tsx
 * Type        : Auth Page
 * Feature     : Feature 2
 * Source Path : src/pages/auth/LoginPage.tsx
 * Used In     : Login Route
 * UI Section  : Authentication - Login
 * Status      : ACTIVE
 * Notes       : Dummy login page with role simulation for CUSTOMER / ORGANIZER
 * =========================================
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert("Email dan password wajib diisi.");
      return;
    }

    const isOrganizer = trimmedEmail.includes("organizer");
    const firstName = isOrganizer ? "Organizer" : "Customer";
    const lastName = "Demo";

    const dummyUser = {
      id: isOrganizer ? "org-001" : "cust-001",
      email: trimmedEmail,
      role: isOrganizer ? ("ORGANIZER" as const) : ("CUSTOMER" as const),
      firstName,
      lastName,
      profilePicture:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      referralCode: isOrganizer ? "ORG-DEMO-2026" : "CUS-DEMO-2026",
      points: isOrganizer ? 10000 : 25000,
    };

    loginUser(dummyUser);

    if (isOrganizer) {
      navigate("/organizer/dashboard");
      return;
    }

    navigate("/customer/dashboard");
  };

  return (
    <div className="relative h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1800&q=80"
          alt="Seminar and workshop audience"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/55 to-indigo-950/70" />
      </div>

      <section className="relative flex h-full items-center justify-center px-4">
        <div className="w-full max-w-xl rounded-[2rem] border border-white/15 bg-white/95 p-6 shadow-2xl backdrop-blur md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
            Welcome Back
          </p>

          <h1 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
            Login to continue to your dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Customers access tickets & referrals. Organizers manage events & dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-800">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className="block text-sm font-semibold text-slate-800">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-indigo-600"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
              />
            </div>

            <button className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
              Login
            </button>
          </form>

          <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-xs text-slate-700">
            <p className="font-semibold text-slate-900">Quick test:</p>
            <p className="mt-1">• <span className="font-semibold">customer@mail.com</span> → CUSTOMER</p>
            <p>• <span className="font-semibold">organizer@mail.com</span> → ORGANIZER</p>
            <p>• Any password works in dummy mode</p>
          </div>

          <p className="mt-5 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold text-indigo-600">
              Register now
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
