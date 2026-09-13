'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  Download,
  Star,
  ShoppingCart,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  Zap,
  TrendingUp,
  Package,
  FileText,
  BookOpen,
  Brain,
  Palette,
  ArrowRight,
} from 'lucide-react';
import {
  DIGITAL_PRODUCTS,
  CATEGORY_FILTERS,
  BADGE_STYLES,
  type ProductCategory,
  type ProductType,
  type DigitalProduct,
} from '@/lib/digital-products';

/* ── helpers ── */
function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const s = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${s} ${n <= Math.round(rating) ? 'fill-[#ff8c00] text-[#ff8c00]' : 'fill-transparent text-gray-400'}`}
        />
      ))}
    </span>
  );
}

function PriceBadge({ price }: { price: number | null }) {
  if (price === null)
    return (
      <span className="rounded-md bg-orange-600 px-2.5 py-1 text-xs font-bold text-white tracking-wide">
        FREE
      </span>
    );
  return <span className="text-xl font-bold text-[#ff8c00]">₹{price}</span>;
}

function TypeBadge({ type }: { type: ProductType }) {
  return (
    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${BADGE_STYLES[type]}`}>
      {type}
    </span>
  );
}

/* ── Product Card ── */
function ProductCard({ product, index }: { product: DigitalProduct; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.07 }}
      className="group card-hover flex flex-col overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#111111] dark:border-[#1f1f1f] dark:bg-[#111111] light:border-[#e0e0e0] light:bg-white"
      style={{
        borderColor: 'var(--border-color)',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      {/* image */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
          <TypeBadge type={product.type} />
        </div>
        {product.originalPrice && (
          <div className="absolute right-3 top-3 rounded-md bg-orange-600 px-2 py-0.5 text-xs font-bold text-white">
            -{Math.round((1 - product.price! / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="text-sm font-bold leading-snug text-[var(--text-primary)] transition-colors group-hover:text-[#ff8c00]">
          {product.title}
        </h3>
        <p className="text-xs leading-relaxed text-[var(--text-muted)] line-clamp-1">
          {product.description}
        </p>

        {/* rating row */}
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs font-semibold text-[#ff8c00]">{product.rating}</span>
          <span className="text-xs text-[var(--text-muted)]">({product.reviewCount})</span>
        </div>

        {/* downloads */}
        <div className="flex items-center gap-1.5 text-xs font-medium text-[#ff8c00]">
          <Download className="h-3.5 w-3.5" />
          {product.downloadCount.toLocaleString()}+ downloads
        </div>

        {/* price row */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <PriceBadge price={product.price} />
            {product.originalPrice && (
              <span className="text-xs text-[var(--text-muted)] line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/digital/${product.slug}`}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-all duration-300 ${
            product.price === null
              ? 'border-2 border-[#ff8c00] text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white'
              : 'bg-orange-gradient text-white hover:shadow-lg hover:shadow-orange-600/25 hover:opacity-90'
          }`}
        >
          {product.price === null ? (
            <>
              <Download className="h-4 w-4" /> Download Free
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" /> Buy Now
            </>
          )}
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Featured mini card (sidebar) ── */
function MiniCard({ product }: { product: DigitalProduct }) {
  return (
    <Link href={`/digital/${product.slug}`} className="group flex gap-3 rounded-xl p-2 transition-all hover:bg-[var(--bg-hover)]">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
        <Image src={product.image} alt={product.title} fill className="object-cover" />
      </div>
      <div className="flex min-w-0 flex-col justify-center gap-0.5">
        <p className="truncate text-xs font-semibold text-[var(--text-primary)] group-hover:text-[#ff8c00]">
          {product.title}
        </p>
        <div className="flex items-center gap-1">
          <StarRating rating={product.rating} />
          <span className="text-xs text-[#ff8c00]">{product.rating}</span>
        </div>
        <PriceBadge price={product.price} />
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function DigitalStorePage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All Products');
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ProductType[]>([]);
  const [priceFilter, setPriceFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [minRating, setMinRating] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 6;

  /* filtered products */
  const filtered = useMemo(() => {
    let list = [...DIGITAL_PRODUCTS];

    if (activeCategory !== 'All Products')
      list = list.filter((p) => p.category === activeCategory);

    if (search.trim())
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())),
      );

    if (selectedTypes.length)
      list = list.filter((p) => selectedTypes.includes(p.type));

    if (priceFilter === 'free') list = list.filter((p) => p.price === null);
    if (priceFilter === 'paid') list = list.filter((p) => p.price !== null);

    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);

    return list;
  }, [activeCategory, search, selectedTypes, priceFilter, minRating]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const featured = DIGITAL_PRODUCTS.filter((p) => p.featured).slice(0, 3);

  const allTypes: ProductType[] = ['AI Prompts', 'UI Templates', 'Boilerplate', 'Resume', 'Notion', 'eBook'];

  function toggleType(t: ProductType) {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
    setCurrentPage(1);
  }

  function clearFilters() {
    setSelectedTypes([]);
    setPriceFilter('all');
    setMinRating(0);
    setCurrentPage(1);
  }

  const hasActiveFilters = selectedTypes.length > 0 || priceFilter !== 'all' || minRating > 0;

  const categoryIcons: Record<string, React.ReactNode> = {
    'All Products': <Package className="h-4 w-4" />,
    'AI Prompts & Kits': <Brain className="h-4 w-4" />,
    'UI Templates': <Palette className="h-4 w-4" />,
    'Boilerplates': <Zap className="h-4 w-4" />,
    'Resume Templates': <FileText className="h-4 w-4" />,
    'Notion Templates': <FileText className="h-4 w-4" />,
    'eBooks & Guides': <BookOpen className="h-4 w-4" />,
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)]">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden py-20">
        {/* background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-orange-600/10 blur-[120px]" />
          <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-orange-700/8 blur-[80px]" />
          <div className="absolute left-0 bottom-0 h-48 w-48 rounded-full bg-orange-500/8 blur-[60px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-600/30 bg-orange-600/10 px-4 py-1.5 text-xs font-semibold text-[#ff8c00]"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Digital Assets Store — {DIGITAL_PRODUCTS.length} Products Available
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
            >
              <span className="text-orange-gradient">Download. Build.</span>
              <br />
              <span className="text-[var(--text-primary)]">Ship Faster.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 max-w-xl text-base text-[var(--text-muted)] sm:text-lg"
            >
              Professional templates, AI prompts, boilerplates, and assets — hand-crafted by a
              developer, for developers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4"
            >
              <button
                onClick={() =>
                  document.getElementById('products-grid')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="bg-orange-gradient inline-flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/25 transition-all hover:opacity-90 hover:shadow-orange-600/40"
              >
                Browse All Products <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="/digital?filter=free"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#ff8c00] px-7 py-3 text-sm font-semibold text-[#ff8c00] transition-all hover:bg-[#ff8c00] hover:text-white"
              >
                <Download className="h-4 w-4" /> Free Downloads
              </Link>
            </motion.div>

            {/* quick stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-12 flex flex-wrap justify-center gap-8"
            >
              {[
                { label: 'Products', value: `${DIGITAL_PRODUCTS.length}+` },
                {
                  label: 'Total Downloads',
                  value: `${(DIGITAL_PRODUCTS.reduce((s, p) => s + p.downloadCount, 0) / 1000).toFixed(0)}K+`,
                },
                { label: 'Free Assets', value: `${DIGITAL_PRODUCTS.filter((p) => p.price === null).length}` },
                { label: 'Avg Rating', value: '4.8★' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-extrabold text-[#ff8c00]">{s.value}</p>
                  <p className="text-xs text-[var(--text-muted)]">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER BAR ── */}
      <div className="sticky top-16 z-30 border-b border-[var(--border-color)] bg-[var(--bg-base)]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">
            {CATEGORY_FILTERS.map(({ label }) => (
              <button
                key={label}
                onClick={() => {
                  setActiveCategory(label);
                  setCurrentPage(1);
                }}
                className={`flex shrink-0 items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                  activeCategory === label
                    ? 'border-b-2 border-[#ff8c00] text-[#ff8c00]'
                    : 'text-[var(--text-muted)] hover:text-[#ff8c00]'
                }`}
              >
                <span className="text-[#ff8c00]">{categoryIcons[label]}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div id="products-grid" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* search + mobile filter toggle */}
        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search products, templates, prompts..."
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] py-2.5 pl-10 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[#ff8c00] focus:outline-none focus:ring-1 focus:ring-[#ff8c00]"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[#ff8c00]">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all lg:hidden ${
              hasActiveFilters
                ? 'border-[#ff8c00] text-[#ff8c00]'
                : 'border-[var(--border-color)] text-[var(--text-muted)]'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="h-5 w-5 rounded-full bg-[#ff8c00] text-xs font-bold text-white flex items-center justify-center">
                {selectedTypes.length + (priceFilter !== 'all' ? 1 : 0) + (minRating > 0 ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        <div className="flex gap-8">
          {/* ── SIDEBAR ── */}
          <aside
            className={`
              ${sidebarOpen ? 'fixed inset-0 z-50 overflow-y-auto p-4' : 'hidden'}
              lg:sticky lg:top-32 lg:block lg:h-fit lg:w-72 lg:shrink-0
              rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5
            `}
          >
            {/* mobile close */}
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <span className="font-semibold text-[var(--text-primary)]">Filters</span>
              <button onClick={() => setSidebarOpen(false)} className="text-[var(--text-muted)] hover:text-[#ff8c00]">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* header */}
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold text-[var(--text-primary)]">Filters</h3>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs font-medium text-[#ff8c00] hover:underline">
                  Clear All
                </button>
              )}
            </div>

            {/* type filter */}
            <div className="mb-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Product Type
              </p>
              <div className="flex flex-col gap-2">
                {allTypes.map((t) => (
                  <label key={t} className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(t)}
                      onChange={() => toggleType(t)}
                      className="h-4 w-4 cursor-pointer rounded border-[var(--border-color)] accent-[#ff8c00]"
                    />
                    <span className="text-sm text-[var(--text-primary)]">{t}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* price filter */}
            <div className="mb-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Price
              </p>
              <div className="flex flex-col gap-2">
                {(['all', 'free', 'paid'] as const).map((v) => (
                  <label key={v} className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="radio"
                      name="price"
                      checked={priceFilter === v}
                      onChange={() => {
                        setPriceFilter(v);
                        setCurrentPage(1);
                      }}
                      className="h-4 w-4 cursor-pointer accent-[#ff8c00]"
                    />
                    <span className="text-sm capitalize text-[var(--text-primary)]">
                      {v === 'all' ? 'All' : v === 'free' ? 'Free Only' : 'Paid Only'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* rating filter */}
            <div className="mb-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                Minimum Rating
              </p>
              <div className="flex flex-col gap-2">
                {[0, 4, 4.5, 4.8].map((r) => (
                  <label key={r} className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === r}
                      onChange={() => {
                        setMinRating(r);
                        setCurrentPage(1);
                      }}
                      className="h-4 w-4 cursor-pointer accent-[#ff8c00]"
                    />
                    <span className="flex items-center gap-1 text-sm text-[var(--text-primary)]">
                      {r === 0 ? (
                        'Any'
                      ) : (
                        <>
                          <Star className="h-3.5 w-3.5 fill-[#ff8c00] text-[#ff8c00]" /> {r}+
                        </>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* divider */}
            <div className="my-5 border-t border-[var(--border-color)]" />

            {/* featured section */}
            <div>
              <p className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)]">
                <Star className="h-3.5 w-3.5 text-[#ff8c00]" /> Most Popular
              </p>
              <div className="flex flex-col gap-2">
                {featured.map((p) => (
                  <MiniCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </aside>

          {/* ── PRODUCTS ── */}
          <div className="min-w-0 flex-1">
            {/* result count */}
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-[var(--text-muted)]">
                Showing{' '}
                <span className="font-semibold text-[var(--text-primary)]">{filtered.length}</span>{' '}
                product{filtered.length !== 1 ? 's' : ''}
                {activeCategory !== 'All Products' && (
                  <> in <span className="font-semibold text-[#ff8c00]">{activeCategory}</span></>
                )}
              </p>
              {hasActiveFilters && (
                <button onClick={clearFilters} className="text-xs font-medium text-[#ff8c00] hover:underline">
                  Clear filters
                </button>
              )}
            </div>

            {/* grid */}
            <AnimatePresence mode="wait">
              {paginated.length > 0 ? (
                <motion.div
                  key={`${activeCategory}-${currentPage}-${search}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {paginated.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <Package className="mb-4 h-14 w-14 text-orange-600/40" />
                  <p className="text-lg font-semibold text-[var(--text-primary)]">No products found</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    Try adjusting your filters or search query.
                  </p>
                  <button
                    onClick={() => {
                      clearFilters();
                      setSearch('');
                      setActiveCategory('All Products');
                    }}
                    className="mt-5 rounded-xl bg-orange-gradient px-6 py-2.5 text-sm font-semibold text-white"
                  >
                    Reset all filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-[var(--border-color)] px-3 py-2 text-sm text-[var(--text-muted)] transition-all hover:border-[#ff8c00] hover:text-[#ff8c00] disabled:opacity-30"
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setCurrentPage(n)}
                    className={`h-9 w-9 rounded-lg text-sm font-semibold transition-all ${
                      n === currentPage
                        ? 'bg-orange-gradient text-white shadow-md shadow-orange-600/25'
                        : 'border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[#ff8c00] hover:text-[#ff8c00]'
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-[var(--border-color)] px-3 py-2 text-sm text-[var(--text-muted)] transition-all hover:border-[#ff8c00] hover:text-[#ff8c00] disabled:opacity-30"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── CTA BANNER ── */}
      <section className="relative overflow-hidden py-16">
        <div className="pointer-events-none absolute inset-0 bg-orange-gradient opacity-90" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Need something custom?
          </h2>
          <p className="mt-3 text-base text-white/80">
            Can&apos;t find what you need? Reach out and let&apos;s build it together.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-orange-600 transition-all hover:shadow-xl"
            >
              Get in Touch <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-7 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
