import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percent: number;
  className?: string;
}

export function ProgressBar({ percent, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div
      className={cn("w-full h-2 bg-gray-200 rounded-full overflow-hidden", className)}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary-yellow to-[#FF8C00] transition-all duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
