import React from 'react';
import Image from 'next/image';
import type { ImageBlockData } from '@/types/blog';

export function ImageBlock({ block }: { block: ImageBlockData }) {
  if (!block.url) return null;

  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative w-full overflow-hidden bg-neutral-900/5 dark:bg-neutral-100/5">
        <Image
          src={block.url}
          alt={block.alt || 'Blog image'}
          width={1200}
          height={675}
          className="h-auto w-full object-cover transition-transform duration-300 hover:scale-[1.01]"
        />
      </div>
      {(block.caption || block.alt) && (
        <figcaption className="border-t border-border px-4 py-2.5 text-center text-xs italic text-muted-foreground">
          {block.caption || block.alt}
        </figcaption>
      )}
    </figure>
  );
}
