import { loadStripe, Stripe } from "@stripe/stripe-js";

// Publishable keys are public by design (they ship in the client bundle), so a
// hardcoded fallback is safe and guarantees Stripe initialises even if the
// hosting env var is missing/empty — which is what was breaking Apple Pay /
// Google Pay / card in production.
const FALLBACK_PUBLISHABLE_KEY =
  "pk_test_51TSfTJCW6tjUla9ztjeYD1bztxPZjxfiToXmXmVsdXd06w9psAwxPeY83vMWGGgXWdgMXBBFl9z5krDsToRCsCda00r6JxGFzT";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  const key =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || FALLBACK_PUBLISHABLE_KEY;

  if (!key) {
    console.warn("Stripe publishable key is missing.");
    return Promise.resolve(null);
  }

  if (!stripePromise) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
};
