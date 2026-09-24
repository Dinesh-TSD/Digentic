'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SectionHeader } from '@/components/shared/SectionHeader';

interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image?: string | null;
  publishDate?: string;
  readTime?: string;
}

export function LatestBlogPosts() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch('/api/posts?limit=3&status=Published')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.success && Array.isArray(data.posts)) {
          setPosts(data.posts);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch latest posts:', err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Blog"
          title="Latest Articles"
          subtitle="Insights on AI, web development, and everything in between."
        />

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 animate-pulse rounded-xl border border-border bg-[var(--bg-surface)] p-4"
              >
                <div className="h-44 w-full rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                <div className="mt-4 h-4 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
                <div className="mt-2 h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <motion.article
                key={post.id || post.slug || post.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-hover group overflow-hidden rounded-xl border border-border bg-[var(--bg-surface)]"
              >
                <Link href={`/blog/${post.slug}`} className="relative block h-48 w-full overflow-hidden bg-[#e0f2fe]">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#e0f2fe]">
                      <span className="text-3xl">📝</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                  <span className="absolute left-3 top-3 rounded-md bg-[#0ea5e9] px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                    {post.category}
                  </span>
                </Link>

                <div className="p-5">
                  <Link href={`/blog/${post.slug}`}>
                    <h3 className="text-base font-bold text-[var(--text-primary)] transition-colors group-hover:text-[#0ea5e9] line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    {post.publishDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-[#0ea5e9]" />
                        {post.publishDate}
                      </span>
                    )}
                    {post.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-[#0ea5e9]" />
                        {post.readTime}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-8 text-center">
            <p className="text-sm text-muted-foreground">No articles published yet.</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0ea5e9] hover:underline"
          >
            Read All Posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
