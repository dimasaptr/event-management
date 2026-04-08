/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : server.ts
 * Type        : Server Entry
 * Feature     : Shared
 * Route       : -
 * Source Path : apps/api/src/server.ts
 * Used In     : Backend API Server
 * UI Section  : Backend Core
 * Status      : ACTIVE
 * Notes       : Root backend server starter
 * =========================================
 */

import { createApp } from "./app.js";

const app = createApp();

const PORT = 8000;

console.log("=================================");
console.log("🚀 Event Management API Running");
console.log(`📍 Port    : ${PORT}`);
console.log(`📦 Status  : ${app.message}`);
console.log("=================================");