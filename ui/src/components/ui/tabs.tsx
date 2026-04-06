"use client";

import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onTabChange: (key: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div
      className={cn("flex border border-gray-200 rounded-btn overflow-hidden", className)}
    >
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={cn(
            "flex-1 py-3 px-4 text-sm font-semibold transition-colors min-h-[44px]",
            activeTab === tab.key
              ? "bg-primary-navy text-white"
              : "bg-white text-text-dark hover:bg-bg-off-white"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
