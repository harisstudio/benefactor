"use client";

import { useReducer, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeWrapper } from "./stripe-wrapper";
import Image from "next/image";
import { IconShieldCheck } from "@tabler/icons-react";
import { DonationTabs } from "./donation-tabs";
import { AmountGrid } from "./amount-grid";
import { TipSection } from "./tip-section";
import { PaymentMethods, type PaymentMethod } from "./payment-methods";
import { DonationSummary } from "./donation-summary";
import { CircularProgress } from "@/components/ui/progress-bar";
import { createPaymentIntent } from "@/lib/api";
import { useLanguage } from "@/context/LanguageContext";
import { type CurrencyCode } from "@/lib/fx";

interface CheckoutState {
  frequency: "once" | "monthly";
  selectedAmount: number | null;
  customAmount: string;
  tipPercent: number;
  paymentMethod: PaymentMethod;
  currency: CurrencyCode;
  isAnonymous: boolean;
  wantsUpdates: boolean;
}

type CheckoutAction =
  | { type: "SET_FREQUENCY"; payload: "once" | "monthly" }
  | { type: "SET_AMOUNT"; payload: number }
  | { type: "SET_CUSTOM_AMOUNT"; payload: string }
  | { type: "SET_TIP"; payload: number }
  | { type: "SET_PAYMENT"; payload: PaymentMethod }
  | { type: "SET_CURRENCY"; payload: CurrencyCode }
  | { type: "TOGGLE_ANONYMOUS" }
  | { type: "TOGGLE_UPDATES" };

function reducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case "SET_FREQUENCY":
      return { ...state, frequency: action.payload };
    case "SET_AMOUNT":
      return {
        ...state,
        selectedAmount: action.payload,
        customAmount: `${action.payload}.00`,
      };
    case "SET_CUSTOM_AMOUNT":
      return { ...state, selectedAmount: null, customAmount: action.payload };
    case "SET_TIP":
      return { ...state, tipPercent: action.payload };
    case "SET_PAYMENT":
      return { ...state, paymentMethod: action.payload };
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
    case "TOGGLE_ANONYMOUS":
      return { ...state, isAnonymous: !state.isAnonymous };
    case "TOGGLE_UPDATES":
      return { ...state, wantsUpdates: !state.wantsUpdates };
  }
}

const initialState: CheckoutState = {
  frequency: "once",
  selectedAmount: null,
  customAmount: ".00",
  tipPercent: 17.5,
  paymentMethod: "paypal",
  currency: "EUR",
  isAnonymous: false,
  wantsUpdates: false,
};

const presetAmounts = [25, 50, 100, 150, 200, 500];

export function CheckoutCard() {
  const { language } = useLanguage();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    currency: language === "lt" ? "EUR" : "GBP",
  });

  const donationAmount =
    state.selectedAmount ?? (parseFloat(state.customAmount) || 0);
  const tipAmount = donationAmount * (state.tipPercent / 100);
  const total = donationAmount + tipAmount;

  return (
    <StripeWrapper amount={total} currency={state.currency}>
      <CheckoutInner
        state={state}
        dispatch={dispatch}
        donationAmount={donationAmount}
        tipAmount={tipAmount}
        total={total}
      />
    </StripeWrapper>
  );
}

