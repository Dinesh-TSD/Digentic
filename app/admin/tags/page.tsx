'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tags as TagsIcon, Plus, Trash2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface TagItem {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export default function AdminTagsPage() {
  const [tags, setTags] = useState<TagItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchTags = () => {
    setLoading(true);
    fetch('/api/tags')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.tags)) {
          setTags(data.tags);
        }
      })
      .catch((err) => console.error('Failed to fetch tags:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create tag.');

      setSuccessMsg('Tag created successfully!');
      setName('');
      fetchTags();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this tag?')) return;
    try {
      const res = await fetch(`/api/tags?slug=${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setTags((prev) => prev.filter((t) => t.slug !== slug));
      }
    } catch (err) {
      console.error('Failed to delete tag:', err);
    }
  };

  return (
    <>
      <PageHeader
        title="Tags"
        subtitle="Manage search tags and keywords taxonomy"
        role="admin"
      />

      <div className="p-4 sm:p-6 max-w-6xl space-y-6">
        {errorMsg && (
          <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-500">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-500">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[340px_1fr]">
          {/* Create Tag Form */}
          <form
            onSubmit={handleCreate}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4 h-fit"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <TagsIcon className="h-4 w-4 text-[#ff8c00]" />
              <h3 className="text-sm font-bold text-foreground">Add New Tag</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Tag Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Next.js 15"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] py-2 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              <span>Add Tag</span>
            </button>
          </form>

          {/* Tags List */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground pb-2 border-b border-border">
              All Tags ({tags.length})
            </h3>

            {loading ? (
              <div className="py-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-[#ff8c00]" />
                <span>Loading tags...</span>
              </div>
            ) : tags.length === 0 ? (
              <p className="text-xs text-muted-foreground italic text-center py-6">
                No tags created yet.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {tags.map((tag) => (
                  <div
                    key={tag.id || tag.slug}
                    className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5 hover:border-[#ff8c00]/50 transition-colors"
                  >
                    <span className="font-semibold text-xs text-foreground">#{tag.name}</span>
                    <span className="rounded-full bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-bold text-[#ff8c00]">
                      {tag.count}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(tag.slug)}
                      className="text-muted-foreground hover:text-red-500 p-0.5 ml-1"
                      title="Delete tag"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
