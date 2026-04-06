"use client";

import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import type { FundraiserCard as FundraiserCardType } from "@/types/fundraiser";
import { FundraiserCard } from "./fundraiser-card";

interface TopicFilterProps {
  labels: readonly string[];
  cards: Record<string, FundraiserCardType[]>;
}

export function TopicFilter({ labels, cards }: TopicFilterProps) {
  const [activeTopic, setActiveTopic] = useState<string>(labels[0]);
  const [, startTransition] = useTransition();

  const topicCards = cards[activeTopic] ?? [];

  const handleTopicChange = (topic: string) => {
    startTransition(() => {
      setActiveTopic(topic);
    });
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-primary-navy mb-4">
        Featured topics
      </h3>

      {/* Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {labels.map((topic) => (
          <button
            key={topic}
            onClick={() => handleTopicChange(topic)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all min-h-[44px]",
              activeTopic === topic
                ? "bg-primary-navy text-white"
                : "bg-bg-off-white text-text-dark hover:bg-gray-200"
            )}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topicCards.map((card) => (
          <FundraiserCard key={card.id} fundraiser={card} />
        ))}
      </div>
    </div>
  );
}
