"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { PaymentRequest } from "@stripe/stripe-js";
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

  // Stripe's PaymentRequest API lets us render custom-styled Apple Pay
  // and Google Pay tiles. Tapping them opens the native wallet sheet
  // directly (synchronous show() call required by Apple's user-gesture rule).
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [applePayAvailable, setApplePayAvailable] = useState(false);
  const [googlePayAvailable, setGooglePayAvailable] = useState(false);
  const totalRef = useRef(total);
  const currencyRef = useRef(currency);
  const isAnonymousRef = useRef(isAnonymous);
  const donationAmountRef = useRef(donationAmount);
  useEffect(() => { totalRef.current = total; }, [total]);
  useEffect(() => { currencyRef.current = currency; }, [currency]);
  useEffect(() => { isAnonymousRef.current = isAnonymous; }, [isAnonymous]);
  useEffect(() => { donationAmountRef.current = donationAmount; }, [donationAmount]);

  useEffect(() => {
    if (!stripe || total <= 0) return;
    const pr = stripe.paymentRequest({
      // Stripe account country (where the merchant is registered) — must
      // match the Stripe Dashboard regardless of donation currency.
      country: "GB",
      currency: currency.toLowerCase(),
      total: { label: "Donation", amount: Math.max(100, Math.round(total * 100)) },
      requestPayerEmail: true,
      requestPayerName: false,
    });

    pr.canMakePayment().then((result) => {
      if (!result) return;
      setApplePayAvailable(!!result.applePay);
      setGooglePayAvailable(!!result.googlePay);
      setPaymentRequest(pr);
    });

    pr.on("paymentmethod", async (ev) => {
      try {
        const { clientSecret } = await createPaymentIntent(
          totalRef.current,
          currencyRef.current,
          {
            showName: !isAnonymousRef.current,
            email: ev.payerEmail || undefined,
          },
        );
        if (!clientSecret) throw new Error("Failed to get client secret");

        addRecentDonor({
          amount: donationAmountRef.current,
          currency: currencyRef.current,
          isAnonymous: isAnonymousRef.current,
        });

        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false },
        );

        if (error) {
          ev.complete("fail");
          toast.show({ tone: "error", title: t("checkoutPaymentFailed"), description: error.message });
          return;
        }

        ev.complete("success");
        if (paymentIntent?.status === "requires_action") {
          await stripe.confirmCardPayment(clientSecret);
        }
        window.location.href = "/checkout/success";
      } catch (err: any) {
        ev.complete("fail");
        toast.show({ tone: "error", title: t("checkoutPaymentFailed"), description: err?.message });
      }
    });
  // Initialise once when Stripe is available. Amount/currency updates flow
  // through refs so re-creating the PaymentRequest object isn't required.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripe, currency]);

  // Update the running PaymentRequest's amount whenever total changes so
  // the native sheet shows the right number when the user taps the wallet.
  useEffect(() => {
    if (!paymentRequest || total <= 0) return;
    paymentRequest.update({
      currency: currency.toLowerCase(),
      total: { label: "Donation", amount: Math.max(100, Math.round(total * 100)) },
    });
  }, [paymentRequest, total, currency]);

  const handleWalletClick = () => {
    if (!paymentRequest) return;
    paymentRequest.show();
  };

  const handleRevolutPay = async () => {
    if (!stripe) return;
    try {
      const { clientSecret } = await createPaymentIntent(total, currency, {
        showName: !isAnonymous,
      });
      if (!clientSecret) throw new Error("Failed to get client secret");

      addRecentDonor({ amount: donationAmount, currency, isAnonymous });

      // Redirect-based methods don't need elements.submit() — confirm
      // directly with the payment_method type to trigger the Revolut Pay
      // hand-off.
      const { error } = await stripe.confirmRevolutPayPayment(clientSecret, {
        return_url: `${window.location.origin}/checkout/success`,
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

      {/* Unified payment method tiles. Apple Pay / Google Pay are
          rendered conditionally based on device support; clicking them
          opens the native wallet sheet via Stripe's PaymentRequest API. */}
      <div className="space-y-2.5">
        {/* Apple Pay — only renders on Safari with configured wallet */}
        {applePayAvailable && (
          <button
            type="button"
            onClick={handleWalletClick}
            className="w-full h-16 px-4 border-2 border-surface-muted hover:border-primary-navy/40 rounded-[14px] bg-white flex items-center gap-3 text-left transition-all"
            aria-label="Apple Pay"
          >
            <span className="w-5 h-5 rounded-full border-2 border-surface-muted shrink-0" />
            <span className="w-14 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary-navy" fill="currentColor">
                <path d="M17.05 11.97c-.03-2.94 2.4-4.36 2.51-4.43-1.37-2-3.5-2.27-4.26-2.3-1.81-.18-3.54 1.07-4.46 1.07-.94 0-2.34-1.05-3.86-1.02-1.98.03-3.83 1.16-4.85 2.93-2.08 3.6-.53 8.94 1.5 11.87.99 1.43 2.17 3.04 3.71 2.98 1.5-.06 2.07-.97 3.88-.97s2.33.97 3.9.94c1.61-.03 2.63-1.46 3.61-2.9.81-1.15 1.46-2.4 1.91-3.76-1.7-.65-3.59-2.47-3.59-4.41zM14.4 3.18c.84-1.02 1.4-2.43 1.25-3.84-1.21.05-2.66.8-3.52 1.81-.78.91-1.45 2.34-1.27 3.72 1.34.1 2.71-.69 3.54-1.69z"/>
              </svg>
            </span>
            <span className="text-[15px] font-bold text-primary-navy flex-1">Apple Pay</span>
            <span className="text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em] shrink-0">
              {t("checkoutOneTap")}
            </span>
          </button>
        )}

        {/* Google Pay — only renders on Chrome/Android with configured wallet */}
        {googlePayAvailable && (
          <button
            type="button"
            onClick={handleWalletClick}
            className="w-full h-16 px-4 border-2 border-surface-muted hover:border-primary-navy/40 rounded-[14px] bg-white flex items-center gap-3 text-left transition-all"
            aria-label="Google Pay"
          >
            <span className="w-5 h-5 rounded-full border-2 border-surface-muted shrink-0" />
            <span className="w-14 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.44-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4"/>
              </svg>
            </span>
            <span className="text-[15px] font-bold text-primary-navy flex-1">Google Pay</span>
            <span className="text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em] shrink-0">
              {t("checkoutOneTap")}
            </span>
          </button>
        )}
        {/* PayPal — not yet active. Visible so donors know it's planned,
            but tap shows a toast and selection isn't allowed. */}
        <button
          type="button"
          onClick={() =>
            toast.show({
              tone: "info",
              title: t("checkoutPaypalSoonTitle"),
              description: t("checkoutPaypalSoonDesc"),
            })
          }
          className="w-full h-16 px-4 border-2 border-surface-muted rounded-[14px] bg-white flex items-center gap-3 text-left opacity-70 hover:opacity-90 transition-opacity"
          aria-label={t("checkoutPaypal")}
        >
          <span className="w-5 h-5 rounded-full border-2 border-surface-muted shrink-0" />
          <span className="w-14 flex items-center justify-center shrink-0">
            <Image
              src="/assets/paypal-logo.svg"
              alt="PayPal"
              width={64}
              height={18}
              className="h-6 w-auto object-contain"
            />
          </span>
          <span className="text-[15px] font-bold text-primary-navy flex-1">{t("checkoutPaypal")}</span>
          <span className="text-[10px] font-bold text-text-gray uppercase tracking-[0.1em] px-2 py-1 rounded-full bg-bg-off-white border border-surface-muted shrink-0">
            {t("checkoutComingSoon")}
          </span>
        </button>

        {/* Revolut Pay */}
        <button
          type="button"
          onClick={handleRevolutPay}
          className="w-full h-16 px-4 border-2 border-surface-muted hover:border-primary-navy/40 rounded-[14px] bg-white flex items-center gap-3 transition-all text-left"
          aria-label="Revolut Pay"
        >
          <span className="w-5 h-5 rounded-full border-2 border-surface-muted shrink-0" />
          <span className="w-14 flex items-center justify-center shrink-0">
            <Image
              src="/assets/revolut-pay.svg"
              alt="Revolut Pay"
              width={56}
              height={20}
              className="h-6 w-auto object-contain"
            />
          </span>
          <span className="text-[15px] font-bold text-primary-navy">Revolut Pay</span>
        </button>

        {/* Card */}
        <label
          className={cn(
            "flex items-center gap-3 h-16 px-4 border-2 rounded-[14px] cursor-pointer transition-all",
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
          <span className="w-14 flex items-center justify-center shrink-0">
            <svg width="32" height="22" viewBox="0 0 32 22" fill="none" className="text-primary-navy">
              <rect x="1" y="1" width="30" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <rect x="1" y="5" width="30" height="3" fill="currentColor" />
              <rect x="4" y="14" width="7" height="2" rx="1" fill="currentColor" />
            </svg>
          </span>
          <span className="text-[15px] font-bold text-primary-navy">{t("checkoutCard")}</span>
        </label>
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
