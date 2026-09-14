import { Bookmark } from 'lucide-react';

interface SavedPostRowProps {
  title: string;
  date: string;
  tag?: string;
  excerpt?: string;
}

export function SavedPostRow({ title, date, tag, excerpt }: SavedPostRowProps) {
  return (
    <div
      className="flex items-start justify-between rounded-[10px] border px-[14px] py-[11px] mb-1.5 transition-colors hover:border-[#ff8c00]"
      style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          {tag && (
            <span
              className="rounded border px-1.5 py-[1px] text-[12px] shrink-0"
              style={{ background: 'var(--dt-border)', borderColor: '#ff8c00', color: '#ff8c00' }}
            >
              {tag}
            </span>
          )}
          <span className="text-[15px] font-medium truncate" style={{ color: 'var(--dt-text)' }}>
            {title}
          </span>
        </div>
        {excerpt && (
          <p className="text-[13px] truncate" style={{ color: 'var(--dt-muted)' }}>
            {excerpt}
          </p>
        )}
        <span className="text-[12px]" style={{ color: 'var(--dt-muted)' }}>
          {date}
        </span>
      </div>
      <Bookmark className="h-4 w-4 shrink-0 ml-2" style={{ color: '#ff8c00', fill: '#ff8c00' }} />
    </div>
  );
}
