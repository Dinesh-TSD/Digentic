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
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  publishDate: string;
  readTime: string;
  views: number;
  slug: string;
  index?: number;
}

export function PostCard({
  title,
  excerpt,
  category,
  image,
  author,
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
      {/* Image */}
      <Link href={`/blog/${slug}`} className="relative block overflow-hidden bg-[#f5f5f5] dark:bg-[#0a0a0a]">
        <Image
          src={image}
          alt={title}
          width={400}
          height={250}
          className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category Badge */}
        <div className="mb-3 inline-block">
          <span className="rounded-full bg-orange-600 px-3 py-1 text-xs font-semibold text-white">
            {category}
          </span>
        </div>

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h3 className="mb-2 line-clamp-2 text-base font-bold text-[#1a1a1a] hover:text-orange-600 transition-colors dark:text-[#f1f5f9] dark:hover:text-orange-500">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-2 text-sm text-[#666666] dark:text-[#94a3b8]">{excerpt}</p>

        {/* Author Info */}
        <div className="mb-4 flex items-center gap-2">
          <Image
            src={author.avatar}
            alt={author.name}
            width={32}
            height={32}
            className="h-8 w-8 rounded-full"
          />
          <span className="text-sm font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">{author.name}</span>
        </div>

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
          <div className="flex items-center gap-1">
            <Eye className="h-3.5 w-3.5 text-orange-600" />
            <span className="text-orange-600 font-medium">{views.toLocaleString('en-US')}</span>
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
