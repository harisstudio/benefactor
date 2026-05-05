"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe";
import { CheckoutCard } from "./checkout-card";

export function StripeCheckoutWrapper() {
  const [stripePromise, setStripePromise] = useState<any>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (key) {
      getStripe().then(setStripePromise);
    }
  }, []);

  // We wrap it anyway, but if stripePromise is null, Stripe components will just not render 
  // or we can handle it inside CardForm to show classic fields.
  return (
    <Elements 
      stripe={stripePromise} 
      options={{
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#0E3347',
          },
        },
      }}
    >
      <CheckoutCard />
    </Elements>
  );
}
