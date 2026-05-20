import type { FundraiserCard } from "@/types/fundraiser";

/**
 * Live fundraisers shown on the homepage and in search results.
 * Keep this list aligned with `data/campaigns.ts` so each entry has a
 * matching detail page at `/campaigns/[id]`.
 */
export const featuredFundraisers: FundraiserCard[] = [
  {
    id: "1",
    title: "House reconstruction",
    image: "/assets/campaign-man-new.jpg",
    tag: "Family",
    raisedAmount: 13762,
    goalAmount: 26000,
    currency: "€",
    progressPercent: 53,
    donationCount: 300,
  },
];
