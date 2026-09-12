'use client';

import { motion } from 'framer-motion';
import { Download, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { MOCK_DIGITAL_ASSETS } from '@/lib/constants';

export function DigitalAssetsPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Digital Store"
          title="Digital Assets"
          subtitle="Templates, e-books, and tools to accelerate your development."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {MOCK_DIGITAL_ASSETS.map((asset, i) => (
            <motion.div
              key={asset.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover overflow-hidden rounded-xl border border-border bg-[var(--bg-surface)]"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={asset.image}
                  alt={asset.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-md bg-orange-600 px-2.5 py-1 text-xs font-semibold text-white">
                  {asset.type}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {asset.title}
                </h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-orange-600">
                    ₹{asset.price}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Download className="h-3.5 w-3.5" />
                    {asset.downloads} downloads
                  </span>
                </div>
                <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-orange-gradient py-2 text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-600/20">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Get Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/digital"
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange-gradient hover:underline"
          >
            Shop Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
