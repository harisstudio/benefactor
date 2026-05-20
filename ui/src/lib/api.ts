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

const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";
const baseUrl = rawBaseUrl.endsWith("/api")
  ? rawBaseUrl
  : rawBaseUrl
    ? `${rawBaseUrl.replace(/\/$/, "")}/api`
    : "";

/**
 * Skip the network entirely when we don't have a real backend pointed at
 * (no env var, or pointed at localhost while running on a real host). This
 * keeps the deployed demo snappy and the browser console clean — every
 * route already has a typed mock fallback below.
 */
const API_DISABLED = (() => {
  if (!baseUrl) return true;
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    const looksLikeLocal = /localhost|127\.0\.0\.1/.test(baseUrl);
    const onRealHost =
      host !== "localhost" && host !== "127.0.0.1" && !host.endsWith(".local");
    if (looksLikeLocal && onRealHost) return true;
  }
  return false;
})();

/** Avoid hanging SSR when API host is wrong or offline (falls back to mocks quickly). */
const API_FETCH_TIMEOUT_MS = 4000;

/**
 * Fetch wrapper that talks to our backend. When `API_DISABLED` is true the
 * caller's try/catch will trip and the mock fallback runs.
 */
async function apiFetch<T>(path: string): Promise<T> {
  if (API_DISABLED) {
    throw new Error("API disabled — no backend configured");
  }
  const url = `${baseUrl}${path}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      next: { revalidate: 0 },
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`API ${res.status}: ${path}`);
    }

    return await res.json() as T;
  } catch (err) {
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
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

interface StripeDonationDTO {
  id: string;
  name: string;
  amount: number;
  currency: string;
  createdAt: number;
  isAnonymous: boolean;
  message?: string;
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.max(1, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function currencySymbol(code: string): string {
  const c = code.toUpperCase();
  if (c === "GBP") return "£";
  if (c === "USD") return "$";
  return "€";
}

export async function getDonors(campaignId: string): Promise<Donor[]> {
  try {
    const res = await apiFetch<{ donations: StripeDonationDTO[] }>("/donations/recent");
    const live = (res?.donations || []).map((d) => ({
      id: d.id,
      name: d.isAnonymous ? "Anonymous" : d.name,
      amount: d.amount,
      currency: currencySymbol(d.currency),
      timeAgo: formatTimeAgo(d.createdAt),
      isAnonymous: d.isAnonymous,
      message: d.message,
    }));
    // Append the historical mock donors after the live ones so the feed always
    // looks populated even when Stripe has few recent charges.
    void campaignId;
    return [...live, ...mockDonors];
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

export async function createPaymentIntent(
  amount: number,
  currency: string = "eur",
  options: { showName?: boolean; campaignId?: string } = {},
) {
  const campaignId = options.campaignId ?? "00000000-0000-0000-0000-000000000000";
  if (API_DISABLED) {
    throw new Error(
      "Donations are not yet enabled on this environment. Backend is being connected — please check back soon.",
    );
  }
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${baseUrl}/donations/create-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount,
        currency: currency.toLowerCase(),
        campaignId,
        showName: !!options.showName,
      }),
      signal: controller.signal,
    });
    if (!res.ok) throw new Error("Failed to create payment intent");
    return res.json() as Promise<{ clientSecret: string }>;
  } finally {
    clearTimeout(timeoutId);
  }
}
