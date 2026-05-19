"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const categories = [
  { tKey: "catMedical", file: "medical" },
  { tKey: "catEmergency", file: "emergency" },
  { tKey: "catEducation", file: "education" },
  { tKey: "catAnimals", file: "animals" },
  { tKey: "catBusiness", file: "business" },
  { tKey: "catCommunity", file: "community" },
  { tKey: "catEnvironment", file: "environment" },
  { tKey: "catCreative", file: "creative" },
  { tKey: "catSport", file: "sport" },
  { tKey: "catFamily", file: "family" },
  { tKey: "catMemorial", file: "memorial" },
  { tKey: "catTravel", file: "travel" },
];

export function RedesignCategories() {
  const { t } = useLanguage();
  return (
    <section className="bg-white py-16 md:py-24 border-y border-surface-muted">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)]">
        <div className="mb-10 md:mb-14">
          <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold text-primary-navy tracking-[-0.01em]">
            {t("categoriesHeading")}
          </h2>
        </div>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.04 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5"
        >
          {categories.map(({ tKey, file }) => {
            const label = t(tKey);
            return (
            <motion.li
              key={tKey}
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: { opacity: 1, y: 0 },
              }}
              className="flex flex-col items-center text-center bg-bg-off-white border border-surface-muted rounded-2xl px-4 py-7 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <Image
                  src={`/assets/categories/${file}.svg`}
                  alt={label}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="mt-3 text-[14px] font-semibold text-primary-navy">
                {label}
              </span>
            </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}
