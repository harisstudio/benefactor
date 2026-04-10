import type { Metadata } from "next";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileForm } from "@/components/profile/profile-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Profile — Benefactor",
  description: "Manage your account settings and personal information.",
};

export default function ProfilePage() {
  return (
    <div className="max-w-[1100px] mx-auto px-5 py-8 md:py-12">
      <div className="flex items-center gap-2 text-sm text-text-gray mb-6">
        <Link href="/dashboard" className="hover:text-primary-navy transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-text-dark font-medium">My Profile</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-primary-navy font-heading">
          Profile Settings
        </h1>
      </div>

      <ProfileHeader />
      <ProfileForm />
    </div>
  );
}
