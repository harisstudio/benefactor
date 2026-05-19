import { IconMapPin, IconCalendar, IconCircleCheck } from "@tabler/icons-react";

interface CampaignHeaderProps {
  title: string;
  category?: string;
  location?: string;
  createdAt?: string;
  verified?: boolean;
}

export function CampaignHeader({
  title,
  category,
  location = "Lithuania",
  createdAt,
  verified = true,
}: CampaignHeaderProps) {
  return (
    <header className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        {category && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.12em] bg-primary-navy text-white">
            {category}
          </span>
        )}
        {verified && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-primary-navy bg-primary-yellow/20">
            <IconCircleCheck size={13} stroke={2} />
            Verified
          </span>
        )}
      </div>
      <h1 className="font-heading text-[clamp(26px,3.4vw,42px)] font-extrabold text-primary-navy leading-[1.1] tracking-[-0.015em]">
        {title}
      </h1>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-text-gray">
        <span className="inline-flex items-center gap-1.5">
          <IconMapPin size={15} stroke={1.7} />
          {location}
        </span>
        {createdAt && (
          <span className="inline-flex items-center gap-1.5">
            <IconCalendar size={15} stroke={1.7} />
            {new Date(createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        )}
      </div>
    </header>
  );
}
