"use client";

import { useState } from "react";
import { IconCircleCheck } from "@tabler/icons-react";

const inputClass =
  "w-full h-12 px-4 border border-surface-muted rounded-[14px] text-[15px] text-text-dark placeholder:text-text-gray/70 bg-white focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all";

const labelClass =
  "block text-[11px] font-semibold text-text-gray mb-1.5 uppercase tracking-[0.1em]";

export function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "Haris Ozturk",
    email: "haris@benefactorteam.com",
    phone: "+44 7700 900000",
    bio: "Passionate about community-led impact and global fundraising. Building Benefactor to empower everyone to make a difference.",
    language: "en",
    notifications: { email: true, phone: false },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-10 bg-white rounded-3xl border border-surface-muted shadow-sm p-6 md:p-8"
    >
      <section>
        <h3 className="font-heading text-[18px] font-extrabold text-primary-navy mb-5 pb-3 border-b border-surface-muted">
          Personal information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Preferred language</label>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className={`${inputClass} appearance-none`}
            >
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label className={labelClass}>Bio</label>
          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Tell us a bit about yourself."
            className={`${inputClass.replace("h-12", "h-auto")} py-3 resize-y leading-relaxed`}
          />
        </div>
      </section>

      <section>
        <h3 className="font-heading text-[18px] font-extrabold text-primary-navy mb-5 pb-3 border-b border-surface-muted">
          Notifications
        </h3>

        {(["email", "phone"] as const).map((key) => {
          const enabled = formData.notifications[key];
          return (
            <label
              key={key}
              className="flex items-center justify-between gap-4 py-3 cursor-pointer"
            >
              <div>
                <p className="text-[14px] font-semibold text-primary-navy">
                  {key === "email" ? "Email updates" : "SMS notifications"}
                </p>
                <p className="text-[12px] text-text-gray mt-0.5">
                  {key === "email"
                    ? "Get campaign news and donation receipts by email."
                    : "Get critical alerts as text messages."}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    notifications: { ...formData.notifications, [key]: !enabled },
                  })
                }
                className={`relative shrink-0 w-12 h-7 rounded-full transition-colors ${
                  enabled ? "bg-primary-navy" : "bg-surface-muted"
                }`}
                role="switch"
                aria-checked={enabled}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                    enabled ? "translate-x-5" : ""
                  }`}
                />
              </button>
            </label>
          );
        })}
      </section>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-surface-muted">
        <p className="text-[12px] text-text-gray max-w-[320px]">
          Keep your details current so our team can reach you for campaign reviews.
        </p>

        <div className="flex items-center gap-3">
          {showSuccess && (
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-600">
              <IconCircleCheck size={15} stroke={2.2} />
              Saved
            </span>
          )}
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center justify-center h-11 px-7 rounded-[100px] font-bold text-[14px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] disabled:opacity-60 transition-all min-w-[140px]"
          >
            {isSaving ? (
              <span className="w-4 h-4 border-2 border-primary-navy border-t-transparent rounded-full animate-spin" />
            ) : (
              "Save changes"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
