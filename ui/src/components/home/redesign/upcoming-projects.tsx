"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IconCalendar, IconMapPin } from "@tabler/icons-react";
import { kidsCampingCampaign } from "@/data/campaigns";

export function UpcomingProjects() {
  const c = kidsCampingCampaign;

  return (
    <section className="bg-bg-off-white border-y border-surface-muted py-16 md:py-24">
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-[clamp(40px,5vw,120px)]">
        {/* Heading */}
        <div className="flex items-end justify-between gap-4 mb-8 md:mb-12">
          <div>
            <span className="inline-flex items-center h-7 px-3 rounded-full bg-primary-yellow text-primary-navy text-[11px] font-bold uppercase tracking-[0.12em] mb-3">
              Coming Soon
            </span>
            <h2 className="font-heading text-[clamp(24px,3vw,36px)] font-extrabold text-primary-navy tracking-[-0.01em]">
              Future Projects
            </h2>
          </div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid lg:grid-cols-[1.15fr_1fr] bg-white rounded-3xl border border-surface-muted shadow-md overflow-hidden"
        >
          {/* Image */}
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
            <Image
              src={c.heroImage}
              alt={c.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              style={{ objectPosition: c.imagePosition ?? "center" }}
              className="object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur px-5 py-2.5 rounded-full text-[13px] font-bold text-primary-navy shadow-lg">
                <span className="w-2 h-2 rounded-full bg-primary-yellow animate-pulse" />
                Launching Soon
              </span>
            </div>
            <span className="absolute top-4 left-4 inline-flex items-center bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-primary-navy">
              {c.category}
            </span>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
            <h3 className="font-heading text-[clamp(22px,2vw,30px)] font-extrabold text-primary-navy leading-tight tracking-[-0.01em] mb-3">
              {c.title}
            </h3>
            <p className="text-[15px] text-text-gray leading-relaxed mb-6 line-clamp-4">
              {c.description}
            </p>

            <div className="flex flex-col gap-2.5 mb-8">
              <div className="flex items-center gap-2 text-[13px] text-text-gray">
                <IconMapPin size={15} className="text-primary-navy shrink-0" />
                {c.country}
              </div>
              <div className="flex items-center gap-2 text-[13px] text-text-gray">
                <IconCalendar size={15} className="text-primary-navy shrink-0" />
                Opening for donations soon
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center h-[52px] px-6 rounded-[100px] font-bold text-[15px] bg-primary-navy/10 text-primary-navy cursor-default select-none">
                Donate — Coming Soon
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
