"use client";

import { useState } from "react";

interface CampaignStoryProps {
  truncated: string;
  full: string;
}

export function CampaignStory({ truncated, full }: CampaignStoryProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-primary-navy">Story</h2>
      <div className="text-sm text-text-gray leading-relaxed space-y-3">
        {expanded ? (
          full.split("\n").map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <p>{truncated}</p>
        )}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-sm font-semibold text-primary-navy hover:underline min-h-[44px]"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
