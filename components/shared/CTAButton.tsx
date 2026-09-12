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
}

export function CTAButton({
  href,
  children,
  variant = 'primary',
  className,
  icon,
}: CTAButtonProps) {
  const baseClass =
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-300';

  const variants = {
    primary:
      'bg-orange-gradient text-white shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:scale-105',
    outline:
      'border-2 border-orange-600 text-orange-600 hover:bg-orange-600/10 hover:border-orange-700',
    ghost: 'text-orange-600 hover:bg-orange-600/10',
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
