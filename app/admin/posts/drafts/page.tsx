'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { FilterChips } from '@/components/shared/FilterChips';
import { TagPill } from '@/components/shared/TagPill';
import Link from 'next/link';

const drafts = [
  { id: 1, title: 'Building RAG pipelines with LangChain', tag: 'AI', time: '2 hours ago' },
  { id: 2, title: 'Next.js 15 middleware patterns', tag: 'Next.js', time: '5 hours ago' },
  { id: 3, title: 'MongoDB aggregation recipes', tag: 'MERN', time: 'Yesterday' },
  { id: 4, title: 'React Server Components deep dive', tag: 'Next.js', time: '2 days ago' },
  { id: 5, title: 'AI-powered code review tools', tag: 'AI', time: '3 days ago' },
  { id: 6, title: 'Node.js streams explained', tag: 'MERN', time: '1 week ago' },
];

const filters = ['All', 'AI', 'MERN', 'Next.js'];

export default function AdminDraftsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? drafts
      : drafts.filter((d) => d.tag === activeFilter);

  return (
    <>
      <PageHeader
        title="Drafts"
        subtitle={`${drafts.length} unpublished posts`}
        role="admin"
      />

      <FilterChips items={filters} active={activeFilter} onChange={setActiveFilter} />

      <div className="px-4 pb-4">
        {filtered.map((draft) => (
          <div
            key={draft.id}
            className="flex items-center justify-between rounded-[10px] border px-[14px] py-[11px] mb-1.5 transition-colors hover:border-[#ff8c00]"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full" style={{ background: '#ff8c00' }} />
              <div>
                <span className="text-[14px] font-medium" style={{ color: 'var(--dt-text)' }}>
                  {draft.title}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <TagPill label={draft.tag} />
                  <span className="text-[12px]" style={{ color: 'var(--dt-muted)' }}>
                    {draft.time}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="#"
                className="text-[13px] font-medium"
                style={{ color: '#ff8c00' }}
              >
                Edit
              </Link>
              <button
                className="rounded-lg border px-3 py-1 text-[12px] font-semibold transition-colors"
                style={{
                  background: 'linear-gradient(135deg, #ff8c00, #ff6b35)',
                  color: '#0a0a0a',
                  border: 'none',
                }}
              >
                Publish
              </button>
              <button
                className="text-[13px] font-medium transition-colors"
                style={{ color: '#ff5733' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
