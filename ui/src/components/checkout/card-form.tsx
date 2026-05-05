"use client";

import { PaymentElement } from "@stripe/react-stripe-js";

export function CardForm() {
  return (
    <div className="space-y-3 pt-5 animate-slideDown">
      <PaymentElement 
        options={{ 
          layout: "tabs",
          defaultValues: {
            billingDetails: {
              name: "",
            }
          }
        }} 
      />
    </div>
  );
}
