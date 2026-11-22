"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconSearch, IconUsers, IconTarget } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";
import { allCampaigns } from "@/data/campaigns";
import { Amount } from "@/components/ui/amount";

const CATEGORIES = ["All", ...Array.from(new Set(allCampaigns.map((c) => c.category)))];

const COUNTRY_FLAGS: Record<string, string> = {
  Lithuania: "🇱🇹",
  Turkey: "🇹🇷",
  "United Kingdom": "🇬🇧",
};

interface Props {
  initialQuery: string;
  initialCategory: string;
}

export function SearchClient({ initialQuery, initialCategory }: Props) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory || "All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allCampaigns.filter((c) => {
      const matchCat = category === "All" || c.category === category;
      const matchQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.country ?? "").toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, category]);

  return (
    <section className="bg-bg-off-white min-h-[80vh] py-12 md:py-16">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        {/* Search bar */}
        <div className="bg-white border border-surface-muted rounded-3xl shadow-sm p-2 flex items-center gap-2 mb-6">
          <IconSearch size={20} stroke={1.8} className="text-text-gray ml-3 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="flex-1 h-12 bg-transparent text-[15px] text-primary-navy placeholder:text-text-gray/70 focus:outline-none"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={
                "h-9 px-4 rounded-full text-[13px] font-semibold border transition-all " +
                (category === cat
                  ? "bg-primary-navy text-white border-primary-navy"
                  : "bg-white text-primary-navy border-surface-muted hover:bg-bg-off-white")
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <p className="text-center text-text-gray py-16 text-[15px]">{t("searchNoResults")}</p>
        ) : (
          <div className="space-y-6">
            {filtered.map((c, i) => {
              const pct = Math.min(100, Math.round((c.raisedAmount / c.goalAmount) * 100));
              return (
                <motion.article
                  key={c.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease: "easeOut" }}
                  className="grid sm:grid-cols-[260px_1fr] bg-white rounded-3xl border border-surface-muted shadow-sm overflow-hidden"
                >
                  <Link
                    href={`/campaigns/${c.id}`}
                    aria-label={c.title}
                    className="group relative aspect-video sm:aspect-auto sm:min-h-[200px] block overflow-hidden"
                  >
                    <Image
                      src={c.heroImage}
                      alt={c.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 260px"
                      style={{ objectPosition: c.imagePosition ?? "center" }}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary-navy">
                      {c.category}
                    </span>
                    {c.country && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary-navy">
                        <span aria-hidden className="text-[12px] leading-none">{COUNTRY_FLAGS[c.country] ?? "🏳️"}</span>
                        {c.country}
                      </span>
                    )}
                  </Link>

                  <div className="p-5 sm:p-6 flex flex-col">
                    <Link href={`/campaigns/${c.id}`}>
                      <h3 className="font-heading text-[18px] sm:text-[20px] font-extrabold text-primary-navy leading-tight mb-2 hover:underline decoration-2 underline-offset-3">
                        {c.title}
                      </h3>
                    </Link>
                    <p className="text-[13px] text-text-gray leading-relaxed mb-4 line-clamp-2">
                      {c.description}
                    </p>

                    <div className="mb-3">
                      <div className="flex items-baseline justify-between mb-1.5 gap-2 flex-wrap">
                        <Amount
                          amount={c.raisedAmount}
                          currency={c.currency}
                          className="text-[16px] font-extrabold text-primary-navy"
                        />
                        <span className="text-[12px] text-text-gray">
                          of{" "}
                          <Amount amount={c.goalAmount} currency={c.currency} className="font-semibold" />
                        </span>
                      </div>
                      <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-yellow rounded-full transition-all duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="mt-1 text-[11px] font-semibold text-primary-navy">{pct}% funded</p>
                    </div>

                    <div className="flex items-center gap-4 text-[12px] text-text-gray mb-4">
                      <span className="flex items-center gap-1">
                        <IconUsers size={13} />
                        {c.donationCount} donors
                      </span>
                      <span className="flex items-center gap-1">
                        <IconTarget size={13} />
                        Goal: <Amount amount={c.goalAmount} currency={c.currency} className="ml-0.5 font-semibold text-primary-navy" />
                      </span>
                    </div>

                    <Link
                      href={`/checkout?campaign=${c.id}`}
                      className="mt-auto inline-flex items-center justify-center h-11 px-6 rounded-[100px] font-bold text-[14px] bg-primary-yellow text-primary-navy shadow-sm hover:bg-primary-yellow-hover hover:shadow-md active:scale-[0.98] transition-all self-start"
                    >
                      Donate
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
