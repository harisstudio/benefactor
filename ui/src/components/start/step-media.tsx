"use client";

import { useRef } from "react";
import Image from "next/image";
import { IconPhotoPlus, IconReplace, IconTrash } from "@tabler/icons-react";
import { useLanguage } from "@/context/LanguageContext";

interface StepMediaProps {
  coverImage: string | null;
  onImageChange: (dataUrl: string | null) => void;
}

export function StepMedia({ coverImage, onImageChange }: StepMediaProps) {
  const { t } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => onImageChange(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-[18px] font-extrabold text-primary-navy mb-1.5">
          {t("stepMediaHeading")}
        </h2>
        <p className="text-[14px] text-text-gray">
          {t("stepMediaDesc")}
        </p>
      </div>

      {coverImage ? (
        <div className="space-y-3">
          <div className="relative rounded-2xl overflow-hidden aspect-video border border-surface-muted">
            <Image src={coverImage} alt={t("stepMediaCoverAlt")} fill className="object-cover" />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-[100px] border border-surface-muted bg-white text-[13px] font-semibold text-primary-navy hover:bg-bg-off-white transition-colors"
            >
              <IconReplace size={16} stroke={1.8} />
              {t("stepMediaReplace")}
            </button>
            <button
              type="button"
              onClick={() => onImageChange(null)}
              className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-[100px] border border-surface-muted bg-white text-[13px] font-semibold text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-colors"
              aria-label={t("stepMediaRemoveAria")}
            >
              <IconTrash size={16} stroke={1.8} />
              {t("stepMediaRemove")}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full aspect-video flex flex-col items-center justify-center gap-3 border-2 border-dashed border-surface-muted rounded-2xl bg-bg-off-white hover:border-primary-navy/40 hover:bg-white transition-all cursor-pointer p-6"
        >
          <span className="w-14 h-14 rounded-2xl bg-white border border-surface-muted flex items-center justify-center">
            <IconPhotoPlus size={26} stroke={1.5} className="text-primary-navy" />
          </span>
          <span className="text-[14px] font-bold text-primary-navy">
            {t("stepMediaDropHint")}
          </span>
          <span className="text-[12px] text-text-gray">{t("stepMediaFileHint")}</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
}
