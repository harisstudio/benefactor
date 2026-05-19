"use client";

import Image from "next/image";
import { IconPencil } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

interface ReviewState {
  title: string;
  goalAmount: string;
  category: string;
  country: string;
  postcode: string;
  story: string;
  coverImage: string | null;
  email: string;
  phone: string;
}

interface StepReviewProps {
  state: ReviewState;
  onEdit: (step: number) => void;
  onLaunch: () => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

function ReviewRow({
  label,
  value,
  editStep,
  onEdit,
  notSetLabel,
  editLabel,
}: {
  label: string;
  value: string;
  editStep: number;
  onEdit: (s: number) => void;
  notSetLabel: string;
  editLabel: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-surface-muted last:border-0">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold text-text-gray uppercase tracking-[0.1em] mb-1">
          {label}
        </p>
        <p className="text-[14px] text-primary-navy font-semibold break-words">
          {value || <span className="text-text-gray font-normal">{notSetLabel}</span>}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onEdit(editStep)}
        className="inline-flex items-center gap-1 h-9 px-3 text-[12px] font-bold text-primary-navy hover:bg-bg-off-white rounded-lg transition-colors shrink-0"
      >
        <IconPencil size={13} stroke={1.9} />
        {editLabel}
      </button>
    </div>
  );
}

const inputClass =
  "w-full h-12 px-4 border border-surface-muted rounded-[14px] text-[15px] text-text-dark placeholder:text-text-gray/70 focus:outline-none focus:border-primary-navy focus:ring-2 focus:ring-primary-navy/10 transition-all";

const labelClass =
  "block text-[11px] font-semibold text-text-gray mb-1.5 uppercase tracking-[0.1em]";

export function StepReview({ state, onEdit, onLaunch, onEmailChange, onPhoneChange }: StepReviewProps) {
  const { t } = useLanguage();
  const notSet = t("stepReviewNotSet");
  const edit = t("stepReviewEdit");
  return (
    <div className="space-y-6">
      {state.coverImage && (
        <div className="relative rounded-2xl overflow-hidden aspect-video border border-surface-muted">
          <Image src={state.coverImage} alt={t("stepReviewCoverAlt")} fill className="object-cover" />
        </div>
      )}

      <div className="bg-white border border-surface-muted rounded-2xl px-5">
        <ReviewRow label={t("stepReviewTitle")} value={state.title} editStep={4} onEdit={onEdit} notSetLabel={notSet} editLabel={edit} />
        <ReviewRow
          label={t("stepReviewGoal")}
          value={state.goalAmount ? `£${state.goalAmount}` : ""}
          editStep={2}
          onEdit={onEdit}
          notSetLabel={notSet}
          editLabel={edit}
        />
        <ReviewRow label={t("stepReviewCategory")} value={state.category} editStep={0} onEdit={onEdit} notSetLabel={notSet} editLabel={edit} />
        <ReviewRow
          label={t("stepReviewLocation")}
          value={`${state.country}${state.postcode ? `, ${state.postcode}` : ""}`}
          editStep={0}
          onEdit={onEdit}
          notSetLabel={notSet}
          editLabel={edit}
        />
        <ReviewRow
          label={t("stepReviewStory")}
          value={state.story.length > 120 ? state.story.slice(0, 120) + "..." : state.story}
          editStep={4}
          onEdit={onEdit}
          notSetLabel={notSet}
          editLabel={edit}
        />
      </div>

      <div className="space-y-4 pt-2">
        <h3 className="font-heading text-[16px] font-extrabold text-primary-navy">
          {t("stepReviewContact")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClass}>{t("stepReviewEmail")}</label>
            <input
              id="email"
              type="email"
              placeholder={t("stepReviewEmailPlaceholder")}
              value={state.email}
              onChange={(e) => onEmailChange(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>{t("stepReviewPhone")}</label>
            <input
              id="phone"
              type="tel"
              placeholder={t("stepReviewPhonePlaceholder")}
              value={state.phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <p className="text-[12px] text-text-gray leading-relaxed">
          {t("stepReviewHint")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="button"
          onClick={() => alert(t("stepReviewPreviewSoon"))}
          className="sm:flex-1 h-12 rounded-[100px] font-bold text-[14px] border border-surface-muted bg-white text-primary-navy hover:bg-bg-off-white transition-colors"
        >
          {t("stepReviewPreview")}
        </button>
        <button
          type="button"
          onClick={onLaunch}
          className="sm:flex-1 h-12 rounded-[100px] font-bold text-[14px] bg-primary-yellow text-primary-navy shadow-md hover:bg-primary-yellow-hover hover:shadow-lg active:scale-[0.98] transition-all"
        >
          {t("stepReviewSubmit")}
        </button>
      </div>
    </div>
  );
}
