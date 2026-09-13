'use client';

import { useState, use } from 'react';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  Download,
  ShoppingCart,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Check,
  FileText,
  Figma,
  Code,
  BookOpen,
  Package,
  RefreshCw,
  Headphones,
  ThumbsUp,
  ChevronDown,
  ArrowLeft,
  Sparkles,
  Shield,
  Tag,
} from 'lucide-react';
import {
  DIGITAL_PRODUCTS,
  BADGE_STYLES,
  type DigitalProduct,
  type ProductType,
} from '@/lib/digital-products';

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function StarRating({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (n: number) => void }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          onClick={() => interactive && onRate?.(n)}
          className={`h-4 w-4 transition-colors ${interactive ? 'cursor-pointer' : ''} ${
            n <= Math.round(rating)
              ? 'fill-[#ff8c00] text-[#ff8c00]'
              : 'fill-transparent text-gray-400'
          }`}
        />
      ))}
    </span>
  );
}

function TypeBadge({ type }: { type: ProductType }) {
  return (
    <span className={`rounded-lg px-3 py-1 text-xs font-bold tracking-wide ${BADGE_STYLES[type]}`}>
      {type}
    </span>
  );
}

function fileIcon(format: string) {
  if (format === 'Figma') return <Figma className="h-4 w-4 text-[#ff8c00]" />;
  if (['ZIP', 'Code'].includes(format)) return <Code className="h-4 w-4 text-[#ff8c00]" />;
  if (['PDF', 'DOCX', 'Markdown', 'XLSX'].includes(format)) return <FileText className="h-4 w-4 text-[#ff8c00]" />;
  if (format === 'Notion') return <BookOpen className="h-4 w-4 text-[#ff8c00]" />;
  return <Package className="h-4 w-4 text-[#ff8c00]" />;
}

/* ─────────────────────────────────────────
   TABS
───────────────────────────────────────── */
type Tab = 'overview' | 'included' | 'reviews' | 'faqs';