function CheckoutInner({ state, dispatch, donationAmount, tipAmount, total }: {
  state: CheckoutState, dispatch: React.Dispatch<CheckoutAction>, donationAmount: number, tipAmount: number, total: number
}) {
  const { t } = useLanguage();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonate = async () => {
    // PayPal goes through its own SDK; everything else (card, applepay, gpay)
    // is handled by the Stripe PaymentElement which auto-surfaces the right wallet.
    if (state.paymentMethod === "paypal" || !stripe || !elements) return;
    
    setIsProcessing(true);
    try {
      const { clientSecret } = await createPaymentIntent(total, state.currency);
      if (!clientSecret) throw new Error("Failed to get client secret");

      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      if (error) alert(error.message);
    } catch (err: any) {
      alert(err.message || t("checkoutPaymentFailed"));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-surface-muted space-y-7">
      {/* Campaign header */}
      <div className="pb-6 border-b border-surface-muted flex items-start gap-5">
        <CircularProgress percent={53} size={72} strokeWidth={7} className="shrink-0 text-primary-navy" />
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray mb-2">
            {t("checkoutYouAreDonatingTo")}
          </p>
          <h1 className="font-heading text-[clamp(20px,2vw,24px)] font-extrabold text-primary-navy leading-tight tracking-[-0.01em] mb-3">
            {t("checkoutCampaignTitle")}
          </h1>
          <div className="flex items-center gap-2 text-[13px]">
            <span className="text-text-gray">{t("checkoutToGo", { amount: "€12,238" })}</span>
          </div>
        </div>
      </div>

      {/* ──── Donation Tabs ──── */}
      <DonationTabs
        frequency={state.frequency}
        onChange={(f) => dispatch({ type: "SET_FREQUENCY", payload: f })}
      />

      {/* ──── Currency toggle ──── */}
      <div>
        <label className="block text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em] mb-2">
          {t("checkoutCurrency")}
        </label>
        <div className="inline-flex bg-bg-off-white border border-surface-muted rounded-[100px] p-1">
          {(["EUR", "GBP"] as CurrencyCode[]).map((c) => {
            const active = state.currency === c;
            return (
              <button
                key={c}
                type="button"
                onClick={() => dispatch({ type: "SET_CURRENCY", payload: c })}
                className={
                  "h-9 px-5 rounded-[100px] text-[13px] font-bold transition-all " +
                  (active
                    ? "bg-primary-navy text-white shadow-sm"
                    : "text-primary-navy hover:bg-white/60")
                }
              >
                {c === "EUR" ? "€ EUR" : "£ GBP"}
              </button>
            );
          })}
        </div>
        <p className="text-[12px] text-text-gray mt-2">{t("checkoutCurrencyNote")}</p>
      </div>

      {/* ──── Amount Grid ──── */}
      <AmountGrid
        amounts={presetAmounts}
        selected={state.selectedAmount}
        customAmount={state.customAmount}
        currency={state.currency}
        onSelect={(a) => dispatch({ type: "SET_AMOUNT", payload: a })}
        onCustomChange={(v) =>
          dispatch({ type: "SET_CUSTOM_AMOUNT", payload: v })
        }
      />

      {/* ──── Tip Section ──── */}
      <TipSection
        percent={state.tipPercent}
        onChange={(v) => dispatch({ type: "SET_TIP", payload: v })}
      />

      {/* ──── Payment Methods ──── */}
      <PaymentMethods
        selected={state.paymentMethod}
        onChange={(m) => dispatch({ type: "SET_PAYMENT", payload: m })}
      />

      {/* Privacy checkboxes */}
      <div className="space-y-1 pt-5 border-t border-surface-muted">
        <label className="flex items-start gap-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            checked={state.isAnonymous}
            onChange={() => dispatch({ type: "TOGGLE_ANONYMOUS" })}
            className="w-5 h-5 accent-primary-navy rounded mt-0.5 shrink-0"
          />
          <span className="text-[14px] text-text-dark leading-relaxed">
            {t("checkoutAnonOption")}
          </span>
        </label>
        <label className="flex items-start gap-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            checked={state.wantsUpdates}
            onChange={() => dispatch({ type: "TOGGLE_UPDATES" })}
            className="w-5 h-5 accent-primary-navy rounded mt-0.5 shrink-0"
          />
          <span className="text-[14px] text-text-dark leading-relaxed">
            {t("checkoutUpdatesOption")}
          </span>
        </label>
      </div>

      {/* ──── Summary ──── */}
      <DonationSummary donation={donationAmount} tip={tipAmount} total={total} currency={state.currency} />

      {/* ──── Donate Button ──── */}
      <button
        onClick={handleDonate}
        disabled={isProcessing}
        className="w-full h-14 rounded-[100px] font-bold text-[16px] cursor-pointer transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-lg active:scale-[0.98] bg-primary-yellow text-primary-navy hover:bg-primary-yellow-hover disabled:opacity-70 disabled:shadow-none"
      >
        {isProcessing ? (
          <div className="w-5 h-5 border-2 border-primary-navy border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {state.paymentMethod === "paypal" && (
              <Image
                src="/assets/paypal-logo.svg"
                alt="PayPal"
                width={80}
                height={22}
                className="h-[22px] w-auto"
              />
            )}
            {state.paymentMethod === "applepay" && (
              <Image
                src="/assets/apple-pay.png"
                alt="Apple Pay"
                width={64}
                height={26}
                className="h-[26px] w-auto"
              />
            )}
            {state.paymentMethod === "gpay" && (
              <Image
                src="/assets/google-pay-mark.svg"
                alt="Google Pay"
                width={64}
                height={26}
                className="h-[26px] w-auto"
              />
            )}
            {state.paymentMethod === "card" && t("checkoutDonateNow")}
          </>
        )}
      </button>

      {/* Terms */}
      <p className="text-[12px] text-text-gray text-center leading-relaxed">
        {t("checkoutAgreeTerms")}{" "}
        <a href="#" className="text-primary-navy font-semibold underline hover:no-underline">
          {t("checkoutTermsLink")}
        </a>{" "}
        {t("checkoutAnd")}{" "}
        <a href="#" className="text-primary-navy font-semibold underline hover:no-underline">
          {t("checkoutPrivacyLink")}
        </a>
        .
      </p>

      {/* Protection notice */}
      <div className="flex items-start gap-3 p-5 bg-bg-off-white rounded-2xl border border-surface-muted">
        <IconShieldCheck size={24} stroke={1.6} className="text-primary-navy shrink-0 mt-0.5" />
        <div>
          <h4 className="font-heading text-[14px] font-extrabold text-primary-navy mb-1">
            {t("checkoutProtectionTitle")}
          </h4>
          <p className="text-[13px] text-text-gray leading-relaxed">
            {t("checkoutProtectionDesc")}{" "}
            <a href="#" className="text-primary-navy font-semibold underline hover:no-underline">
              {t("checkoutLearnMore")}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
