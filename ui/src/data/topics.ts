import type { FundraiserCard } from "@/types/fundraiser";

export const topicLabels = [
  "Animals", "Business", "Community", "Competitions",
  "Creative", "Emergency", "Environment", "Events", "Family", "Medical",
] as const;

export const topicCards: Record<string, FundraiserCard[]> = {
  Animals: [
    { id: "ta1", title: "Help Bailey Find a Forever Home", image: "/assets/fundraiser-animals-1.png", tag: "Animals", raisedAmount: 3250, goalAmount: 5000, currency: "$", progressPercent: 65, donationCount: 78 },
    { id: "ta2", title: "Safe Haven: Support for Street Cats", image: "/assets/street-cat.png", tag: "Animals", raisedAmount: 8000, goalAmount: 10000, currency: "$", progressPercent: 80, donationCount: 156 },
    { id: "ta3", title: "Anatolian Lynx: Turkey's Endangered Wildcat", image: "/assets/lynx.png", tag: "Animals", raisedAmount: 11250, goalAmount: 25000, currency: "$", progressPercent: 45, donationCount: 203 },
  ],
  Business: [
    { id: "tb1", title: "Empower Innovation: Startup Hub", image: "/assets/fundraiser-business-1.png", tag: "Business", raisedAmount: 35000, goalAmount: 50000, currency: "$", progressPercent: 70, donationCount: 412 },
    { id: "tb2", title: "Support Our Local Artisan Bakery", image: "/assets/fundraiser-business-2.png", tag: "Business", raisedAmount: 5500, goalAmount: 10000, currency: "$", progressPercent: 55, donationCount: 89 },
    { id: "tb3", title: "The Urban Plate: From Truck to Store", image: "/assets/fundraiser-business-3.png", tag: "Business", raisedAmount: 17000, goalAmount: 20000, currency: "$", progressPercent: 85, donationCount: 267 },
  ],
  Community: [
    { id: "tc1", title: "Building Hope Through Tennis in Brazil", image: "/assets/fundraiser-community-1.png", tag: "Community", raisedAmount: 24000, goalAmount: 30000, currency: "$", progressPercent: 80, donationCount: 410 },
    { id: "tc2", title: "Where Hope Begins: School for Children", image: "/assets/fundraiser-community-2.png", tag: "Community", raisedAmount: 27500, goalAmount: 50000, currency: "$", progressPercent: 55, donationCount: 623 },
    { id: "tc3", title: "New Library for Village School", image: "/assets/fundraiser-community-3.png", tag: "Community", raisedAmount: 18000, goalAmount: 20000, currency: "$", progressPercent: 90, donationCount: 534 },
  ],
  Competitions: [
    { id: "tk1", title: "Turkey Kite School: Ride the Winds", image: "/assets/fundraiser-kite.png", tag: "Competitions", raisedAmount: 13000, goalAmount: 20000, currency: "$", progressPercent: 65, donationCount: 189 },
    { id: "tk2", title: "Youth Tennis Championship Fund", image: "/assets/fundraiser-tennis.png", tag: "Competitions", raisedAmount: 4000, goalAmount: 10000, currency: "$", progressPercent: 40, donationCount: 56 },
    { id: "tk3", title: "Wild Mexico Adventure Race", image: "/assets/fundraiser-mexico.png", tag: "Competitions", raisedAmount: 7500, goalAmount: 15000, currency: "$", progressPercent: 50, donationCount: 102 },
  ],
  Creative: [
    { id: "tcr1", title: "Art for Hope: Children's Gallery", image: "/assets/art-gallery.png", tag: "Creative", raisedAmount: 15000, goalAmount: 20000, currency: "$", progressPercent: 75, donationCount: 234 },
    { id: "tcr2", title: "Instruments for Young Musicians", image: "/assets/fundraiser-interior.png", tag: "Creative", raisedAmount: 6000, goalAmount: 10000, currency: "$", progressPercent: 60, donationCount: 112 },
    { id: "tcr3", title: "Community Creative Workspace", image: "/assets/fundraiser-business-3.png", tag: "Creative", raisedAmount: 10500, goalAmount: 30000, currency: "$", progressPercent: 35, donationCount: 178 },
  ],
  Emergency: [
    { id: "te1", title: "Community Flood Relief Fund", image: "/assets/fundraiser-emergency.png", tag: "Emergency", raisedAmount: 12000, goalAmount: 30000, currency: "$", progressPercent: 40, donationCount: 245 },
    { id: "te2", title: "Earthquake Recovery Support", image: "/assets/earthquake.png", tag: "Emergency", raisedAmount: 85000, goalAmount: 100000, currency: "$", progressPercent: 85, donationCount: 1203 },
    { id: "te3", title: "Wildfire Family Relief", image: "/assets/fundraiser-emergency-extra.png", tag: "Emergency", raisedAmount: 22000, goalAmount: 40000, currency: "$", progressPercent: 55, donationCount: 367 },
  ],
  Environment: [
    { id: "ten1", title: "Kite Surf Gökçeada Turkey", image: "/assets/fundraiser-kite.png", tag: "Environment", raisedAmount: 32000, goalAmount: 50000, currency: "$", progressPercent: 64, donationCount: 489 },
    { id: "ten2", title: "Rainforest Preservation Fund", image: "/assets/rainforest.png", tag: "Environment", raisedAmount: 18500, goalAmount: 35000, currency: "$", progressPercent: 53, donationCount: 302 },
    { id: "ten3", title: "Scout Program: Raising Young Leaders", image: "/assets/scouts.png", tag: "Environment", raisedAmount: 4200, goalAmount: 8000, currency: "$", progressPercent: 53, donationCount: 67 },
  ],
  Events: [
    { id: "tev1", title: "Charity Marathon for Children", image: "/assets/fundraiser-community-3.png", tag: "Events", raisedAmount: 15000, goalAmount: 25000, currency: "$", progressPercent: 60, donationCount: 198 },
    { id: "tev2", title: "Music Festival Fundraiser", image: "/assets/fundraiser-creative.png", tag: "Events", raisedAmount: 9000, goalAmount: 15000, currency: "$", progressPercent: 60, donationCount: 134 },
    { id: "tev3", title: "Community Cultural Fair", image: "/assets/fundraiser-business-2.png", tag: "Events", raisedAmount: 3500, goalAmount: 7000, currency: "$", progressPercent: 50, donationCount: 45 },
  ],
  Family: [
    { id: "tf1", title: "Help a Family Stay Warm This Winter", image: "/assets/topic-family-1.png", tag: "Family", raisedAmount: 13622, goalAmount: 26000, currency: "€", progressPercent: 52, donationCount: 300 },
    { id: "tf2", title: "Home Repairs for Single Mother", image: "/assets/topic-family-2.png", tag: "Family", raisedAmount: 9000, goalAmount: 20000, currency: "$", progressPercent: 45, donationCount: 156 },
    { id: "tf3", title: "College Fund for Orphaned Siblings", image: "/assets/fundraiser-education-special.png", tag: "Family", raisedAmount: 17500, goalAmount: 50000, currency: "$", progressPercent: 35, donationCount: 278 },
  ],
  Medical: [
    { id: "tm1", title: "Help Sarah Beat Leukemia", image: "/assets/fundraiser-medical-sarah.png", tag: "Medical", raisedAmount: 45200, goalAmount: 60000, currency: "$", progressPercent: 75, donationCount: 812 },
    { id: "tm2", title: "Life-Saving Surgery for Baby Emma", image: "/assets/fundraiser-medical-emma.png", tag: "Medical", raisedAmount: 30000, goalAmount: 50000, currency: "$", progressPercent: 60, donationCount: 456 },
    { id: "tm3", title: "Medical Equipment for Rural Clinic", image: "/assets/fundraiser-medical-special.png", tag: "Medical", raisedAmount: 16000, goalAmount: 40000, currency: "$", progressPercent: 40, donationCount: 234 },
  ],
};
