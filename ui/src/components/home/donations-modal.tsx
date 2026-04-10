"use client";

import { useState, useEffect } from "react";
import type { Donor } from "@/types/campaign";
import { TranslatedText } from "@/components/ui/translated-text";

interface DonationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  donors: Donor[];
  initialTab?: "recent" | "top";
}

export function DonationsModal({ isOpen, onClose, donors, initialTab = "recent" }: DonationsModalProps) {
  const [activeTab, setActiveTab] = useState<"recent" | "top">(initialTab);

  // Sync activeTab with initialTab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  // Sorting logic
  const sortedDonors = activeTab === "top" 
    ? [...donors].sort((a, b) => b.amount - a.amount)
    : donors; // Mock data is already sorted by date mostly

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-primary-navy font-heading">
            <TranslatedText tKey="donations" fallback="Donations" /> ({donors.length})
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex px-6 pt-4 border-b border-gray-50">
          <button
            onClick={() => setActiveTab("recent")}
            className={`flex-1 pb-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === "recent" 
                ? "border-primary-yellow text-primary-navy" 
                : "border-transparent text-text-gray hover:text-text-dark"
            }`}
          >
            <TranslatedText tKey="recent" fallback="Recent" />
          </button>
          <button
            onClick={() => setActiveTab("top")}
            className={`flex-1 pb-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === "top" 
                ? "border-primary-yellow text-primary-navy" 
                : "border-transparent text-text-gray hover:text-text-dark"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <TranslatedText tKey="topDonations" fallback="Top" />
            </div>
          </button>
        </div>

        {/* Scrollable list */}
        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          <div className="space-y-4">
            {sortedDonors.map((donor, idx) => (
              <div key={`${donor.id}-${idx}`} className="flex items-center justify-between py-2 animate-in fade-in slide-in-from-right duration-500 fill-mode-backwards" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-bg-off-white flex items-center justify-center text-primary-navy font-bold text-sm">
                    {activeTab === "top" ? (
                      <span className="text-[#FF6B00]">#{idx + 1}</span>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 006.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary-navy">{donor.name}</p>
                    <p className="text-xs text-text-gray">{donor.timeAgo}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary-navy leading-none">
                    {donor.currency}{donor.amount.toLocaleString()}
                  </p>
                  {donor.isAnonymous && (
                    <span className="text-[10px] text-text-gray italic">Anonymous</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-center">
          <button 
            onClick={onClose}
            className="h-12 px-8 rounded-btn font-bold text-sm bg-primary-yellow text-primary-navy hover:brightness-110 transition-all shadow-sm"
          >
            <TranslatedText tKey="continue" fallback="Continue" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #dbdbdb;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #888;
        }
      `}</style>
    </div>
  );
}
