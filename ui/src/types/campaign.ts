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
  // Country the campaign supports, shown as a flag badge on the image.
  country?: string;
  heroImage: string;
  // Optional autoplaying hero video (mp4). When set, the detail page plays it
  // instead of showing the static hero image.
  heroVideo?: string;
  // Optional CSS object-position for the hero/card image (e.g. "center top")
  // when the default centre crop hides the important part of the photo.
  imagePosition?: string;
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
