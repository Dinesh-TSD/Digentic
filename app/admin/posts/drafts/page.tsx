'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { FilterChips } from '@/components/shared/FilterChips';
import { TagPill } from '@/components/shared/TagPill';
import Link from 'next/link';

interface DraftItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  createdAt?: string;
  publishDate?: string;
}

const filters = ['All', 'AI & LLM', 'MERN Stack', 'React / Next.js', 'Dev Tools'];

export default function AdminDraftsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [drafts, setDrafts] = useState<DraftItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchDrafts = () => {
    setLoading(true);
    fetch('/api/posts?status=Draft')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.posts)) {
          setDrafts(data.posts);
        }
      })
      .catch((err) => console.error('Failed to fetch drafts:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this draft?')) return;
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setDrafts((prev) => prev.filter((d) => d.slug !== slug));
      }
    } catch (err) {
      console.error('Failed to delete draft:', err);
    }
  };

  const handlePublish = async (slug: string) => {
    if (!confirm('Are you sure you want to publish this draft?')) return;
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'Published',
          published: true,
          publishedAt: new Date().toISOString(),
        }),
      });
      if (res.ok) {
        setDrafts((prev) => prev.filter((d) => d.slug !== slug));
        setSuccessMessage('Draft published successfully!');
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (err) {
      console.error('Failed to publish draft:', err);
    }
  };

  const filtered =
    activeFilter === 'All'
      ? drafts
      : drafts.filter((d) => d.category?.toLowerCase() === activeFilter.toLowerCase());

  return (
    <>
      <PageHeader
        title="Drafts"
        subtitle={`${drafts.length} unpublished posts`}
        role="admin"
      />

      {successMessage && (
        <div className="px-4 pb-2">
          <div
            className="rounded-[10px] border px-[14px] py-[11px] text-[14px] font-medium"
            style={{ background: 'var(--dt-surface)', borderColor: '#28a745', color: '#28a745' }}
          >
            {successMessage}
          </div>
        </div>
      )}

      <FilterChips items={filters} active={activeFilter} onChange={setActiveFilter} />

      <div className="px-4 pb-4">
        {loading ? (
          <div className="py-8 text-center text-sm" style={{ color: 'var(--dt-muted)' }}>
            Loading drafts...
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="rounded-[10px] border p-8 text-center text-sm"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-muted)' }}
          >
            No drafts found. Create a new post and save it as a draft!
          </div>
        ) : (
          filtered.map((draft) => (
            <div
              key={draft.id || draft.slug}
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
                    <TagPill label={draft.category} />
                    {draft.publishDate && (
                      <span className="text-[12px]" style={{ color: 'var(--dt-muted)' }}>
                        {draft.publishDate}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/blog/${draft.slug}`}
                  className="text-[13px] font-medium"
                  style={{ color: '#ff8c00' }}
                >
                  Preview
                </Link>
                <button
                  onClick={() => handlePublish(draft.slug)}
                  className="text-[13px] font-medium transition-colors"
                  style={{ color: '#28a745' }}
                >
                  Publish
                </button>
                <button
                  onClick={() => handleDelete(draft.slug)}
                  className="text-[13px] font-medium transition-colors"
                  style={{ color: '#ff5733' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
