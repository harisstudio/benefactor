"use client";

import { useState } from "react";

interface TipSectionProps {
  percent: number;
  onChange: (value: number) => void;
}

export function TipSection({ percent, onChange }: TipSectionProps) {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const fillPercent = (percent / 30) * 100;

  function handleCustomSubmit() {
    const val = parseFloat(customValue);
    if (!isNaN(val) && val >= 0 && val <= 100) {
      onChange(val);
      setShowCustomInput(false);
      setCustomValue("");
    }
  }

  function handleCustomKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleCustomSubmit();
    }
  }

  return (
    <div className="space-y-2">
      <h3 className="text-[17px] font-bold text-primary-navy">
        Tip Benefactor services
      </h3>
      <p className="text-sm text-text-gray font-medium leading-relaxed">
        Benefactor has a 0% platform fee for organisers. Benefactor will
        continue offering its services thanks to donors who will leave an
        optional amount here:
      </p>

      <div className="text-center space-y-3">
        {/* Tip percentage display */}
        {!showCustomInput && (
          <>
            <div className="flex items-baseline justify-center gap-0.5">
              <span className="text-2xl font-extrabold text-primary-navy">
                {percent.toFixed(1)}
              </span>
              <span className="text-sm font-medium text-primary-navy">%</span>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={0}
              max={30}
              step={0.5}
              value={percent > 30 ? 30 : percent}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-[#e0e0e0]
                [&::-webkit-slider-thumb]:shadow-md
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-[#e0e0e0]
                [&::-moz-range-thumb]:shadow-md
                [&::-moz-range-thumb]:cursor-pointer"
              style={{
                background: `linear-gradient(to right, #FF6B00 0%, #FFC800 ${fillPercent}%, #e0e0e0 ${fillPercent}%, #e0e0e0 100%)`,
              }}
            />
          </>
        )}

        {/* Custom tip input */}
        {showCustomInput && (
          <div className="flex items-center gap-2 justify-center py-2">
            <div className="relative flex items-center">
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                onKeyDown={handleCustomKeyDown}
                placeholder="0.0"
                autoFocus
                className="w-24 py-2.5 px-3 pr-7 border-2 border-[#e0e0e0] rounded-xl text-lg font-bold text-primary-navy text-center outline-none focus:border-primary-navy bg-[#f8f9fa] focus:bg-white transition-colors"
              />
              <span className="absolute right-3 text-sm font-medium text-text-gray pointer-events-none">
                %
              </span>
            </div>
            <button
              onClick={handleCustomSubmit}
              className="py-2.5 px-5 bg-primary-yellow text-primary-navy font-bold text-sm rounded-xl cursor-pointer hover:brightness-110 transition-all min-h-[44px]"
            >
              Apply
            </button>
            <button
              onClick={() => {
                setShowCustomInput(false);
                setCustomValue("");
              }}
              className="py-2.5 px-3 text-text-gray font-medium text-sm rounded-xl cursor-pointer hover:bg-gray-100 transition-all min-h-[44px]"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Custom tip link */}
        <button
          onClick={() => {
            setShowCustomInput(!showCustomInput);
            setCustomValue("");
          }}
          className="text-sm text-primary-navy font-medium underline hover:no-underline cursor-pointer bg-transparent border-none"
        >
          {showCustomInput ? "Use slider" : "Enter custom tip"}
        </button>
      </div>
    </div>
  );
}
