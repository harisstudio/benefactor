import { cn } from "@/lib/utils";
import { type InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-dark">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          "w-full h-12 px-4 border border-gray-300 rounded-sm text-base text-text-dark bg-white",
          "transition-colors focus:outline-none focus:border-primary-navy focus:ring-1 focus:ring-primary-navy",
          "placeholder:text-text-gray",
          className
        )}
        {...props}
      />
    </div>
  );
}
