'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  BookOpen,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
  GraduationCap,
  Zap,
  Brain,
  Code2,
  Briefcase,
  LayoutGrid,
} from 'lucide-react';

import { COURSES } from '@/lib/courses-data';
import type { Course } from '@/lib/courses-data';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const CATEGORIES = [
  { label: 'All Courses', value: 'All', icon: LayoutGrid },
  { label: 'AI & Agents', value: 'AI & Agents', icon: Brain },
  { label: 'MERN Stack', value: 'MERN Stack', icon: Code2 },
  { label: 'Next.js', value: 'Next.js', icon: Zap },
  { label: 'LLM Engineering', value: 'LLM Engineering', icon: GraduationCap },
  { label: 'Freelancing & Career', value: 'Freelancing & Career', icon: Briefcase },
];

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;
const RATINGS = [4, 3, 2] as const;
const ITEMS_PER_PAGE = 6;

// ---------------------------------------------------------------------------
// Level badge styles
// ---------------------------------------------------------------------------
const LEVEL_STYLES: Record<Course['level'], string> = {
  Beginner: 'bg-orange-100 text-orange-600 dark:bg-[#ff8c00]/10 dark:text-[#ff8c00]',
  Intermediate: 'bg-orange-500/20 text-orange-600 dark:bg-[#ff8c00]/20 dark:text-[#ff8c00]',
  Advanced: 'bg-[#ff8c00] text-white',
};

// ---------------------------------------------------------------------------
// Star rating renderer
// ---------------------------------------------------------------------------
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="h-3.5 w-3.5 text-[#ff8c00]"
          fill={star <= Math.round(rating) ? '#ff8c00' : 'none'}
        />
      ))}
      <span className="ml-1 text-xs font-semibold text-[#ff8c00]">{rating.toFixed(1)}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Course card
