import type { Campaign } from "@/types/campaign";

// Dimitri's family — the original campaign behind the homepage story videos.
export const dimitriCampaign: Campaign = {
  id: "1",
  title: "Help a Family in Lithuania",
  description:
    "Dimitri and his family are rebuilding their home after years of hardship. Your support helps them finish the walls, the roof, and a warm winter indoors.",
  story:
    "Dimitri lives with his family in a small Lithuanian village. After years of setbacks their house was left half-finished, with bare walls and no insulation against the long winters.\n\nWith your help they have already come a long way, but the hardest part remains: finishing the structure, sealing the roof, and making the home safe and warm for the whole family. Every donation goes straight to materials and the work that turns a shell of a house back into a home.",
  goalAmount: 26000,
  raisedAmount: 13762,
  donationCount: 300,
  currency: "€",
  category: "Family",
  country: "Lithuania",
  heroImage: "/assets/campaign-man-new.jpg",
  heroVideo: "/assets/ches/ches-en.mp4",
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
  createdAt: "2026-03-01",
};

// Kids Camping — summer camp campaign.
export const kidsCampingCampaign: Campaign = {
  id: "2",
  title: "Kids Camping",
  description:
    "Help us give children a summer they'll never forget, a week of fresh air, friendship, and discovery.",
  story:
    "Every summer, families in our community look for safe, joyful, and affordable ways for their kids to spend the school break. For many of them, an organised camp is out of reach. This year we want to change that.\n\nYour donation covers tents, transport, meals, and activities for the kids who need them most. Every euro brings us closer to a week of campfires, games, and memories that stick with them long after the buses head home.",
  goalAmount: 1500,
  raisedAmount: 0,
  donationCount: 0,
  currency: "€",
  category: "Kids",
  country: "Lithuania",
  heroImage: "/assets/kids-camping.png",
  // The children's faces sit high in the frame, so anchor the crop to the top.
  imagePosition: "center top",
  galleryImages: ["/assets/kids-camping.png"],
  videoThumbnail: "/assets/kids-camping.png",
  organizer: {
    name: "Benefactor Team",
  },
  createdAt: "2026-06-08",
};

// Kite Surf School — coastal sports school for young people.
export const kiteSurfCampaign: Campaign = {
  id: "3",
  title: "Kite Surf School",
  description:
    "A kite surf school on the coast where young people learn to ride the wind, build confidence on the water, and discover a sport for life.",
  story:
    "On the coast there is wind, water, and a generation of kids who never get the chance to use them. We want to change that with a kite surf school built around safety, coaching, and access for families who could never afford lessons.\n\nYour donation funds equipment, certified instructors, and safety gear so that any young person can step onto the beach, catch the wind, and find a sport that builds confidence far beyond the water.",
  goalAmount: 5000,
  raisedAmount: 0,
  donationCount: 0,
  currency: "€",
  category: "Sports",
  country: "Turkey",
  heroImage: "/assets/kite-surf.png",
  galleryImages: ["/assets/kite-surf.png"],
  videoThumbnail: "/assets/kite-surf.png",
  organizer: {
    name: "Benefactor Team",
  },
  createdAt: "2026-06-10",
};

// Turkey's first village school — restoration of a rural schoolhouse.
export const turkeySchoolCampaign: Campaign = {
  id: "4",
  title: "Village Primary & Secondary School Restoration",
  description:
    "Help restore a village primary and secondary school in Turkey, bringing classrooms back to life for the children of the village.",
  story:
    "In a small Turkish village stands a school that once taught the whole community, primary and secondary alike, before time and weather took their toll. Today its walls are cracked, its roof leaks, and its classrooms sit empty.\n\nWe want to restore it, not as a museum, but as a living school again: safe walls, a sound roof, warm classrooms, and a place where the children of the village can complete their primary and secondary education close to home. Every donation goes directly to materials and the craftspeople rebuilding it, stone by stone.",
  goalAmount: 10000,
  raisedAmount: 0,
  donationCount: 0,
  currency: "€",
  category: "Education",
  country: "Turkey",
  heroImage: "/assets/village-school.png",
  galleryImages: ["/assets/village-school.png"],
  videoThumbnail: "/assets/village-school.png",
  organizer: {
    name: "Benefactor Team",
  },
  createdAt: "2026-06-11",
};

// Bandup — a community app and support network for independent musicians.
export const bandupCampaign: Campaign = {
  id: "5",
  title: "Bandup: A Network for Independent Musicians",
  description:
    "Help us build Bandup, a mobile app and support network where independent musicians and bands can connect, grow, and back each other.",
  story:
    "Independent musicians and bands carry everything themselves: writing, rehearsing, booking, promoting, and somehow finding the money to keep going. There is no shortage of talent, only a shortage of support around it.\n\nBandup is the app we want to build to change that: a community network where musicians find collaborators, share gigs, grow an audience, and support one another directly. This campaign funds the mobile app development and the operations to run the community.\n\nYour donation goes straight into building the app and keeping the network alive for the artists who need it most.",
  goalAmount: 5000,
  raisedAmount: 0,
  donationCount: 0,
  currency: "£",
  category: "Community",
  country: "United Kingdom",
  heroImage: "/assets/bandup.png",
  galleryImages: ["/assets/bandup.png"],
  videoThumbnail: "/assets/bandup.png",
  organizer: {
    name: "Benefactor Team",
  },
  createdAt: "2026-06-12",
};

// Lookup so each /campaigns/[id] resolves to its own detail page.
export const campaignsById: Record<string, Campaign> = {
  "1": dimitriCampaign,
  "2": kidsCampingCampaign,
  "3": kiteSurfCampaign,
  "4": turkeySchoolCampaign,
  "5": bandupCampaign,
};

// Every campaign, in the order they appear on the homepage. Dimitri's
// family leads (the homepage videos follow it).
export const allCampaigns: Campaign[] = [
  dimitriCampaign,
  kidsCampingCampaign,
  kiteSurfCampaign,
  turkeySchoolCampaign,
  bandupCampaign,
];

// The campaign highlighted on the homepage and used as the default fallback.
export const featuredCampaign: Campaign = dimitriCampaign;
