import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percent: number;
  className?: string;
}

export function ProgressBar({ percent, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));

  return (
    <div
      className={cn(
        "w-full h-2 bg-surface-muted rounded-full overflow-hidden",
        className
      )}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary-yellow to-primary-yellow-hover transition-all duration-500"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

/**
 * Circular percentage indicator — used on checkout header and campaign cards.
 * Yellow track on navy stroke with the percent number centered.
 */
export function CircularProgress({
  percent,
  size = 64,
  strokeWidth = 6,
  className,
}: {
  percent: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, percent));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clamped / 100);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.12}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--color-primary-yellow, #FFD23F)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-heading font-extrabold text-primary-navy tabular-nums"
        style={{ fontSize: Math.max(11, Math.round(size * 0.26)) }}
      >
        {Math.round(clamped)}%
      </span>
    </div>
  );
}

/** Taller track + shimmer — kampanya ana / detay */
export function FeaturedProgressBar({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="w-full h-3.5 bg-surface-muted rounded-full overflow-hidden mb-2.5 relative">
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary-yellow to-primary-yellow-hover relative overflow-hidden transition-all duration-500"
        style={{ width: `${clamped}%` }}
      >
        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
