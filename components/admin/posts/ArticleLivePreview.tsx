'use client';

import React from 'react';
import Image from 'next/image';
import type { ContentBlock } from '@/types/blog';
import {
  Clock,
  Calendar,
  Eye,
  Rocket,
  ArrowRight,
  Sparkles,
  Bot,
  Terminal,
  Layers,
  GraduationCap,
  Briefcase,
  Star,
  Newspaper,
  Compass,
} from 'lucide-react';

interface ArticleLivePreviewProps {
  title: string;
  excerpt: string;
  category: string;
  featuredImage?: string | null;
  readingTime?: number | string;
  blocks: ContentBlock[];
}

const CATEGORY_ITEMS = [
  { name: 'AI Tools', count: 24, icon: Bot, color: 'text-blue-500' },
  { name: 'Tutorials', count: 18, icon: GraduationCap, color: 'text-indigo-500' },
  { name: 'Roadmaps', count: 12, icon: Compass, color: 'text-purple-500' },
  { name: 'Comparisons', count: 10, icon: Layers, color: 'text-emerald-500' },
  { name: 'News', count: 8, icon: Newspaper, color: 'text-amber-500' },
  { name: 'Career Guides', count: 6, icon: Briefcase, color: 'text-pink-500' },
  { name: 'Reviews', count: 5, icon: Star, color: 'text-rose-500' },
  { name: 'Web Development', count: 15, icon: Terminal, color: 'text-cyan-500' },
];

const MOCK_POPULAR_POSTS = [
  {
    title: 'ChatGPT vs Claude: Which One is Better in 2026?',
    readTime: '12 min',
    views: '45K',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    title: 'Full-Stack MERN AI Roadmap for Beginners',
    readTime: '10 min',
    views: '32K',
    image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    title: 'How to Build Real-Time AI Agents in Next.js 15',
    readTime: '8 min',
    views: '28K',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

export function ArticleLivePreview({
  title,
  excerpt,
  category,
  featuredImage,
  readingTime = 5,
  blocks,
}: ArticleLivePreviewProps) {
  // Extract table of contents from blocks
  const tocItems: string[] = [];
  tocItems.push('Introduction');

  blocks.forEach((b) => {
    if (b.type === 'text' && (b as any).heading) {
      tocItems.push((b as any).heading);
    } else if (b.type === 'hero' && (b as any).title) {
      tocItems.push((b as any).title);
    } else if (b.type === 'toolList' && (b as any).title) {
      tocItems.push((b as any).title);
    } else if (b.type === 'comparisonTable' && (b as any).title) {
      tocItems.push((b as any).title);
    } else if (b.type === 'timeline' && (b as any).title) {
      tocItems.push((b as any).title);
    } else if (b.type === 'resources' && (b as any).title) {
      tocItems.push((b as any).title);
    } else if (b.type === 'projects' && (b as any).title) {
      tocItems.push((b as any).title);
    } else if (b.type === 'gallery' && (b as any).title) {
      tocItems.push((b as any).title || 'Gallery');
    } else if (b.type === 'faq') {
      tocItems.push('Frequently Asked Questions');
    } else if (b.type === 'conclusion') {
      tocItems.push('Conclusion');
    }
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* 1. Article Card Preview */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-border">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Article Preview
          </span>
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center">
          {featuredImage ? (
            <Image
              src={featuredImage}
              alt={title || 'Preview'}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <Sparkles className="h-8 w-8 text-[#ff8c00]/60 mb-1" />
              <span className="text-xs font-bold text-muted-foreground">AI Featured Image</span>
            </div>
          )}
        </div>

        <div>
          {/* Category Pill */}
          <span className="inline-block rounded-md bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-bold text-[#ff8c00] mb-2">
            {category || 'AI Tools'}
          </span>

          {/* Title */}
          <h4 className="text-sm font-bold text-foreground leading-snug line-clamp-2">
            {title || 'Top 10 AI Tools in 2026'}
          </h4>

          {/* Excerpt */}
          <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {excerpt || 'Discover the most powerful AI tools transforming productivity, coding, and design...'}
          </p>

          {/* Meta metrics */}
          <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-[#ff8c00]" />
              {readingTime} min read
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {currentDate}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              0 views
            </span>
          </div>
        </div>
      </div>

      {/* 2. Table of Contents */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Table of Contents
        </h4>
        <ol className="space-y-2 text-xs">
          {tocItems.slice(0, 8).map((heading, i) => (
            <li key={i} className="flex items-center gap-2 text-muted-foreground hover:text-[#ff8c00] transition-colors cursor-pointer truncate">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-[10px] font-bold text-[#ff8c00]">
                {i + 1}
              </span>
              <span className="truncate">{heading}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* 3. Popular Posts */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Popular Posts
        </h4>
        <div className="space-y-3">
          {MOCK_POPULAR_POSTS.map((p, idx) => (
            <div key={idx} className="group flex items-center gap-3 cursor-pointer">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-[#ff8c00] transition-colors">
                  {p.title}
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {p.readTime} • {p.views} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Categories */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
          Categories
        </h4>
        <div className="space-y-2">
          {CATEGORY_ITEMS.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-muted">
                    <Icon className={`h-3.5 w-3.5 ${cat.color}`} />
                  </div>
                  <span>{cat.name}</span>
                </div>
                <span className="text-[11px] font-semibold text-muted-foreground">
                  {cat.count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Newsletter */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Newsletter
        </h4>
        <p className="text-xs text-muted-foreground">
          Get latest AI updates and blog posts directly to your inbox.
        </p>
        <input
          type="email"
          placeholder="Enter your email address"
          disabled
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground outline-none"
        />
        <button
          type="button"
          disabled
          className="w-full rounded-lg bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] py-2 text-xs font-bold text-white shadow-sm opacity-90 cursor-default"
        >
          Subscribe
        </button>
      </div>

      {/* 6. Banner / Promo */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4f46e5] to-[#7c3aed] p-6 text-center text-white shadow-lg">
        <Rocket className="mx-auto h-8 w-8 mb-2 animate-bounce" />
        <h4 className="text-base font-black tracking-tight">Build Your Future with AI</h4>
        <p className="text-xs text-indigo-100 mt-1">Learn • Build • Grow</p>
        <button
          type="button"
          className="mt-4 rounded-xl bg-white px-5 py-2 text-xs font-bold text-[#4f46e5] shadow-md transition-transform hover:scale-105"
        >
          Explore Now
        </button>
      </div>
    </div>
  );
}
