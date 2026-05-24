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
      // Required for deferred-intent ExpressCheckoutElement: collect data
      // from the wallet sheet before minting the PaymentIntent.
      const submit = await elements.submit();
      if (submit.error) throw submit.error;

      const { clientSecret } = await createPaymentIntent(total, currency, {
        showName: !isAnonymous,
      });
      if (!clientSecret) throw new Error("Failed to get client secret");

      addRecentDonor({ amount: donationAmount, currency, isAnonymous });

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

  const handleRevolutPay = async () => {
    if (!stripe || !elements) return;
    try {
      const submit = await elements.submit();
      if (submit.error) throw submit.error;

      const { clientSecret } = await createPaymentIntent(total, currency, {
        showName: !isAnonymous,
      });
      if (!clientSecret) throw new Error("Failed to get client secret");

      addRecentDonor({ amount: donationAmount, currency, isAnonymous });

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          payment_method_data: { type: "revolut_pay" as any },
        },
      } as any);
      if (error) toast.show({ tone: "error", title: t("checkoutPaymentFailed"), description: error.message });
    } catch (err: any) {
      toast.show({ tone: "error", title: t("checkoutPaymentFailed"), description: err?.message });
    }
  };

  const tileClass = (active: boolean) =>
    cn(
      "relative flex flex-col items-center justify-center gap-1.5 h-[68px] rounded-[14px] border-2 transition-all min-h-[44px]",
      active
        ? "border-primary-navy bg-primary-navy/5 shadow-sm"
        : "border-surface-muted bg-white hover:border-primary-navy/40",
    );

  return (
    <div className="space-y-4">
      <label className="block text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em]">
        {t("checkoutPaymentMethod")}
      </label>

      {/* Apple Pay / Google Pay — Stripe's native ExpressCheckoutElement.
          Tapping these opens the wallet sheet directly. */}
      <div
        className={cn(
          "transition-opacity",
          expressReady ? "opacity-100" : "opacity-0 h-0 overflow-hidden",
        )}
      >
        <ExpressCheckoutElement
          options={{
            buttonHeight: 56,
            layout: { type: "horizontal", visibleButtonCount: 4 },
            paymentMethods: {
              applePay: "always",
              googlePay: "always",
              link: "never",
              amazonPay: "never",
              klarna: "never",
              paypal: "never",
            },
          }}
          onReady={({ availablePaymentMethods }) => {
            const hasAny = !!availablePaymentMethods && Object.values(availablePaymentMethods).some(Boolean);
            if (hasAny) setExpressReady(true);
          }}
          onClick={({ resolve }) => {
            resolve({
              emailRequired: false,
              phoneNumberRequired: false,
              shippingAddressRequired: false,
              billingAddressRequired: false,
            });
          }}
          onConfirm={handleExpressConfirm}
        />
      </div>

      {/* Custom tile grid — PayPal, Revolut Pay, Card. Matches AmountGrid
          styling so the checkout reads as one consistent system. */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={() => onChange("paypal")}
          className={tileClass(selected === "paypal")}
          aria-label={t("checkoutPaypal")}
        >
          <Image
            src="/assets/paypal-logo.svg"
            alt="PayPal"
            width={72}
            height={20}
            className="h-5 w-auto object-contain"
          />
        </button>

        <button
          type="button"
          onClick={handleRevolutPay}
          className={cn(
            "relative flex items-center justify-center gap-1 h-[68px] rounded-[14px] border-2 border-transparent bg-[#0666EB] hover:bg-[#0552c4] active:scale-[0.98] transition-all text-white shadow-sm min-h-[44px]",
          )}
          aria-label="Revolut Pay"
        >
          <span className="font-extrabold tracking-tight text-[15px]">Revolut</span>
          <span className="opacity-90 font-medium text-[15px]">Pay</span>
        </button>

        <button
          type="button"
          onClick={() => onChange("card")}
          className={tileClass(selected === "card")}
          aria-label={t("checkoutCard")}
        >
          <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="text-primary-navy">
            <rect x="1" y="1" width="26" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <rect x="1" y="5" width="26" height="3" fill="currentColor" />
            <rect x="4" y="13" width="6" height="2" rx="1" fill="currentColor" />
          </svg>
          <span className="text-[12px] font-semibold text-primary-navy uppercase tracking-[0.08em]">
            {t("checkoutCard")}
          </span>
        </button>
      </div>

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
