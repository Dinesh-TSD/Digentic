'use client';

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  center = true,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className={`mb-12 ${center ? 'text-center' : 'text-left'}`}
    >
      {badge && (
        <span className="mb-3 inline-block rounded-full border border-[#7dd3fc]/40 bg-[#e0f2fe] px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#0369a1]">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        <span className="bg-gradient-to-r from-[#67e8f9] via-[#38bdf8] to-[#2563eb] bg-clip-text text-transparent">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-[var(--text-muted)] md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
