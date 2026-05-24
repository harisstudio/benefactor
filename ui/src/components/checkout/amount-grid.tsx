"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { CURRENCY_SYMBOL, type CurrencyCode } from "@/lib/fx";

interface AmountGridProps {
  amounts: number[];
  selected: number | null;
  customAmount: string;
  onSelect: (amount: number) => void;
  onCustomChange: (value: string) => void;
  currency?: CurrencyCode;
}

export function AmountGrid({
  amounts,
  selected,
  customAmount,
  onSelect,
  onCustomChange,
  currency = "EUR",
}: AmountGridProps) {
  const symbol = CURRENCY_SYMBOL[currency];
  const { t } = useLanguage();
  return (
    <div className="space-y-4">
      <label className="block text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em]">
        {t("checkoutChooseAmount")}
      </label>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
        {amounts.map((amount) => {
          const isSelected = selected === amount;
          const isSuggested = amount === 100;
          return (
            <button
              key={amount}
              type="button"
              onClick={() => onSelect(amount)}
              className={cn(
                "relative h-16 rounded-[14px] border font-heading text-[18px] md:text-[20px] font-extrabold tracking-[-0.01em] transition-all min-h-[44px]",
                isSelected
                  ? "border-primary-navy bg-primary-navy text-white shadow-md"
                  : "border-surface-muted bg-white text-primary-navy hover:border-primary-navy/40 hover:bg-bg-off-white",
              )}
            >
              {symbol}{amount.toLocaleString()}
              {isSuggested && !isSelected && (
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary-yellow text-primary-navy text-[9px] font-extrabold uppercase tracking-wider rounded-full whitespace-nowrap inline-flex items-center gap-1">
                  <span aria-hidden>💛</span>{t("checkoutPopular")}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Custom amount — currency on left, big number on right */}
      <div className="flex items-center justify-between gap-3 border border-surface-muted rounded-[14px] bg-white px-5 py-4 focus-within:border-primary-navy focus-within:ring-2 focus-within:ring-primary-navy/10 transition-all overflow-hidden">
        <div className="flex flex-col shrink-0">
          <span className="font-heading text-[26px] font-extrabold text-primary-navy leading-none">{symbol}</span>
          <span className="text-[11px] font-semibold text-text-gray uppercase tracking-[0.12em] mt-1.5">{currency}</span>
        </div>
        <input
          type="text"
          inputMode="decimal"
          value={customAmount}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder=".00"
          className="min-w-0 flex-1 font-heading text-[28px] md:text-[34px] font-extrabold text-primary-navy text-right tabular-nums tracking-[-0.02em] outline-none placeholder:text-primary-navy/60 bg-transparent leading-none"
        />
      </div>
    </div>
  );
}
