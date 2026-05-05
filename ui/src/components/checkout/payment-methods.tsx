"use client";

import { cn } from "@/lib/utils";
import { CardForm } from "./card-form";

type PaymentMethod = "paypal" | "applepay" | "gpay" | "card";

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
    key: "applepay",
    label: "Apple Pay",
    icon: (
      <img src="/assets/apple-pay.png" alt="Apple Pay" className="h-5 w-auto" />
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
    label: "Stripe",
    icon: (
      <img src="/assets/stripe-logo.png" alt="Stripe" className="h-5 w-auto" />
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

      {/* Stripe payment forms */}
      {(selected === "card" || selected === "applepay" || selected === "gpay") && (
        <CardForm method={selected as any} />
      )}
    </div>
  );
}
