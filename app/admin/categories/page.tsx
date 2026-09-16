'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { FolderTree, Plus, Trash2, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const fetchCategories = () => {
    setLoading(true);
    fetch('/api/categories')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      })
      .catch((err) => console.error('Failed to fetch categories:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), description: description.trim() }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create category.');

      setSuccessMsg('Category created successfully!');
      setName('');
      setDescription('');
      fetchCategories();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/categories?slug=${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.slug !== slug));
      }
    } catch (err) {
      console.error('Failed to delete category:', err);
    }
  };

  return (
    <>
      <PageHeader
        title="Categories"
        subtitle="Manage blog categories and content taxonomy"
        role="admin"
      />

      <div className="p-4 sm:p-6 max-w-6xl space-y-6">
        {/* Alerts */}
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
          {/* Create Category Form */}
          <form
            onSubmit={handleCreate}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4 h-fit"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-border">
              <FolderTree className="h-4 w-4 text-[#ff8c00]" />
              <h3 className="text-sm font-bold text-foreground">Add New Category</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., AI Agents"
                className="w-full rounded-xl border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-foreground mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief category description..."
                className="w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground outline-none focus:border-[#ff8c00]"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] py-2 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:scale-[1.02] transition-transform disabled:opacity-50"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              <span>Add Category</span>
            </button>
          </form>

          {/* Categories List */}
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-foreground pb-2 border-b border-border">
              All Categories ({categories.length})
            </h3>

            {loading ? (
              <div className="py-8 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-[#ff8c00]" />
                <span>Loading categories...</span>
              </div>
            ) : categories.length === 0 ? (
              <p className="text-xs text-muted-foreground italic text-center py-6">
                No categories found. Add your first category!
              </p>
            ) : (
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div
                    key={cat.id || cat.slug}
                    className="flex items-center justify-between rounded-xl border border-border bg-background p-3 hover:border-[#ff8c00]/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-foreground">{cat.name}</span>
                        <span className="rounded-md bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold text-[#ff8c00]">
                          {cat.count} posts
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground">
                        /blog?category={cat.slug}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDelete(cat.slug)}
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-red-500 transition-colors"
                      title="Delete category"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
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
