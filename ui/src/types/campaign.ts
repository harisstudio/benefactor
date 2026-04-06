export interface Campaign {
  id: string;
  title: string;
  description: string;
  story: string;
  goalAmount: number;
  raisedAmount: number;
  donationCount: number;
  currency: string;
  category: string;
  heroImage: string;
  galleryImages: string[];
  videoThumbnail?: string;
  organizer: {
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface Donor {
  id: string;
  name: string;
  amount: number;
  currency: string;
  timeAgo: string;
  isAnonymous: boolean;
  message?: string;
}

export interface DonationAmount {
  value: number;
  label: string;
  isSuggested?: boolean;
}
