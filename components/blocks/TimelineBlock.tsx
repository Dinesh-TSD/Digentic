import React from 'react';
import type { TimelineBlockData } from '@/types/blog';
import { Milestone } from 'lucide-react';

export function TimelineBlock({ block }: { block: TimelineBlockData }) {
  if (!block.items || block.items.length === 0) return null;

  return (
    <div className="my-10 space-y-6">
      {block.title && (
        <div className="flex items-center gap-2">
          <Milestone className="h-6 w-6 text-[#ff8c00]" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {block.title}
          </h2>
        </div>
      )}

      <div className="relative border-l-2 border-orange-500/30 pl-6 sm:pl-8 ml-3 space-y-8">
        {block.items.map((item, idx) => (
          <div key={idx} className="relative group">
            {/* Dot / Number Badge */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-1 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 border-[#ff8c00] bg-background text-xs font-bold text-[#ff8c00] shadow-sm transition-transform group-hover:scale-110">
              {idx + 1}
            </div>

            <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-[#ff8c00]/50 hover:shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                {item.badge && (
                  <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-[#ff8c00]">
                    {item.badge}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
