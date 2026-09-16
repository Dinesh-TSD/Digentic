import React from 'react';
import Image from 'next/image';
import type { TextBlockData } from '@/types/blog';

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-');
}

export function TextBlock({ block }: { block: TextBlockData }) {
  const headingId = block.heading ? generateSlug(block.heading) : undefined;

  return (
    <div className="my-6 space-y-4">
      {block.heading && (
        <h2
          id={headingId}
          className="scroll-mt-24 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
        >
          {block.heading}
        </h2>
      )}
      {block.image && (
        <div className="relative my-4 overflow-hidden rounded-2xl border border-border shadow-lg bg-card">
          <Image
            src={block.image}
            alt={block.heading || 'Text block image'}
            width={1200}
            height={630}
            className="h-64 sm:h-80 md:h-96 w-full object-cover"
          />
        </div>
      )}
      <div
        className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed text-neutral-800 dark:text-neutral-200"
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </div>
  );
}
