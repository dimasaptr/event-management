/**
 
=========================================
FILE INFO
=========================================
File Name   : app.ts
Type        : App Entry
Feature     : Shared
Route       : -
Source Path : apps/api/src/app.ts
Used In     : Backend API Application
UI Section  : Backend Core
Status      : ACTIVE
Notes       : Express app configuration
=========================================*/

import express from "express";
import cors from "cors";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("API is running...");
  });

  return app;
}
