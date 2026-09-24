'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { MOCK_TESTIMONIALS } from '@/lib/constants';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = Math.max(0, MOCK_TESTIMONIALS.length - visibleCount);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section className="bg-[var(--bg-surface)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Testimonials"
          title="What Clients Say"
          subtitle="Trusted by founders and teams to deliver exceptional results."
        />

        <div className="overflow-hidden">
          <motion.div
            animate={{ x: `-${index * (100 / visibleCount)}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="flex"
            style={{ width: `${(MOCK_TESTIMONIALS.length / visibleCount) * 100}%` }}
          >
            {MOCK_TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="px-3"
                style={{ width: `${(100 / MOCK_TESTIMONIALS.length) * (MOCK_TESTIMONIALS.length / visibleCount)}%` }}
              >
                <div className="flex h-full flex-col rounded-xl border border-border bg-[var(--bg-base)] p-6">
                  <div className="mb-3 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-[#0ea5e9]"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.review}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[var(--text-primary)]">
                        {t.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-8 bg-[#0ea5e9]' : 'w-2 bg-border'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
