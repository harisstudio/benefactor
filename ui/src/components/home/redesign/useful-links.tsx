"use client";

import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

export function RedesignUsefulLinks() {
  const { t } = useLanguage();

  const links = [
    { href: "/how", title: t("usefulLink1Title"), desc: t("usefulLink1Desc") },
    { href: "/start", title: t("usefulLink4Title"), desc: t("usefulLink4Desc") },
  ];

  return (
    <section className="bg-primary-navy py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)]">
        <div className="grid gap-12 lg:gap-20 lg:grid-cols-[1fr_1.4fr] items-start">
          <div>
            <span className="inline-flex items-center h-7 px-3 rounded-full bg-white/15 text-white text-[11px] font-bold uppercase tracking-[0.14em] mb-5">
              {t("usefulBadge")}
            </span>
            <h2 className="font-heading text-[clamp(28px,3.6vw,42px)] font-extrabold tracking-[-0.01em] leading-[1.1] !text-white max-w-[420px]">
              {t("usefulHeading")}
            </h2>
          </div>

          <ul className="divide-y divide-white/15">
            {links.map((l) => (
              <li key={l.title}>
                <Link
                  href={l.href}
                  className="group flex items-center gap-6 py-6 md:py-7 hover:pl-2 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-[20px] md:text-[22px] font-extrabold !text-white leading-snug">
                      {l.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] text-white/75 leading-relaxed">
                      {l.desc}
                    </p>
                  </div>
                  <span className="shrink-0 w-12 h-12 rounded-full bg-white/10 group-hover:bg-primary-yellow group-hover:text-primary-navy text-white flex items-center justify-center transition-all">
                    <IconArrowRight size={20} stroke={1.8} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
