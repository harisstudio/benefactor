"use client";

import { cn } from "@/lib/utils";
import { CardForm } from "./card-form";

type PaymentMethod = "paypal" | "gpay" | "card";

interface PaymentMethodsProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const methods: { key: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  {
    key: "paypal",
    label: "PayPal",
    icon: (
      <span className="text-sm font-bold">
        <span className="text-[#003087]">Pay</span>
        <span className="text-[#009cde]">Pal</span>
      </span>
    ),
  },
  {
    key: "gpay",
    label: "Google Pay",
    icon: (
      <span className="text-sm font-bold text-text-dark">G Pay</span>
    ),
  },
  {
    key: "card",
    label: "Credit or debit",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="w-6 h-6 text-text-gray"
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
];

export function PaymentMethods({ selected, onChange }: PaymentMethodsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-[17px] font-bold text-primary-navy">
        Payment method
      </h3>

      {/* Payment options - vertical list matching original */}
      <div className="flex flex-col gap-2.5">
        {methods.map((m) => (
          <label
            key={m.key}
            onClick={() => onChange(m.key)}
            className={cn(
              "flex items-center gap-3 py-4 px-4 border-2 rounded-[30px] cursor-pointer transition-all duration-200 bg-white min-h-[44px]",
              selected === m.key
                ? "border-primary-yellow bg-[rgba(255,200,0,0.05)]"
                : "border-[#1a2b4a] hover:bg-[#f9f9f9]"
            )}
          >
            <input
              type="radio"
              name="payment"
              value={m.key}
              checked={selected === m.key}
              onChange={() => onChange(m.key)}
              className="w-5 h-5 accent-primary-yellow flex-shrink-0"
            />
            {m.icon}
            <span className="text-[15px] font-normal text-primary-navy">
              {m.label}
            </span>
          </label>
        ))}
      </div>

      {/* Card form - shown when credit/debit is selected */}
      {selected === "card" && <CardForm />}
    </div>
  );
}
