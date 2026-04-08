/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : AppRouter.tsx
 * Type        : Router
 * Feature     : Shared
 * Source Path : src/app/AppRouter.tsx
 * Used In     : App Bootstrap
 * UI Section  : Application Routing
 * Status      : SHARED ACTIVE
 * Notes       : Shared router for Feature 1 and Feature 2
 * =========================================
 */

import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/components/shared/MainLayout";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import PublicOnlyRoute from "@/features/auth/components/PublicOnlyRoute";
import RoleRoute from "@/features/auth/components/RoleRoute";

/* ================================
   PUBLIC PAGES
================================ */
import HomePage from "@/pages/public/HomePage";
import EventListPage from "@/pages/public/EventListPage";
import EventDetailPage from "@/pages/public/EventDetailPage";

/* ================================
   AUTH PAGES
================================ */
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";

/* ================================
   CUSTOMER PAGES
================================ */
import CustomerDashboardPage from "@/pages/customer/CustomerDashboardPage";
import CustomerProfilePage from "@/pages/customer/CustomerProfilePage";
import CheckoutPage from "@/pages/customer/CheckoutPage";
import MyTransactionsPage from "@/pages/customer/MyTransactionsPage";
import MyTicketsPage from "@/pages/customer/MyTicketsPage";
import TransactionDetailPage from "@/pages/customer/TransactionDetailPage";

/* ================================
   PROFILE PAGES
================================ */
import ProfilePage from "@/pages/profile/ProfilePage";
import EditProfilePage from "@/pages/profile/EditProfilePage";
import ChangePasswordPage from "@/pages/profile/ChangePasswordPage";

/* ================================
   ORGANIZER PAGES
================================ */
import OrganizerDashboardPage from "@/pages/organizer/OrganizerDashboardPage";
import OrganizerEventListPage from "@/pages/organizer/OrganizerEventListPage";
import OrganizerEventDetailPage from "@/pages/organizer/OrganizerEventDetailPage";
import CreateEventPage from "@/pages/organizer/CreateEventPage";
import EditEventPage from "@/pages/organizer/EditEventPage";
import ManageTransactionsPage from "@/pages/organizer/ManageTransactionsPage";
import AttendeesPage from "@/pages/organizer/AttendeesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      /* =========================================
          SHARED FILE - EDIT CAREFULLY
          Used by Feature 1 and Feature 2
         ========================================= */

      /* ================================
          PUBLIC ROUTES START
         ================================ */
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "events",
        element: <EventListPage />,
      },
      {
        path: "events/:slug",
        element: <EventDetailPage />,
      },
      /* ================================
          PUBLIC ROUTES END
         ================================ */

      /* ================================
          AUTH ROUTES START
         ================================ */
      {
        path: "login",
        element: (
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "register",
        element: (
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicOnlyRoute>
            <ForgotPasswordPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "reset-password",
        element: (
          <PublicOnlyRoute>
            <ResetPasswordPage />
          </PublicOnlyRoute>
        ),
      },
      {
        path: "verify-email",
        element: (
          <PublicOnlyRoute>
            <VerifyEmailPage />
          </PublicOnlyRoute>
        ),
      },
      /* ================================
          AUTH ROUTES END
         ================================ */

      /* ================================
          PROFILE ROUTES START
         ================================ */
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/edit",
        element: (
          <ProtectedRoute>
            <EditProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/change-password",
        element: (
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        ),
      },
      /* ================================
          PROFILE ROUTES END
         ================================ */

      /* ================================
          CUSTOMER ROUTES START
         ================================ */
      {
        path: "checkout/:slug",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="CUSTOMER">
              <CheckoutPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "customer/dashboard",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="CUSTOMER">
              <CustomerDashboardPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "customer/profile",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="CUSTOMER">
              <CustomerProfilePage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "customer/transactions",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="CUSTOMER">
              <MyTransactionsPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "customer/transactions/:id",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="CUSTOMER">
              <TransactionDetailPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "customer/tickets",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="CUSTOMER">
              <MyTicketsPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      /* ================================
          CUSTOMER ROUTES END
         ================================ */

      /* ================================
          ORGANIZER ROUTES START
         ================================ */
      {
        path: "organizer/dashboard",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="ORGANIZER">
              <OrganizerDashboardPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "organizer/events",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="ORGANIZER">
              <OrganizerEventListPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "organizer/events/create",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="ORGANIZER">
              <CreateEventPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "organizer/events/:slug",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="ORGANIZER">
              <OrganizerEventDetailPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "organizer/events/:id/edit",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="ORGANIZER">
              <EditEventPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "organizer/events/:slug/transactions",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="ORGANIZER">
              <ManageTransactionsPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "organizer/events/:slug/attendees",
        element: (
          <ProtectedRoute>
            <RoleRoute allowedRole="ORGANIZER">
              <AttendeesPage />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
      /* ================================
          ORGANIZER ROUTES END
         ================================ */
    ],
  },
]);