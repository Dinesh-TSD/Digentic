import { ShoppingBag } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import Link from 'next/link';

export default function UserPurchasesPage() {
  return (
    <>
      <PageHeader title="Purchases" subtitle="1 paid item" role="user" />

      <div className="p-4">
        <div
          className="flex items-center justify-between rounded-[10px] border px-[14px] py-[11px] transition-colors hover:border-[#ff8c00]"
          style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: 'rgba(255,140,0,0.10)' }}
            >
              <ShoppingBag className="h-4 w-4" style={{ color: '#ff8c00' }} />
            </div>
            <div>
              <span className="text-[15px] font-medium" style={{ color: 'var(--dt-text)' }}>
                MERN stack bootcamp
              </span>
              <p className="text-[12px]" style={{ color: 'var(--dt-muted)' }}>
                Purchased on Aug 15, 2025
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[15px] font-semibold" style={{ color: '#ff8c00' }}>
              $49.00
            </span>
            <div className="flex flex-col gap-1">
              <Link
                href="#"
                className="text-[13px] underline transition-colors"
                style={{ color: '#ff8c00' }}
              >
                Download invoice
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-lg border px-3 py-1 text-[12px] font-semibold transition-colors hover:bg-[rgba(255,140,0,0.10)]"
                style={{ borderColor: '#ff8c00', color: '#ff8c00', background: 'transparent' }}
              >
                Go to course
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