function OverviewTab({ product }: { product: DigitalProduct }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <p className="leading-relaxed text-[var(--text-muted)]">{product.longDescription}</p>
      <div>
        <h4 className="mb-4 font-semibold text-[var(--text-primary)]">Key Features</h4>
        <ul className="space-y-3">
          {product.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-600/15">
                <Check className="h-3 w-3 text-[#ff8c00]" />
              </span>
              <span className="text-sm text-[var(--text-primary)]">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        {product.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-orange-600/30 bg-orange-600/10 px-3 py-1 text-xs font-medium text-[#ff8c00]"
          >
            #{t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function IncludedTab({ product }: { product: DigitalProduct }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      <p className="text-sm text-[var(--text-muted)]">
        Everything included in your download:
      </p>
      {product.filesIncluded.map((file, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4 transition-all hover:border-orange-600/50"
        >
          <div className="flex items-center gap-3">
            {fileIcon(file.format)}
            <div>
              <p className="text-sm font-medium text-[#ff8c00]">{file.name}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {file.format} • {file.size}
              </p>
            </div>
          </div>
          <button className="text-xs font-medium text-[#ff8c00] hover:underline">
            Preview
          </button>
        </div>
      ))}
    </motion.div>
  );
}

function ReviewsTab({ product }: { product: DigitalProduct }) {
  const [helpful, setHelpful] = useState<Record<number, boolean>>({});

  const ratingDist = [5, 4, 3, 2, 1].map((r) => ({
    stars: r,
    count: product.reviews.filter((rv) => rv.rating === r).length,
    pct: Math.round((product.reviews.filter((rv) => rv.rating === r).length / Math.max(product.reviews.length, 1)) * 100),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* overall */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 sm:flex-row sm:items-center">
        <div className="flex flex-col items-center gap-1 sm:w-32">
          <span className="text-5xl font-extrabold text-[#ff8c00]">{product.rating}</span>
          <StarRating rating={product.rating} />
          <span className="text-xs text-[var(--text-muted)]">{product.reviewCount} reviews</span>
        </div>
        <div className="flex-1 space-y-2">
          {ratingDist.map(({ stars, pct }) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="w-4 text-xs text-[var(--text-muted)]">{stars}</span>
              <Star className="h-3 w-3 fill-[#ff8c00] text-[#ff8c00]" />
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--bg-base)]">
                <div
                  className="h-full rounded-full bg-[#ff8c00] transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 text-right text-xs text-[var(--text-muted)]">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* reviews */}
      {product.reviews.map((rv, i) => (
        <div key={i} className="rounded-2xl border border-[var(--border-color)] p-5">
          <div className="flex items-start gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image src={rv.avatar} alt={rv.author} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-semibold text-[var(--text-primary)]">{rv.author}</span>
                <span className="text-xs text-[var(--text-muted)]">{rv.date}</span>
              </div>
              <StarRating rating={rv.rating} />
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{rv.text}</p>
              <button
                onClick={() => setHelpful((h) => ({ ...h, [i]: !h[i] }))}
                className={`mt-3 flex items-center gap-1.5 text-xs transition-colors ${
                  helpful[i] ? 'text-[#ff8c00]' : 'text-[var(--text-muted)] hover:text-[#ff8c00]'
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                Helpful ({rv.helpfulCount + (helpful[i] ? 1 : 0)})
              </button>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function FAQsTab({ product }: { product: DigitalProduct }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3"
    >
      {product.faqs.map((faq, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)]"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between p-4 text-left"
          >
            <span className="font-medium text-[var(--text-primary)]">{faq.question}</span>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-[#ff8c00] transition-transform ${open === i ? 'rotate-180' : ''}`}
            />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <p className="border-t border-[var(--border-color)] px-4 pb-4 pt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {faq.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = DIGITAL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [saved, setSaved] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const related = DIGITAL_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.type === product.type),
  ).slice(0, 4);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'included', label: "What's Included" },
    { id: 'reviews', label: `Reviews (${product.reviewCount})` },
    { id: 'faqs', label: 'FAQs' },
  ];

  function handleAddToCart() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      {/* breadcrumb */}
      <div className="border-b border-[var(--border-color)] bg-[var(--bg-surface)]">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/digital" className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[#ff8c00]">
            <ArrowLeft className="h-3.5 w-3.5" /> Digital Store
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          <span className="text-xs text-[#ff8c00]">{product.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* ── HERO ROW ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">

          {/* Left — image carousel (60%) */}
          <div className="lg:col-span-3">
            {/* main image */}
            <div className="group relative overflow-hidden rounded-2xl border border-[var(--border-color)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-64 sm:h-80 md:h-96"
                >
                  <Image
                    src={product.images[activeImage]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* carousel controls */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((a) => (a - 1 + product.images.length) % product.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-[#ff8c00] p-2 text-white shadow-lg transition-all hover:bg-orange-700"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setActiveImage((a) => (a + 1) % product.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-[#ff8c00] p-2 text-white shadow-lg transition-all hover:bg-orange-700"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}

              {/* zoom + preview buttons */}
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button className="rounded-lg border border-[#ff8c00] bg-black/60 p-2 text-[#ff8c00] backdrop-blur-sm hover:bg-[#ff8c00] hover:text-white transition-all">
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* thumbnails */}
            {product.images.length > 1 && (
              <div className="mt-3 flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative h-16 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                      activeImage === i ? 'border-[#ff8c00]' : 'border-[var(--border-color)]'
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Download preview */}
            <button className="mt-4 flex items-center gap-2 rounded-lg border border-[#ff8c00] px-4 py-2 text-sm font-medium text-[#ff8c00] transition-all hover:bg-[#ff8c00] hover:text-white">
              <Download className="h-4 w-4" /> Download Free Preview
            </button>
          </div>

          {/* Right — product info (40%) */}
          <div className="lg:col-span-2">
            <div className="flex flex-col gap-4">
              {/* badges row */}
              <div className="flex flex-wrap items-center gap-2">
                <TypeBadge type={product.type} />
                {product.featured && (
                  <span className="flex items-center gap-1 rounded-lg bg-orange-600/15 px-2.5 py-1 text-xs font-semibold text-[#ff8c00]">
                    <Sparkles className="h-3 w-3" /> Featured
                  </span>
                )}
              </div>

              {/* title */}
              <h1 className="text-2xl font-extrabold leading-tight text-orange-gradient sm:text-3xl">
                {product.title}
              </h1>

              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {product.description}
              </p>

              {/* rating */}
              <div className="flex flex-wrap items-center gap-3">
                <StarRating rating={product.rating} />
                <span className="text-sm font-bold text-[#ff8c00]">{product.rating}</span>
                <span className="text-sm text-[var(--text-muted)]">({product.reviewCount} reviews)</span>
              </div>

              {/* downloads */}
              <div className="flex items-center gap-1.5 text-sm font-medium text-[#ff8c00]">
                <Download className="h-4 w-4" />
                {product.downloadCount.toLocaleString()}+ downloads
              </div>

              {/* price */}
              <div className="flex items-baseline gap-3">
                {product.price === null ? (
                  <span className="rounded-lg bg-orange-600 px-3 py-1 text-lg font-extrabold text-white">
                    FREE
                  </span>
                ) : (
                  <>
                    <span className="text-4xl font-extrabold text-[#ff8c00]">₹{product.price}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-lg text-[var(--text-muted)] line-through">
                          ₹{product.originalPrice}
                        </span>
                        <span className="rounded-lg bg-orange-600 px-2 py-0.5 text-xs font-bold text-white">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </>
                )}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3 pt-1">
                <Link
                  href={product.price === null ? '/digital/downloads' : '/digital/checkout'}
                  className="bg-orange-gradient flex items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold text-white shadow-lg shadow-orange-600/25 transition-all hover:opacity-90 hover:shadow-orange-600/40"
                >
                  {product.price === null ? (
                    <><Download className="h-5 w-5" /> Download Free</>
                  ) : (
                    <><ShoppingCart className="h-5 w-5" /> Buy Now — ₹{product.price}</>
                  )}
                </Link>

                {product.price !== null && (
                  <button
                    onClick={handleAddToCart}
                    className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-all ${
                      addedToCart
                        ? 'border-green-500 text-green-500'
                        : 'border-[#ff8c00] text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white'
                    }`}
                  >
                    {addedToCart ? (
                      <><Check className="h-4 w-4" /> Added to Cart!</>
                    ) : (
                      <><ShoppingCart className="h-4 w-4" /> Add to Cart</>
                    )}
                  </button>
                )}

                <button
                  onClick={() => setSaved((s) => !s)}
                  className={`flex items-center justify-center gap-2 text-sm font-medium transition-colors ${
                    saved ? 'text-[#ff8c00]' : 'text-[var(--text-muted)] hover:text-[#ff8c00]'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${saved ? 'fill-[#ff8c00]' : ''}`} />
                  {saved ? 'Saved' : 'Save for Later'}
                </button>
              </div>

              {/* trust badges */}
              <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-4">
                {[
                  { icon: <Shield className="h-4 w-4 text-[#ff8c00]" />, label: 'Secure Payment' },
                  { icon: <Download className="h-4 w-4 text-[#ff8c00]" />, label: 'Instant Download' },
                  { icon: <RefreshCw className="h-4 w-4 text-[#ff8c00]" />, label: product.updates },
                  { icon: <Headphones className="h-4 w-4 text-[#ff8c00]" />, label: product.support },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    {icon}
                    <span className="text-xs text-[var(--text-muted)]">{label}</span>
                  </div>
                ))}
              </div>

              {/* share */}
              <button className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-[#ff8c00] transition-colors">
                <Share2 className="h-3.5 w-3.5" /> Share this product
              </button>
            </div>
          </div>
        </div>

        {/* ── TABS + SIDEBAR ROW ── */}
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">

          {/* Tabs (left 60%) */}
          <div className="lg:col-span-3">
            {/* tab bar */}
            <div className="flex overflow-x-auto border-b border-[var(--border-color)] no-scrollbar">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`shrink-0 px-5 py-3 text-sm font-medium transition-all ${
                    activeTab === t.id
                      ? 'border-b-2 border-[#ff8c00] text-[#ff8c00]'
                      : 'text-[var(--text-muted)] hover:text-[#ff8c00]'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {activeTab === 'overview' && <OverviewTab product={product} />}
              {activeTab === 'included' && <IncludedTab product={product} />}
              {activeTab === 'reviews' && <ReviewsTab product={product} />}
              {activeTab === 'faqs' && <FAQsTab product={product} />}
            </div>
          </div>

          {/* Sticky sidebar (right 40%) */}
          <aside className="lg:col-span-2">
            <div className="sticky top-24 flex flex-col gap-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5">
              {/* thumbnail */}
              <div className="relative h-36 overflow-hidden rounded-xl">
                <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
              </div>

              {/* price */}
              <div className="flex items-baseline gap-2">
                {product.price === null ? (
                  <span className="text-2xl font-extrabold text-[#ff8c00]">FREE</span>
                ) : (
                  <>
                    <span className="text-2xl font-extrabold text-[#ff8c00]">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[var(--text-muted)] line-through">₹{product.originalPrice}</span>
                    )}
                  </>
                )}
              </div>

              {/* buy button */}
              <Link
                href={product.price === null ? '/digital/downloads' : '/digital/checkout'}
                className="bg-orange-gradient flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-orange-600/25"
              >
                {product.price === null ? (
                  <><Download className="h-4 w-4" /> Download Free</>
                ) : (
                  <><ShoppingCart className="h-4 w-4" /> Buy Now</>
                )}
              </Link>

              {/* specs */}
              <div className="space-y-2.5 border-t border-[var(--border-color)] pt-4">
                {[
                  { label: 'Format', value: product.format, icon: <Tag className="h-3.5 w-3.5" /> },
                  { label: 'File Size', value: product.fileSize, icon: <Package className="h-3.5 w-3.5" /> },
                  { label: 'Updates', value: product.updates, icon: <RefreshCw className="h-3.5 w-3.5" /> },
                  { label: 'Support', value: product.support, icon: <Headphones className="h-3.5 w-3.5" /> },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                      <span className="text-[#ff8c00]">{icon}</span>
                      {label}
                    </div>
                    <span className="text-right text-xs font-medium text-[#ff8c00]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ── RELATED PRODUCTS ── */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 flex items-center gap-2 text-xl font-extrabold text-[var(--text-primary)]">
              <span className="text-[#ff8c00]">🎁</span> You Might Also Like
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="group card-hover flex flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)]"
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-2 top-2">
                      <TypeBadge type={p.type} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-3">
                    <h4 className="text-xs font-bold leading-snug text-[var(--text-primary)] group-hover:text-[#ff8c00] line-clamp-2">
                      {p.title}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-[#ff8c00] text-[#ff8c00]" />
                      <span className="text-xs font-semibold text-[#ff8c00]">{p.rating}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-sm font-bold text-[#ff8c00]">
                        {p.price === null ? 'FREE' : `₹${p.price}`}
                      </span>
                      <Link
                        href={`/digital/${p.slug}`}
                        className="rounded-lg border border-[#ff8c00] px-2.5 py-1 text-xs font-semibold text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white transition-all"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
