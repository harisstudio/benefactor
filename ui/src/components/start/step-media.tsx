"use client";

import { useRef } from "react";
import Image from "next/image";

interface StepMediaProps {
  coverImage: string | null;
  onImageChange: (dataUrl: string | null) => void;
}

export function StepMedia({ coverImage, onImageChange }: StepMediaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageChange(e.target?.result as string);
    };
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
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-primary-navy">
        Add a cover photo or video
      </h2>
      <p className="text-sm text-text-gray">
        A good cover photo helps tell your story. You can always update it later.
      </p>

      {coverImage ? (
        <div className="space-y-3">
          <div className="relative rounded-md overflow-hidden aspect-video">
            <Image src={coverImage} alt="Cover preview" fill className="object-cover" />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => inputRef.current?.click()}
              className="flex-1 h-10 rounded-sm border border-gray-300 text-sm font-medium text-text-dark hover:bg-bg-off-white transition-colors"
            >
              Add more photos
            </button>
            <button
              onClick={() => inputRef.current?.click()}
              className="flex-1 h-10 rounded-sm border border-gray-300 text-sm font-medium text-text-dark hover:bg-bg-off-white transition-colors"
            >
              Crop and replace
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="w-full aspect-video flex flex-col items-center justify-center gap-3 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-colors cursor-pointer"
        >
          <span className="text-4xl">&#128444;&#65039;</span>
          <span className="text-sm font-medium text-text-gray">
            Upload a photo or video
          </span>
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
