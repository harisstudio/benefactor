"use client";

import Image from "next/image";
import Link from "next/link";

interface StartSidebarProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}

export function StartSidebar({
  currentStep,
  totalSteps,
  title,
  subtitle,
}: StartSidebarProps) {
  return (
    <div className="hidden lg:flex flex-col w-[38%] min-h-screen bg-bg-off-white p-10 sticky top-0">
      <Link href="/">
        <Image src="/assets/logo.svg" alt="Benefactor" width={160} height={32} />
      </Link>

      <div className="mt-auto mb-auto">
        <h1 className="text-3xl font-bold text-primary-navy leading-tight">
          {title}
        </h1>
        <p className="mt-4 text-base text-text-gray leading-relaxed">
          {subtitle}
        </p>
        {currentStep > 0 && currentStep <= totalSteps && (
          <p className="mt-6 text-sm text-text-gray">
            {currentStep} of {totalSteps}
          </p>
        )}
      </div>
    </div>
  );
}
