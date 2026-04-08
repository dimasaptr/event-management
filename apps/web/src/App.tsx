/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : App.tsx
 * Type        : App Shell
 * Feature     : Shared
 * Source Path : src/App.tsx
 * Used In     : Root App Entry
 * UI Section  : Application Wrapper
 * Status      : SHARED ACTIVE
 * Notes       : Root app wrapper
 * =========================================
 */

import { RouterProvider } from "react-router-dom";
import { router } from "@/app/AppRouter";

export default function App() {
  return <RouterProvider router={router} />;
}