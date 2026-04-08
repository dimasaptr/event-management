/**
 * =========================================
 * FILE INFO
 * =========================================
 * File Name   : VoucherManager.tsx
 * Type        : Component
 * Feature     : Feature 1
 * Source Path : src/features/events/components/VoucherManager.tsx
 * Used In     : EditEventPage
 * UI Section  : Organizer Voucher Management
 * Status      : DUMMY DATA
 * Notes       : Temporary organizer voucher manager before backend integration
 * =========================================
 */

import { useState } from "react";

interface Voucher {
  id: string;
  code: string;
  discount: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

const initialVouchers: Voucher[] = [
  {
    id: "voucher-001",
    code: "BOOTCAMP20",
    discount: 20,
    usageLimit: 50,
    usedCount: 14,
    startDate: "2026-04-10",
    endDate: "2026-05-31",
    isActive: true,
  },
];

export default function VoucherManager() {
  const [vouchers, setVouchers] = useState<Voucher[]>(initialVouchers);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(10);
  const [usageLimit, setUsageLimit] = useState(25);

  const handleAddVoucher = () => {
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) return;

    const alreadyExists = vouchers.some(
      (voucher) => voucher.code === normalizedCode
    );

    if (alreadyExists) return;

    const newVoucher: Voucher = {
      id: `voucher-${Date.now()}`,
      code: normalizedCode,
      discount,
      usageLimit,
      usedCount: 0,
      startDate: "2026-04-08",
      endDate: "2026-06-30",
      isActive: true,
    };

    setVouchers((prev) => [newVoucher, ...prev]);
    setCode("");
    setDiscount(10);
    setUsageLimit(25);
  };

  const toggleVoucher = (id: string) => {
    setVouchers((prev) =>
      prev.map((voucher) =>
        voucher.id === id
          ? { ...voucher, isActive: !voucher.isActive }
          : voucher
      )
    );
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Organizer Voucher Management
        </p>

        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          Event Vouchers
        </h2>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          Voucher ini masih dummy UI, tapi sudah disiapkan mengikuti flow mini
          project: voucher per event, single-use per account, dan limit usage.
        </p>
      </div>

      <div className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 md:grid-cols-4">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Voucher Code
          </label>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="e.g. EARLYBIRD25"
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Discount (%)
          </label>
          <input
            type="number"
            min={1}
            max={100}
            value={discount}
            onChange={(event) => setDiscount(Number(event.target.value))}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Usage Limit
          </label>
          <input
            type="number"
            min={1}
            value={usageLimit}
            onChange={(event) => setUsageLimit(Number(event.target.value))}
            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900"
          />
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleAddVoucher}
          className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add Voucher
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {vouchers.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <p className="text-sm font-semibold text-slate-800">
              No vouchers yet
            </p>
            <p className="mt-2 text-sm text-slate-600">
              Tambahkan voucher pertama untuk event ini.
            </p>
          </div>
        ) : (
          vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">
                      {voucher.code}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        voucher.isActive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {voucher.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    Discount {voucher.discount}% • Used {voucher.usedCount} /{" "}
                    {voucher.usageLimit}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Active period: {voucher.startDate} → {voucher.endDate}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleVoucher(voucher.id)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  {voucher.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}