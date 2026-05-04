"use client";

import { useStripe, useElements, CardElement, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import type { PaymentRequest } from "@stripe/stripe-js";

interface CardFormProps {
  method?: "card" | "applepay" | "gpay";
}

export function CardForm({ method = "card" }: CardFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

  const inputClasses =
    "w-full py-4 px-4 border-2 border-[#e0e0e0] rounded-xl text-[15px] text-text-dark bg-[#f8f9fa] transition-colors duration-200 outline-none focus:border-primary-navy focus:bg-white placeholder:text-[#999]";

  useEffect(() => {
    if (stripe && (method === "applepay" || method === "gpay")) {
      const pr = stripe.paymentRequest({
        country: 'GB',
        currency: 'gbp',
        total: {
          label: 'Donation',
          amount: 2500,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe, method]);

  if (method === "applepay" || method === "gpay") {
    return (
      <div className="space-y-4 pt-5 animate-slideDown">
        <div className="p-4 border-2 border-[#e0e0e0] rounded-xl bg-[#f8f9fa] flex flex-col items-center justify-center min-h-[100px]">
          {paymentRequest ? (
            <PaymentRequestButtonElement options={{ paymentRequest }} className="w-full" />
          ) : (
            <p className="text-sm text-text-gray text-center">
              {method === "applepay" ? "Apple Pay" : "Google Pay"} is not available on this device/browser.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 pt-5 animate-slideDown">
      {/* Email */}
      <input
        type="email"
        placeholder="Email address"
        className={inputClasses}
      />

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="First name"
          className={inputClasses}
        />
        <input
          type="text"
          placeholder="Last name"
          className={inputClasses}
        />
      </div>

      {/* Use as billing name */}
      <label className="flex items-center gap-2.5 py-2 cursor-pointer min-h-[44px]">
        <input
          type="checkbox"
          className="w-5 h-5 accent-primary-navy rounded-sm"
        />
        <span className="text-sm text-text-dark font-medium">
          Use as billing name
        </span>
      </label>

      {/* Card number */}
      <input
        type="text"
        placeholder="Card number"
        className={inputClasses}
      />

      {/* Expiry + CVV */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="MM/YY"
          className={inputClasses}
        />
        <input
          type="text"
          placeholder="CVV"
          className={inputClasses}
        />
      </div>

      {/* Name on card */}
      <input
        type="text"
        placeholder="Name on card"
        disabled
        className="w-full py-4 px-4 border-2 border-[#e0e0e0] rounded-xl text-[15px] text-text-gray bg-[#f0f0f0] outline-none"
      />

      {/* Country + Postal code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <span className="block text-[11px] text-text-gray mb-1">Country</span>
          <select className="w-full py-3 px-4 border-2 border-[#e0e0e0] rounded-xl text-[15px] text-text-dark bg-[#f8f9fa] cursor-pointer outline-none focus:border-primary-navy">
            <option>United Kingdom</option>
            <option>United States</option>
            <option>Germany</option>
            <option>France</option>
            <option>Turkey</option>
          </select>
        </div>
        <div>
          <span className="block text-[11px] text-text-gray mb-1 invisible">.</span>
          <input
            type="text"
            placeholder="Postal code"
            className="w-full py-3 px-4 border-2 border-[#e0e0e0] rounded-xl text-[15px] text-text-dark bg-[#f8f9fa] outline-none focus:border-primary-navy focus:bg-white placeholder:text-[#999]"
          />
        </div>
      </div>

      {/* Save card */}
      <label className="flex items-center gap-2.5 py-2 cursor-pointer min-h-[44px]">
        <input
          type="checkbox"
          className="w-5 h-5 accent-primary-navy rounded-sm"
        />
        <span className="text-sm text-text-dark font-medium">
          Save card for future donations
        </span>
      </label>
    </div>
  );
}
