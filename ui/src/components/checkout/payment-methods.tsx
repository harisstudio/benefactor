"use client";

import Image from "next/image";
import { useState } from "react";
import { ExpressCheckoutElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { createPaymentIntent } from "@/lib/api";
import { addRecentDonor } from "@/lib/recent-donors";
import { useToast } from "@/components/ui/toast";
import type { CurrencyCode } from "@/lib/fx";

// Wallet identifiers reported by ExpressCheckoutElement. PayPal stays as a
// separate manual tile because Stripe's PayPal redirect isn't an express
// wallet in the same sense.
export type PaymentMethod = "paypal" | "wallet" | "card";

interface PaymentMethodsProps {
  selected: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  total: number;
  currency: CurrencyCode;
  donationAmount: number;
  isAnonymous: boolean;
}

export function PaymentMethods({
  selected,
  onChange,
  total,
  currency,
  donationAmount,
  isAnonymous,
}: PaymentMethodsProps) {
  const { t } = useLanguage();
  const toast = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const [expressReady, setExpressReady] = useState(false);

  /**
   * When a user taps the Apple Pay / Google Pay / Link button, Stripe opens
   * the native sheet directly. We still need to mint a PaymentIntent on the
   * fly and confirm via `stripe.confirmPayment`. The ExpressCheckoutElement
   * 'confirm' event fires after the wallet has authorised the payment.
   */
  const handleExpressConfirm = async () => {
    if (!stripe || !elements) return;
    try {
      const { clientSecret } = await createPaymentIntent(total, currency, {
        showName: !isAnonymous,
      });
      if (!clientSecret) throw new Error("Failed to get client secret");

      const submit = await elements.submit();
      if (submit.error) throw submit.error;

      addRecentDonor({
        amount: donationAmount,
        currency,
        isAnonymous,
      });

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });
      if (error) toast.show({ tone: "error", title: t("checkoutPaymentFailed"), description: error.message });
    } catch (err: any) {
      toast.show({ tone: "error", title: t("checkoutPaymentFailed"), description: err?.message });
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em]">
        {t("checkoutPaymentMethod")}
      </label>

      {/* PayPal tile (separate flow) */}
      <label
        className={cn(
          "flex items-center gap-3 h-14 px-4 border rounded-[14px] cursor-pointer transition-all",
          selected === "paypal"
            ? "border-primary-navy bg-primary-navy/5 shadow-sm"
            : "border-surface-muted bg-white hover:border-primary-navy/40",
        )}
      >
        <input
          type="radio"
          name="payment"
          value="paypal"
          checked={selected === "paypal"}
          onChange={() => onChange("paypal")}
          className="w-5 h-5 accent-primary-navy shrink-0"
        />
        <span className="w-12 flex items-center justify-center shrink-0">
          <Image
            src="/assets/paypal-logo.svg"
            alt="PayPal"
            width={64}
            height={18}
            className="h-5 w-auto object-contain"
          />
        </span>
        <span className="text-[14px] font-semibold text-primary-navy">{t("checkoutPaypal")}</span>
      </label>

      {/* Express wallets — Apple Pay / Google Pay / Link / Revolut Pay
         appear as native buttons (only those the device supports). */}
      <div
        className={cn(
          "transition-opacity",
          expressReady ? "opacity-100" : "opacity-0 h-0 overflow-hidden",
        )}
      >
        <ExpressCheckoutElement
          options={{
            buttonHeight: 48,
            paymentMethods: {
              applePay: "always",
              googlePay: "always",
              link: "auto",
            },
          }}
          onReady={({ availablePaymentMethods }) => {
            if (availablePaymentMethods) {
              setExpressReady(true);
              onChange("wallet");
            }
          }}
          onConfirm={handleExpressConfirm}
        />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 py-1">
        <div className="flex-1 h-px bg-surface-muted" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray">
          {t("checkoutOrPayCard")}
        </span>
        <div className="flex-1 h-px bg-surface-muted" />
      </div>

      {/* Card form (always visible) */}
      <label
        className={cn(
          "flex items-center gap-3 h-14 px-4 border rounded-[14px] cursor-pointer transition-all",
          selected === "card"
            ? "border-primary-navy bg-primary-navy/5 shadow-sm"
            : "border-surface-muted bg-white hover:border-primary-navy/40",
        )}
      >
        <input
          type="radio"
          name="payment"
          value="card"
          checked={selected === "card"}
          onChange={() => onChange("card")}
          className="w-5 h-5 accent-primary-navy shrink-0"
        />
        <span className="text-[14px] font-semibold text-primary-navy">{t("checkoutCard")}</span>
      </label>

      {selected === "card" && (
        <div className="pt-2">
          <PaymentElement
            options={{
              layout: "tabs",
              defaultValues: { billingDetails: { name: "" } },
              wallets: { applePay: "never", googlePay: "never" },
            }}
          />
          <div className="flex items-center justify-end gap-2 pt-3">
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
        </div>
      )}
    </div>
  );
}
