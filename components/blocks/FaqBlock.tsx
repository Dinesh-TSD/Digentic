'use client';

import React, { useState } from 'react';
import type { FaqBlockData } from '@/types/blog';
import { HelpCircle, ChevronDown } from 'lucide-react';

export function FaqBlock({ block }: { block: FaqBlockData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!block.items || block.items.length === 0) return null;

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="my-10 space-y-6">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-6 w-6 text-[#ff8c00]" />
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {block.title || 'Frequently Asked Questions'}
        </h2>
      </div>

      <div className="space-y-3">
        {block.items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="overflow-hidden rounded-xl border border-border bg-card transition-all"
            >
              <button
                type="button"
                onClick={() => toggleItem(idx)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left font-semibold text-foreground transition-colors hover:text-[#ff8c00]"
              >
                <span className="text-sm sm:text-base">{item.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#ff8c00]' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-border/60 bg-muted/20 p-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
