'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { FilterChips } from '@/components/shared/FilterChips';
import { SavedPostRow } from '@/components/user/SavedPostRow';

const savedPosts = [
  { title: 'LangChain agents tutorial', date: 'Sep 10, 2025', tag: 'AI', excerpt: 'Learn how to build autonomous agents with LangChain and GPT-4...' },
  { title: 'Next.js 15 server actions guide', date: 'Sep 8, 2025', tag: 'Next.js', excerpt: 'Complete guide to server actions in Next.js 15 App Router...' },
  { title: 'MERN auth with NextAuth v5', date: 'Sep 5, 2025', tag: 'MERN', excerpt: 'Implement secure authentication in your MERN stack app...' },
  { title: 'TypeScript generics deep dive', date: 'Sep 3, 2025', tag: 'TypeScript', excerpt: 'Master TypeScript generics with real-world examples...' },
  { title: 'React Server Components explained', date: 'Aug 30, 2025', tag: 'Next.js', excerpt: 'Understanding RSC and when to use client vs server components...' },
  { title: 'Node.js streams tutorial', date: 'Aug 28, 2025', tag: 'Node.js', excerpt: 'Handle large data efficiently with Node.js streams...' },
  { title: 'Building REST APIs with Express', date: 'Aug 25, 2025', tag: 'MERN', excerpt: 'Design and build scalable REST APIs from scratch...' },
  { title: 'AI prompt engineering guide', date: 'Aug 22, 2025', tag: 'AI', excerpt: 'Best practices for crafting effective AI prompts...' },
  { title: 'Tailwind CSS advanced patterns', date: 'Aug 20, 2025', tag: 'Next.js', excerpt: 'Advanced utility-first patterns for complex UIs...' },
  { title: 'MongoDB aggregation pipeline', date: 'Aug 18, 2025', tag: 'MERN', excerpt: 'Master MongoDB aggregation for complex data queries...' },
  { title: 'TypeScript decorators explained', date: 'Aug 15, 2025', tag: 'TypeScript', excerpt: 'Understanding and using TypeScript decorators...' },
  { title: 'React 19 new features', date: 'Aug 12, 2025', tag: 'Next.js', excerpt: 'Overview of all new features in React 19...' },
  { title: 'LangGraph state machines', date: 'Aug 10, 2025', tag: 'AI', excerpt: 'Build complex AI workflows with LangGraph...' },
  { title: 'Express.js middleware patterns', date: 'Aug 8, 2025', tag: 'Node.js', excerpt: 'Custom middleware patterns for Express apps...' },
  { title: 'Next.js caching strategies', date: 'Aug 5, 2025', tag: 'Next.js', excerpt: 'Optimize your Next.js app with proper caching...' },
  { title: 'TypeScript conditional types', date: 'Aug 3, 2025', tag: 'TypeScript', excerpt: 'Advanced type manipulation with conditional types...' },
  { title: 'AI image generation API', date: 'Aug 1, 2025', tag: 'AI', excerpt: 'Integrate AI image generation into your app...' },
  { title: 'Node.js clustering guide', date: 'Jul 28, 2025', tag: 'Node.js', excerpt: 'Scale your Node.js app with clustering...' },
];

const filters = ['All', 'AI', 'MERN', 'Next.js', 'TypeScript', 'Node.js'];

export default function UserSavedPostsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? savedPosts
      : savedPosts.filter((p) => p.tag === activeFilter);

  return (
    <>
      <PageHeader title="Saved posts" subtitle={`${savedPosts.length} articles saved`} role="user" />

      <FilterChips items={filters} active={activeFilter} onChange={setActiveFilter} />

      <div className="px-4 pb-4">
        {filtered.map((post) => (
          <SavedPostRow
            key={post.title}
            title={post.title}
            date={post.date}
            tag={post.tag}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </>
  );
}
