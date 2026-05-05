"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";

export function StripeWrapper({ 
  children, 
  amount 
}: { 
  children: React.ReactNode, 
  amount: number 
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
        amount: Math.max(100, Math.round(amount * 100)), // Minimum amount is $1.00 usually, represented in cents
        currency: 'usd',
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#0E3347',
            colorBackground: '#f8f9fa',
            colorText: '#002538',
            colorDanger: '#df1b41',
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
