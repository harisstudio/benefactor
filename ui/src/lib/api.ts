/**
 * API client — typed stub functions that return mock data today.
 * When the backend is ready, swap the implementations to fetch from
 * `NEXT_PUBLIC_API_URL` without changing any call-sites.
 */

import type { Campaign, Donor } from "@/types/campaign";
import type { FundraiserCard } from "@/types/fundraiser";

import { featuredCampaign } from "@/data/campaigns";
import { donors as mockDonors } from "@/data/donors";
import { featuredFundraisers as mockFundraisers } from "@/data/fundraisers";
import { topicLabels as mockTopicLabels, topicCards as mockTopicCards } from "@/data/topics";
import { impactStats, values, perks, features, steps } from "@/data/stats";
import { roles as mockRoles } from "@/data/roles";

// ─── Helpers ──────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

/**
 * Placeholder for future `fetch()` wrapper.
 * Will handle base URL, auth headers, error mapping, etc.
 */
// async function apiFetch<T>(path: string): Promise<T> {
//   const res = await fetch(`${baseUrl}${path}`, { next: { revalidate: 60 } });
//   if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
//   return res.json() as Promise<T>;
// }

// ─── Campaigns ────────────────────────────────────────────

export async function getCampaign(id: string): Promise<Campaign> {
  // Future: return apiFetch<Campaign>(`/campaigns/${id}`);
  void id;
  return featuredCampaign;
}

export async function getFeaturedCampaign(): Promise<Campaign> {
  return featuredCampaign;
}

// ─── Donors ───────────────────────────────────────────────

export async function getDonors(campaignId: string): Promise<Donor[]> {
  // Future: return apiFetch<Donor[]>(`/campaigns/${campaignId}/donors`);
  void campaignId;
  return mockDonors;
}

// ─── Fundraisers ──────────────────────────────────────────

export async function getFeaturedFundraisers(): Promise<FundraiserCard[]> {
  // Future: return apiFetch<FundraiserCard[]>("/fundraisers/featured");
  return mockFundraisers;
}

export async function getRelatedFundraisers(
  campaignId: string
): Promise<FundraiserCard[]> {
  // Future: return apiFetch<FundraiserCard[]>(`/campaigns/${campaignId}/related`);
  void campaignId;
  return mockFundraisers;
}

// ─── Topics ───────────────────────────────────────────────

export async function getTopicLabels(): Promise<readonly string[]> {
  return mockTopicLabels;
}

export async function getTopicCards(): Promise<
  Record<string, FundraiserCard[]>
> {
  return mockTopicCards;
}

// ─── Stats (about, how) ──────────────────────────────────

export async function getImpactStats() {
  return impactStats;
}

export async function getValues() {
  return values;
}

export async function getFeatures() {
  return features;
}

export async function getSteps() {
  return steps;
}

// ─── Careers ──────────────────────────────────────────────

export async function getPerks() {
  return perks;
}

export async function getRoles() {
  return mockRoles;
}
