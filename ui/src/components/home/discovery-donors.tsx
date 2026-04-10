"use client";

import { useState } from "react";
import type { Donor } from "@/types/campaign";
import { DonorScroll } from "./donor-scroll";
import { DonationsModal } from "./donations-modal";
import { TranslatedText } from "@/components/ui/translated-text";

interface DiscoveryDonorsProps {
  donors: Donor[];
}

export function DiscoveryDonors({ donors }: DiscoveryDonorsProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    tab: "recent" | "top";
  }>({
    isOpen: false,
    tab: "recent",
  });

  const openModal = (tab: "recent" | "top") => {
    setModalState({ isOpen: true, tab });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      <div className="mt-6 border border-[#eee] rounded-2xl p-5 flex-1 flex flex-col justify-between bg-white shadow-sm ring-1 ring-black/[0.03]">
        <DonorScroll donors={donors} />

        {/* Donor buttons */}
        <div className="flex gap-4 mt-5">
          <button
            onClick={() => openModal("recent")}
            className="flex-1 inline-flex items-center justify-center h-[52px] rounded-btn font-bold text-[16px] border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-all transform active:scale-95 shadow-sm"
          >
            <TranslatedText tKey="seeAll" fallback="See all" />
          </button>
          <button
            onClick={() => openModal("top")}
            className="flex-1 inline-flex items-center justify-center gap-2 h-[52px] rounded-btn font-bold text-[16px] border-2 border-primary-navy text-primary-navy hover:bg-primary-navy hover:text-white transition-all transform active:scale-95 shadow-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <TranslatedText tKey="seeTop" fallback="See top" />
          </button>
        </div>
      </div>

      <DonationsModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        donors={donors}
        initialTab={modalState.tab}
      />
    </>
  );
}
