'use client';

import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className = '', showTagline = false, size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-20 w-auto',
  };

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/images/logo.png"
        alt="DIGENTIC TECH - The DNA of AI Technology"
        width={400}
        height={100}
        priority
        className={`${sizeClasses[size]} object-contain`}
      />
      {showTagline && (
        <span className="hidden lg:block text-xs text-muted-foreground ml-2">
          THE DNA OF AI TECHNOLOGY
        </span>
      )}
    </Link>
  );
}
