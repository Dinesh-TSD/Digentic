import { Heart } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';

const likes = [
  { title: 'LangChain agents tutorial', count: 234, date: 'Sep 12, 2025' },
  { title: 'Next.js 15 server actions guide', count: 189, date: 'Sep 10, 2025' },
  { title: 'MERN auth with NextAuth v5', count: 156, date: 'Sep 8, 2025' },
  { title: 'TypeScript generics deep dive', count: 142, date: 'Sep 5, 2025' },
  { title: 'Tailwind CSS dark mode patterns', count: 128, date: 'Sep 3, 2025' },
  { title: 'Building REST APIs with Node.js', count: 98, date: 'Aug 30, 2025' },
  { title: 'React 19 use() hook explained', count: 87, date: 'Aug 28, 2025' },
  { title: 'MongoDB aggregation framework', count: 76, date: 'Aug 25, 2025' },
];

export default function AdminLikesPage() {
  return (
    <>
      <PageHeader title="Likes" subtitle="3,247 total likes across all content" role="admin" />

      <div className="p-4">
        {likes.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-[10px] border px-[14px] py-[11px] mb-1.5 transition-colors hover:border-[#ff8c00]"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
          >
            <div className="flex items-center gap-2.5">
              <Heart className="h-4 w-4" style={{ color: '#ff8c00' }} />
              <div>
                <span className="text-[14px] font-medium" style={{ color: 'var(--dt-text)' }}>
                  {item.title}
                </span>
                <p className="text-[12px]" style={{ color: 'var(--dt-muted)' }}>{item.date}</p>
              </div>
            </div>
            <span className="text-[14px] font-semibold" style={{ color: '#ff8c00' }}>
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
