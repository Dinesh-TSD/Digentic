'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string | null;
  publishDate?: string;
  readTime?: string;
  views?: number;
  slug: string;
  index?: number;
}

export function PostCard({
  title,
  excerpt,
  category,
  image,
  publishDate,
  readTime,
  views,
  slug,
  index = 0,
}: PostCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group overflow-hidden rounded-lg border border-[#e0e0e0] bg-white transition-all hover:border-orange-600 dark:bg-[#111111] dark:border-[#1f1f1f]"
    >
      {/* Image with Category Badge Overlay */}
      <Link href={`/blog/${slug}`} className="relative block h-44 w-full overflow-hidden bg-orange-600/10">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-orange-600/5">
            <span className="text-3xl">📝</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
        <span className="absolute left-3 top-3 rounded-md bg-orange-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
          {category}
        </span>
      </Link>

      {/* Content */}
      <div className="p-4">

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h3 className="mb-2 line-clamp-2 text-base font-bold text-[#1a1a1a] hover:text-orange-600 transition-colors dark:text-[#f1f5f9] dark:hover:text-orange-500">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-2 text-sm text-[#666666] dark:text-[#94a3b8]">{excerpt}</p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 border-t border-[#e0e0e0] pt-3 text-xs text-[#666666] dark:border-[#1f1f1f] dark:text-[#94a3b8]">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{publishDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Read Link */}
        <Link href={`/blog/${slug}`} className="mt-4 block text-sm font-semibold text-orange-600 hover:text-orange-500 transition-colors">
          Read Article →
        </Link>
      </div>
    </motion.article>
  );
}
