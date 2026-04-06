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
      return { ...state, selectedAmount: action.payload, customAmount: `${action.payload}.00` };
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

  const donationAmount = state.selectedAmount ?? (parseFloat(state.customAmount) || 0);
  const tipAmount = state.frequency === "once" ? donationAmount * (state.tipPercent / 100) : 0;
  const total = donationAmount + tipAmount;

  return (
    <div className="bg-white rounded-md shadow-md p-6 md:p-8 space-y-6">
      {/* Campaign header */}
      <div className="flex items-center gap-4">
        <ProgressCircle percent={75} size={64} strokeWidth={3} />
        <div>
          <h1 className="text-base font-bold text-primary-navy leading-snug">
            Help a Family in Lithuania Stay Warm This Winter
          </h1>
          <p className="text-sm text-text-gray mt-1">
            Still &pound;4,335 to go. Help us build momentum.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <DonationTabs
        frequency={state.frequency}
        onChange={(f) => dispatch({ type: "SET_FREQUENCY", payload: f })}
      />

      {/* Amount grid */}
      <AmountGrid
        amounts={presetAmounts}
        selected={state.selectedAmount}
        customAmount={state.customAmount}
        onSelect={(a) => dispatch({ type: "SET_AMOUNT", payload: a })}
        onCustomChange={(v) => dispatch({ type: "SET_CUSTOM_AMOUNT", payload: v })}
      />

      {/* Tip section (hidden for monthly) */}
      {state.frequency === "once" && (
        <TipSection
          percent={state.tipPercent}
          onChange={(v) => dispatch({ type: "SET_TIP", payload: v })}
        />
      )}

      {/* Payment methods */}
      <PaymentMethods
        selected={state.paymentMethod}
        onChange={(m) => dispatch({ type: "SET_PAYMENT", payload: m })}
      />

      {/* Privacy */}
      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={state.isAnonymous}
            onChange={() => dispatch({ type: "TOGGLE_ANONYMOUS" })}
            className="w-5 h-5 rounded border-gray-300 text-primary-yellow focus:ring-primary-yellow"
          />
          <span className="text-sm text-text-dark">
            Don&rsquo;t display my name publicly on the fundraiser.
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer min-h-[44px]">
          <input
            type="checkbox"
            checked={state.wantsUpdates}
            onChange={() => dispatch({ type: "TOGGLE_UPDATES" })}
            className="w-5 h-5 rounded border-gray-300 text-primary-yellow focus:ring-primary-yellow"
          />
          <span className="text-sm text-text-dark">
            Get occasional marketing updates from Benefactor.
          </span>
        </label>
      </div>

      {/* Summary */}
      <DonationSummary
        donation={donationAmount}
        tip={tipAmount}
        total={total}
      />

      {/* Donate button */}
      <button className="w-full h-14 rounded-btn font-bold bg-primary-yellow text-primary-navy hover:brightness-110 transition-all flex items-center justify-center gap-2">
        {state.paymentMethod === "paypal" && (
          <Image src="/assets/paypal-logo.svg" alt="PayPal" width={80} height={20} />
        )}
        {state.paymentMethod === "gpay" && (
          <Image src="/assets/google-pay-mark.svg" alt="Google Pay" width={60} height={20} />
        )}
        {state.paymentMethod === "card" && "Donate now"}
      </button>

      {/* Terms */}
      <p className="text-xs text-text-gray text-center">
        By continuing, you agree to Benefactor&rsquo;s{" "}
        <a href="#" className="underline">Terms of Service</a> and{" "}
        <a href="#" className="underline">Privacy Notice</a>.
      </p>

      {/* Protection notice */}
      <div className="flex items-start gap-3 p-4 bg-bg-off-white rounded-sm">
        <Image src="/assets/shield-icon.svg" alt="Security guarantee" width={24} height={24} className="flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-primary-navy">
            Benefactor protects your donation
          </h4>
          <p className="text-xs text-text-gray mt-1">
            We guarantee you a full refund for up to a year in the rare case that
            fraud occurs.{" "}
            <a href="#" className="underline">Learn more</a>
          </p>
        </div>
      </div>
    </div>
  );
}
