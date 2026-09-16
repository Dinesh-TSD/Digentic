import React from 'react';
import Image from 'next/image';
import type { GalleryBlockData } from '@/types/blog';

export function GalleryBlock({ block }: { block: GalleryBlockData }) {
  if (!block.images || block.images.length === 0) return null;

  return (
    <div className="my-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {block.images.map((img, idx) => (
          <figure
            key={idx}
            className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-orange-500/50"
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <Image
                src={img.url}
                alt={img.alt || `Gallery image ${idx + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            {(img.caption || img.alt) && (
              <figcaption className="p-2.5 text-center text-xs text-muted-foreground truncate">
                {img.caption || img.alt}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
