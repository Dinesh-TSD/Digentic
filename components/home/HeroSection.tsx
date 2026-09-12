'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { CTAButton } from '@/components/shared/CTAButton';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-[var(--bg-base)]">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-orange-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-orange-700/5 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-5xl"
        >
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-600/20 bg-orange-600/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-orange-300 sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,140,0,0.9)]" />
            Role Matrix:
            <span className="text-orange-100">AI Systems Architect</span>
          </div>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-500 sm:text-sm">
            Dinesh T · The DNA of AI Technology
          </p>

          <h1 className="max-w-5xl text-[clamp(2.75rem,8vw,5.4rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#f1f5f9]">
            <span className="block">Engineering Next-Gen</span>
            <span className="block bg-orange-gradient bg-clip-text text-transparent">
              Autonomous Intelligence
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            High-performance Machine Learning practitioner and Full-Stack
            Architect. Bridging cutting-edge LLMs, multi-agent frameworks, and
            ultra-scalable Next.js 15 production backends.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CTAButton href="/about" icon={<ArrowRight className="h-4 w-4" />}>
              View Portfolio
            </CTAButton>
            <CTAButton href="/contact" variant="outline">
              Hire Dinesh
            </CTAButton>
            <CTAButton href="/blog" variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
              Explore Blog
            </CTAButton>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-semibold text-slate-400 transition-colors hover:text-orange-400"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
