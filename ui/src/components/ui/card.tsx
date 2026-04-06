import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-md shadow-sm",
        hover && "transition-transform hover:translate-y-[-2px] hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
