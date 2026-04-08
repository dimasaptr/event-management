/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : Button.tsx
 * Type        : UI Component
 * Feature     : Shared
 * Source Path : src/components/ui/Button.tsx
 * Used In     : Forms, Actions, Navigation
 * Status      : ACTIVE
 * =========================================
 */

import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className="w-full rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98]"
    >
      {children}
    </button>
  );
}