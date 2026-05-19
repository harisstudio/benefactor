"use client";

import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  initialQuery: string;
  initialCategory: string;
}

export function SearchClient({ initialQuery }: Props) {
  const { t } = useLanguage();
  const [query, setQuery] = useState(initialQuery);

  return (
    <section className="bg-bg-off-white min-h-[80vh] py-12 md:py-16">
      <div className="max-w-[720px] mx-auto px-5 sm:px-8">
        <div className="bg-white border border-surface-muted rounded-3xl shadow-sm p-2 flex items-center gap-2">
          <IconSearch size={20} stroke={1.8} className="text-text-gray ml-3 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="flex-1 h-12 bg-transparent text-[15px] text-primary-navy placeholder:text-text-gray/70 focus:outline-none"
          />
        </div>
      </div>
    </section>
  );
}
