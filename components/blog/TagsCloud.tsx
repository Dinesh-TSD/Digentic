'use client';

interface TagsCloudProps {
  tags: string[];
  selectedTag?: string;
  onTagClick?: (tag: string) => void;
}

export function TagsCloud({ tags, selectedTag, onTagClick }: TagsCloudProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">
        <span className="text-[#ff8c00]">🏷️</span>
        Tags
      </h3>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isActive = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onTagClick?.(tag)}
              aria-pressed={isActive}
              className={`
                rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150
                focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/40
                ${
                  isActive
                    ? 'bg-[#ff8c00] text-white shadow-sm shadow-[#ff8c00]/30'
                    : `
                      bg-orange-50 text-[#ff6b35] hover:bg-[#ff8c00] hover:text-white
                      dark:bg-[#1f1f1f] dark:text-[#ff8c00] dark:hover:bg-[#ff8c00] dark:hover:text-[#0a0a0a]
                    `
                }
              `}
            >
              #{tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
