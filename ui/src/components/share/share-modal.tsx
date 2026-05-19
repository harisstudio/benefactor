"use client";

import { useEffect, useState } from "react";
import {
  IconX,
  IconCopy,
  IconCheck,
  IconBrandWhatsapp,
  IconBrandX,
  IconBrandFacebook,
  IconBrandTelegram,
  IconMail,
  IconShare3,
} from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
  title: string;
  text?: string;
}

export function ShareModal({ open, onClose, url, title, text }: ShareModalProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      setCanNativeShare(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const message = text || title;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedMsg = encodeURIComponent(`${message} ${url}`);

  const targets = [
    {
      key: "whatsapp",
      label: t("shareWhatsapp"),
      Icon: IconBrandWhatsapp,
      color: "bg-emerald-50 text-emerald-600",
      href: `https://wa.me/?text=${encodedMsg}`,
    },
    {
      key: "twitter",
      label: t("shareTwitter"),
      Icon: IconBrandX,
      color: "bg-bg-off-white text-primary-navy",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    },
    {
      key: "facebook",
      label: t("shareFacebook"),
      Icon: IconBrandFacebook,
      color: "bg-blue-50 text-blue-600",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      key: "telegram",
      label: t("shareTelegram"),
      Icon: IconBrandTelegram,
      color: "bg-sky-50 text-sky-600",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      key: "email",
      label: t("shareEmail"),
      Icon: IconMail,
      color: "bg-rose-50 text-rose-600",
      href: `mailto:?subject=${encodedTitle}&body=${encodedMsg}`,
    },
  ];

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const onNative = async () => {
    try {
      await navigator.share({ title, text: message, url });
    } catch {
      /* user cancelled */
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center px-0 sm:px-4">
      <div className="absolute inset-0 bg-primary-navy/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-[480px] bg-white sm:rounded-3xl rounded-t-3xl shadow-2xl border border-surface-muted overflow-hidden animate-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:fade-in sm:zoom-in-95 duration-200">
        <div className="flex items-start justify-between px-6 pt-6 pb-2">
          <div className="pr-6">
            <h3 className="font-heading text-[20px] font-extrabold text-primary-navy">
              {t("shareTitle")}
            </h3>
            <p className="mt-1 text-[13px] text-text-gray leading-relaxed">
              {t("shareSubtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("shareClose")}
            className="w-9 h-9 -mr-1 rounded-full flex items-center justify-center text-text-gray hover:bg-bg-off-white shrink-0"
          >
            <IconX size={18} stroke={1.8} />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="grid grid-cols-5 gap-3">
            {targets.map(({ key, label, Icon, color, href }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group"
              >
                <span
                  className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center group-hover:scale-[1.06] transition-transform`}
                >
                  <Icon size={22} stroke={1.8} />
                </span>
                <span className="text-[11px] font-semibold text-text-gray group-hover:text-primary-navy text-center leading-tight">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 space-y-3">
          <div className="flex items-center gap-2 p-2 pl-4 rounded-[14px] bg-bg-off-white border border-surface-muted">
            <span className="flex-1 text-[13px] text-text-gray truncate font-mono">{url}</span>
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-[100px] bg-primary-navy text-white text-[13px] font-bold hover:bg-primary-navy/90 transition-colors"
            >
              {copied ? (
                <>
                  <IconCheck size={14} stroke={2.2} />
                  {t("shareCopied")}
                </>
              ) : (
                <>
                  <IconCopy size={14} stroke={1.8} />
                  {t("shareCopy")}
                </>
              )}
            </button>
          </div>

          {canNativeShare && (
            <button
              type="button"
              onClick={onNative}
              className="w-full inline-flex items-center justify-center gap-2 h-11 rounded-[100px] border border-surface-muted text-[14px] font-semibold text-primary-navy hover:bg-bg-off-white transition-colors"
            >
              <IconShare3 size={16} stroke={1.8} />
              {t("shareNative")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
