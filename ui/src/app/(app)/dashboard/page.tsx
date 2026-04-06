import type { Metadata } from "next";
import Link from "next/link";
import { StatsRow } from "@/components/dashboard/stats-row";
import { FundraiserList } from "@/components/dashboard/fundraiser-list";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { QuickActions } from "@/components/dashboard/quick-actions";

export const metadata: Metadata = {
  title: "Dashboard — Benefactor",
  description: "Manage your fundraisers and track donations.",
};

export default function DashboardPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-5 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-navy font-heading">
          Dashboard
        </h1>
        <Link
          href="/start"
          className="h-10 px-5 inline-flex items-center justify-center rounded-btn font-bold text-sm bg-primary-yellow text-primary-navy hover:brightness-110 transition-all"
        >
          + New Fundraiser
        </Link>
      </div>

      {/* Stats */}
      <StatsRow />

      {/* Fundraisers */}
      <div className="mt-8">
        <FundraiserList />
      </div>

      {/* Two columns: Activity + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <ActivityFeed />
        <QuickActions />
      </div>
    </div>
  );
}
