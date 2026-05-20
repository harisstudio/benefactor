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
                "relative h-12 rounded-[14px] border text-[15px] font-bold transition-all min-h-[44px]",
                isSelected
                  ? "border-primary-navy bg-primary-navy text-white shadow-md"
                  : "border-surface-muted bg-white text-primary-navy hover:border-primary-navy/40 hover:bg-bg-off-white",
              )}
            >
              {symbol}{amount}
              {isSuggested && !isSelected && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-primary-yellow text-primary-navy text-[9px] font-bold uppercase tracking-wider rounded-full whitespace-nowrap">
                  {t("checkoutPopular")}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center border border-surface-muted rounded-[14px] bg-white focus-within:border-primary-navy focus-within:ring-2 focus-within:ring-primary-navy/10 transition-all">
        <span className="font-heading text-[22px] font-extrabold text-primary-navy pl-5">{symbol}</span>
        <input
          type="text"
          value={customAmount}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder={t("checkoutOtherAmount")}
          className="flex-1 h-14 px-3 font-heading text-[22px] font-extrabold text-primary-navy outline-none placeholder:font-sans placeholder:text-[15px] placeholder:font-medium placeholder:text-text-gray/70 bg-transparent"
        />
        <span className="hidden sm:inline text-[12px] font-semibold text-text-gray uppercase tracking-wider pr-5">{currency}</span>
      </div>
    </div>
  );
}
