'use client';

import { SearchBox } from '@/components/blog/SearchBox';
import { PopularPosts } from '@/components/blog/PopularPosts';
import { TagsCloud } from '@/components/blog/TagsCloud';
import { AdSenseSlot } from '@/components/blog/AdSenseSlot';
import { AffiliateLinks } from '@/components/blog/AffiliateLinks';

interface PopularPost {
  id: string;
  title: string;
  views: number;
  slug: string;
  image?: string;
}

interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  link: string;
  icon?: string;
}

interface BlogSidebarProps {
  /** Called with the current search string (debounced) */
  onSearch?: (query: string) => void;
  /** Called when a tag is clicked */
  onTagClick?: (tag: string) => void;
  /** Currently active tag filter */
  selectedTag?: string;
  /** List of all unique tags */
  tags?: string[];
  /** Top posts sorted by views */
  popularPosts?: PopularPost[];
  /** Affiliate products to display */
  affiliateProducts?: AffiliateProduct[];
  /** AdSense publisher ID — omit to show placeholder */
  adPublisherId?: string;
  /** AdSense slot IDs for each position */
  adSlots?: {
    top?: string;
    mid?: string;
    bottom?: string;
  };
}

const DEFAULT_AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: '1',
    name: 'OpenAI API',
    description: 'Access GPT-4, DALL·E, and Whisper with a simple REST API for your AI-powered apps.',
    link: 'https://openai.com/api/',
    icon: '🤖',
  },
  {
    id: '2',
    name: 'Vercel Pro',
    description: 'Deploy Next.js apps with edge functions, analytics, and zero-config CI/CD.',
    link: 'https://vercel.com',
    icon: '⚡',
  },
  {
    id: '3',
    name: 'MongoDB Atlas',
    description: 'Fully managed cloud database with vector search and auto-scaling.',
    link: 'https://www.mongodb.com/cloud/atlas',
    icon: '🍃',
  },
  {
    id: '4',
    name: 'LangChain',
    description: 'Framework for building context-aware, reasoning applications with LLMs.',
    link: 'https://www.langchain.com',
    icon: '🔗',
  },
  {
    id: '5',
    name: 'Cursor IDE',
    description: 'AI-first code editor that writes, edits, and explains code at the speed of thought.',
    link: 'https://cursor.sh',
    icon: '✏️',
  },
];

export function BlogSidebar({
  onSearch,
  onTagClick,
  selectedTag,
  tags = [],
  popularPosts = [],
  affiliateProducts = DEFAULT_AFFILIATE_PRODUCTS,
  adPublisherId,
  adSlots = {},
}: BlogSidebarProps) {
  return (
    <aside className="w-full space-y-2">
      {/* ── 1. SEARCH ── */}
      <SearchBox onSearch={onSearch} />

      {/* ── 2. POPULAR POSTS ── */}
      {popularPosts.length > 0 && (
        <PopularPosts posts={popularPosts} />
      )}

      {/* ── 3. TAGS CLOUD ── */}
      {tags.length > 0 && (
        <TagsCloud
          tags={tags}
          selectedTag={selectedTag}
          onTagClick={onTagClick}
        />
      )}

      {/* ── 4. ADSENSE TOP SLOT ── */}
      <AdSenseSlot
        position="sidebar"
        publisherId={adPublisherId}
        adSlot={adSlots.top}
      />

      {/* ── 5. AFFILIATE LINKS ── */}
      <AffiliateLinks products={affiliateProducts} />

      {/* ── 6. NEWSLETTER CTA ── */}
      <div className="rounded-lg border border-[#ff8c00]/30 bg-gradient-to-br from-[#ff8c00]/10 to-[#ff6b35]/5 p-4">
        <h3 className="mb-1 text-sm font-bold text-[#ff8c00]">📬 Stay Updated</h3>
        <p className="mb-3 text-xs leading-relaxed text-[#666666] dark:text-[#94a3b8]">
          Get the latest articles on AI &amp; full-stack dev straight to your inbox.
        </p>
        <a
          href="/#newsletter"
          className="block rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-2 text-center text-xs font-semibold text-white transition-all hover:shadow-md hover:shadow-[#ff8c00]/20"
        >
          Subscribe Free →
        </a>
      </div>
    </aside>
  );
}
