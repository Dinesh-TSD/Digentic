'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Upload,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Search,
  Bell,
  Eye,
  FileText,
  Save,
  Send,
  HelpCircle,
  Tag as TagIcon,
  ChevronDown,
} from 'lucide-react';
import { BLOG_CATEGORIES, type ContentBlock, type FaqItem } from '@/types/blog';
import { BlockBuilder } from '@/components/admin/posts/BlockBuilder';
import { FaqBuilder } from '@/components/admin/posts/FaqBuilder';
import { ArticleLivePreview } from '@/components/admin/posts/ArticleLivePreview';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export default function AdminNewPostPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [title, setTitle] = useState('Top 10 AI Tools in 2026');
  const [slug, setSlug] = useState('top-10-ai-tools-in-2026');
  const [excerpt, setExcerpt] = useState(
    'Discover the most powerful AI tools in 2026 that are transforming productivity, coding, content creation, design, research and more.'
  );
  const [category, setCategory] = useState<string>(BLOG_CATEGORIES[0] || 'AI Tools');
  const [tags, setTags] = useState<string[]>(['AI', 'ChatGPT', 'Claude', 'Gemini']);
  const [tagInput, setTagInput] = useState('');
  const [featuredImage, setFeaturedImage] = useState<string>(
    'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200'
  );
  const [featuredImageAlt, setFeaturedImageAlt] = useState('Top AI Tools in 2026');
  const [coverFile, setCoverFile] = useState<File | null>(null);

  // Toggles
  const [published, setPublished] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [popular, setPopular] = useState(false);

  // SEO
  const [metaTitle, setMetaTitle] = useState('Top 10 AI Tools in 2026 - Complete Guide');
  const [metaDescription, setMetaDescription] = useState(
    'Explore the top 10 AI tools in 2026 for coding, content creation, design, research, automation and productivity.'
  );
  const [keywords, setKeywords] = useState<string[]>(['AI Tools', 'ChatGPT', 'Claude', 'Gemini', 'Productivity']);
  const [keywordInput, setKeywordInput] = useState('');

  // Blocks
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    {
      id: 'hero-1',
      type: 'hero',
      title: 'Top 10 AI Tools in 2026',
      subtitle: 'The ultimate guide to state-of-the-art AI workflows and technologies.',
      badge: 'Featured AI Guide',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      id: 'text-1',
      type: 'text',
      heading: '1. Introduction to Next-Gen AI',
      content:
        '<p>In 2026, artificial intelligence is no longer just a copilot. Autonomous AI agents and specialized multimodal models now power modern software development, design, and enterprise operations.</p>',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    },
    {
      id: 'toolList-1',
      type: 'toolList',
      title: '2. Top Ranked AI Tools',
      tools: [
        {
          name: 'ChatGPT 4o & o1',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/OpenAI_logo.svg',
          description: 'Advanced reasoning, vision, and real-time audio interaction capabilities.',
          bestFor: 'General problem solving & deep research',
          pricing: 'Free / $20/mo Plus',
          website: 'https://chatgpt.com',
          pros: ['Complex problem solving', 'Multimodal voice and vision', 'Custom GPT ecosystem'],
          cons: ['Message limits on o1-preview'],
        },
        {
          name: 'Claude 3.5 Sonnet',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Anthropic_logo.svg',
          description: 'Top-tier code generation, refactoring, and long-context comprehension.',
          bestFor: 'Coding & Agentic Automation',
          pricing: 'Free / $20/mo Pro',
          website: 'https://claude.ai',
          pros: ['Remarkable code quality', '200k context window', 'Artifacts interactive preview'],
          cons: ['Limited native internet search'],
        },
        {
          name: 'Google Gemini 2.5 Flash',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Google_Gemini_logo.svg',
          description: 'High-speed 2M token context window with deep multimodal processing.',
          bestFor: 'Massive document analysis & fast APIs',
          pricing: 'Generous Free Tier / Pay per token',
          website: 'https://gemini.google.com',
          pros: ['2 Million token context', 'Ultra-low latency', 'Google ecosystem integrations'],
          cons: ['UI sometimes rate limited'],
        },
      ],
    },
    {
      id: 'comp-1',
      type: 'comparisonTable',
      title: '3. AI Models Comparison Matrix',
      columns: ['Feature', 'ChatGPT', 'Claude', 'Gemini'],
      rows: [
        ['Context Window', '128K', '200K', '2M Tokens'],
        ['Coding Benchmarks', '95%', '99%', '96%'],
        ['Real-Time Audio', 'Yes', 'No', 'Yes'],
        ['API Speed', 'Fast', 'Fast', 'Ultra-Fast'],
      ],
    },
    {
      id: 'timeline-1',
      type: 'timeline',
      title: '4. Adoption Roadmap for Teams',
      items: [
        {
          title: 'Assessment & Tool Selection',
          description: 'Audit current workflows and identify repetitive bottlenecks.',
          badge: 'Phase 1',
        },
        {
          title: 'API Integration & Agent Deployment',
          description: 'Embed LLM calls into internal dashboards with LangChain/Gemini SDK.',
          badge: 'Phase 2',
        },
        {
          title: 'Monitoring & Continuous Evaluation',
          description: 'Track token costs, hallucination rates, and user satisfaction.',
          badge: 'Phase 3',
        },
      ],
    },
    {
      id: 'resources-1',
      type: 'resources',
      title: '5. Recommended Developer Resources',
      items: [
        {
          title: 'Official Google Gemini Developer Docs',
          url: 'https://ai.google.dev',
          description: 'SDK reference, function calling, and live audio guide.',
          type: 'doc',
        },
        {
          title: 'Anthropic Claude Prompt Engineering Guide',
          url: 'https://docs.anthropic.com',
          description: 'Best practices for writing robust system prompts.',
          type: 'doc',
        },
      ],
    },
    {
      id: 'conc-1',
      type: 'conclusion',
      title: 'Conclusion & Next Steps',
      content:
        '<p>Choosing the right AI tools in 2026 depends on your specific use case. Combining Claude for coding, ChatGPT for creative thinking, and Gemini for long-context data analysis provides the ultimate developer toolkit.</p>',
      callToAction: {
        text: 'Explore Full-Stack AI Courses',
        url: '/courses',
      },
    },
  ]);

  // FAQs
  const [faq, setFaq] = useState<FaqItem[]>([
    {
      question: 'Which AI tool is best in 2026?',
      answer: 'ChatGPT, Claude, and Gemini are the leading general-purpose AI assistants, each excelling in reasoning, coding, and long-context comprehension respectively.',
    },
    {
      question: 'What is the best AI tool for coding?',
      answer: 'Claude 3.5 Sonnet and GitHub Copilot are widely regarded as the strongest coding assistants in 2026.',
    },
    {
      question: 'What is the best AI image generator?',
      answer: 'Midjourney and FLUX remain leading solutions for high-fidelity image generation.',
    },
    {
      question: 'What is the best AI research tool?',
      answer: 'Perplexity AI is widely used for real-time web search and citation-backed research.',
    },
  ]);

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Auto update slug when title changes if slug is empty or default
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === slugify(title)) {
      setSlug(slugify(val));
    }
  };

  // Tag helper
  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput('');
    }
  };
  const removeTag = (t: string) => setTags(tags.filter((x) => x !== t));

  // Keyword helper
  const addKeyword = () => {
    const k = keywordInput.trim();
    if (k && !keywords.includes(k)) {
      setKeywords([...keywords, k]);
      setKeywordInput('');
    }
  };
  const removeKeyword = (k: string) => setKeywords(keywords.filter((x) => x !== k));

  // Image Upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setFeaturedImage(URL.createObjectURL(file));
    }
  };

  // Submit Post
  const handleSubmit = async (status: 'Draft' | 'Published') => {
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!title.trim()) {
      setErrorMsg('Please enter a post title.');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('slug', slug.trim() || slugify(title));
      formData.append('excerpt', excerpt.trim());
      formData.append('category', category);
      formData.append('status', status);
      formData.append('published', String(status === 'Published'));
      formData.append('featured', String(featured));
      formData.append('popular', String(popular));
      formData.append('featuredImageAlt', featuredImageAlt.trim());
      formData.append('seoTitle', metaTitle.trim());
      formData.append('seoDescription', metaDescription.trim());
      formData.append('keywords', JSON.stringify(keywords));
      formData.append('blocks', JSON.stringify(blocks));
      formData.append('faq', JSON.stringify(faq));

      tags.forEach((t) => formData.append('tags', t));

      if (coverFile) {
        formData.append('coverImage', coverFile);
      } else if (featuredImage) {
        formData.append('featuredImage', featuredImage);
        formData.append('image', featuredImage);
      }

      const res = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save post.');
      }

      setSuccessMsg(`Post ${status === 'Published' ? 'published' : 'saved as draft'} successfully!`);
      setTimeout(() => {
        router.push(`/blog/${slug.trim() || slugify(title)}`);
      }, 1500);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-md px-6 py-3.5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] font-bold text-white shadow-md">
              AI
            </span>
            <div>
              <h1 className="text-sm font-bold text-foreground">AI Blog CMS</h1>
              <p className="text-[10px] text-muted-foreground">Create • Share • Grow</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground w-80">
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles, categories, tags..."
              className="bg-transparent text-xs text-foreground outline-none w-full"
            />
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Bell className="h-4 w-4" />
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSubmit('Draft')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-muted transition-colors disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Save Draft</span>
          </button>

          <button
            type="button"
            onClick={() => {
              if (slug) window.open(`/blog/${slug}`, '_blank');
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#6366f1]/40 bg-[#6366f1]/10 px-4 py-2 text-xs font-bold text-[#6366f1] hover:bg-[#6366f1]/20 transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSubmit('Published')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] px-5 py-2 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-all hover:scale-105 disabled:opacity-50"
          >
            {submitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            <span>Publish</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Alerts */}
        {errorMsg && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-4 text-xs font-semibold text-red-500">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-xs font-semibold text-emerald-500">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
            Create New Article
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            Write, structure, and publish high-performance content for your AI blog
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* ── LEFT COLUMN: FORMS & BLOCK BUILDER ── */}
          <div className="space-y-8 min-w-0">
            {/* 1. Basic Information Card */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-[#ff8c00]">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">Basic Information</h3>
                  <p className="text-xs text-muted-foreground">Enter the main details about your article</p>
                </div>
              </div>

              {/* Title */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Title *</label>
                  <span className="text-[11px] text-muted-foreground font-mono">{title.length}/100</span>
                </div>
                <input
                  type="text"
                  value={title}
                  maxLength={100}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Top 10 AI Tools in 2026"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-[#ff8c00]"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Slug *</label>
                <div className="flex items-center rounded-xl border border-border bg-background px-3 py-2 text-xs">
                  <span className="text-muted-foreground font-mono">/blog/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                    placeholder="top-10-ai-tools-in-2026"
                    className="flex-1 bg-transparent px-1 font-mono text-foreground outline-none"
                  />
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground font-mono">
                  Your article URL will be: /blog/{slug || 'custom-slug'}
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Excerpt *</label>
                  <span className="text-[11px] text-muted-foreground font-mono">{excerpt.length}/160</span>
                </div>
                <textarea
                  rows={3}
                  value={excerpt}
                  maxLength={200}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Discover the most powerful AI tools in 2026..."
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm text-foreground outline-none transition-colors focus:border-[#ff8c00] leading-relaxed"
                />
              </div>

              {/* Category & Tags Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Category *</label>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground outline-none transition-colors focus:border-[#ff8c00]"
                    >
                      {BLOG_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Tags *</label>
                  <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-background p-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-md bg-orange-500/10 px-2 py-0.5 text-xs font-semibold text-[#ff8c00]"
                      >
                        <span>{tag}</span>
                        <button type="button" onClick={() => removeTag(tag)}>
                          <X className="h-3 w-3 hover:text-red-500" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      placeholder="Add tag..."
                      className="flex-1 min-w-[80px] bg-transparent text-xs text-foreground outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">Featured Image *</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-4 transition-colors hover:border-[#ff8c00] bg-background"
                  >
                    {featuredImage ? (
                      <div className="relative h-28 w-full overflow-hidden rounded-lg">
                        <Image src={featuredImage} alt="Cover preview" fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
                        <span className="text-xs text-muted-foreground">Click to upload cover image</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted"
                    >
                      <Upload className="h-3.5 w-3.5 text-[#ff8c00]" />
                      <span>Upload Image</span>
                    </button>
                    <span className="text-[10px] text-muted-foreground">Recommended: 1200 x 630 (16:9)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Featured Image Alt Text *
                  </label>
                  <input
                    type="text"
                    value={featuredImageAlt}
                    onChange={(e) => setFeaturedImageAlt(e.target.value)}
                    placeholder="Descriptive alt text for SEO"
                    className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs sm:text-sm text-foreground outline-none transition-colors focus:border-[#ff8c00]"
                  />

                  {/* Toggle Switches */}
                  <div className="mt-5 space-y-3">
                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-xs font-semibold text-foreground">Published</span>
                      <input
                        type="checkbox"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="h-4 w-4 rounded border-border text-[#6366f1] focus:ring-[#6366f1]"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-xs font-semibold text-foreground">Featured</span>
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="h-4 w-4 rounded border-border text-[#6366f1] focus:ring-[#6366f1]"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer">
                      <span className="text-xs font-semibold text-foreground">Popular</span>
                      <input
                        type="checkbox"
                        checked={popular}
                        onChange={(e) => setPopular(e.target.checked)}
                        className="h-4 w-4 rounded border-border text-[#6366f1] focus:ring-[#6366f1]"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SEO Settings Card */}
            <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-border">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-[#ff8c00]">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">SEO Settings</h3>
                  <p className="text-xs text-muted-foreground">Optimize your article for search engines &amp; rich snippets</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Meta Title *</label>
                  <span className="text-[11px] text-muted-foreground font-mono">{metaTitle.length}/60</span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  maxLength={70}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder="Meta title"
                  className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs sm:text-sm text-foreground outline-none transition-colors focus:border-[#ff8c00]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-foreground">Meta Description *</label>
                  <span className="text-[11px] text-muted-foreground font-mono">{metaDescription.length}/160</span>
                </div>
                <textarea
                  rows={3}
                  value={metaDescription}
                  maxLength={170}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Explore the top 10 AI tools in 2026..."
                  className="w-full rounded-xl border border-border bg-background p-3 text-xs sm:text-sm text-foreground outline-none transition-colors focus:border-[#ff8c00]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">Keywords *</label>
                <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-border bg-background p-2">
                  {keywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1 rounded-md bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-[#6366f1]"
                    >
                      <span>{kw}</span>
                      <button type="button" onClick={() => removeKeyword(kw)}>
                        <X className="h-3 w-3 hover:text-red-500" />
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    placeholder="Add keywords..."
                    className="flex-1 min-w-[100px] bg-transparent text-xs text-foreground outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Dynamic Content Builder */}
            <BlockBuilder blocks={blocks} onChange={setBlocks} />

            {/* 4. FAQ Settings */}
            <FaqBuilder faq={faq} onChange={setFaq} />
          </div>

          {/* ── RIGHT COLUMN: ARTICLE PREVIEW & SIDEBAR WIDGETS ── */}
          <aside className="min-w-0">
            <div className="sticky top-20">
              <ArticleLivePreview
                title={title}
                excerpt={excerpt}
                category={category}
                featuredImage={featuredImage}
                readingTime={10}
                blocks={blocks}
              />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
