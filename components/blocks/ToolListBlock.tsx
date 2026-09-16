import React from 'react';
import Image from 'next/image';
import type { ToolListBlockData } from '@/types/blog';
import { ExternalLink, CheckCircle2, XCircle, Sparkles, Tag, DollarSign } from 'lucide-react';

export function ToolListBlock({ block }: { block: ToolListBlockData }) {
  if (!block.tools || block.tools.length === 0) return null;

  return (
    <div className="my-10 space-y-6">
      {block.title && (
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-[#ff8c00]" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {block.title}
          </h2>
        </div>
      )}

      <div className="space-y-6">
        {block.tools.map((tool, idx) => (
          <div
            key={idx}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-[#ff8c00]/50 hover:shadow-lg"
          >
            {/* Header: Number, Name, Best For, Visit Link */}
            <div className="flex flex-wrap items-start justify-between gap-4 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 font-bold text-[#ff8c00]">
                  #{idx + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-[#ff8c00] transition-colors">
                    {tool.name}
                  </h3>
                  {tool.bestFor && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground mt-0.5">
                      <Tag className="h-3 w-3 text-[#ff8c00]" />
                      Best for: <span className="text-foreground">{tool.bestFor}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {tool.pricing && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-500">
                    <DollarSign className="h-3.5 w-3.5" />
                    {tool.pricing}
                  </span>
                )}
                {tool.website && (
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:scale-105"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="px-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {tool.description}
            </p>

            {/* Featured Image - Full Width */}
            {tool.logo && (
              <div className="relative mx-6 mt-4 overflow-hidden rounded-xl border border-border bg-background">
                <Image
                  src={tool.logo}
                  alt={tool.name}
                  width={1200}
                  height={630}
                  className="h-48 sm:h-64 md:h-80 w-full object-cover"
                />
              </div>
            )}

            {/* Pros & Cons */}
            {((tool.pros && tool.pros.length > 0) || (tool.cons && tool.cons.length > 0)) && (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 rounded-xl bg-muted/40 p-4 border border-border/50 mx-6 mb-6">
                {/* Pros */}
                {tool.pros && tool.pros.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" /> Pros
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-foreground">
                      {tool.pros.map((pro, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cons */}
                {tool.cons && tool.cons.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-500">
                      <XCircle className="h-4 w-4" /> Cons
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-foreground">
                      {tool.cons.map((con, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
