'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PostCard } from '@/components/blog/PostCard';
import { BlogSidebar } from '@/components/blog/BlogSidebar';
import { BLOG_CATEGORIES } from '@/types/blog';
import { Sparkles, TrendingUp, Clock, Eye, Calendar, ArrowRight } from 'lucide-react';

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags?: string[];
  featuredImage?: string | null;
  image?: string | null;
  status: string;
  featured?: boolean;
  popular?: boolean;
  views?: number;
  readingTime?: number;
  readTime?: string;
  publishDate?: string;
  createdAt?: string | Date;
}

const CATEGORIES = ['All', ...BLOG_CATEGORIES];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch('/api/posts?status=Published')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.success && Array.isArray(data.posts)) {
          setPosts(data.posts);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch blog posts:', err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        selectedCategory === 'All' ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        !searchQuery ||
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Featured Hero Post
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0] || null;
  }, [posts]);

  // Popular posts (top by views)
  const popularPosts = useMemo(() => {
    return [...posts]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        views: post.views || 0,
        image: post.featuredImage || post.image || undefined,
      }));
  }, [posts]);

  // Unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
      p.tags?.forEach((t) => set.add(t));
    });
    return Array.from(set);
  }, [posts]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Header Banner */}
      <div className="border-b border-border bg-card/50 py-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold text-[#ff8c00] mb-4">
          <Sparkles className="h-3.5 w-3.5" />
          <span>AI &amp; Developer Knowledge Base</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
          <span className="bg-gradient-to-r from-[#ff8c00] via-[#ff6b35] to-[#f97316] bg-clip-text text-transparent">
            AI Technology &amp; Engineering Blog
          </span>
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground px-4">
          Curated guides, roadmaps, AI tool reviews, tutorials, and deep dives for modern developers.
        </p>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        {/* Featured Post Spotlight */}
        {featuredPost && selectedCategory === 'All' && !searchQuery && (
          <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-card p-6 sm:p-8 shadow-xl transition-all hover:border-orange-500/40">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-center">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-3 py-1 text-xs font-bold text-white shadow-sm">
                    {featuredPost.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#ff8c00]">
                    <TrendingUp className="h-3.5 w-3.5" /> Featured Story
                  </span>
                </div>

                <Link href={`/blog/${featuredPost.slug}`}>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground hover:text-[#ff8c00] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                </Link>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2">
                  {featuredPost.publishDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#ff8c00]" />
                      {featuredPost.publishDate}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#ff8c00]" />
                    {featuredPost.readTime || `${featuredPost.readingTime || 5} min read`}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5 text-[#ff8c00]" />
                    {(featuredPost.views || 0).toLocaleString()} views
                  </span>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-orange-500/20 transition-all hover:scale-105"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Cover image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border shadow-lg">
                <Image
                  src={
                    featuredPost.featuredImage ||
                    featuredPost.image ||
                    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'
                  }
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="overflow-x-auto no-scrollbar pb-2">
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] text-white shadow-md shadow-orange-500/20'
                    : 'border border-border bg-card text-muted-foreground hover:border-[#ff8c00] hover:text-[#ff8c00]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Layout: Posts + Sidebar */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Main Posts List */}
          <div className="min-w-0">
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="h-80 animate-pulse rounded-2xl border border-border bg-card p-4 space-y-3"
                  >
                    <div className="h-44 w-full rounded-xl bg-muted" />
                    <div className="h-4 w-3/4 rounded bg-muted" />
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-1/2 rounded bg-muted" />
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {filteredPosts.map((post, index) => (
                  <PostCard
                    key={post.id || post.slug}
                    id={post.id}
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    category={post.category}
                    image={post.featuredImage || post.image || null}
                    views={post.views || 0}
                    readTime={post.readTime || `${post.readingTime || 5} min read`}
                    publishDate={post.publishDate}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-2xl border border-border bg-card p-12 text-center"
              >
                <p className="text-lg font-bold text-foreground">
                  {posts.length === 0 ? '📝 No posts published yet' : '🔍 No matching posts found'}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                  {posts.length === 0
                    ? 'Published articles will appear here. Create one in the Admin Dashboard.'
                    : 'Try adjusting your search query or selected category.'}
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <BlogSidebar
            onSearch={setSearchQuery}
            onTagClick={setSelectedCategory}
            selectedTag={selectedCategory !== 'All' ? selectedCategory : undefined}
            tags={allTags.length > 0 ? allTags : ['AI Tools', 'Next.js', 'LangChain', 'Roadmaps']}
            popularPosts={popularPosts}
          />
        </div>
      </div>
    </div>
  );
}
