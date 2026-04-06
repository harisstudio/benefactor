import { cn } from "@/lib/utils";
import { type SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: readonly { value: string; label: string }[];
}

export function Select({ label, options, className, id, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-dark">
          {label}
        </label>
      )}
      <select
        id={id}
        className={cn(
          "w-full h-12 px-4 border border-gray-300 rounded-sm text-base text-text-dark bg-white appearance-none",
          "transition-colors focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy",
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
