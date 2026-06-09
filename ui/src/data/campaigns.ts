import type { Campaign } from "@/types/campaign";

export const featuredCampaign: Campaign = {
  id: "2",
  title: "Kids Camping",
  description:
    "Help us give children a summer they'll never forget — a week of fresh air, friendship, and discovery.",
  story:
    "Every summer, families in our community look for safe, joyful, and affordable ways for their kids to spend the school break. For many of them, an organised camp is out of reach. This year we want to change that.\n\nYour donation covers tents, transport, meals, and activities for the kids who need them most. Every euro brings us closer to a week of campfires, games, and memories that stick with them long after the buses head home.",
  goalAmount: 1500,
  raisedAmount: 0,
  donationCount: 0,
  currency: "€",
  category: "Kids",
  heroImage: "/assets/benefactor_kids_camp.jpg",
  galleryImages: ["/assets/benefactor_kids_camp.jpg"],
  videoThumbnail: "/assets/benefactor_kids_camp.jpg",
  organizer: {
    name: "Benefactor Team",
  },
  createdAt: "2026-06-08",
};
