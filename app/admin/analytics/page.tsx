import { Eye, Users, Clock, ArrowDownRight } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { PageHeader } from '@/components/shared/PageHeader';
import { TagPill } from '@/components/shared/TagPill';

const topPosts = [
  { title: 'LangChain agents tutorial', views: '4.2k', tag: 'AI' },
  { title: 'Next.js 15 server actions guide', views: '3.1k', tag: 'Next.js' },
  { title: 'MERN auth with NextAuth v5', views: '2.8k', tag: 'MERN' },
  { title: 'TypeScript generics deep dive', views: '1.9k', tag: 'TypeScript' },
  { title: 'Tailwind CSS dark mode patterns', views: '1.4k', tag: 'CSS' },
];

export default function AdminAnalyticsPage() {
  return (
    <>
      <PageHeader title="Analytics" subtitle="Traffic and engagement metrics" role="admin" />

      <div className="p-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <StatCard value="24.8k" label="Page views" icon={Eye} />
          <StatCard value="9.3k" label="Unique users" icon={Users} />
          <StatCard value="4.2 min" label="Avg read time" icon={Clock} />
          <StatCard value="38%" label="Bounce rate" icon={ArrowDownRight} />
        </div>

        {/* Line Chart Placeholder */}
        <div
          className="mb-4 flex items-center justify-center rounded-[10px] border p-6"
          style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', minHeight: 200 }}
        >
          <div className="text-center">
            <div
              className="mx-auto mb-2 h-1 w-full max-w-xs rounded"
              style={{ background: 'linear-gradient(90deg, #ff8c00, #ff6b35)' }}
            />
            <svg viewBox="0 0 400 100" className="w-full max-w-sm" style={{ color: '#ff8c00' }}>
              <polyline
                points="0,80 50,60 100,70 150,40 200,50 250,30 300,45 350,20 400,35"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <p className="mt-2 text-[13px]" style={{ color: 'var(--dt-muted)' }}>
              Traffic over time — daily visitors
            </p>
          </div>
        </div>

        {/* Top Posts Table */}
        <div
          className="rounded-[10px] border overflow-hidden"
          style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
        >
          <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--dt-border)' }}>
            <span className="text-[14px] font-semibold" style={{ color: 'var(--dt-text)' }}>
              Top posts
            </span>
          </div>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--dt-border)' }}>
                <th className="px-4 py-2 text-left text-[12px] font-medium uppercase" style={{ color: 'var(--dt-muted)' }}>
                  Title
                </th>
                <th className="px-4 py-2 text-left text-[12px] font-medium uppercase" style={{ color: 'var(--dt-muted)' }}>
                  Tag
                </th>
                <th className="px-4 py-2 text-right text-[12px] font-medium uppercase" style={{ color: 'var(--dt-muted)' }}>
                  Views
                </th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post) => (
                <tr
                  key={post.title}
                  className="transition-colors hover:bg-[var(--dt-hover)]"
                  style={{ borderBottom: '1px solid var(--dt-border)' }}
                >
                  <td className="px-4 py-2.5 text-[14px]" style={{ color: 'var(--dt-text)' }}>
                    {post.title}
                  </td>
                  <td className="px-4 py-2.5">
                    <TagPill label={post.tag} variant="outlined" />
                  </td>
                  <td className="px-4 py-2.5 text-right text-[14px] font-semibold" style={{ color: '#ff8c00' }}>
                    {post.views}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
