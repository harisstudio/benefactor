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
      <h2 className="text-[20px] font-bold text-primary-navy leading-[1.2]">Story</h2>
      <div className="text-[16px] leading-[1.6] text-[#444] font-medium space-y-4">
        {expanded ? (
          full.split("\n").map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <p>{truncated}</p>
        )}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="text-primary-navy font-bold underline cursor-pointer hover:text-[#FF6B00] transition-colors text-[16px]"
      >
        {expanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}
