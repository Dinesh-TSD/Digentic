'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Upload, X } from 'lucide-react';
import { TagPill } from '@/components/shared/TagPill';

export default function AdminNewPostPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  return (
    <>
      <PageHeader title="New post" subtitle="Create a new blog post" role="admin" />

      <div className="p-4 space-y-4">
        {/* Title */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Title
          </label>
          <input
            type="text"
            placeholder="Enter post title..."
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
            style={{
              background: 'var(--dt-surface)',
              borderColor: 'var(--dt-border)',
              color: 'var(--dt-text)',
            }}
          />
        </div>

        {/* Slug */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Slug
          </label>
          <div className="flex items-center gap-2">
            <span className="text-[14px]" style={{ color: 'var(--dt-muted)' }}>/blog/</span>
            <input
              type="text"
              placeholder="post-slug"
              className="flex-1 rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
              style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Category
          </label>
          <select
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
          >
            <option value="">Select category</option>
            <option value="AI">AI</option>
            <option value="MERN">MERN</option>
            <option value="Next.js">Next.js</option>
            <option value="TypeScript">TypeScript</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Tags
          </label>
          <div className="flex flex-wrap items-center gap-1.5 rounded-lg border px-3 py-2"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
          >
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1">
                <TagPill label={tag} />
                <button onClick={() => removeTag(tag)}>
                  <X className="h-3 w-3" style={{ color: 'var(--dt-muted)' }} />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add tag..."
              className="flex-1 min-w-[80px] bg-transparent text-[14px] outline-none"
              style={{ color: 'var(--dt-text)' }}
            />
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Cover image
          </label>
          <div
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors hover:border-[#ff8c00]"
            style={{ borderColor: 'var(--dt-border)' }}
          >
            <Upload className="mb-2 h-8 w-8" style={{ color: 'var(--dt-muted)' }} />
            <span className="text-[14px]" style={{ color: 'var(--dt-muted)' }}>
              Click to upload or drag and drop
            </span>
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Content
          </label>
          <div
            className="rounded-lg border p-4 text-[14px]"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', minHeight: 200, color: 'var(--dt-muted)' }}
          >
            Rich text editor area...
          </div>
        </div>

        {/* SEO */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
              SEO meta title
            </label>
            <input
              type="text"
              placeholder="Meta title"
              className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
              style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
            />
          </div>
          <div>
            <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
              SEO description
            </label>
            <input
              type="text"
              placeholder="Meta description"
              className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
              style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            className="rounded-lg border px-4 py-2 text-[14px] font-semibold transition-colors hover:bg-[rgba(255,140,0,0.10)]"
            style={{ background: 'transparent', borderColor: '#ff8c00', color: '#ff8c00' }}
          >
            Save draft
          </button>
          <button
            className="rounded-lg px-4 py-2 text-[14px] font-semibold transition-colors"
            style={{ background: 'linear-gradient(135deg, #ff8c00, #ff6b35)', color: '#0a0a0a' }}
          >
            Publish now
          </button>
        </div>
      </div>
    </>
  );
}
