import React from 'react';
import type { QuoteBlockData } from '@/types/blog';
import { Quote } from 'lucide-react';

export function QuoteBlock({ block }: { block: QuoteBlockData }) {
  if (!block.quote) return null;

  return (
    <figure className="my-8 relative overflow-hidden rounded-2xl border-l-4 border-[#ff8c00] bg-orange-500/5 p-6 sm:p-8 dark:bg-orange-500/10">
      <Quote className="absolute right-4 top-4 h-12 w-12 text-[#ff8c00]/15" />
      <blockquote className="relative text-lg sm:text-xl font-medium italic text-foreground leading-relaxed">
        &ldquo;{block.quote}&rdquo;
      </blockquote>
      {block.source && (
        <figcaption className="mt-4 text-sm font-semibold text-[#ff8c00]">
          — {block.source}
        </figcaption>
      )}
    </figure>
  );
}
