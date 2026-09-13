import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Eye,
  Twitter,
  Linkedin,
  Facebook,
  BookOpen,
  Tag,
} from 'lucide-react';
import { MOCK_BLOG_POSTS, SITE_CONFIG } from '@/lib/constants';
import { AdSenseSlot } from '@/components/blog/AdSenseSlot';
import { PostCard } from '@/components/blog/PostCard';
import { CommentsSection } from '@/components/blog/CommentsSection';
import { ShareButtons } from '@/components/blog/ShareButtons';

// ---------------------------------------------------------------------------
// Affiliate product data
// ---------------------------------------------------------------------------
const AFFILIATE_PRODUCTS = [
  {
    id: '1',
    name: 'OpenAI API',
    description: 'Access GPT-4, DALL·E, and Whisper with a simple REST API. Perfect for building AI-powered features.',
    link: 'https://openai.com/api/',
    icon: '🤖',
  },
  {
    id: '2',
    name: 'Vercel Pro',
    description: 'Deploy Next.js apps with edge functions, analytics, and zero-config CI/CD — built for scale.',
    link: 'https://vercel.com',
    icon: '⚡',
  },
  {
    id: '3',
    name: 'MongoDB Atlas',
    description: 'Fully managed cloud database with vector search, auto-scaling, and 99.995% uptime SLA.',
    link: 'https://www.mongodb.com/cloud/atlas',
    icon: '🍃',
  },
];

// ---------------------------------------------------------------------------
// Mock rich content (replace with real MDX loader in production)
// ---------------------------------------------------------------------------
function getMockContent(category: string): string {
  return `
    <h2>Introduction</h2>
    <p>
      In today's rapidly evolving tech landscape, understanding the core principles behind ${category} is
      essential for every developer. This guide walks you through everything you need to know to get
      started and build production-ready applications.
    </p>
    <blockquote>
      "The best way to predict the future is to build it." — Every engineer, ever.
    </blockquote>
    <h2>Getting Started</h2>
    <p>
      Before diving in, make sure your development environment is set up correctly. We'll be using
      Node.js 20+, TypeScript, and a few essential libraries that make the workflow smooth.
    </p>
    <pre><code>npm install langchain openai @langchain/community
# or with pnpm
pnpm add langchain openai @langchain/community</code></pre>
    <h2>Core Concepts</h2>
    <p>
      Understanding the fundamentals is crucial. Let's break down the key concepts you need to
      know before jumping into implementation.
    </p>
    <h3>1. Agents and Tools</h3>
    <p>
      Agents are autonomous reasoning engines that decide which tools to call, in what order, and
      how to interpret results. They use a loop of <strong>Thought → Action → Observation</strong>
      to arrive at a final answer.
    </p>
    <h3>2. Memory and State</h3>
    <p>
      Unlike a single-shot prompt, agents maintain conversation history and can reference past
      interactions. This is handled through various memory backends — from in-memory buffers to
      vector stores for semantic retrieval.
    </p>
    <pre><code>import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "@langchain/openai";
import { BufferMemory } from "langchain/memory";

const memory = new BufferMemory();
const model = new ChatOpenAI({ modelName: "gpt-4o" });
const chain = new ConversationChain({ llm: model, memory });</code></pre>
    <h2>Building Your First Agent</h2>
    <p>
      Let's put theory into practice. We'll build a simple agent that can search the web,
      run calculations, and summarize results into a coherent answer.
    </p>
    <h3>Step 1: Define Your Tools</h3>
    <p>
      Tools are functions that an agent can call. They must have a name, a description the LLM
      reads to decide when to use them, and a schema for input validation.
    </p>
    <h3>Step 2: Wire Up the Agent</h3>
    <p>
      Use <code>createOpenAIFunctionsAgent</code> from LangChain to bind tools to your model.
      The agent executor handles the loop automatically.
    </p>
    <h2>Production Considerations</h2>
    <p>
      When moving to production, keep these points in mind: rate limiting, token budgeting,
      error handling for tool failures, and observability with LangSmith or similar tools.
    </p>
    <blockquote>
      Always set a <strong>max iterations</strong> cap on your agent to prevent runaway loops
      that drain your API budget.
    </blockquote>
    <h2>Conclusion</h2>
    <p>
      You now have a solid foundation for building ${category} applications. The patterns covered
      here apply broadly — once you understand the loop, the rest is just tooling. Go build
      something great.
    </p>
  `;
}

