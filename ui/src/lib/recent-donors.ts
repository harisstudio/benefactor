/**
 * Lightweight client-side cache of recent donations so the donor feed updates
 * immediately after a successful checkout without waiting for the backend
 * webhook → database round-trip. Persisted in localStorage so it survives
 * navigation and refreshes.
 */

import type { Donor } from "@/types/campaign";

const STORAGE_KEY = "benefactor:recent-donors";
const MAX_ENTRIES = 20;

interface StoredDonor extends Omit<Donor, "timeAgo"> {
  timestamp: number;
  // Which campaign this donation belongs to, so each campaign's feed only
  // shows its own donors and they never bleed across campaigns.
  campaignId?: string;
}

function isBrowser() {
  return typeof window !== "undefined" && typeof localStorage !== "undefined";
}

function read(): StoredDonor[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(entries: StoredDonor[]) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
    window.dispatchEvent(new Event("benefactor:recent-donors:changed"));
  } catch {
    // ignore quota / private-mode errors
  }
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

export function addRecentDonor(input: {
  name?: string;
  amount: number;
  currency: string;
  isAnonymous?: boolean;
  message?: string;
  campaignId?: string;
}) {
  if (!isBrowser()) return;
  const code = input.currency.toUpperCase();
  const symbol = code === "GBP" ? "£" : code === "USD" ? "$" : "€";
  const entry: StoredDonor = {
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    // Public donor feed defaults to Anonymous; opt-in display name is a
    // future feature once we wire up an explicit consent toggle.
    name: "Anonymous",
    amount: Math.round(input.amount * 100) / 100,
    currency: symbol,
    isAnonymous: true,
    message: input.message,
    timestamp: Date.now(),
    campaignId: input.campaignId,
  };
  const current = read();
  write([entry, ...current]);
}

/**
 * Recent local donations. Pass a `campaignId` to get only that campaign's
 * donors; without one you get the whole feed. Entries are always scoped to a
 * campaign, so a donation to one cause never appears under another.
 */
export function getRecentDonors(campaignId?: string): Donor[] {
  return read()
    .filter((d) => (campaignId ? d.campaignId === campaignId : true))
    .map((d) => ({
      id: d.id,
      name: d.name,
      amount: d.amount,
      currency: d.currency,
      isAnonymous: d.isAnonymous,
      message: d.message,
      timeAgo: formatTimeAgo(d.timestamp),
    }));
}

/** Subscribe to changes (cross-tab via 'storage', same-tab via custom event). */
export function subscribeRecentDonors(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener("benefactor:recent-donors:changed", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("benefactor:recent-donors:changed", handler);
  };
}
