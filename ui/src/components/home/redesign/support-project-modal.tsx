"use client";

import { useEffect, useState, type FormEvent } from "react";
import { IconX, IconSparkles, IconMail, IconCheck } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

interface SupportProjectModalProps {
  open: boolean;
  onClose: () => void;
}

type Role = "donor" | "volunteer" | "partner" | "other";

const ROLES: Role[] = ["donor", "volunteer", "partner", "other"];

// Where suggestions land. Override with NEXT_PUBLIC_SUPPORT_EMAIL in .env.local
// (e.g. "team@benefactor.com"). Default falls back to a sensible placeholder.
const SUPPORT_EMAIL =
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "hello@benefactor.com";

export function SupportProjectModal({ open, onClose }: SupportProjectModalProps) {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("donor");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Reset state when re-opened
  useEffect(() => {
    if (open) setSubmitted(false);
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 1. Optimistic UI — show thank-you immediately.
    setSubmitted(true);

    // 2. Open a prefilled email so the message actually reaches the team
    //    without requiring a backend endpoint. When the backend is ready,
    //    replace this with a fetch to /api/support-suggestions.
    const subject = `Kids Camp Center — ${t(`supportRole_${role}`)}: ${name || "Anonymous"}`;
    const body = [
      `Name: ${name || "—"}`,
      `Email: ${email || "—"}`,
      `Role: ${t(`supportRole_${role}`)}`,
      "",
      "Message:",
      message || "—",
    ].join("\n");

    const href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    // Open the user's mail client. The thank-you screen stays on the page.
    window.location.href = href;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-project-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
    >
      {/* Backdrop */}
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
      />

      {/* Card */}
      <div className="relative w-full max-w-[520px] max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative px-7 pt-7 pb-5 border-b border-surface-muted">
          <button
            onClick={onClose}
            aria-label={t("supportClose")}
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center rounded-full hover:bg-bg-off-white text-text-gray transition-colors"
          >
            <IconX size={18} stroke={1.8} />
          </button>

          <span className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-primary-yellow/20 text-primary-navy text-[11px] font-bold uppercase tracking-[0.14em] mb-4">
            <IconSparkles size={13} stroke={2.2} />
            {t("supportComingSoonBadge")}
          </span>
          <h2
            id="support-project-title"
            className="font-heading text-[22px] sm:text-[26px] font-extrabold text-primary-navy tracking-[-0.01em] leading-tight"
          >
            {t("supportHeading")}
          </h2>
          <p className="mt-2 text-[14px] text-text-gray leading-relaxed">
            {t("supportLeadCopy")}
          </p>
        </div>

        {/* Body */}
        {submitted ? (
          <div className="px-7 py-10 text-center">
            <div className="mx-auto w-14 h-14 rounded-full bg-primary-yellow/30 flex items-center justify-center mb-4">
              <IconCheck size={28} stroke={2.4} className="text-primary-navy" />
            </div>
            <h3 className="font-heading text-[20px] font-extrabold text-primary-navy mb-2">
              {t("supportThanksTitle")}
            </h3>
            <p className="text-[14px] text-text-gray leading-relaxed mb-6">
              {t("supportThanksBody")}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center h-11 px-6 rounded-[100px] font-bold text-[14px] bg-primary-yellow text-primary-navy hover:bg-primary-yellow-hover transition-all"
            >
              {t("supportClose")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
            {/* Role chips */}
            <div>
              <label className="block text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em] mb-2">
                {t("supportRoleLabel")}
              </label>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((r) => {
                  const active = role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={
                        "h-9 px-4 rounded-[100px] text-[13px] font-semibold transition-all " +
                        (active
                          ? "bg-primary-navy text-white"
                          : "bg-bg-off-white text-primary-navy hover:bg-surface-muted")
                      }
                    >
                      {t(`supportRole_${r}`)}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="support-name"
                  className="block text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em] mb-1.5"
                >
                  {t("supportName")}
                </label>
                <input
                  id="support-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3 border border-surface-muted rounded-[12px] text-[14px] text-primary-navy bg-white focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="support-email"
                  className="block text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em] mb-1.5"
                >
                  {t("supportEmail")}
                </label>
                <input
                  id="support-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3 border border-surface-muted rounded-[12px] text-[14px] text-primary-navy bg-white focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="support-message"
                className="block text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em] mb-1.5"
              >
                {t("supportMessage")}
              </label>
              <textarea
                id="support-message"
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("supportMessagePlaceholder")}
                className="w-full px-3 py-2.5 border border-surface-muted rounded-[12px] text-[14px] text-primary-navy bg-white focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all resize-none"
              />
            </div>

            <p className="text-[12px] text-text-gray flex items-start gap-2">
              <IconMail size={14} stroke={1.8} className="shrink-0 mt-0.5" />
              <span>{t("supportPrivacyNote")}</span>
            </p>

            <button
              type="submit"
              className="w-full h-12 rounded-[100px] font-bold text-[15px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
            >
              {t("supportSubmit")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
