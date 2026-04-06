import type { Campaign } from "@/types/campaign";

export const featuredCampaign: Campaign = {
  id: "1",
  title: "Help a Family in Lithuania Stay Warm This Winter",
  description:
    "Winter is approaching in Lithuania, and for one family, the cold brings fear instead of comfort.",
  story:
    "This family is currently living in a home that is no longer safe or suitable for the harsh winter months. The house has serious structural problems, poor insulation, and damaged areas that make it difficult to stay warm. Without urgent repairs, the cold weather will turn everyday life into a real struggle.\n\nDespite their difficult situation, they are doing everything they can to survive.",
  goalAmount: 26000,
  raisedAmount: 13622,
  donationCount: 300,
  currency: "€",
  category: "Family",
  heroImage: "/assets/campaign-man-new.jpg",
  galleryImages: [
    "/assets/campaign-house-new.jpg",
    "/assets/gallery-house-exterior.png",
    "/assets/gallery-kitchen.png",
    "/assets/gallery-doorstep.png",
  ],
  videoThumbnail: "/assets/campaign-man-new.jpg",
  organizer: {
    name: "Benefactor Team",
  },
  createdAt: "2025-10-01",
};
