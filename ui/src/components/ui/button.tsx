import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "nav-outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  as?: "button" | "a";
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-yellow text-primary-navy shadow-[0_4px_14px_rgba(255,193,7,0.3)] hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(255,107,0,0.4)] hover:brightness-110 active:translate-y-0",
  outline:
    "border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white",
  ghost:
    "text-text-gray hover:text-text-dark hover:bg-bg-off-white",
  "nav-outline":
    "border-2 border-primary-yellow text-primary-navy bg-white hover:bg-primary-yellow hover:text-primary-navy",
};

export function Button({
  variant = "primary",
  className,
  as = "button",
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center min-h-12 px-5 md:min-h-[52px] md:px-8 rounded-btn font-bold text-base transition-all whitespace-nowrap min-w-[44px]",
    variantStyles[variant],
    className
  );

  if (as === "a" && href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
