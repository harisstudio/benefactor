"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface TipSectionProps {
  percent: number;
  onChange: (value: number) => void;
}

export function TipSection({ percent, onChange }: TipSectionProps) {
  const { t } = useLanguage();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const fillPercent = Math.min(100, (percent / 30) * 100);

  function handleCustomSubmit() {
    const val = parseFloat(customValue);
    if (!isNaN(val) && val >= 0 && val <= 100) {
      onChange(val);
      setShowCustomInput(false);
      setCustomValue("");
    }
  }

  return (
    <div className="bg-bg-off-white border border-surface-muted rounded-2xl p-5 space-y-4">
      <div>
        <h3 className="font-heading text-[15px] font-extrabold text-primary-navy mb-1.5">
          {t("checkoutTipHeading")}
        </h3>
        <p className="text-[13px] text-text-gray leading-relaxed">
          {t("checkoutTipDesc")}
        </p>
      </div>

      {!showCustomInput ? (
        <>
          <div className="flex items-baseline justify-center gap-0.5">
            <span className="font-heading text-[32px] font-extrabold text-primary-navy tabular-nums leading-none">
              {percent.toFixed(1)}
            </span>
            <span className="font-heading text-[18px] font-extrabold text-primary-navy ml-0.5">%</span>
          </div>

          <input
            type="range"
            min={0}
            max={30}
            step={0.5}
            value={percent > 30 ? 30 : percent}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            aria-label={t("checkoutTipPercentLabel")}
            className="w-full h-2 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-primary-navy
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-primary-navy
              [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ffc800 0%, #ffc800 ${fillPercent}%, #eef2f6 ${fillPercent}%, #eef2f6 100%)`,
            }}
          />
        </>
      ) : (
        <div className="flex items-center gap-2 justify-center">
          <div className="relative flex items-center">
            <input
              type="number"
              min={0}
              max={100}
              step={0.5}
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
              placeholder="0.0"
              autoFocus
              className="w-28 h-11 px-3 pr-8 border border-surface-muted rounded-[14px] font-heading text-[18px] font-extrabold text-primary-navy text-center bg-white focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all"
            />
            <span className="absolute right-3 text-[13px] font-semibold text-text-gray pointer-events-none">
              %
            </span>
          </div>
          <button
            type="button"
            onClick={handleCustomSubmit}
            className="h-11 px-5 rounded-[100px] bg-primary-navy text-white font-bold text-[13px] hover:bg-primary-navy/90 transition-all"
          >
            {t("checkoutApply")}
          </button>
          <button
            type="button"
            onClick={() => {
              setShowCustomInput(false);
              setCustomValue("");
            }}
            className="h-11 px-3 text-text-gray font-semibold text-[13px] hover:text-primary-navy transition-colors"
          >
            {t("checkoutCancel")}
          </button>
        </div>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setShowCustomInput(!showCustomInput);
            setCustomValue("");
          }}
          className="text-[13px] text-primary-navy font-semibold underline hover:no-underline"
        >
          {showCustomInput ? t("checkoutUseSlider") : t("checkoutEnterCustomTip")}
        </button>
      </div>
    </div>
  );
}
