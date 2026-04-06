import { cn } from "@/lib/utils";

interface ProgressCircleProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

export function ProgressCircle({
  percent,
  size = 80,
  strokeWidth = 3,
  className,
}: ProgressCircleProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const dashArray = `${(clamped / 100) * circumference}, ${circumference}`;

  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 36 36"
        width={size}
        height={size}
        className="-rotate-90"
      >
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8C00" />
            <stop offset="50%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FFD700" />
          </linearGradient>
        </defs>
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
