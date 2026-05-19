/**
 * Currency helpers.
 *
 * The platform's canonical currency is EUR — that's what the original
 * Lithuanian campaign collected. After expanding to the UK we still keep
 * raised totals in their *native* currency (so the books match what
 * actually hit the bank), but UI in English additionally renders an
 * approximate GBP figure beside it so UK visitors can read the scale at
 * a glance.
 *
 * Replace `EUR_TO_GBP` with a live rate (ECB, Stripe FX, etc.) when ready.
 * The static value is intentional — it must NOT silently drift, because
 * users see the same total every day.
 */

export type CurrencyCode = "EUR" | "GBP";

export const CURRENCY_SYMBOL: Record<CurrencyCode, string> = {
  EUR: "€",
  GBP: "£",
};

/** Static reference rate. Updated manually; safe & predictable. */
export const EUR_TO_GBP = 0.857;
export const GBP_TO_EUR = 1 / EUR_TO_GBP;

export function convert(amount: number, from: CurrencyCode, to: CurrencyCode): number {
  if (from === to) return amount;
  if (from === "EUR" && to === "GBP") return amount * EUR_TO_GBP;
  if (from === "GBP" && to === "EUR") return amount * GBP_TO_EUR;
  return amount;
}

/** Normalise legacy `currency` strings ("€", "EUR") to a `CurrencyCode`. */
export function normaliseCurrency(input: string | undefined | null): CurrencyCode {
  if (!input) return "EUR";
  const v = input.trim().toLowerCase();
  if (v === "£" || v === "gbp") return "GBP";
  return "EUR";
}

export function formatMoney(amount: number, currency: CurrencyCode): string {
  const symbol = CURRENCY_SYMBOL[currency];
  const rounded = Math.round(amount);
  return `${symbol}${rounded.toLocaleString("en-US")}`;
}
