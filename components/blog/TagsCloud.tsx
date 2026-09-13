'use client';

interface TagsCloudProps {
  tags: string[];
  onTagClick?: (tag: string) => void;
}

export function TagsCloud({ tags, onTagClick }: TagsCloudProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">
        <span>🏷️</span>
        Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagClick?.(tag)}
            className="rounded-full px-3 py-1.5 text-xs font-medium transition-all dark:bg-[#1f1f1f] dark:text-orange-600 dark:hover:bg-orange-600 dark:hover:text-[#0a0a0a] bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
