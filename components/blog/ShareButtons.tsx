'use client';

import { useState } from 'react';
import { Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://digentic.tech/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareLinks = [
    {
      label: 'Twitter',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    },
    {
      label: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  return (
    <div className="mt-10 rounded-lg border border-[#e0e0e0] bg-white p-5 dark:border-[#1f1f1f] dark:bg-[#111111]">
      <p className="mb-3 text-sm font-semibold text-[#ff8c00]">Share this post</p>
      <div className="flex flex-wrap gap-3">
        {shareLinks.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[#e0e0e0] px-4 py-2 text-sm font-medium text-[#ff8c00] transition-all hover:border-[#ff8c00] hover:bg-[#ff8c00] hover:text-white dark:border-[#1f1f1f] dark:hover:border-[#ff8c00]"
          >
            <Icon className="h-4 w-4" />
            {label}
          </a>
        ))}
        <button
          onClick={copyLink}
          className="flex items-center gap-2 rounded-lg border border-[#e0e0e0] px-4 py-2 text-sm font-medium text-[#ff8c00] transition-all hover:border-[#ff8c00] hover:bg-[#ff8c00] hover:text-white dark:border-[#1f1f1f] dark:hover:border-[#ff8c00]"
        >
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}
