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
      <span className="text-xs font-bold text-[#003087]">Pay<span className="text-[#009cde]">Pal</span></span>
    ),
  },
  {
    key: "gpay",
    label: "Google Pay",
    icon: <span className="text-xs font-bold">G Pay</span>,
  },
  {
    key: "card",
    label: "Credit or debit",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
];

export function PaymentMethods({ selected, onChange }: PaymentMethodsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-base font-bold text-primary-navy">Payment method</h3>

      <div className="flex gap-3">
        {methods.map((m) => (
          <label
            key={m.key}
            className={cn(
              "flex-1 flex flex-col items-center justify-center gap-1.5 py-3 border-2 rounded-sm cursor-pointer transition-all min-h-[44px]",
              selected === m.key
                ? "border-primary-navy bg-bg-off-white"
                : "border-gray-200 hover:border-gray-400"
            )}
          >
            <input
              type="radio"
              name="payment"
              value={m.key}
              checked={selected === m.key}
              onChange={() => onChange(m.key)}
              className="sr-only"
            />
            {m.icon}
            <span className="text-xs font-medium text-text-dark">{m.label}</span>
          </label>
        ))}
      </div>

      {selected === "card" && <CardForm />}
    </div>
  );
}
