"use client";

import { useLanguage } from "@/context/LanguageContext";
import {
  type CurrencyCode,
  convert,
  formatMoney,
  normaliseCurrency,
} from "@/lib/fx";

interface AmountProps {
  /** The raw amount in its native currency. */
  amount: number;
  /** Native currency of the amount. Accepts "EUR" / "GBP" / "€" / "£". */
  currency?: string | CurrencyCode;
  /**
   * If true, in English mode the converted figure (≈ £X) is shown beside
   * the primary one. Use on big headline numbers (raised, goal); skip on
   * inline lists where it would be too noisy.
   */
  showSecondary?: boolean;
  /** Tailwind classes for the secondary "(≈ £X)" label. */
  secondaryClassName?: string;
  className?: string;
}

/**
 * Render a money figure.
 *
 *   <Amount amount={13762} currency="EUR" showSecondary />
 *     → LT: "€13,762"
 *     → EN: "€13,762  ≈ £11,794"
 */
export function Amount({
  amount,
  currency,
  showSecondary = false,
  secondaryClassName = "ml-2 text-[0.78em] font-medium text-text-gray",
  className,
}: AmountProps) {
  const { language } = useLanguage();
  const native = normaliseCurrency(currency);

  // Only add the GBP twin in English mode, and only when the native
  // currency is EUR (UK visitors looking at EU totals).
  const showTwin = showSecondary && language === "en" && native === "EUR";
  const twin = showTwin ? convert(amount, "EUR", "GBP") : null;

  return (
    <span className={className}>
      <span>{formatMoney(amount, native)}</span>
      {twin !== null && (
        <span className={secondaryClassName}>≈ {formatMoney(twin, "GBP")}</span>
      )}
    </span>
  );
}
