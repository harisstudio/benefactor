"use client";

import { cn } from "@/lib/utils";
import { type InputHTMLAttributes } from "react";

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  displayValue?: string;
}

export function Slider({ label, displayValue, className, ...props }: SliderProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {(label || displayValue) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="text-text-dark font-medium">{label}</span>}
          {displayValue && (
            <span className="font-bold text-primary-navy">{displayValue}</span>
          )}
        </div>
      )}
      <input
        type="range"
        className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary-yellow"
        {...props}
      />
    </div>
  );
}
