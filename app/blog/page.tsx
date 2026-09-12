'use client';

import { motion } from 'framer-motion';
import { Clock, Calendar, Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { MOCK_BLOG_POSTS } from '@/lib/constants';

const CATEGORIES = ['All', 'AI & ML', 'Web Dev', 'DevOps'];

export default function BlogPage() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = MOCK_BLOG_POSTS.filter((p) => {
    const matchCat = category === 'All' || p.category === category;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-12">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Blog"
          title="All Articles"
          subtitle="Deep dives into AI engineering, web development, and building digital products."
        />

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  category === cat
                    ? 'bg-orange-gradient text-white'
                    : 'border border-border bg-[var(--bg-surface)] text-muted-foreground hover:border-orange-600 hover:text-orange-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="h-10 w-full rounded-lg border border-border bg-[var(--bg-surface)] pl-10 pr-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-orange-600 sm:w-64"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card-hover group overflow-hidden rounded-xl border border-border bg-[var(--bg-surface)]"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-md bg-orange-600 px-2.5 py-1 text-xs font-semibold text-white">
                  {post.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-[var(--text-primary)] transition-colors group-hover:text-orange-600">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No articles found. Try a different search or category.
          </div>
        )}
      </section>
    </div>
  );
}
