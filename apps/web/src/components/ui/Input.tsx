/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : Input.tsx
 * Type        : UI Component
 * Feature     : Shared
 * Source Path : src/components/ui/Input.tsx
 * Used In     : Forms
 * Status      : ACTIVE
 * =========================================
 */

import type { InputHTMLAttributes } from "react";

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-zinc-300 px-4 py-2 text-sm outline-none transition focus:border-zinc-900"
    />
  );
}