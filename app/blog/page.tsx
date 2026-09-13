'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { PostCard } from '@/components/blog/PostCard';
import { SearchBox } from '@/components/blog/SearchBox';
import { PopularPosts } from '@/components/blog/PopularPosts';
import { TagsCloud } from '@/components/blog/TagsCloud';
import { AdSenseSlot } from '@/components/blog/AdSenseSlot';
import { AffiliateLinks } from '@/components/blog/AffiliateLinks';
import { MOCK_BLOG_POSTS } from '@/lib/constants';

const CATEGORIES = ['All', 'AI & LLM', 'MERN Stack', 'React / Next.js', 'AI Agents', 'Dev Tools', 'Career & Jobs'];

const AFFILIATE_PRODUCTS = [
  {
    id: '1',
    name: 'OpenAI API',
    description: 'Access powerful GPT models for your applications',
    link: 'https://openai.com/api/',
    icon: '🤖',
  },
  {
    id: '2',
    name: 'Vercel Hosting',
    description: 'Deploy Next.js apps in seconds with Vercel',
    link: 'https://vercel.com',
    icon: '⚡',
  },
  {
    id: '3',
    name: 'MongoDB Atlas',
    description: 'Cloud database for modern applications',
    link: 'https://www.mongodb.com/cloud/atlas',
    icon: '🍃',
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter posts
  const filteredPosts = useMemo(() => {
    return MOCK_BLOG_POSTS.filter((post) => {
      const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured post (first post)
  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : MOCK_BLOG_POSTS[0];

  // Remaining posts for grid
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  // Popular posts (top 5 by views)
  const popularPosts = MOCK_BLOG_POSTS.sort((a, b) => b.views - a.views)
    .slice(0, 5)
    .map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      views: post.views,
    }));

  // Get all unique tags
  const allTags = Array.from(new Set(MOCK_BLOG_POSTS.map((post) => post.category)));

  return (
    <div className="bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="border-b border-[#e0e0e0] dark:border-[#1f1f1f] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            badge="Blog"
            title="All Articles"
            subtitle="Deep dives into AI engineering, web development, and building digital products."
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <FeaturedPost
            title={featuredPost.title}
            excerpt={featuredPost.excerpt}
            category={featuredPost.category}
            image={featuredPost.image}
            author={featuredPost.author}
            publishDate={featuredPost.publishDate}
            readTime={featuredPost.readTime}
            slug={featuredPost.slug}
          />
        )}

        {/* Category Filter Bar */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-orange-gradient text-white'
                    : 'border border-[#e0e0e0] bg-white text-[#1a1a1a] hover:border-orange-600 hover:text-orange-600 dark:bg-[#111111] dark:border-[#1f1f1f] dark:text-[#f1f5f9] dark:hover:border-orange-600 dark:hover:text-orange-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Posts Grid */}
            {gridPosts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {gridPosts.map((post, index) => (
                  <PostCard key={post.id} {...post} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-lg border border-[#e0e0e0] bg-white p-8 text-center dark:bg-[#111111] dark:border-[#1f1f1f]"
              >
                <p className="text-lg font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">🔍 No posts found</p>
                <p className="mt-2 text-[#666666] dark:text-[#94a3b8]">Try adjusting your filters or search query</p>
              </motion.div>
            )}

            {/* Pagination (simplified) */}
            {gridPosts.length > 0 && (
              <div className="mt-8 flex justify-center gap-2">
                <button className="rounded-lg bg-orange-gradient px-4 py-2 text-sm font-semibold text-white">
                  1
                </button>
                <button className="rounded-lg border border-[#e0e0e0] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:border-orange-600 dark:bg-[#111111] dark:border-[#1f1f1f] dark:text-[#f1f5f9] dark:hover:border-orange-600">
                  2
                </button>
                <button className="rounded-lg border border-[#e0e0e0] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:border-orange-600 dark:bg-[#111111] dark:border-[#1f1f1f] dark:text-[#f1f5f9] dark:hover:border-orange-600">
                  3
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Search Box */}
            <SearchBox onSearch={setSearchQuery} />

            {/* Popular Posts */}
            <PopularPosts posts={popularPosts} />

            {/* Tags Cloud */}
            <TagsCloud tags={allTags} onTagClick={setSelectedCategory} />

            {/* AdSense Slot */}
            <AdSenseSlot />

            {/* Affiliate Links */}
            <AffiliateLinks products={AFFILIATE_PRODUCTS} />
          </aside>
        </div>
      </div>
    </div>
  );
}
