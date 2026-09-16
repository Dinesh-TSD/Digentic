import React from 'react';
import type { YoutubeBlockData } from '@/types/blog';

function cleanVideoId(raw: string): string {
  if (!raw) return '';
  // handles full URL or direct ID
  const match = raw.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : raw.trim();
}

export function YoutubeBlock({ block }: { block: YoutubeBlockData }) {
  const videoId = cleanVideoId(block.videoId);
  if (!videoId) return null;

  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-border shadow-lg bg-card">
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      {block.caption && (
        <figcaption className="border-t border-border px-4 py-2.5 text-center text-xs text-muted-foreground">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}
