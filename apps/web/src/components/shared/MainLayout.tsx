/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : MainLayout.tsx
 * Type        : Layout
 * Feature     : Shared
 * Source Path : src/components/shared/MainLayout.tsx
 * Used In     : AppRouter
 * UI Section  : Global Layout
 * Status      : SHARED ACTIVE
 * Notes       : Shared layout for Feature 1 and Feature 2
 * =========================================
 */

import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Footer from "@/components/shared/Footer";

export default function MainLayout() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================================
          SHARED FILE - EDIT CAREFULLY
          Used by Feature 1 and Feature 2
         ========================================= */}

      {/* ================================
          SHARED WORK AREA START
         ================================ */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xl font-bold text-slate-950"
          >
            <span>Learn</span>
            <span className="rounded-lg bg-indigo-600 px-2 py-0.5 text-white">
              Hub
            </span>
          </Link>

          <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
            <Link to="/events">Events</Link>

            {user ? (
              <>
                <Link to="/profile">Profile</Link>

                {user.role === "CUSTOMER" && (
                  <>
                    <Link to="/customer/dashboard">Dashboard</Link>
                    <Link to="/customer/profile">My Rewards</Link>
                  </>
                )}

                {user.role === "ORGANIZER" && (
                  <Link to="/organizer/dashboard">Dashboard</Link>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />
      {/* ================================
          SHARED WORK AREA END
         ================================ */}
    </div>
  );
}
