'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { AuthCard } from '@/components/auth/AuthCard';

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#ff8c00]" />
        </div>
      }
    >
      <AuthCard initialMode="login" />
    </Suspense>
  );
}
