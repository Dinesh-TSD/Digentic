'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/PageHeader';
import { TagPill } from '@/components/shared/TagPill';
import {
  FileText,
  Plus,
  Search,
  Eye,
  Trash2,
  Edit,
  ExternalLink,
  Loader2,
} from 'lucide-react';

interface PostItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  published: boolean;
  views: number;
  readTime: string;
  publishDate?: string;
  createdAt?: string;
}

export default function AdminAllPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');

  const fetchPosts = () => {
    setLoading(true);
    fetch('/api/posts?status=all')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.posts)) {
          setPosts(data.posts);
        }
      })
      .catch((err) => console.error('Failed to fetch posts:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.slug !== slug));
      }
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  const handleToggleStatus = async (post: PostItem) => {
    const nextStatus = post.status === 'Published' ? 'Draft' : 'Published';
    try {
      const res = await fetch(`/api/posts/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: nextStatus,
          published: nextStatus === 'Published',
        }),
      });
      if (res.ok) {
        setPosts((prev) =>
          prev.map((p) =>
            p.slug === post.slug
              ? { ...p, status: nextStatus, published: nextStatus === 'Published' }
              : p
          )
        );
      }
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchStatus =
        statusFilter === 'All' || p.status?.toLowerCase() === statusFilter.toLowerCase();
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.slug.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [posts, statusFilter, search]);

  return (
    <>
      <PageHeader
        title="Articles &amp; Posts"
        subtitle={`Manage all ${posts.length} blog posts in your universal CMS`}
        role="admin"
        actions={
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff8c00] px-3.5 py-1.5 text-xs font-semibold text-[#0a0a0a] hover:opacity-90 transition-opacity"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>New Post</span>
          </Link>
        }
      />

      <div className="p-4 sm:p-6 space-y-6 max-w-7xl">
        {/* Filter and Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border bg-card p-1">
            {(['All', 'Published', 'Draft'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px] max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, category, slug..."
              className="w-full rounded-xl border border-border bg-card pl-9 pr-4 py-2 text-xs text-foreground outline-none focus:border-[#ff8c00]"
            />
          </div>
        </div>

        {/* Table / List */}
        {loading ? (
          <div className="py-12 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-[#ff8c00]" />
            <span>Loading articles...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center space-y-3">
            <FileText className="mx-auto h-8 w-8 text-muted-foreground/60" />
            <h4 className="text-sm font-bold text-foreground">No posts found</h4>
            <p className="text-xs text-muted-foreground">
              Create your first block-based article using the builder!
            </p>
            <Link
              href="/admin/posts/new"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/20"
            >
              <Plus className="h-4 w-4" /> Create New Post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Article</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Views</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPosts.map((post) => (
                  <tr key={post.id || post.slug} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-foreground line-clamp-1 max-w-sm">
                        {post.title}
                      </div>
                      <div className="text-[11px] font-mono text-muted-foreground">
                        /blog/{post.slug}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <TagPill label={post.category} />
                    </td>
                    <td className="px-4 py-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(post)}
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border transition-transform hover:scale-105 ${
                          post.status === 'Published'
                            ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
                            : 'border-amber-500/30 bg-amber-500/10 text-amber-500'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {post.status}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-muted-foreground">
                      {post.views.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">
                      {post.publishDate || 'Recent'}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-[#ff8c00] transition-colors"
                          title="View on Blog"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post.slug)}
                          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-red-500 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
