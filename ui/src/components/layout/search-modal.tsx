"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconSearch, IconX, IconArrowRight } from "@tabler/icons-react";
import { featuredFundraisers } from "@/data/fundraisers";
import { useLanguage } from "@/context/LanguageContext";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return featuredFundraisers.filter(
      (f) => f.title.toLowerCase().includes(q) || f.tag.toLowerCase().includes(q),
    );
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-start justify-center px-4 pt-16 sm:pt-24">
      <div className="absolute inset-0 bg-primary-navy/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[640px] bg-white rounded-3xl shadow-2xl border border-surface-muted overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-surface-muted">
          <IconSearch size={20} stroke={1.8} className="text-text-gray shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="flex-1 h-11 bg-transparent text-[15px] text-primary-navy placeholder:text-text-gray/70 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("shareClose")}
            className="w-9 h-9 rounded-full flex items-center justify-center text-text-gray hover:bg-bg-off-white"
          >
            <IconX size={18} stroke={1.8} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {!query.trim() ? (
            <p className="px-5 py-10 text-center text-[14px] text-text-gray">{t("searchEmpty")}</p>
          ) : results.length === 0 ? (
            <p className="px-5 py-10 text-center text-[14px] text-text-gray">{t("searchNoResults")}</p>
          ) : (
            <>
              <p className="px-5 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray">
                {t("searchResults")} · {results.length}
              </p>
              <ul>
                {results.map((f) => (
                  <li key={f.id}>
                    <Link
                      href={`/campaigns/${f.id}`}
                      onClick={onClose}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-bg-off-white transition-colors"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
                        <Image src={f.image} alt={f.title} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-semibold text-primary-navy truncate">{f.title}</p>
                        <p className="text-[12px] text-text-gray">
                          {f.tag} · {f.currency}
                          {f.raisedAmount.toLocaleString()} {t("raised").toLowerCase()}
                        </p>
                      </div>
                      <IconArrowRight size={16} stroke={1.8} className="text-text-gray shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
