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

const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8787/api";

/**
 * Fetch wrapper that talks to our Cloudflare Worker backend.
 */
async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    next: { revalidate: 0 }, // Disable caching for now
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

// ─── Campaigns ────────────────────────────────────────────

export async function getCampaign(id: string): Promise<Campaign> {
  try {
    const campaign = await apiFetch<Campaign>(`/campaigns/${id}`);
    if (campaign) return campaign;
  } catch (err) {
    console.warn('API fetch failed, falling back to mock data:', err);
  }
  return featuredCampaign;
}

export async function getFeaturedCampaign(): Promise<Campaign> {
  try {
    const campaigns = await apiFetch<Campaign[]>('/campaigns');
    if (campaigns && campaigns.length > 0) return campaigns[0];
  } catch (err) {
    console.warn('API fetch failed, falling back to mock data:', err);
  }
  return featuredCampaign;
}

// ─── Donors ───────────────────────────────────────────────

export async function getDonors(campaignId: string): Promise<Donor[]> {
  try {
    // Assuming backend returns donors nested under campaign or a separate endpoint
    return await apiFetch<Donor[]>(`/campaigns/${campaignId}/donors`);
  } catch (err) {
    console.warn('API fetch failed, falling back to mock data:', err);
    return mockDonors;
  }
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
  try {
    const categories = await apiFetch<{ name: string }[]>('/categories');
    if (categories && categories.length > 0) {
      return categories.map((c) => c.name);
    }
  } catch (err) {
    console.warn('API fetch failed, falling back to mock data:', err);
  }
  return mockTopicLabels;
}

export async function getCountries(): Promise<{ code: string; name: string }[]> {
  try {
    return await apiFetch<{ code: string; name: string }[]>('/countries');
  } catch (err) {
    console.warn('API fetch failed:', err);
    return [];
  }
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

// ─── Payments ─────────────────────────────────────────────

export async function createPaymentIntent(amount: number, campaignId: string = "00000000-0000-0000-0000-000000000000") {
  const res = await fetch(`${baseUrl}/donations/create-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, campaignId }),
  });
  if (!res.ok) throw new Error("Failed to create payment intent");
  return res.json() as Promise<{ clientSecret: string }>;
}
