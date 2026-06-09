"use client";

import { useEffect, useReducer, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { authClient } from "@/lib/auth-client";
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
import { addRecentDonor } from "@/lib/recent-donors";
import { useToast } from "@/components/ui/toast";
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
  email: string;
}

type CheckoutAction =
  | { type: "SET_FREQUENCY"; payload: "once" | "monthly" }
  | { type: "SET_AMOUNT"; payload: number }
  | { type: "SET_CUSTOM_AMOUNT"; payload: string }
  | { type: "SET_TIP"; payload: number }
  | { type: "SET_PAYMENT"; payload: PaymentMethod }
  | { type: "SET_CURRENCY"; payload: CurrencyCode }
  | { type: "TOGGLE_ANONYMOUS" }
  | { type: "TOGGLE_UPDATES" }
  | { type: "SET_EMAIL"; payload: string };

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
    case "SET_EMAIL":
      return { ...state, email: action.payload };
  }
}

const initialState: CheckoutState = {
  // Default to monthly so the recurring choice is highlighted the moment
  // the donor lands on the checkout — we want recurring giving to feel
  // like the primary path.
  frequency: "monthly",
  selectedAmount: null,
  customAmount: ".00",
  tipPercent: 17.5,
  paymentMethod: "card",
  currency: "EUR",
  // Default to anonymous so donors don't accidentally publish their wallet
  // name. They can opt in via the "Show my name publicly" checkbox below.
  isAnonymous: true,
  wantsUpdates: false,
  email: "",
};

// Lower-friction preset ladder so first-time donors aren't faced with
// large amounts; "Other" handles the long tail.
const presetAmounts = [3, 5, 10, 25, 50];

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
  const toast = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  // Pre-fill email from signed-in session so logged-in donors don't have
  // to re-type. Anonymous donors fill it manually (browser autofill kicks
  // in via autocomplete="email").
  useEffect(() => {
    if (state.email) return;
    authClient.getSession().then((res: any) => {
      const sessionEmail = res?.data?.user?.email;
      if (sessionEmail) dispatch({ type: "SET_EMAIL", payload: sessionEmail });
    }).catch(() => {});
  }, []);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);

  const handleDonate = async () => {
    // PayPal goes through its own SDK; everything else (card, applepay, gpay)
    // is handled by the Stripe PaymentElement which auto-surfaces the right wallet.
    if (state.paymentMethod === "paypal" || !stripe || !elements) return;

    if (!isEmailValid) {
      toast.show({ tone: "error", title: t("checkoutEmailRequired"), description: t("checkoutEmailRequiredDesc") });
      return;
    }

    setIsProcessing(true);
    try {
      const { clientSecret } = await createPaymentIntent(total, state.currency, {
        showName: !state.isAnonymous,
        email: state.email,
      });
      if (!clientSecret) throw new Error("Failed to get client secret");

      const { error: submitError } = await elements.submit();
      if (submitError) throw submitError;

      // Optimistically log this donor in the local recent-donors feed so
      // the campaign sidebar updates the moment we hand off to Stripe. If
      // the payment ultimately fails we still leave it — Stripe will only
      // confirm successful charges, and the backend webhook will be the
      // source of truth once that wiring lands.
      addRecentDonor({
        amount: donationAmount,
        currency: state.currency,
        isAnonymous: state.isAnonymous,
      });

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
          payment_method_data: {
            billing_details: { email: state.email },
          },
        },
      });

      if (error) toast.show({ tone: "error", title: t("checkoutPaymentFailed"), description: error.message });
    } catch (err: any) {
      toast.show({ tone: "error", title: t("checkoutPaymentFailed"), description: err?.message });
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

      {/* ──── Email ──── */}
      <div>
        <label className="block text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em] mb-2">
          {t("checkoutEmail")}
        </label>
        <input
          type="email"
          required
          autoComplete="email"
          name="email"
          value={state.email}
          onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
          placeholder={t("checkoutEmailPlaceholder")}
          className="w-full h-14 px-5 border border-surface-muted rounded-[14px] text-[15px] text-text-dark placeholder:text-text-gray/70 focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all bg-white"
        />
        <p className="text-[12px] text-text-gray mt-2">{t("checkoutEmailNote")}</p>
      </div>

      {/* ──── Payment Methods ──── */}
      <PaymentMethods
        selected={state.paymentMethod}
        onChange={(m) => dispatch({ type: "SET_PAYMENT", payload: m })}
        total={total}
        currency={state.currency}
        donationAmount={donationAmount}
        isAnonymous={state.isAnonymous}
      />

      {/* Privacy checkboxes */}
      <div className="space-y-1 pt-5 border-t border-surface-muted">
        <label className="flex items-start gap-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            checked={!state.isAnonymous}
            onChange={() => dispatch({ type: "TOGGLE_ANONYMOUS" })}
            className="w-5 h-5 accent-primary-navy rounded mt-0.5 shrink-0"
          />
          <span className="text-[14px] text-text-dark leading-relaxed">
            {t("checkoutShowName")}
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
            {(state.paymentMethod === "card" || state.paymentMethod === "wallet") && t("checkoutDonateNow")}
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
