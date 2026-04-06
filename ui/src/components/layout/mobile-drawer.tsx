"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-[998] transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-[280px] bg-white z-[999] shadow-lg transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        aria-hidden={!open}
        role="dialog"
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <Image src="/assets/logo.svg" alt="Benefactor" width={130} height={26} />
          <button
            onClick={onClose}
            className="text-2xl text-text-gray hover:text-text-dark min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            &times;
          </button>
        </div>

        <nav className="flex flex-col p-5 gap-1">
          {[
            { href: "#", label: "Search" },
            { href: "#", label: "Donate" },
            { href: "#", label: "Fundraise" },
            { href: "/how", label: "How Benefactor Works" },
            { href: "/about", label: "About Benefactor" },
            { href: "/careers", label: "Careers" },
            { href: "/signin", label: "Sign in" },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="py-3 px-2 text-base text-text-dark hover:bg-bg-off-white rounded-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/start"
            onClick={onClose}
            className="mt-4 flex items-center justify-center h-12 rounded-btn font-bold text-sm border-2 border-primary-yellow text-primary-navy hover:bg-primary-yellow transition-colors"
          >
            Start a Benefactor
          </Link>
        </nav>
      </div>
    </>
  );
}
