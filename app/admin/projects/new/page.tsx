'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Upload, X } from 'lucide-react';
import { TagPill } from '@/components/shared/TagPill';

export default function AdminNewProjectPage() {
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
      <PageHeader title="New project" subtitle="Add a portfolio project" role="admin" />

      <div className="p-4 space-y-4">
        {/* Project title */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Project title
          </label>
          <input
            type="text"
            placeholder="Enter project title..."
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe the project..."
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00] resize-none"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
          />
        </div>

        {/* Tech stack */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Tech stack
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
              placeholder="Add tech..."
              className="flex-1 min-w-[80px] bg-transparent text-[14px] outline-none"
              style={{ color: 'var(--dt-text)' }}
            />
          </div>
        </div>

        {/* URLs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
              Live URL
            </label>
            <input
              type="url"
              placeholder="https://..."
              className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
              style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
            />
          </div>
          <div>
            <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
              GitHub URL
            </label>
            <input
              type="url"
              placeholder="https://github.com/..."
              className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
              style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
            />
          </div>
        </div>

        {/* Cover image */}
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
              Click to upload cover image
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2">
          <button
            className="rounded-lg px-4 py-2 text-[14px] font-semibold"
            style={{ background: 'linear-gradient(135deg, #ff8c00, #ff6b35)', color: '#0a0a0a' }}
          >
            Save project
          </button>
        </div>
      </div>
    </>
  );
}
