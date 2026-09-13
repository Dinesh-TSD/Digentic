'use client';

import { Eye } from 'lucide-react';
import Link from 'next/link';

interface PopularPost {
  id: string;
  title: string;
  views: number;
  slug: string;
}

interface PopularPostsProps {
  posts: PopularPost[];
}

export function PopularPosts({ posts }: PopularPostsProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">
        <span>📊</span>
        Popular Posts
      </h3>
      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="block rounded-lg border border-[#e0e0e0] bg-white p-3 transition-all hover:border-orange-600 dark:bg-[#111111] dark:border-[#1f1f1f]"
          >
            <p className="line-clamp-2 text-sm font-medium text-[#1a1a1a] hover:text-orange-600 transition-colors dark:text-[#f1f5f9] dark:hover:text-orange-500">
              {post.title}
            </p>
            <div className="mt-2 flex items-center gap-2 text-xs text-[#666666] dark:text-[#94a3b8]">
              <Eye className="h-3 w-3 text-orange-600" />
              <span className="bg-orange-600/20 text-orange-600 rounded px-2 py-0.5 font-medium">
                {post.views.toLocaleString()} views
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
