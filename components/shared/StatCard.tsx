import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
}

export function StatCard({ value, label, icon: Icon }: StatCardProps) {
  return (
    <div
      className="rounded-[10px] border p-[11px] px-[13px] transition-colors hover:border-[#ff8c00]"
      style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[22px] font-semibold" style={{ color: '#ff8c00' }}>
            {value}
          </div>
          <div className="mt-[3px] text-[12px]" style={{ color: 'var(--dt-muted)' }}>
            {label}
          </div>
        </div>
        {Icon && (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ background: 'rgba(255,140,0,0.10)' }}
          >
            <Icon className="h-4 w-4" style={{ color: '#ff8c00' }} />
          </div>
        )}
      </div>
    </div>
  );
}
