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
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);

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

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#002538',
        fontFamily: 'Inter, system-ui, sans-serif',
        '::placeholder': {
          color: '#999',
        },
      },
      invalid: {
        color: '#ef4444',
      },
    },
    hidePostalCode: true, // We'll handle postal code separately if needed
  };

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
    <div className="space-y-4 pt-5 animate-slideDown">
      <div className="space-y-1">
        <label className="text-[13px] font-bold text-primary-navy ml-1">Card details</label>
        <div className="w-full py-4 px-4 border-2 border-[#e0e0e0] rounded-xl bg-[#f8f9fa] focus-within:border-primary-navy focus-within:bg-white transition-all duration-200">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[13px] font-bold text-primary-navy ml-1">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full py-3 px-4 border-2 border-[#e0e0e0] rounded-xl text-[15px] text-text-dark bg-[#f8f9fa] outline-none focus:border-primary-navy focus:bg-white"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[13px] font-bold text-primary-navy ml-1">Postal code</label>
          <input
            type="text"
            placeholder="E1 6AN"
            className="w-full py-3 px-4 border-2 border-[#e0e0e0] rounded-xl text-[15px] text-text-dark bg-[#f8f9fa] outline-none focus:border-primary-navy focus:bg-white"
          />
        </div>
      </div>
    </div>
  );
}

