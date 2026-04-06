export interface FundraiserCard {
  id: string;
  title: string;
  image: string;
  tag: string;
  raisedAmount: number;
  goalAmount: number;
  currency: string;
  progressPercent: number;
  donationCount: number;
  lastDonation?: string;
}
