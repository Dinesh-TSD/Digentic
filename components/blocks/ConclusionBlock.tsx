import React from 'react';
import type { ConclusionBlockData } from '@/types/blog';
import { ArrowRight, Award } from 'lucide-react';
import Link from 'next/link';

export function ConclusionBlock({ block }: { block: ConclusionBlockData }) {
  if (!block.content) return null;

  return (
    <div className="my-10 relative overflow-hidden rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-background to-orange-500/5 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-4 text-[#ff8c00]">
        <Award className="h-6 w-6" />
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          {block.title || 'Conclusion & Final Thoughts'}
        </h2>
      </div>

      <div
        className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed text-neutral-800 dark:text-neutral-200"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />

      {block.callToAction?.text && block.callToAction?.url && (
        <div className="mt-6 pt-6 border-t border-orange-500/20">
          <Link
            href={block.callToAction.url}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
          >
            <span>{block.callToAction.text}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
