"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MobileDrawer } from "./mobile-drawer";

export function FullNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/98 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.05)] py-2"
            : "bg-transparent py-4"
        )}
      >
        <div
          className="max-w-[1600px] mx-auto flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]"
          style={{ padding: "0 clamp(20px, 5vw, 120px)" }}
        >
          {/* Left — desktop only */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#"
              className={cn(
                "flex items-center gap-1.5 text-sm font-medium transition-colors min-h-[44px]",
                scrolled ? "text-text-dark" : "text-white"
              )}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" />
              </svg>
              Search
            </Link>
            <Link
              href="#"
              className={cn(
                "text-sm font-medium transition-colors min-h-[44px] flex items-center",
                scrolled ? "text-text-dark" : "text-white"
              )}
            >
              Donate &#9662;
            </Link>
            <Link
              href="#"
              className={cn(
                "text-sm font-medium transition-colors min-h-[44px] flex items-center",
                scrolled ? "text-text-dark" : "text-white"
              )}
            >
              Fundraise &#9662;
            </Link>
          </div>

          {/* Center - Logo */}
          <Link href="/" className="flex justify-center">
            <Image
              src="/assets/logo.svg"
              alt="Benefactor"
              width={160}
              height={32}
              className={cn(
                "transition-all h-auto md:w-[160px] w-[120px]",
                scrolled ? "brightness-100" : "brightness-0 invert"
              )}
              priority
            />
          </Link>

          {/* Right */}
          <div className="flex items-center justify-end gap-4">
            <div
              className="relative hidden md:block"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                className={cn(
                  "text-sm font-medium transition-colors min-h-[44px] flex items-center",
                  scrolled ? "text-text-dark" : "text-white"
                )}
              >
                About &#9662;
              </button>
              {aboutOpen && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link href="/how" className="block px-4 py-2.5 text-sm text-text-dark hover:bg-bg-off-white">
                    How Benefactor Works
                  </Link>
                  <Link href="/about" className="block px-4 py-2.5 text-sm text-text-dark hover:bg-bg-off-white">
                    About Benefactor
                  </Link>
                  <Link href="/careers" className="block px-4 py-2.5 text-sm text-text-dark hover:bg-bg-off-white">
                    Career Team &ndash; Join Us
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/signin"
              className={cn(
                "hidden md:inline-flex items-center text-sm font-medium transition-colors min-h-[44px]",
                scrolled ? "text-text-dark" : "text-white"
              )}
            >
              Sign in
            </Link>

            <Link
              href="/start"
              className={cn(
                "hidden md:inline-flex items-center justify-center h-10 px-5 rounded-btn text-sm font-bold transition-all border-2",
                scrolled
                  ? "border-primary-yellow bg-primary-yellow text-primary-navy"
                  : "border-primary-yellow text-white bg-transparent hover:bg-primary-yellow hover:text-primary-navy"
              )}
            >
              Start a Benefactor
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-11 h-11 flex flex-col gap-1.5 items-center justify-center"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <span className={cn("w-5 h-0.5 transition-colors", scrolled ? "bg-text-dark" : "bg-white")} />
              <span className={cn("w-5 h-0.5 transition-colors", scrolled ? "bg-text-dark" : "bg-white")} />
              <span className={cn("w-5 h-0.5 transition-colors", scrolled ? "bg-text-dark" : "bg-white")} />
            </button>
          </div>
        </div>
      </nav>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