// ---------------------------------------------------------------------------
function CourseCard({ course }: { course: Course }) {
  const isFree = course.price === 0;

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-[#e0e0e0] bg-white transition-all hover:border-[#ff8c00] hover:shadow-lg hover:shadow-[#ff8c00]/10 dark:border-[#1f1f1f] dark:bg-[#111111] dark:hover:border-[#ff8c00]">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden bg-[#f5f5f5] dark:bg-[#0a0a0a]">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Level badge */}
        <span className={`absolute left-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold ${LEVEL_STYLES[course.level]}`}>
          {course.level}
        </span>

        {/* Free badge */}
        {isFree && (
          <span className="absolute right-3 top-3 rounded-md bg-[#ff8c00] px-2.5 py-1 text-xs font-bold text-white">
            FREE
          </span>
        )}

        {/* Duration pill */}
        <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-[#ff8c00] px-2.5 py-1 text-xs font-semibold text-white">
          <Clock className="h-3 w-3" />
          {course.duration}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        <p className="mb-1.5 text-xs font-medium text-[#ff8c00]">{course.category}</p>

        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-[#1a1a1a] transition-colors group-hover:text-[#ff8c00] dark:text-[#f1f5f9] dark:group-hover:text-[#ff8c00]">
          {course.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 flex-1 text-xs leading-relaxed text-[#666666] dark:text-[#94a3b8]">
          {course.description}
        </p>

        {/* Meta row */}
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-[#666666] dark:text-[#94a3b8]">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-[#ff8c00]" />
            {course.lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-[#ff8c00]" />
            <span className="text-[#ff8c00] font-medium">{course.students.toLocaleString('en-US')}+ enrolled</span>
          </span>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={course.rating} />
        </div>

        {/* Instructor */}
        <div className="mb-4 flex items-center gap-2">
          <Image
            src={course.instructor.avatar}
            alt={course.instructor.name}
            width={24}
            height={24}
            className="h-6 w-6 rounded-full object-cover"
          />
          <span className="text-xs text-[#666666] dark:text-[#94a3b8]">{course.instructor.name}</span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#e0e0e0] pt-4 dark:border-[#1f1f1f]">
          <div>
            {isFree ? (
              <span className="text-lg font-bold text-[#ff8c00]">Free</span>
            ) : (
              <span className="text-lg font-bold text-[#ff8c00]">₹{course.price.toLocaleString('en-IN')}</span>
            )}
          </div>
          <Link
            href={`/courses/${course.id}`}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-all ${
              isFree
                ? 'border border-[#ff8c00] text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white'
                : 'bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] text-white hover:shadow-md hover:shadow-[#ff8c00]/20'
            }`}
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar filters
// ---------------------------------------------------------------------------
interface Filters {
  levels: string[];
  minRating: number;
  maxPrice: number;
  onlyFree: boolean;
}

function Sidebar({
  filters,
  onChange,
  onClear,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClear: () => void;
}) {
  const [levelsOpen, setLevelsOpen] = useState(true);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  const toggleLevel = (level: string) => {
    const next = filters.levels.includes(level)
      ? filters.levels.filter((l) => l !== level)
      : [...filters.levels, level];
    onChange({ ...filters, levels: next });
  };

  const hasActiveFilters =
    filters.levels.length > 0 ||
    filters.minRating > 0 ||
    filters.maxPrice < 3000 ||
    filters.onlyFree;

  const sectionHeader = (label: string, open: boolean, toggle: () => void) => (
    <button
      onClick={toggle}
      className="flex w-full items-center justify-between py-2 text-sm font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]"
    >
      {label}
      {open ? <ChevronUp className="h-4 w-4 text-[#ff8c00]" /> : <ChevronDown className="h-4 w-4 text-[#ff8c00]" />}
    </button>
  );

  return (
    <aside className="w-full rounded-xl border border-[#e0e0e0] bg-white p-5 dark:border-[#1f1f1f] dark:bg-[#111111]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-base font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
          <SlidersHorizontal className="h-4 w-4 text-[#ff8c00]" />
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-medium text-[#ff8c00] hover:text-[#ff6b35]"
          >
            <X className="h-3 w-3" />
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-1 divide-y divide-[#e0e0e0] dark:divide-[#1f1f1f]">
        {/* Level */}
        <div className="pb-4">
          {sectionHeader('Level', levelsOpen, () => setLevelsOpen((o) => !o))}
          {levelsOpen && (
            <div className="mt-2 space-y-2">
              {LEVELS.map((level) => (
                <label key={level} className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={filters.levels.includes(level)}
                    onChange={() => toggleLevel(level)}
                    className="h-4 w-4 rounded accent-[#ff8c00]"
                  />
                  <span className="text-sm text-[#1a1a1a] dark:text-[#f1f5f9]">{level}</span>
                  <span className={`ml-auto rounded px-1.5 py-0.5 text-xs ${LEVEL_STYLES[level]}`}>
                    {COURSES.filter((c) => c.level === level).length}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="py-4">
          {sectionHeader('Price', priceOpen, () => setPriceOpen((o) => !o))}
          {priceOpen && (
            <div className="mt-2 space-y-3">
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={filters.onlyFree}
                  onChange={() => onChange({ ...filters, onlyFree: !filters.onlyFree })}
                  className="h-4 w-4 rounded accent-[#ff8c00]"
                />
                <span className="text-sm text-[#1a1a1a] dark:text-[#f1f5f9]">Free only</span>
              </label>
              <div>
                <div className="mb-1.5 flex justify-between text-xs text-[#666666] dark:text-[#94a3b8]">
                  <span>Max price</span>
                  <span className="font-semibold text-[#ff8c00]">
                    {filters.maxPrice >= 3000 ? 'Any' : `₹${filters.maxPrice}`}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={3000}
                  step={100}
                  value={filters.maxPrice}
                  onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
                  className="w-full accent-[#ff8c00]"
                  disabled={filters.onlyFree}
                />
                <div className="mt-1 flex justify-between text-[10px] text-[#999] dark:text-[#64748b]">
                  <span>₹0</span>
                  <span>₹3,000</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="pt-4">
          {sectionHeader('Minimum Rating', ratingOpen, () => setRatingOpen((o) => !o))}
          {ratingOpen && (
            <div className="mt-2 space-y-2">
              {RATINGS.map((r) => (
                <label key={r} className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="radio"
                    name="minRating"
                    checked={filters.minRating === r}
                    onChange={() => onChange({ ...filters, minRating: r })}
                    className="h-4 w-4 accent-[#ff8c00]"
                  />
                  <div className="flex items-center gap-1">
                    {Array.from({ length: r }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-[#ff8c00]" fill="#ff8c00" />
                    ))}
                    <span className="ml-0.5 text-xs text-[#666666] dark:text-[#94a3b8]">& up</span>
                  </div>
                </label>
              ))}
              {filters.minRating > 0 && (
                <button
                  onClick={() => onChange({ ...filters, minRating: 0 })}
                  className="text-xs text-[#ff8c00] hover:underline"
                >
                  Show all ratings
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------
function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null;
  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm font-medium text-[#1a1a1a] transition-all hover:border-[#ff8c00] hover:text-[#ff8c00] disabled:opacity-40 dark:border-[#1f1f1f] dark:text-[#f1f5f9]"
      >
        ← Prev
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition-all ${
            page === current
              ? 'bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] text-white shadow-sm'
              : 'border border-[#e0e0e0] text-[#1a1a1a] hover:border-[#ff8c00] hover:text-[#ff8c00] dark:border-[#1f1f1f] dark:text-[#f1f5f9]'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm font-medium text-[#1a1a1a] transition-all hover:border-[#ff8c00] hover:text-[#ff8c00] disabled:opacity-40 dark:border-[#1f1f1f] dark:text-[#f1f5f9]"
      >
        Next →
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Default filter state
// ---------------------------------------------------------------------------
const DEFAULT_FILTERS: Filters = {
  levels: [],
  minRating: 0,
  maxPrice: 3000,
  onlyFree: false,
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      if (activeCategory !== 'All' && c.category !== activeCategory) return false;
      if (filters.levels.length > 0 && !filters.levels.includes(c.level)) return false;
      if (filters.minRating > 0 && c.rating < filters.minRating) return false;
      if (filters.onlyFree && c.price !== 0) return false;
      if (!filters.onlyFree && filters.maxPrice < 3000 && c.price > filters.maxPrice) return false;
      return true;
    });
  }, [activeCategory, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleFilterChange = (f: Filters) => {
    setFilters(f);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white dark:bg-[#0a0a0a]">

      {/* ── 1. HERO ── */}
      <section className="border-b border-[#e0e0e0] bg-gradient-to-br from-white to-orange-50/40 py-16 dark:border-[#1f1f1f] dark:from-[#0a0a0a] dark:to-[#ff8c00]/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#ff8c00]">
              The DNA of AI Technology
            </p>
            <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              <span className="bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] bg-clip-text text-transparent">
                Learn AI + MERN
              </span>{' '}
              <span className="text-[#1a1a1a] dark:text-[#f1f5f9]">
                from a Real Engineer
              </span>
            </h1>
            <p className="mb-8 text-base text-[#666666] dark:text-[#94a3b8]">
              Hands-on, project-based courses covering AI agents, LLM engineering, full-stack MERN,
              and career growth — built by a working engineer, not a content farm.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="#courses"
                className="rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-6 py-3 font-semibold text-white shadow-lg shadow-[#ff8c00]/20 transition-all hover:shadow-xl hover:shadow-[#ff8c00]/30"
              >
                Browse All Courses
              </a>
              <Link
                href="/about"
                className="rounded-lg border border-[#e0e0e0] bg-white px-6 py-3 font-semibold text-[#1a1a1a] transition-all hover:border-[#ff8c00] hover:text-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#111111] dark:text-[#f1f5f9]"
              >
                About the Instructor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. CATEGORY FILTER BAR ── */}
      <div
        id="courses"
        className="sticky top-16 z-10 border-b border-[#e0e0e0] bg-white/90 backdrop-blur dark:border-[#1f1f1f] dark:bg-[#0a0a0a]/90"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">
            {CATEGORIES.map(({ label, value, icon: Icon }) => {
              const isActive = activeCategory === value;
              return (
                <button
                  key={value}
                  onClick={() => handleCategoryChange(value)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#ff8c00]/10 text-[#ff8c00] underline underline-offset-4 decoration-[#ff8c00]'
                      : 'text-[#666666] hover:text-[#ff8c00] dark:text-[#94a3b8] dark:hover:text-[#ff8c00]'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#ff8c00]' : 'text-[#999] dark:text-[#64748b]'}`} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Mobile filter toggle */}
        <button
          onClick={() => setMobileFiltersOpen((o) => !o)}
          className="mb-4 flex w-full items-center justify-between rounded-lg border border-[#e0e0e0] bg-white px-4 py-3 text-sm font-semibold text-[#1a1a1a] dark:border-[#1f1f1f] dark:bg-[#111111] dark:text-[#f1f5f9] lg:hidden"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#ff8c00]" />
            Filters
          </span>
          {mobileFiltersOpen ? (
            <ChevronUp className="h-4 w-4 text-[#ff8c00]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#ff8c00]" />
          )}
        </button>

        {/* Mobile filters panel */}
        {mobileFiltersOpen && (
          <div className="mb-6 lg:hidden">
            <Sidebar filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} />
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">

          {/* ── SIDEBAR (desktop) ── */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <Sidebar filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} />
            </div>
          </div>

          {/* ── COURSE GRID ── */}
          <div>
            {/* Result count */}
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-[#666666] dark:text-[#94a3b8]">
                Showing{' '}
                <span className="font-semibold text-[#ff8c00]">{filtered.length}</span>{' '}
                {filtered.length === 1 ? 'course' : 'courses'}
                {activeCategory !== 'All' && (
                  <> in <span className="font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">{activeCategory}</span></>
                )}
              </p>
            </div>

            {/* Grid */}
            {paginated.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginated.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              /* ── 4. NO RESULTS ── */
              <div className="flex flex-col items-center justify-center rounded-xl border border-[#e0e0e0] bg-white py-20 text-center dark:border-[#1f1f1f] dark:bg-[#111111]">
                <p className="mb-2 text-2xl">🔍</p>
                <p className="mb-1 text-lg font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">
                  No courses found
                </p>
                <p className="mb-5 text-sm text-[#666666] dark:text-[#94a3b8]">
                  Try adjusting your filters or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    handleClearFilters();
                    handleCategoryChange('All');
                  }}
                  className="rounded-lg border border-[#ff8c00] px-5 py-2 text-sm font-semibold text-[#ff8c00] transition-all hover:bg-[#ff8c00] hover:text-white"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* ── PAGINATION ── */}
            <Pagination
              current={currentPage}
              total={totalPages}
              onChange={(p) => {
                setCurrentPage(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
