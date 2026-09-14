import Link from 'next/link';

interface DraftCardProps {
  title: string;
  time: string;
  tag?: string;
}

export function DraftCard({ title, time, tag }: DraftCardProps) {
  return (
    <div
      className="flex items-center justify-between rounded-[10px] border px-[14px] py-[11px] mb-1.5 transition-colors hover:border-[#ff8c00]"
      style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
    >
      <div className="flex items-center gap-2.5">
        <div className="h-2 w-2 rounded-full" style={{ background: '#ff8c00' }} />
        <div>
          <span className="text-[14px] font-medium" style={{ color: 'var(--dt-text)' }}>
            {title}
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            {tag && (
              <span
                className="rounded border px-1.5 py-[1px] text-[12px]"
                style={{ background: 'var(--dt-border)', borderColor: '#ff8c00', color: '#ff8c00' }}
              >
                {tag}
              </span>
            )}
            <span className="text-[12px]" style={{ color: 'var(--dt-muted)' }}>
              {time}
            </span>
          </div>
        </div>
      </div>
      <Link
        href="#"
        className="text-[13px] font-medium transition-colors hover:text-[#ff6b35]"
        style={{ color: '#ff8c00' }}
      >
        Edit
      </Link>
    </div>
  );
}
