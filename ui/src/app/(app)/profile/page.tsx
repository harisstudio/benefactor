import type { Metadata } from "next";
import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileForm } from "@/components/profile/profile-form";

export const metadata: Metadata = {
  title: "My Profile — Benefactor",
  description: "Manage your account settings and personal information.",
};

export default function ProfilePage() {
  return (
    <div className="bg-bg-off-white min-h-screen">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8 py-10 md:py-14">
        <nav className="flex items-center gap-1.5 text-[13px] text-text-gray mb-6" aria-label="Breadcrumb">
          <Link href="/dashboard" className="hover:text-primary-navy font-semibold transition-colors">
            Dashboard
          </Link>
          <IconChevronRight size={14} className="text-text-gray/60" />
          <span className="text-primary-navy font-semibold">Profile</span>
        </nav>

        <div className="mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray mb-2">
            Settings
          </p>
          <h1 className="font-heading text-[clamp(28px,3.4vw,42px)] font-extrabold text-primary-navy tracking-[-0.015em]">
            Profile
          </h1>
        </div>

        <ProfileHeader />
        <ProfileForm />
      </div>
    </div>
  );
}
