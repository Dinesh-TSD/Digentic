'use client';

import { Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PopularPost {
  id: string;
  title: string;
  views: number;
  slug: string;
  image?: string;
}

interface PopularPostsProps {
  posts: PopularPost[];
}

export function PopularPosts({ posts }: PopularPostsProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">
        <span className="text-[#ff8c00]">📊</span>
        Popular Posts
      </h3>

      <div className="space-y-3">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group flex items-start gap-3 rounded-lg border border-[#e0e0e0] bg-white p-3 transition-all hover:border-[#ff8c00] hover:shadow-sm hover:shadow-[#ff8c00]/10 dark:bg-[#111111] dark:border-[#1f1f1f] dark:hover:border-[#ff8c00]"
          >
            {/* Rank number */}
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ff8c00]/10 text-xs font-bold text-[#ff8c00]">
              {index + 1}
            </span>

            <div className="min-w-0 flex-1">
              {/* Title */}
              <p className="line-clamp-2 text-sm font-medium leading-snug text-[#1a1a1a] transition-colors group-hover:text-[#ff8c00] dark:text-[#f1f5f9] dark:group-hover:text-[#ff8c00]">
                {post.title}
              </p>

              {/* View count */}
              <div className="mt-1.5 flex items-center gap-1.5">
                <Eye className="h-3 w-3 text-[#ff8c00]" />
                <span className="rounded bg-[#ff8c00]/15 px-2 py-0.5 text-xs font-semibold text-[#ff8c00]">
                  {post.views.toLocaleString('en-US')} views
                </span>
              </div>
            </div>

            {/* Thumbnail (optional) */}
            {post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={48}
                height={48}
                className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
              />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
