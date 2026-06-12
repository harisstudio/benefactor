import type { FundraiserCard } from "@/types/fundraiser";

/**
 * Live fundraisers shown on the homepage and in search results.
 * Keep this list aligned with `data/campaigns.ts` so each entry has a
 * matching detail page at `/campaigns/[id]`.
 */
export const featuredFundraisers: FundraiserCard[] = [
  {
    id: "1",
    title: "Help a Family in Lithuania",
    image: "/assets/campaign-man-new.jpg",
    tag: "Family",
    raisedAmount: 13762,
    goalAmount: 26000,
    currency: "€",
    progressPercent: 53,
    donationCount: 300,
  },
  {
    id: "2",
    title: "Kids Camping",
    image: "/assets/kids-camping.png",
    tag: "Kids",
    raisedAmount: 0,
    goalAmount: 1500,
    currency: "€",
    progressPercent: 0,
    donationCount: 0,
  },
  {
    id: "3",
    title: "Kite Surf School",
    image: "/assets/kite-surf.png",
    tag: "Sports",
    raisedAmount: 0,
    goalAmount: 5000,
    currency: "€",
    progressPercent: 0,
    donationCount: 0,
  },
  {
    id: "4",
    title: "Village Primary & Secondary School Restoration",
    image: "/assets/village-school.png",
    tag: "Education",
    raisedAmount: 0,
    goalAmount: 10000,
    currency: "€",
    progressPercent: 0,
    donationCount: 0,
  },
  {
    id: "5",
    title: "Bandup: A Network for Independent Musicians",
    image: "/assets/bandup.png",
    tag: "Community",
    raisedAmount: 0,
    goalAmount: 5000,
    currency: "£",
    progressPercent: 0,
    donationCount: 0,
  },
];
