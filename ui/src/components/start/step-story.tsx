"use client";

interface StepStoryProps {
  title: string;
  story: string;
  onTitleChange: (value: string) => void;
  onStoryChange: (value: string) => void;
}

export function StepStory({ title, story, onTitleChange, onStoryChange }: StepStoryProps) {
  const remaining = 60 - title.length;

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-dark mb-1.5">
          Give your fundraiser a title
        </label>
        <div className="relative">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value.slice(0, 60))}
            maxLength={60}
            placeholder="Donate to help..."
            className="w-full h-12 px-3 pr-12 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-gray">
            {remaining}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-dark mb-1.5">
          Tell your story
        </label>
        <textarea
          value={story}
          onChange={(e) => onStoryChange(e.target.value)}
          placeholder="Share your story to connect with donors..."
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-sm text-sm text-text-dark placeholder:text-text-gray focus:outline-none focus:border-primary-navy resize-y leading-relaxed"
        />
      </div>
    </div>
  );
}
