'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  icon?: React.ReactNode;
  tone?: 'orange' | 'cyan';
}

export function CTAButton({
  href,
  children,
  variant = 'primary',
  className,
  icon,
  tone = 'orange',
}: CTAButtonProps) {
  const baseClass =
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300';

  const variants = {
    primary: tone === 'cyan'
      ? 'bg-gradient-to-r from-[#67e8f9] to-[#22d3ee] text-[#00111f] shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:scale-105'
      : 'bg-gradient-to-r from-[#67e8f9] via-[#38bdf8] to-[#2563eb] text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:scale-105',
    outline: tone === 'cyan'
      ? 'border-2 border-[#0ea5e9] text-[#67e8f9] hover:bg-[#22d3ee]/10 hover:border-[#22d3ee]'
      : 'border-2 border-[#38bdf8] text-[#0369a1] hover:bg-[#e0f2fe] hover:border-[#0ea5e9]',
    ghost: tone === 'cyan'
      ? 'text-[#22d3ee] hover:bg-[#22d3ee]/10'
      : 'text-[#0ea5e9] hover:bg-[#e0f2fe]',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-block"
    >
      <Link
        href={href}
        className={cn(baseClass, variants[variant], className)}
      >
        {children}
        {icon}
      </Link>
    </motion.div>
  );
}
