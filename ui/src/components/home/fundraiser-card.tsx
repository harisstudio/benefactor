import Image from "next/image";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Badge } from "@/components/ui/badge";
import type { FundraiserCard as FundraiserCardType } from "@/types/fundraiser";

interface FundraiserCardProps {
  fundraiser: FundraiserCardType;
}

export function FundraiserCard({ fundraiser }: FundraiserCardProps) {
  return (
    <article className="bg-white rounded-md shadow-sm overflow-hidden transition-transform hover:translate-y-[-2px] hover:shadow-md">
      <div className="relative aspect-[4/3]">
        <Image
          src={fundraiser.image}
          alt={fundraiser.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <Badge>{fundraiser.tag}</Badge>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-bold text-primary-navy leading-snug line-clamp-2 min-h-[2.5rem]">
          {fundraiser.title}
        </h3>
        <ProgressBar percent={fundraiser.progressPercent} className="mt-3" />
        <div className="flex items-baseline justify-between mt-2 text-xs text-text-gray">
          <span>
            <strong className="text-text-dark">
              {fundraiser.currency}
              {fundraiser.raisedAmount.toLocaleString()}
            </strong>{" "}
            raised
          </span>
          <span>
            of{" "}
            <strong>
              {fundraiser.currency}
              {fundraiser.goalAmount.toLocaleString()}
            </strong>{" "}
            goal
          </span>
        </div>
      </div>
    </article>
  );
}
