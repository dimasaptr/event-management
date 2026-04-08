/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : main.tsx
 * Type        : Entry Point
 * Feature     : Shared
 * Source Path : src/main.tsx
 * Used In     : App Bootstrap
 * Status      : ACTIVE
 * =========================================
 */

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "@/features/auth/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);