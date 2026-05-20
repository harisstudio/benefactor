"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { IconCreditCard } from "@tabler/icons-react";
import { CardForm } from "./card-form";
import { useLanguage } from "@/context/LanguageContext";

export type PaymentMethod = "paypal" | "applepay" | "gpay" | "revolut" | "card";

interface PaymentMethodsProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

type MethodSpec = {
  key: PaymentMethod;
  label: string;
  logo?: { src: string; width: number; height: number; alt: string };
  Icon?: React.ComponentType<{ size?: number; className?: string; stroke?: number }>;
};

export function PaymentMethods({ selected, onChange }: PaymentMethodsProps) {
  const { t } = useLanguage();

  const methods: MethodSpec[] = [
    {
      key: "paypal",
      label: t("checkoutPaypal"),
      logo: { src: "/assets/paypal-logo.svg", width: 64, height: 18, alt: "PayPal" },
    },
    {
      key: "applepay",
      label: t("checkoutApplePay"),
      logo: { src: "/assets/apple-pay.png", width: 48, height: 20, alt: "Apple Pay" },
    },
    {
      key: "gpay",
      label: t("checkoutGooglePay"),
      logo: { src: "/assets/google-pay-mark.svg", width: 44, height: 20, alt: "Google Pay" },
    },
    {
      key: "revolut",
      label: t("checkoutRevolutPay"),
      logo: { src: "/assets/revolut-pay.svg", width: 64, height: 18, alt: "Revolut Pay" },
    },
    {
      key: "card",
      label: t("checkoutCard"),
      Icon: IconCreditCard,
    },
  ];

  // Apple/Google Pay are rendered automatically by Stripe's PaymentElement
  // (with `layout: 'tabs'` and `wallets` enabled in the Stripe dashboard).
  // Selecting them just shows the same PaymentElement, which surfaces the right wallet
  // based on the visitor's browser/device.
  const showStripeForm =
    selected === "card" ||
    selected === "applepay" ||
    selected === "gpay" ||
    selected === "revolut";

  return (
    <div className="space-y-3">
      <label className="block text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em]">
        {t("checkoutPaymentMethod")}
      </label>

      <div className="flex flex-col gap-2">
        {methods.map(({ key, label, logo, Icon }) => {
          const isSelected = selected === key;
          return (
            <label
              key={key}
              className={cn(
                "flex items-center gap-3 h-14 px-4 border rounded-[14px] cursor-pointer transition-all",
                isSelected
                  ? "border-primary-navy bg-primary-navy/5 shadow-sm"
                  : "border-surface-muted bg-white hover:border-primary-navy/40",
              )}
            >
              <input
                type="radio"
                name="payment"
                value={key}
                checked={isSelected}
                onChange={() => onChange(key)}
                className="w-5 h-5 accent-primary-navy shrink-0"
              />
              <span className="w-12 flex items-center justify-center shrink-0">
                {logo ? (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="h-5 w-auto object-contain"
                  />
                ) : Icon ? (
                  <Icon size={22} stroke={1.6} className="text-primary-navy" />
                ) : null}
              </span>
              <span className="text-[14px] font-semibold text-primary-navy">{label}</span>
            </label>
          );
        })}
      </div>

      {showStripeForm && (
        <>
          <CardForm method={selected} />
          <div className="flex items-center justify-end gap-2 pt-1">
            <span className="text-[11px] font-medium text-text-gray uppercase tracking-[0.1em]">
              {t("poweredBy")}
            </span>
            <Image
              src="/assets/stripe-logo.png"
              alt="Stripe"
              width={48}
              height={20}
              className="h-5 w-auto opacity-80"
            />
          </div>
        </>
      )}
    </div>
  );
}
