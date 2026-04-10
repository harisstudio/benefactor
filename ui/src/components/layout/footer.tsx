"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSelector } from "./language-selector";

const donateLinks = [
  { label: "Categories", href: "#" },
  { label: "Crisis relief", href: "#" },
  { label: "Social Impact Funds", href: "#" },
  { label: "Supporter Space", href: "#" },
];

const categoriesLinks = [
  { label: "How to start a Benefactor", href: "#" },
  { label: "Fundraising categories", href: "#" },
  { label: "Team fundraising", href: "#" },
  { label: "Fundraising Blog", href: "#" },
  { label: "Charity fundraising", href: "#" },
  { label: "Sign up as a nonprofit", href: "#" },
];

const aboutLinks = [
  { label: "How Benefactor works", href: "/how" },
  { label: "Benefactor Giving Guarantee", href: "#" },
  { label: "Supported countries", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "About Benefactor", href: "/about" },
];

const legalLinks = [
  "Terms", "Privacy", "Notice", "Legal",
  "Accessibility Statement", "Cookie Policy",
  "Manage Cookie Preferences", "Your Privacy Choices",
];

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer 
      className="relative text-white overflow-hidden mt-0"
      style={{
        backgroundColor: "var(--primary-navy, #0E3347)",
        backgroundImage: "url('/assets/footer2.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Main Content Area */}
      <div className="max-w-container w-full mx-auto px-[clamp(20px,5vw,80px)] pt-16 md:pt-24 pb-12 md:pb-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand & Contact Column */}
          <div className="flex flex-col gap-10">
            <Link href="/">
              <Image 
                src="/assets/logo-footer.png" 
                alt="Benefactor Logo" 
                width={200} 
                height={60} 
                className="h-auto w-[180px] md:w-[200px] object-contain"
              />
            </Link>

            <div className="flex flex-col gap-3 text-[14.5px] font-medium text-white/95 mt-2">
              <a href="mailto:careerbenefactor@info.com" className="hover:text-primary-yellow transition-colors drop-shadow-sm">
                careerbenefactor@info.com
              </a>
              <a href="mailto:benefactor@info.com" className="hover:text-primary-yellow transition-colors drop-shadow-sm">
                benefactor@info.com
              </a>
            </div>

            <LanguageSelector />
          </div>

          {/* Donate Column */}
          <div className="md:pl-6">
            <h4 className="text-[17px] font-bold mb-7 text-white tracking-wide">{t("donate").replace(" ▾", "")}</h4>
            <ul className="space-y-5">
              {donateLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[14.5px] text-white/85 hover:text-white hover:underline transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-[17px] font-bold mb-7 text-white tracking-wide">{t("footerCategories")}</h4>
            <ul className="space-y-5">
              {categoriesLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[14.5px] text-white/85 hover:text-white hover:underline transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="text-[17px] font-bold mb-7 text-white tracking-wide">{t("footerAbout")}</h4>
            <ul className="space-y-5">
              {aboutLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[14.5px] text-white/85 hover:text-white hover:underline transition-all">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom White Bar */}
      <div className="bg-white text-primary-navy py-4 relative z-10 w-full rounded-tl-sm rounded-tr-sm">
        <div className="max-w-container mx-auto px-[clamp(20px,5vw,80px)] flex flex-col xl:flex-row xl:items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-x-[18px] gap-y-2">
            <span className="text-[12px] font-black text-primary-navy/80 tracking-tight">&copy; 2026 Benefactor Team</span>
            {legalLinks.map((label) => (
              <Link key={label} href="#" className="text-[13px] font-bold text-primary-navy/80 hover:text-primary-navy transition-colors">
                {label}
              </Link>
            ))}
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-5 text-primary-navy">
            {/* Facebook */}
            <a href="#" className="hover:text-primary-navy/70 transition-colors" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
                <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
              </svg>
            </a>
            {/* YouTube */}
            <a href="#" className="hover:text-primary-navy/70 transition-colors" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
              </svg>
            </a>
            {/* X (Twitter) */}
            <a href="#" className="hover:text-primary-navy/70 transition-colors" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[20px] h-[20px]">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:text-primary-navy/70 transition-colors" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
