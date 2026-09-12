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
        <span className="mb-3 inline-block rounded-full border border-orange-600/30 bg-orange-600/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-orange-600">
          {badge}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        <span className="text-orange-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
