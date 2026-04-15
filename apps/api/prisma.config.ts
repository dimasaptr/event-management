/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : prisma.config.ts
 * Type        : Config
 * Feature     : Feature 1 & 2 - Prisma Config
 * Source Path : apps/api/prisma.config.ts
 * =========================================
 */

/// <reference types="node" />
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",

  datasource: {
    url: process.env.DATABASE_URL,
  },
});