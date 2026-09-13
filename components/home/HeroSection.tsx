'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { CTAButton } from '@/components/shared/CTAButton';

export function HeroSection() {
  return (
    <section className=" relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-[var(--bg-base)]">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-orange-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-orange-700/5 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-y-0 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <p className="mb-4 text-[clamp(1rem,5vw,1.4rem)] font-bold uppercase tracking-[0.2em] text-orange-500 ">
             I AM  Dinesh TS 
            </p>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-600/20 bg-orange-600/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-orange-300 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,140,0,0.9)]" />
              Role Matrix:
              <span className="text-orange-100">AI Systems Architect</span>
            </div>

            <h1 className="max-w-2xl text-[clamp(1rem,8vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-0.055em] text-[#f1f5f9]">
              <span className="block">Engineering Next-Gen</span>
              <span className="block bg-orange-gradient bg-clip-text text-transparent">
                AI Intelligence
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              High-performance Machine Learning practitioner and Full-Stack
              Architect. Bridging cutting-edge LLMs, multi-agent frameworks, and
              ultra-scalable Next.js 15 production backends.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <CTAButton href="/about" variant="primary" icon={<Download className="h-4 w-4" />}>
                Resume 
              </CTAButton>
              <CTAButton href="/contact" variant="outline">
                Hire Dinesh
              </CTAButton>
              <CTAButton href="/blog" variant="ghost" icon={<ArrowRight className="h-4 w-4" />}>
                Explore Blog
              </CTAButton>
            </div>
            
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.2 }}
            className="relative h-[300px] sm:h-[300px] lg:h-[400px]"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-600/10 to-orange-700/5 backdrop-blur-sm border border-orange-600/20 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <p className="text-sm font-medium">Hero Image</p>
                <p className="text-xs mt-1">Add your image here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
