"use client";

import { useState } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

interface CampaignStoryProps {
  truncated: string;
  full: string;
}

export function CampaignStory({ truncated, full }: CampaignStoryProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="space-y-5">
      <h2 className="font-heading text-[clamp(20px,2vw,26px)] font-extrabold text-primary-navy tracking-[-0.01em]">
        About this campaign
      </h2>
      <div className="text-[16px] leading-[1.75] text-text-dark/85 space-y-4">
        {expanded ? (
          full.split("\n").map((p, i) => <p key={i}>{p}</p>)
        ) : (
          <p>{truncated}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="inline-flex items-center gap-1.5 text-[14px] font-bold text-primary-navy hover:text-primary-yellow-hover transition-colors"
      >
        {expanded ? "Read less" : "Read more"}
        {expanded ? <IconChevronUp size={16} stroke={2} /> : <IconChevronDown size={16} stroke={2} />}
      </button>
    </section>
  );
}
