'use client';

import { motion } from 'framer-motion';
import { Download, ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { MOCK_DIGITAL_ASSETS } from '@/lib/constants';

const TYPES = ['All', 'E-Book', 'Template', 'Templates'];

export default function DigitalPage() {
  return (
    <div className="py-12">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Digital Store"
          title="Digital Assets"
          subtitle="Templates, e-books, and tools to accelerate your development workflow."
        />

        {/* Type filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {TYPES.map((type, i) => (
            <button
              key={type}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                i === 0
                  ? 'bg-orange-gradient text-white'
                  : 'border border-border bg-[var(--bg-surface)] text-muted-foreground hover:border-orange-600 hover:text-orange-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Assets Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_DIGITAL_ASSETS.map((asset, i) => (
            <motion.div
              key={asset.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover overflow-hidden rounded-xl border border-border bg-[var(--bg-surface)]"
            >
              <div className="relative h-48 overflow-hidden">
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
                  <span className="text-2xl font-bold text-orange-600">
                    ₹{asset.price}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Download className="h-3.5 w-3.5" />
                    {asset.downloads} downloads
                  </span>
                </div>
                <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg bg-orange-gradient py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-600/20">
                  <ShoppingBag className="h-4 w-4" />
                  Get Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
