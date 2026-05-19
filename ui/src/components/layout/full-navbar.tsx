"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconSearch, IconChevronDown } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { MobileDrawer } from "./mobile-drawer";
import { SearchModal } from "./search-modal";
import { LangToggle } from "./lang-toggle";
import { authClient } from "@/lib/auth-client";

interface FullNavbarProps {
  alwaysShowLogo?: boolean;
}

type DropKey = "donate" | "fundraise" | "about" | null;

export function FullNavbar({ alwaysShowLogo = false }: FullNavbarProps) {
  const { t } = useLanguage();
  const { data: session } = authClient.useSession();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<DropKey>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hover = (key: DropKey) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenDrop(key);
  };

  const leave = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenDrop(null), 120);
  };

  const donateLinks = [
    { href: "/campaigns/1", label: t("donateFeatured") },
    { href: "/search", label: t("donateBrowse") },
    { href: "/search?category=Medical", label: t("donateCategories") },
  ];
  const fundraiseLinks = [
    { href: "/start", label: t("fundraiseStart") },
    { href: "/how", label: t("fundraiseHow") },
    { href: "/how#tips", label: t("fundraiseTips") },
  ];
  const aboutLinks = [
    { href: "/how", label: t("aboutHow") },
    { href: "/about", label: t("aboutAbout") },
    { href: "/careers", label: t("aboutCareers") },
  ];

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-[10px]",
          scrolled
            ? "bg-white/[0.98] border-b border-surface-muted shadow-sm py-2"
            : "bg-transparent py-3 md:py-4",
        )}
      >
        <div
          className="max-w-[1600px] mx-auto flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]"
          style={{ padding: "0 clamp(20px, 5vw, 120px)" }}
        >
          {/* Left */}
          <div className="hidden md:flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex items-center gap-1.5 h-11 px-3 rounded-full text-[14px] font-medium text-text-dark hover:bg-bg-off-white transition-colors"
            >
              <IconSearch size={16} stroke={1.8} />
              {t("search")}
            </button>

            <NavDropdown
              label={t("donate")}
              isOpen={openDrop === "donate"}
              onEnter={() => hover("donate")}
              onLeave={leave}
              links={donateLinks}
            />

            <NavDropdown
              label={t("fundraise")}
              isOpen={openDrop === "fundraise"}
              onEnter={() => hover("fundraise")}
              onLeave={leave}
              links={fundraiseLinks}
            />
          </div>

          {/* Center - Logo */}
          <Link
            href="/"
            className={cn(
              "flex justify-center transition-all duration-500 ease-out",
              scrolled || alwaysShowLogo
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-6 scale-[0.95] pointer-events-none",
            )}
          >
            <Image
              src="/assets/logo.svg"
              alt="Benefactor"
              width={160}
              height={32}
              className="h-auto md:w-[160px] w-[120px]"
              priority
            />
          </Link>

          {/* Right */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden md:block">
              <NavDropdown
                label={t("about")}
                isOpen={openDrop === "about"}
                onEnter={() => hover("about")}
                onLeave={leave}
                links={aboutLinks}
                align="right"
              />
            </div>

            <LangToggle className="hidden md:inline-flex" />

            {session ? (
              <Link
                href="/profile"
                className="hidden lg:inline-flex items-center h-11 px-3 text-[14px] font-medium text-text-dark hover:bg-bg-off-white rounded-full transition-colors"
              >
                {session.user.name || t("signin")}
              </Link>
            ) : (
              <Link
                href="/signin"
                className="hidden lg:inline-flex items-center h-11 px-3 text-[14px] font-medium text-text-dark hover:bg-bg-off-white rounded-full transition-colors"
              >
                {t("signin")}
              </Link>
            )}

            <Link
              href="/start"
              className="hidden lg:inline-flex items-center justify-center h-10 px-6 rounded-[100px] text-[14px] font-bold transition-all border-2 border-primary-yellow bg-white text-primary-navy hover:bg-primary-yellow"
            >
              {t("startBenefactor")}
            </Link>

            <button
              className="md:hidden w-11 h-11 flex flex-col gap-1.5 items-center justify-center"
              onClick={() => setMobileOpen(true)}
              aria-label={t("openMenu")}
            >
              <span className="w-5 h-0.5 bg-text-dark" />
              <span className="w-5 h-0.5 bg-text-dark" />
              <span className="w-5 h-0.5 bg-text-dark" />
            </button>
          </div>
        </div>
      </nav>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        session={session ?? null}
      />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function NavDropdown({
  label,
  isOpen,
  onEnter,
  onLeave,
  links,
  align = "left",
}: {
  label: string;
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  links: { href: string; label: string }[];
  align?: "left" | "right";
}) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        type="button"
        className="inline-flex items-center gap-1 h-11 px-3 rounded-full text-[14px] font-medium text-text-dark hover:bg-bg-off-white transition-colors"
      >
        {label}
        <IconChevronDown
          size={14}
          stroke={2}
          className={cn("transition-transform opacity-70", isOpen && "rotate-180")}
        />
      </button>

      <div
        className={cn(
          "absolute top-full mt-1 min-w-[200px] bg-white border border-surface-muted rounded-2xl shadow-lg py-2 transition-all",
          align === "right" ? "right-0" : "left-0",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none",
        )}
      >
        {links.map((l) => (
          <Link
            key={l.href + l.label}
            href={l.href}
            className="block px-4 py-2.5 text-[14px] font-medium text-primary-navy hover:bg-bg-off-white transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
