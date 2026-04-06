import { cn } from "@/lib/utils";
import { type InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn("flex items-center gap-3 cursor-pointer min-h-[44px]", className)}
    >
      <input
        type="checkbox"
        id={id}
        className="w-5 h-5 rounded border-gray-300 text-primary-yellow focus:ring-primary-yellow cursor-pointer"
        {...props}
      />
      <span className="text-sm text-text-dark">{label}</span>
    </label>
  );
}
