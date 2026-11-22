"use client";

import { useEffect, useRef, useState } from "react";
import { addRecentDonor } from "@/lib/recent-donors";
import type { CurrencyCode } from "@/lib/fx";

// Public client id (safe to expose). Set NEXT_PUBLIC_PAYPAL_CLIENT_ID in the
// environment to turn PayPal on; until then PAYPAL_ENABLED is false and the
// checkout keeps showing the "coming soon" tile.
const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
export const PAYPAL_ENABLED = CLIENT_ID.length > 0;

declare global {
  interface Window {
    // The PayPal JS SDK attaches itself here once loaded.
    paypal?: any;
  }
}

// The SDK is loaded once per currency. Donation currency can toggle EUR/GBP, so
// when it changes we drop the old script and reload with the new currency.
let loadedCurrency: string | null = null;
let loadPromise: Promise<void> | null = null;

function loadPayPalSdk(currency: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.paypal && loadedCurrency === currency) return Promise.resolve();
  if (loadedCurrency && loadedCurrency !== currency) {
    document.querySelectorAll("script[data-paypal-sdk]").forEach((s) => s.remove());
    delete window.paypal;
    loadPromise = null;
  }
  if (loadPromise) return loadPromise;
  loadPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    // enable-funding=card surfaces PayPal's guest "Debit or Credit Card"
    // button so donors without a PayPal account can still pay by card.
    script.src =
      `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(CLIENT_ID)}` +
      `&currency=${currency}&intent=capture&components=buttons&enable-funding=card`;
    script.async = true;
    script.dataset.paypalSdk = "true";
    script.onload = () => {
      loadedCurrency = currency;
      resolve();
    };
    script.onerror = () => reject(new Error("PayPal SDK failed to load"));
    document.body.appendChild(script);
  });
  return loadPromise;
}

interface Props {
  total: number;
  currency: CurrencyCode;
  donationAmount: number;
  isAnonymous: boolean;
  campaignId: string;
  onError: (message: string) => void;
}

export function PayPalCheckout({
  total,
  currency,
  donationAmount,
  isAnonymous,
  campaignId,
  onError,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  // Latest values read at click time, so changing the amount doesn't require
  // re-rendering the (relatively heavy) PayPal buttons.
  const stateRef = useRef({ total, donationAmount, isAnonymous, campaignId, currency });
  stateRef.current = { total, donationAmount, isAnonymous, campaignId, currency };

  useEffect(() => {
    if (!PAYPAL_ENABLED) {
      setStatus("error");
      return;
    }
    let cancelled = false;
    let buttons: any;
    setStatus("loading");

    loadPayPalSdk(currency)
      .then(() => {
        if (cancelled || !window.paypal || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        buttons = window.paypal.Buttons({
          style: { layout: "vertical", color: "gold", shape: "pill", label: "paypal", height: 48 },
          createOrder: (_data: unknown, actions: any) => {
            const s = stateRef.current;
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      value: Math.max(0.01, s.total).toFixed(2),
                      currency_code: s.currency,
                    },
                    description: "Donation — Help a Family in Lithuania",
                  },
                ],
              })
              .catch((err: any) => {
                // Surface the real reason (e.g. account not enabled for live
                // payments) instead of a generic failure.
                console.error("PayPal createOrder failed:", err);
                onError(`PayPal: ${err?.message || err}`);
                throw err;
              });
          },
          onApprove: async (_data: unknown, actions: any) => {
            await actions.order.capture();
            const s = stateRef.current;
            addRecentDonor({
              amount: s.donationAmount,
              currency: s.currency,
              isAnonymous: s.isAnonymous,
              campaignId: s.campaignId,
            });
            window.location.href = `/checkout/success?campaign=${s.campaignId}`;
          },
          onError: (err: any) => {
            console.error("PayPal error:", err);
            onError(`PayPal: ${err?.message || String(err)}`);
          },
        });
        buttons
          .render(containerRef.current)
          .then(() => {
            if (!cancelled) setStatus("ready");
          })
          .catch(() => {
            if (!cancelled) setStatus("error");
          });
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
      try {
        buttons?.close?.();
      } catch {
        /* ignore */
      }
    };
    // Amount changes are handled via stateRef; only currency forces a reload.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  if (!PAYPAL_ENABLED || status === "error") return null;

  return (
    <div className="pt-2">
      <div ref={containerRef} />
      {status === "loading" && (
        <div className="h-12 rounded-[100px] bg-bg-off-white animate-pulse" />
      )}
    </div>
  );
}
