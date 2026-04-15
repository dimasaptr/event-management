/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : server.ts
 * Type        : Entry Point
 * Feature     : Feature 1 & 2 - Server
 * Source Path : apps/api/src/server.ts
 * Used In     : Backend API Server
 * Status      : ACTIVE
 * =========================================
 */

import "dotenv/config";
import { createApp } from "./app.js";

const app = createApp();
const PORT = 8000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("=====================================");
  console.log("🚀 Event Management API Running");
  console.log(`📍 Port    : ${PORT}`);
  console.log("📦 Status  : Backend app is running");
  console.log("=====================================");
});