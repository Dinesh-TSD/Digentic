import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Calendar,
  Clock,
  Eye,
  Twitter,
  Linkedin,
  Facebook,
  BookOpen,
  Tag,
  Sparkles,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import connectToDatabase from '@/lib/mongoose';
import { Post } from '@/models/Post';
import { BlockRenderer } from '@/components/blocks/BlockRenderer';
import { AdSenseSlot } from '@/components/blog/AdSenseSlot';
import { PostCard } from '@/components/blog/PostCard';
import { CommentsSection } from '@/components/blog/CommentsSection';
import { ShareButtons } from '@/components/blog/ShareButtons';
import type { ContentBlock, FaqItem } from '@/types/blog';

// ---------------------------------------------------------------------------
// Generate dynamic SEO Metadata
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  await connectToDatabase();

  const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
  const query = isObjectId ? { $or: [{ slug }, { _id: slug }] } : { slug };

  const post = await Post.findOne(query).lean();

  if (!post) {
    return {
      title: 'Article Not Found | DIGENTIC TECH',
      description: 'The requested article could not be found.',
    };
  }

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const image = post.featuredImage || post.image;

  return {
    title: `${title} | DIGENTIC TECH`,
    description,
    keywords: post.seo?.keywords || post.tags || [],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://digentic.tech/blog/${post.slug}`,
      images: image ? [{ url: image, alt: post.featuredImageAlt || post.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
  };
}

// ---------------------------------------------------------------------------
// Affiliate tools data
// ---------------------------------------------------------------------------
const AFFILIATE_PRODUCTS = [
  {
    id: '1',
    name: 'OpenAI API & GPT-4o',
    description: 'Build production AI features, multimodal agents, and chat systems with simple REST APIs.',
    link: 'https://openai.com/api/',
    icon: '🤖',
  },
  {
    id: '2',
    name: 'Anthropic Claude Pro',
    description: 'Industry-leading code generation and nuanced long-form reasoning capabilities.',
    link: 'https://claude.ai',
    icon: '🧠',
  },
  {
    id: '3',
    name: 'MongoDB Atlas Vector Search',
    description: 'Fully managed cloud database with built-in semantic vector search for AI and RAG applications.',
    link: 'https://www.mongodb.com/cloud/atlas',
    icon: '🍃',
  },
];

// ---------------------------------------------------------------------------
// Universal Blog Post Page — Server Component (75% Content / 25% Sidebar)
// ---------------------------------------------------------------------------
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await connectToDatabase();

  const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
  const query = isObjectId ? { $or: [{ slug }, { _id: slug }] } : { slug };

  const postDoc = await Post.findOneAndUpdate(
    query,
    { $inc: { views: 1 } },
    { returnDocument: 'after' }
  ).lean();

  if (!postDoc) {
    notFound();
  }

  const post = {
    id: String(postDoc._id),
    title: postDoc.title,
    slug: postDoc.slug,
    excerpt: postDoc.excerpt,
    content: postDoc.content,
    category: postDoc.category,
    tags: postDoc.tags || [],
    featuredImage: postDoc.featuredImage || postDoc.image || null,
    featuredImageAlt: postDoc.featuredImageAlt || postDoc.title,
    views: postDoc.views || 0,
    readingTime: postDoc.readingTime || 5,
    readTime: postDoc.readTime || `${postDoc.readingTime || 5} min read`,
    blocks: (postDoc.blocks || []) as ContentBlock[],
    faq: (postDoc.faq || []) as FaqItem[],
    publishDate: postDoc.createdAt
      ? new Date(postDoc.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '',
  };

  // Build Table of Contents dynamically from blocks
  const tableOfContents: { label: string; id: string }[] = [];
  tableOfContents.push({ label: 'Introduction', id: 'overview' });

  post.blocks.forEach((b: any) => {
    if (b.type === 'text' && b.heading) {
      const id = b.heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      tableOfContents.push({ label: b.heading, id });
    } else if (b.type === 'hero' && b.title) {
      tableOfContents.push({ label: b.title, id: 'hero' });
    } else if (b.type === 'toolList' && b.title) {
      tableOfContents.push({ label: b.title, id: 'tools-list' });
    } else if (b.type === 'comparisonTable' && b.title) {
      tableOfContents.push({ label: b.title, id: 'comparison' });
    } else if (b.type === 'timeline' && b.title) {
      tableOfContents.push({ label: b.title, id: 'roadmap' });
    } else if (b.type === 'resources' && b.title) {
      tableOfContents.push({ label: b.title, id: 'resources' });
    } else if (b.type === 'projects' && b.title) {
      tableOfContents.push({ label: b.title, id: 'projects' });
    } else if (b.type === 'gallery' && b.title) {
      tableOfContents.push({ label: b.title || 'Gallery', id: 'gallery' });
    } else if (b.type === 'faq' || (post.faq && post.faq.length > 0)) {
      if (!tableOfContents.some((t) => t.id === 'faq')) {
        tableOfContents.push({ label: 'FAQ', id: 'faq' });
      }
    } else if (b.type === 'conclusion') {
      tableOfContents.push({ label: 'Conclusion', id: 'conclusion' });
    }
  });

  // Fetch Popular / Related Posts for sidebar and bottom section
  const [popularDocs, relatedDocs] = await Promise.all([
    Post.find({ _id: { $ne: postDoc._id }, status: 'Published' })
      .sort({ views: -1 })
      .limit(3)
      .lean(),
    Post.find({
      _id: { $ne: postDoc._id },
      category: post.category,
      status: 'Published',
    })
      .limit(3)
      .lean(),
  ]);

  const popularPosts = popularDocs.map((p: any) => ({
    title: p.title,
    slug: p.slug,
    readTime: p.readTime || `${p.readingTime || 5} min read`,
    views: `${p.views || 0} views`,
    image: p.featuredImage || p.image || 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300',
  }));

  const finalRelated = (relatedDocs.length > 0 ? relatedDocs : popularDocs).map((p: any) => ({
    id: String(p._id),
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: p.category,
    image: p.featuredImage || p.image || null,
    views: p.views,
    readTime: p.readTime || `${p.readingTime || 5} min read`,
    publishDate: p.createdAt
      ? new Date(p.createdAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })
      : '',
  }));

  const postUrl = `https://digentic.tech/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 75% Main Content / 25% Sidebar Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* ── MAIN CONTENT AREA (75%) ── */}
          <article className="min-w-0">
            {/* 1. Header */}
            <header className="mb-8" id="overview">
              <h1 className="mb-6 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-foreground">
                <span className="bg-gradient-to-r from-[#ff8c00] via-[#ff6b35] to-[#f97316] bg-clip-text text-transparent">
                  {post.title}
                </span>
              </h1>

              {/* Cover Image */}
              {post.featuredImage && (
                <div className="relative mb-6 overflow-hidden rounded-2xl border border-border shadow-xl bg-card">
                  <Image
                    src={post.featuredImage}
                    alt={post.featuredImageAlt || post.title}
                    width={1200}
                    height={630}
                    className="h-64 sm:h-80 md:h-96 w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <span className="absolute left-5 top-5 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-3.5 py-1.5 text-xs font-bold text-white shadow-md">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Meta Info Bar */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                {post.publishDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-[#ff8c00]" />
                    {post.publishDate}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#ff8c00]" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4 text-[#ff8c00]" />
                  {post.views.toLocaleString('en-US')} views
                </span>
              </div>
            </header>

            {/* 2. Metadata Bar */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-3 py-1 text-xs font-bold text-white shadow-sm">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>

                {post.tags && post.tags.length > 0
                  ? post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))
                  : null}
              </div>

              {/* Share Icons */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-[#ff8c00] transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-[#ff8c00] transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-[#ff8c00] transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* AdSense Top Slot */}
            <AdSenseSlot position="top" />

            {/* 3. DYNAMIC CONTENT BLOCKS (Universal Renderer) */}
            {post.blocks && post.blocks.length > 0 ? (
              <div className="my-8">
                <BlockRenderer blocks={post.blocks} />
              </div>
            ) : (
              /* Fallback HTML Content for legacy posts */
              <div
                className="article-content my-8 leading-relaxed text-foreground prose prose-neutral dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
              />
            )}

            {/* 4. Standalone FAQ Section (if post.faq has items and no FAQ block was rendered) */}
            {post.faq && post.faq.length > 0 && !post.blocks.some((b) => b.type === 'faq') && (
              <section className="my-10 space-y-6" id="faq">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-6 w-6 text-[#ff8c00]" />
                  <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Frequently Asked Questions
                  </h2>
                </div>
                <div className="space-y-3">
                  {post.faq.map((item, idx) => (
                    <div key={idx} className="rounded-xl border border-border bg-card p-4 space-y-2">
                      <h3 className="text-sm sm:text-base font-bold text-foreground">
                        {item.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* AdSense Mid Slot */}
            <AdSenseSlot position="mid" />

            {/* 5. Affiliate Recommended Tools */}
            <section className="my-10">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-foreground">
                <Sparkles className="h-5 w-5 text-[#ff8c00]" />
                <span>Recommended Developer Tools</span>
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {AFFILIATE_PRODUCTS.map((product) => (
                  <a
                    key={product.id}
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-[#ff8c00]/50 hover:shadow-lg"
                  >
                    <div className="mb-2 text-2xl">{product.icon}</div>
                    <p className="font-bold text-foreground group-hover:text-[#ff8c00] transition-colors">
                      {product.name}
                    </p>
                    <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {product.description}
                    </p>
                    <span className="mt-4 inline-block self-start rounded-xl bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm transition-transform group-hover:scale-105">
                      Explore Tool →
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* AdSense Bottom Slot */}
            <AdSenseSlot position="bottom" />

            {/* 6. Share Buttons */}
            <ShareButtons title={post.title} slug={post.slug} />

            {/* 7. Related Posts */}
            {finalRelated.length > 0 && (
              <section className="mt-14 pt-8 border-t border-border">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-black text-foreground">
                  <BookOpen className="h-6 w-6 text-[#ff8c00]" />
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {finalRelated.map((relPost, index) => (
                    <PostCard key={relPost.id || relPost.slug} {...relPost} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* 8. Comments Section */}
            <CommentsSection />
          </article>

          {/* ── SIDEBAR AREA (25%) ── */}
          <aside className="space-y-6">
            <div className="sticky top-20 space-y-6">
              {/* 1. Dynamic Table of Contents */}
              {tableOfContents.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    📋 Table of Contents
                  </h3>
                  <ol className="space-y-2 text-xs">
                    {tableOfContents.map((heading, i) => (
                      <li key={i}>
                        <a
                          href={`#${heading.id}`}
                          className="flex items-center gap-2 text-muted-foreground hover:text-[#ff8c00] transition-colors truncate"
                        >
                          <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-orange-500/10 text-[10px] font-bold text-[#ff8c00]">
                            {i + 1}
                          </span>
                          <span className="truncate">{heading.label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* 2. Popular Posts in Sidebar */}
              {popularPosts.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    🔥 Trending Articles
                  </h3>
                  <div className="space-y-3">
                    {popularPosts.map((p, idx) => (
                      <Link
                        key={idx}
                        href={`/blog/${p.slug}`}
                        className="group flex items-center gap-3"
                      >
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
                          <Image src={p.image} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-[#ff8c00] transition-colors">
                            {p.title}
                          </p>
                          <p className="mt-1 text-[10px] text-muted-foreground">
                            {p.readTime} • {p.views}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Newsletter CTA */}
              <div className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-background to-orange-500/5 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-[#ff8c00]">📬 Stay Ahead in AI</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Join 25,000+ developers receiving our weekly deep dives and tools analysis.
                </p>
                <Link
                  href="/#newsletter"
                  className="mt-4 block rounded-xl bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] py-2 text-center text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-all hover:scale-105"
                >
                  Subscribe Free →
                </Link>
              </div>

              {/* 4. Sidebar Ad Slot */}
              <AdSenseSlot position="sidebar" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
