"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";

export function StripeWrapper({
  children,
  amount,
  currency = "EUR",
}: {
  children: React.ReactNode;
  amount: number;
  currency?: "EUR" | "GBP";
}) {
  const [stripePromise, setStripePromise] = useState<any>(null);

  useEffect(() => {
    getStripe().then(setStripePromise);
  }, []);

  return (
    <Elements 
      stripe={stripePromise} 
      options={{ 
        mode: 'payment',
        amount: Math.max(100, Math.round(amount * 100)), // smallest unit (cents/pence)
        currency: currency.toLowerCase(),
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#0E3347',
            colorBackground: '#F7F9FB',
            colorText: '#002538',
            colorDanger: '#b42318',
            fontFamily: 'system-ui, sans-serif',
            borderRadius: '12px',
          }
        }
      }}
    >
      {children}
    </Elements>
  );
}