// ---------------------------------------------------------------------------
// Page — async server component (Next.js 15: params is a Promise)
// ---------------------------------------------------------------------------
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts: same category, exclude current
  const relatedPosts = MOCK_BLOG_POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 3);

  const finalRelated =
    relatedPosts.length >= 2
      ? relatedPosts
      : MOCK_BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3);

  const content = getMockContent(post.category);
  const postUrl = `https://digentic.tech/blog/${post.slug}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <div className="bg-white dark:bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">

          {/* ── MAIN CONTENT ── */}
          <article>

            {/* ── 1. HEADER ── */}
            <header className="mb-8">
              {/* Title */}
              <h1 className="mb-6 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
                <span className="bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] bg-clip-text text-transparent">
                  {post.title}
                </span>
              </h1>

              {/* Cover image */}
              <div className="relative mb-6 overflow-hidden rounded-xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="h-64 w-full object-cover md:h-80 lg:h-96"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Author + meta */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-[#ff8c00]/30"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a] transition-colors hover:text-[#ff8c00] dark:text-[#f1f5f9] dark:hover:text-[#ff8c00]">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-[#666666] dark:text-[#94a3b8]">{SITE_CONFIG.location}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[#666666] dark:text-[#94a3b8]">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.publishDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {post.views.toLocaleString('en-US')} views
                  </span>
                </div>
              </div>
            </header>

            {/* ── 2. METADATA BAR ── */}
            <div className="mb-8 flex flex-wrap items-center gap-3 rounded-lg border border-[#e0e0e0] bg-[#f5f5f5] p-4 dark:border-[#1f1f1f] dark:bg-[#111111]">
              {/* Category badge */}
              <span className="flex items-center gap-1.5 rounded-full bg-[#ff8c00] px-3 py-1 text-xs font-semibold text-white">
                <Tag className="h-3 w-3" />
                {post.category}
              </span>

              {/* Tags */}
              {post.category.split(' / ').map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${encodeURIComponent(tag)}`}
                  className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-[#ff6b35] transition-all hover:bg-[#ff8c00] hover:text-white dark:bg-[#1f1f1f] dark:text-[#ff8c00] dark:hover:bg-[#ff8c00] dark:hover:text-[#0a0a0a]"
                >
                  #{tag}
                </Link>
              ))}

              {/* Share icons */}
              <div className="ml-auto flex items-center gap-2">                <a
                  href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff8c00] transition-colors hover:text-[#ff6b35]"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff8c00] transition-colors hover:text-[#ff6b35]"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ff8c00] transition-colors hover:text-[#ff6b35]"
                  aria-label="Share on Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* ── 3. ADSENSE TOP ── */}
            <AdSenseSlot position="top" />

            {/* ── 4. ARTICLE CONTENT ── */}
            <div
              className="article-content mb-8 leading-relaxed text-[#1a1a1a] dark:text-[#f1f5f9]"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* ── 5. ADSENSE MID ── */}
            <AdSenseSlot position="mid" />

            {/* ── 6. AFFILIATE PRODUCT MENTIONS ── */}
            <section className="mb-8">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
                🎁 <span>Recommended Tools</span>
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {AFFILIATE_PRODUCTS.map((product) => (
                  <a
                    key={product.id}
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="group flex flex-col rounded-lg border border-[#ff8c00]/40 bg-white p-4 transition-all hover:border-[#ff8c00] hover:shadow-lg hover:shadow-[#ff8c00]/10 dark:bg-[#111111]"
                  >
                    <div className="mb-2 text-2xl">{product.icon}</div>
                    <p className="mb-1 font-semibold text-[#ff8c00]">{product.name}</p>
                    <p className="mb-4 flex-1 text-xs leading-relaxed text-[#666666] dark:text-[#94a3b8]">
                      {product.description}
                    </p>
                    <span className="inline-block self-start rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-1.5 text-xs font-semibold text-white transition-opacity group-hover:opacity-90">
                      Check Price →
                    </span>
                  </a>
                ))}
              </div>
            </section>
            <AdSenseSlot position="bottom" />

            {/* ── 8. SHARE BUTTONS (client component) ── */}
            <ShareButtons title={post.title} slug={post.slug} />

            {/* ── 9. RELATED POSTS ── */}
            {finalRelated.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
                  <BookOpen className="h-5 w-5 text-[#ff8c00]" />
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {finalRelated.map((relPost, index) => (
                    <PostCard key={relPost.id} {...relPost} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* ── 10. COMMENTS (client component) ── */}
            <CommentsSection />
          </article>

          {/* ── SIDEBAR ── */}
          <aside className="space-y-6">
            {/* Author card */}
            <div className="rounded-lg border border-[#e0e0e0] bg-white p-5 dark:border-[#1f1f1f] dark:bg-[#111111]">
              <h3 className="mb-3 text-sm font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">About the Author</h3>
              <div className="flex items-start gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 flex-shrink-0 rounded-full object-cover ring-2 ring-[#ff8c00]/30"
                />
                <div>
                  <p className="text-sm font-bold text-[#ff8c00]">{post.author.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#666666] dark:text-[#94a3b8]">
                    AI Engineer &amp; MERN Developer. Building tools, sharing knowledge.
                  </p>
                </div>
              </div>
            </div>

            {/* Table of contents */}
            <div className="rounded-lg border border-[#e0e0e0] bg-white p-5 dark:border-[#1f1f1f] dark:bg-[#111111]">
              <h3 className="mb-3 text-sm font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">📋 Table of Contents</h3>
              <ol className="space-y-2 text-sm">
                {[
                  'Introduction',
                  'Getting Started',
                  'Core Concepts',
                  'Building Your First Agent',
                  'Production Considerations',
                  'Conclusion',
                ].map((heading, i) => (
                  <li key={heading}>
                    <a
                      href={`#${heading.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center gap-2 text-[#666666] transition-colors hover:text-[#ff8c00] dark:text-[#94a3b8] dark:hover:text-[#ff8c00]"
                    >
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#ff8c00]/10 text-xs font-bold text-[#ff8c00]">
                        {i + 1}
                      </span>
                      {heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Sidebar AdSense */}
            <AdSenseSlot position="sidebar" />

            {/* Tags */}
            <div className="rounded-lg border border-[#e0e0e0] bg-white p-5 dark:border-[#1f1f1f] dark:bg-[#111111]">
              <h3 className="mb-3 text-sm font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">🏷️ Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[post.category, 'Tutorial', 'AI', 'Developer', '2025'].map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-[#ff6b35] transition-all hover:bg-[#ff8c00] hover:text-white dark:bg-[#1f1f1f] dark:text-[#ff8c00] dark:hover:bg-[#ff8c00] dark:hover:text-[#0a0a0a]"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="rounded-lg border border-[#ff8c00]/30 bg-gradient-to-br from-[#ff8c00]/10 to-[#ff6b35]/5 p-5 dark:border-[#ff8c00]/20">
              <h3 className="mb-1 text-sm font-bold text-[#ff8c00]">📬 Stay in the Loop</h3>
              <p className="mb-3 text-xs text-[#666666] dark:text-[#94a3b8]">
                Get the latest articles on AI and full-stack dev delivered to your inbox.
              </p>
              <Link
                href="/#newsletter"
                className="block rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-2 text-center text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#ff8c00]/20"
              >
                Subscribe Free →
              </Link>
            </div>
          </aside>
        </div>
      </div>

    </div>
  );
}
