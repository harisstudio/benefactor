"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  session: { user: { name?: string | null } } | null;
}

export function MobileDrawer({ open, onClose, session }: MobileDrawerProps) {
  const { t } = useLanguage();

  const accountLink = session
    ? { href: "/profile", label: session.user.name || t("navProfile") }
    : { href: "/signin", label: t("signin") };

  const sections: {
    heading?: string;
    links: { href: string; label: string }[];
  }[] = [
    {
      links: [
        { href: "/", label: t("navHome") },
        { href: "/campaigns/1", label: t("donate") },
        { href: "/start", label: t("fundraise") },
      ],
    },
    {
      heading: t("about"),
      links: [
        { href: "/how", label: t("fundraiseHow") },
        { href: "/about", label: t("aboutAbout") },
        { href: "/careers", label: t("aboutCareers") },
      ],
    },
    {
      heading: t("navAccount"),
      links: [accountLink],
    },
  ];

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-primary-navy/50 backdrop-blur-sm z-[998] transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-[88%] max-w-[340px] bg-white z-[999] shadow-2xl transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
        role="dialog"
        aria-label={t("openMenu")}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-muted">
          <Link href="/" onClick={onClose}>
            <Image
              src="/assets/logo.svg"
              alt="Benefactor"
              width={130}
              height={26}
              className="h-auto w-[120px]"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 rounded-full flex items-center justify-center text-text-gray hover:bg-bg-off-white hover:text-primary-navy transition-colors"
            aria-label={t("closeMenu")}
          >
            <IconX size={20} stroke={1.8} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 py-6 space-y-7">
          {sections.map((s, i) => (
            <div key={i}>
              {s.heading && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-gray mb-3 px-2">
                  {s.heading}
                </p>
              )}
              <div className="space-y-0.5">
                {s.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="block py-3 px-3 rounded-xl text-[15px] font-semibold text-primary-navy hover:bg-bg-off-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-5 border-t border-surface-muted">
          <Link
            href="/start"
            onClick={onClose}
            className="flex items-center justify-center h-12 rounded-[100px] font-bold text-[14px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
          >
            {t("startBenefactor")}
          </Link>
        </div>
      </aside>
    </>
  );
}
