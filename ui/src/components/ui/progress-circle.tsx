"use client";

import { useEffect, useState } from "react";
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
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    // Small timeout to ensure animation is visible after mount
    const timer = setTimeout(() => {
      setCurrentPercent(Math.min(100, Math.max(0, percent)));
    }, 100);
    return () => clearTimeout(timer);
  }, [percent]);

  const radius = 15.9155;
  const circumference = 2 * Math.PI * radius;
  const dashArray = `${(currentPercent / 100) * circumference}, ${circumference}`;

  return (
    <div className={cn("inline-flex items-center justify-center relative", className)} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 36 36"
        width={size}
        height={size}
        className="-rotate-90 transition-transform duration-1000 ease-out"
      >
        <defs>
          <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FFC800" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.5" />
            <feOffset dx="0" dy="0.5" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Background track */}
        <path
          className="text-[#f0f1f3]"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        
        {/* Animated progress track */}
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="url(#circleGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeLinecap="round"
          filter="url(#shadow)"
          className="transition-[stroke-dasharray] duration-1000 ease-out"
        />
      </svg>
      
      {/* Centered Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-primary-navy font-bold text-[18px] tracking-tight">
          {percent}%
        </span>
      </div>
    </div>
  );
}
