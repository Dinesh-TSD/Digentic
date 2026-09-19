import React from 'react';
import Image from 'next/image';
import type { HeroBlockData } from '@/types/blog';
import { Sparkles } from 'lucide-react';

export function HeroBlock({ block }: { block: HeroBlockData }) {
  return (
    <section className="relative my-8 overflow-hidden rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-background to-orange-500/5 p-6 sm:p-10">
      <div className="relative z-10 max-w-3xl">
        {block.badge && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-[#ff8c00] mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            {block.badge}
          </span>
        )}
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl text-foreground">
          {block.title}
        </h2>
        {block.subtitle && (
          <p className="mt-3 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
            {block.subtitle}
          </p>
        )}
      </div>

      {block.image && (
        <div className="relative mt-6 overflow-hidden rounded-xl border border-border shadow-lg">
          <Image
            src={block.image}
            alt={block.title || 'Hero image'}
            width={1200}
            height={600}
            className="w-full object-cover max-h-[400px]"
          />
        </div>
      )}
    </section>
  );
}
