import { ProgressBar } from '@/components/shared/ProgressBar';
import Link from 'next/link';

interface CourseCardProps {
  title: string;
  progress: number;
  nextLesson: string;
  href: string;
}

export function CourseCard({ title, progress, nextLesson, href }: CourseCardProps) {
  return (
    <Link
      href={href}
      className="block rounded-[10px] border px-[14px] py-[11px] mb-1.5 transition-colors hover:border-[#ff8c00]"
      style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[14px] font-medium" style={{ color: 'var(--dt-text)' }}>
          {title}
        </span>
        <span className="text-[14px] font-semibold" style={{ color: '#ff8c00' }}>
          {progress}%
        </span>
      </div>
      <ProgressBar value={progress} />
      <p className="mt-1.5 text-[12px]" style={{ color: 'var(--dt-muted)' }}>
        Next: {nextLesson}
      </p>
    </Link>
  );
}
