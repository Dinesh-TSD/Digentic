'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturedPostProps {
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
  slug: string;
}

export function FeaturedPost({
  title,
  excerpt,
  category,
  image,
  author,
  publishDate,
  readTime,
  slug,
}: FeaturedPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8 overflow-hidden rounded-lg border border-[#e0e0e0] bg-white transition-all hover:border-orange-600 dark:bg-[#111111] dark:border-[#1f1f1f]"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Image */}
        <Link href={`/blog/${slug}`} className="relative block overflow-hidden bg-[#f5f5f5] dark:bg-[#0a0a0a]">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="h-96 w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
        </Link>

        {/* Content */}
        <div className="flex flex-col justify-between p-6 lg:p-8">
          {/* Category Badge */}
          <div>
            <div className="mb-4 inline-block">
              <span className="rounded-full bg-orange-600 px-4 py-1.5 text-xs font-semibold text-white">
                {category}
              </span>
            </div>

            {/* Title */}
            <Link href={`/blog/${slug}`}>
              <h2 className="mb-4 text-2xl font-bold leading-tight text-[#1a1a1a] hover:text-orange-600 transition-colors lg:text-3xl dark:text-[#f1f5f9] dark:hover:text-orange-500">
                <span className="bg-orange-gradient bg-clip-text text-transparent">
                  {title}
                </span>
              </h2>
            </Link>

            {/* Excerpt */}
            <p className="mb-6 text-base text-[#666666] dark:text-[#94a3b8]">{excerpt}</p>

            {/* Author */}
            <div className="mb-6 flex items-center gap-3">
              <Image
                src={author.avatar}
                alt={author.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">{author.name}</p>
                <p className="text-xs text-[#666666] dark:text-[#94a3b8]">Founder & Writer</p>
              </div>
            </div>

            {/* Meta & CTA */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 text-sm text-[#666666] dark:text-[#94a3b8]">
                <Calendar className="h-4 w-4" />
                <span>{publishDate}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-[#666666] dark:text-[#94a3b8]">
                <Clock className="h-4 w-4" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            href={`/blog/${slug}`}
            className="mt-6 inline-block rounded-lg bg-orange-gradient px-6 py-2.5 font-semibold text-white hover:shadow-lg transition-all hover:shadow-orange-600/20"
          >
            Read Now
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
