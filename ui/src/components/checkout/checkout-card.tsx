"use client";

import { useReducer } from "react";
import Image from "next/image";
import { ProgressCircle } from "@/components/ui/progress-circle";
import { DonationTabs } from "./donation-tabs";
import { AmountGrid } from "./amount-grid";
import { TipSection } from "./tip-section";
import { PaymentMethods } from "./payment-methods";
import { DonationSummary } from "./donation-summary";

type PaymentMethod = "paypal" | "gpay" | "card";

interface CheckoutState {
  frequency: "once" | "monthly";
  selectedAmount: number | null;
  customAmount: string;
  tipPercent: number;
  paymentMethod: PaymentMethod;
  isAnonymous: boolean;
  wantsUpdates: boolean;
}

type CheckoutAction =
  | { type: "SET_FREQUENCY"; payload: "once" | "monthly" }
  | { type: "SET_AMOUNT"; payload: number }
  | { type: "SET_CUSTOM_AMOUNT"; payload: string }
  | { type: "SET_TIP"; payload: number }
  | { type: "SET_PAYMENT"; payload: PaymentMethod }
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
  isAnonymous: false,
  wantsUpdates: false,
};

const presetAmounts = [25, 50, 100, 150, 200, 500];

export function CheckoutCard() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const donationAmount =
    state.selectedAmount ?? (parseFloat(state.customAmount) || 0);
  const tipAmount = donationAmount * (state.tipPercent / 100);
  const total = donationAmount + tipAmount;

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.06)] space-y-6">
      {/* ──── Campaign Header ──── */}
      <div className="flex items-center gap-4">
        <ProgressCircle percent={75} size={70} strokeWidth={3} />
        <div>
          <h1 className="text-lg font-bold text-primary-navy leading-snug">
            Help a Family in Lithuania Stay Warm This Winter
          </h1>
          <p className="text-sm text-text-gray font-medium mt-1">
            Still £4,335 to go. Help us build momentum.
          </p>
        </div>
      </div>

      {/* ──── Donation Tabs ──── */}
      <DonationTabs
        frequency={state.frequency}
        onChange={(f) => dispatch({ type: "SET_FREQUENCY", payload: f })}
      />

      {/* ──── Amount Grid ──── */}
      <AmountGrid
        amounts={presetAmounts}
        selected={state.selectedAmount}
        customAmount={state.customAmount}
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

      {/* ──── Privacy Checkboxes ──── */}
      <div className="space-y-0 pt-5 border-t border-[#e0e0e0]">
        <label className="flex items-center gap-2.5 py-2 cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={state.isAnonymous}
            onChange={() => dispatch({ type: "TOGGLE_ANONYMOUS" })}
            className="w-5 h-5 accent-primary-navy rounded-sm flex-shrink-0"
          />
          <span className="text-sm text-text-dark font-medium">
            Don&rsquo;t display my name publicly on the fundraiser.
          </span>
        </label>
        <label className="flex items-center gap-2.5 py-2 cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={state.wantsUpdates}
            onChange={() => dispatch({ type: "TOGGLE_UPDATES" })}
            className="w-5 h-5 accent-primary-navy rounded-sm flex-shrink-0"
          />
          <span className="text-sm text-text-dark font-medium">
            Get occasional marketing updates from Benefactor.
          </span>
        </label>
      </div>

      {/* ──── Summary ──── */}
      <DonationSummary donation={donationAmount} tip={tipAmount} total={total} />

      {/* ──── Donate Button ──── */}
      <button
        className={`w-full h-14 rounded-[30px] font-bold text-base cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 hover:opacity-90 hover:-translate-y-0.5 ${
          state.paymentMethod === "gpay"
            ? "bg-black text-white"
            : "bg-primary-yellow text-primary-navy"
        }`}
      >
        {state.paymentMethod === "paypal" && (
          <Image
            src="/assets/paypal-logo.svg"
            alt="PayPal"
            width={80}
            height={22}
            className="h-[22px] w-auto"
          />
        )}
        {state.paymentMethod === "gpay" && (
          <Image
            src="/assets/google-pay-mark.svg"
            alt="Google Pay"
            width={60}
            height={36}
            className="h-9 w-auto"
          />
        )}
        {state.paymentMethod === "card" && "Donate now"}
      </button>

      {/* ──── Terms ──── */}
      <p className="text-[13px] text-text-gray text-center leading-relaxed font-medium">
        By continuing, you agree to Benefactor&rsquo;s{" "}
        <a href="#" className="text-primary-navy underline hover:no-underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-primary-navy underline hover:no-underline">
          Privacy Notice
        </a>
        .
      </p>

      {/* ──── Protection Notice ──── */}
      <div className="flex items-start gap-3 p-4 bg-bg-off-white rounded-xl">
        <Image
          src="/assets/shield-icon.svg"
          alt="Security guarantee"
          width={28}
          height={28}
          className="flex-shrink-0 mt-0.5"
        />
        <div>
          <h4 className="text-sm font-bold text-primary-navy mb-1">
            Benefactor protects your donation
          </h4>
          <p className="text-[13px] text-text-gray font-medium leading-relaxed">
            We guarantee you a full refund for up to a year in the rare case
            that fraud occurs.{" "}
            <a
              href="#"
              className="text-primary-navy underline hover:no-underline"
            >
              Learn more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
