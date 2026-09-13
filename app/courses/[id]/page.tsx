'use client';

import { notFound } from 'next/navigation';
import { use, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star,
  BookOpen,
  Clock,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lock,
  Play,
  Globe,
  Smartphone,
  Award,
  ShieldCheck,
  Download,
  Github,
  Linkedin,
  Twitter,
  ThumbsUp,
} from 'lucide-react';
import { COURSES } from '@/lib/courses-data';
import type { Course } from '@/lib/courses-data';
import { VideoPlayer } from '@/components/courses/VideoPlayer';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const LEVEL_STYLES: Record<Course['level'], string> = {
  Beginner: 'bg-orange-100 text-orange-700 dark:bg-[#ff8c00]/10 dark:text-[#ff8c00]',
  Intermediate: 'bg-orange-200 text-orange-700 dark:bg-[#ff8c00]/20 dark:text-[#ff8c00]',
  Advanced: 'bg-[#ff8c00] text-white',
};

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const cls = size === 'lg' ? 'h-5 w-5' : size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`${cls} text-[#ff8c00]`} fill={s <= Math.round(rating) ? '#ff8c00' : 'none'} />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Curriculum accordion
// ---------------------------------------------------------------------------
function CurriculumSection({ section }: { section: Course['curriculum'][number] }) {
  const [open, setOpen] = useState(false);
  const totalDuration = section.lessons.reduce((acc, l) => {
    const [m, s] = l.duration.split(':').map(Number);
    return acc + m * 60 + s;
  }, 0);
  const totalMin = Math.floor(totalDuration / 60);

  return (
    <div className="overflow-hidden rounded-lg border border-[#e0e0e0] dark:border-[#1f1f1f]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 bg-[#f5f5f5] px-5 py-4 text-left transition-colors hover:bg-orange-50 dark:bg-[#111111] dark:hover:bg-[#ff8c00]/5"
      >
        <span className="flex-1 text-sm font-bold text-[#ff8c00]">{section.title}</span>
        <span className="text-xs text-[#666666] dark:text-[#94a3b8]">
          {section.lessons.length} lessons · {totalMin}m
        </span>
        {open
          ? <ChevronUp className="h-4 w-4 text-[#ff8c00] shrink-0" />
          : <ChevronDown className="h-4 w-4 text-[#ff8c00] shrink-0" />
        }
      </button>
      {open && (
        <ul className="divide-y divide-[#e0e0e0] dark:divide-[#1f1f1f]">
          {section.lessons.map((lesson) => (
            <li key={lesson.id} className="flex items-center gap-3 bg-white px-5 py-3 dark:bg-[#0a0a0a]">
              {lesson.preview
                ? <Play className="h-3.5 w-3.5 shrink-0 text-[#ff8c00]" />
                : <Lock className="h-3.5 w-3.5 shrink-0 text-[#666666] dark:text-[#94a3b8]" />
              }
              <span className="flex-1 text-sm text-[#1a1a1a] dark:text-[#f1f5f9]">{lesson.title}</span>
              {lesson.preview && (
                <span className="rounded-full bg-[#ff8c00]/15 px-2 py-0.5 text-[10px] font-semibold text-[#ff8c00]">
                  Preview
                </span>
              )}
              <span className="text-xs tabular-nums text-[#666666] dark:text-[#94a3b8]">{lesson.duration}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Review card
// ---------------------------------------------------------------------------
function ReviewCard({ review }: { review: Course['reviews'][number] }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);

  return (
    <div className="rounded-lg border border-[#e0e0e0] bg-white p-5 dark:border-[#1f1f1f] dark:bg-[#111111]">
      <div className="mb-3 flex items-start gap-3">
        <Image src={review.avatar} alt={review.name} width={40} height={40}
          className="h-10 w-10 rounded-full object-cover ring-2 ring-[#ff8c00]/20 shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">{review.name}</span>
            <span className="text-xs text-[#666666] dark:text-[#94a3b8]">{review.date}</span>
          </div>
          <StarRating rating={review.rating} size="sm" />
        </div>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-[#444444] dark:text-[#94a3b8]">{review.text}</p>
      <button
        onClick={() => { if (!voted) { setHelpful((h) => h + 1); setVoted(true); } }}
        className={`flex items-center gap-1.5 text-xs transition-colors ${
          voted ? 'text-[#ff8c00]' : 'text-[#666666] hover:text-[#ff8c00] dark:text-[#94a3b8]'
        }`}
      >
        <ThumbsUp className="h-3.5 w-3.5" />
        Helpful ({helpful})
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mini course card (related)
// ---------------------------------------------------------------------------
function MiniCourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.id}`}
      className="group flex gap-3 rounded-lg border border-[#e0e0e0] bg-white p-3 transition-all hover:border-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#111111] dark:hover:border-[#ff8c00]"
    >
      <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md bg-[#f5f5f5] dark:bg-[#0a0a0a]">
        <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-xs font-semibold leading-snug text-[#1a1a1a] transition-colors group-hover:text-[#ff8c00] dark:text-[#f1f5f9]">
          {course.title}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <StarRating rating={course.rating} size="sm" />
          <span className="text-xs font-bold text-[#ff8c00]">
            {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const TABS = ['Overview', 'Curriculum', 'Reviews', 'Instructor'] as const;
type Tab = typeof TABS[number];

export default function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = COURSES.find((c) => c.id === id);
  if (!course) notFound();

  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const isFree = course.price === 0;
  const related = COURSES.filter((c) => c.id !== course.id && c.category === course.category).slice(0, 4);
  const fallbackRelated = COURSES.filter((c) => c.id !== course.id).slice(0, 4);
  const relatedCourses = related.length >= 2 ? related : fallbackRelated;

  const filteredReviews = ratingFilter
    ? course.reviews.filter((r) => r.rating === ratingFilter)
    : course.reviews;

  const firstPreviewLesson = course.curriculum
    .flatMap((s) => s.lessons)
    .find((l) => l.preview);

  return (
    <div className="bg-white dark:bg-[#0a0a0a]">

      {/* ── 1. HERO ── */}
      <section className="border-b border-[#e0e0e0] bg-[#f5f5f5] dark:border-[#1f1f1f] dark:bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* Thumbnail / Preview video */}
            <div className="relative overflow-hidden rounded-xl">
              {showVideo ? (
                <VideoPlayer
                  url={firstPreviewLesson?.videoUrl ?? course.previewVideoUrl}
                  title={firstPreviewLesson?.title ?? course.title}
                />
              ) : (
                <div className="relative">
                  <Image src={course.thumbnail} alt={course.title} width={800} height={450}
                    className="h-64 w-full rounded-xl object-cover lg:h-80" priority />
                  <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/30">
                    <button
                      onClick={() => setShowVideo(true)}
                      className="flex items-center gap-2 rounded-full bg-[#ff8c00]/90 px-5 py-3 font-semibold text-white shadow-lg shadow-[#ff8c00]/30 transition-transform hover:scale-105"
                    >
                      <Play className="h-4 w-4" fill="white" />
                      Preview Course
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right info */}
            <div className="flex flex-col">
              {/* Level badge */}
              <span className={`mb-3 self-start rounded-md px-3 py-1 text-xs font-bold ${LEVEL_STYLES[course.level]}`}>
                {course.level}
              </span>

              {/* Title */}
              <h1 className="mb-3 text-2xl font-extrabold leading-tight lg:text-3xl">
                <span className="bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] bg-clip-text text-transparent">
                  {course.title}
                </span>
              </h1>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-[#666666] dark:text-[#94a3b8]">
                {course.description}
              </p>

              {/* Rating row */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <StarRating rating={course.rating} size="md" />
                <span className="text-sm font-bold text-[#ff8c00]">{course.rating.toFixed(1)}</span>
                <span className="text-sm text-[#666666] dark:text-[#94a3b8]">
                  ({course.reviewCount.toLocaleString('en-US')} reviews)
                </span>
                <span className="flex items-center gap-1 text-sm text-[#666666] dark:text-[#94a3b8]">
                  <Users className="h-4 w-4" />
                  {course.students.toLocaleString('en-US')}+ students
                </span>
              </div>

              {/* Stats badges */}
              <div className="mb-5 flex flex-wrap gap-2">
                {[
                  { icon: BookOpen, label: `${course.lessons} Lessons` },
                  { icon: Clock, label: course.duration },
                  { icon: Users, label: `${course.students.toLocaleString('en-US')}+ Students` },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-1.5 rounded-full bg-[#ff8c00] px-3 py-1 text-xs font-semibold text-white">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                ))}
              </div>

              {/* Instructor */}
              <div className="mb-5 flex items-center gap-2">
                <Image src={course.instructor.avatar} alt={course.instructor.name}
                  width={32} height={32} className="h-8 w-8 rounded-full object-cover" />
                <span className="text-sm text-[#666666] dark:text-[#94a3b8]">by </span>
                <span className="text-sm font-semibold text-[#ff8c00] hover:text-[#ff6b35] cursor-pointer">
                  {course.instructor.name}
                </span>
              </div>

              {/* Price */}
              <div className="mb-5">
                {isFree
                  ? <span className="rounded-full bg-[#ff8c00] px-4 py-1.5 text-lg font-black text-white">FREE</span>
                  : <span className="text-3xl font-extrabold text-[#ff8c00]">₹{course.price.toLocaleString('en-IN')}</span>
                }
              </div>

              {/* CTA */}
              <Link
                href={`/courses/${course.id}/learn/${course.curriculum[0]?.lessons[0]?.id ?? '1'}`}
                className="mb-3 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-8 py-3 text-center text-sm font-bold text-white shadow-lg shadow-[#ff8c00]/20 transition-all hover:shadow-xl hover:shadow-[#ff8c00]/30"
              >
                Enroll Now →
              </Link>

              {/* Money-back */}
              <div className="flex items-center gap-2 self-start rounded-lg border border-[#ff8c00]/40 px-3 py-2 text-xs text-[#ff8c00]">
                <ShieldCheck className="h-4 w-4" />
                30-day money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TABS ── */}
      <div className="sticky top-16 z-10 border-b border-[#e0e0e0] bg-white/90 backdrop-blur dark:border-[#1f1f1f] dark:bg-[#0a0a0a]/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 border-b-2 px-5 py-3.5 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? 'border-[#ff8c00] text-[#ff8c00]'
                    : 'border-transparent text-[#666666] hover:text-[#ff8c00] dark:text-[#94a3b8]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN + SIDEBAR ── */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">

          {/* ── TAB CONTENT ── */}
          <div>

            {/* ── OVERVIEW ── */}
            {activeTab === 'Overview' && (
              <div className="space-y-10">
                {/* What you'll learn */}
                <section>
                  <h2 className="mb-5 text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">What You&apos;ll Learn</h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {course.outcomes.map((o) => (
                      <div key={o} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8c00]" />
                        <span className="text-sm text-[#444444] dark:text-[#94a3b8]">{o}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Description */}
                <section>
                  <h2 className="mb-4 text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Course Description</h2>
                  <div className="space-y-3">
                    {course.longDescription.split('\n\n').map((para, i) => (
                      <p key={i} className="text-sm leading-relaxed text-[#444444] dark:text-[#94a3b8]">{para}</p>
                    ))}
                  </div>
                </section>

                {/* Who is this for */}
                <section>
                  <h2 className="mb-4 text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Who Is This For?</h2>
                  <ul className="space-y-2">
                    {course.targetAudience.map((a) => (
                      <li key={a} className="flex items-start gap-2.5">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff8c00]" />
                        <span className="text-sm text-[#444444] dark:text-[#94a3b8]">{a}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            )}

            {/* ── CURRICULUM ── */}
            {activeTab === 'Curriculum' && (
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-4">
                  <h2 className="text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Course Curriculum</h2>
                  <span className="text-sm text-[#666666] dark:text-[#94a3b8]">
                    {course.curriculum.reduce((a, s) => a + s.lessons.length, 0)} lessons · {course.duration}
                  </span>
                </div>
                <div className="space-y-3">
                  {course.curriculum.map((section) => (
                    <CurriculumSection key={section.id} section={section} />
                  ))}
                </div>
              </div>
            )}

            {/* ── REVIEWS ── */}
            {activeTab === 'Reviews' && (
              <div>
                {/* Overall rating */}
                <div className="mb-8 flex flex-wrap items-center gap-6 rounded-xl border border-[#e0e0e0] bg-[#f5f5f5] p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-[#ff8c00]">{course.rating.toFixed(1)}</p>
                    <StarRating rating={course.rating} size="lg" />
                    <p className="mt-1 text-xs text-[#666666] dark:text-[#94a3b8]">{course.reviewCount} reviews</p>
                  </div>
                  {/* Rating filter */}
                  <div className="flex flex-col gap-1.5">
                    {[5, 4, 3, 2, 1].map((r) => (
                      <button
                        key={r}
                        onClick={() => setRatingFilter(ratingFilter === r ? null : r)}
                        className={`flex items-center gap-2 rounded-lg px-3 py-1 text-xs transition-all ${
                          ratingFilter === r
                            ? 'bg-[#ff8c00] text-white'
                            : 'border border-[#e0e0e0] text-[#666666] hover:border-[#ff8c00] hover:text-[#ff8c00] dark:border-[#1f1f1f] dark:text-[#94a3b8]'
                        }`}
                      >
                        {Array.from({ length: r }).map((_, i) => (
                          <Star key={i} className="h-3 w-3" fill="currentColor" />
                        ))}
                        <span>& up</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review list */}
                <div className="space-y-4">
                  {filteredReviews.length > 0
                    ? filteredReviews.map((review) => <ReviewCard key={review.id} review={review} />)
                    : (
                      <p className="py-8 text-center text-sm text-[#666666] dark:text-[#94a3b8]">
                        No reviews match this filter.
                      </p>
                    )
                  }
                </div>

                {/* Write review CTA */}
                <button className="mt-6 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#ff8c00]/20">
                  Write a Review
                </button>
              </div>
            )}

            {/* ── INSTRUCTOR ── */}
            {activeTab === 'Instructor' && (
              <div>
                <div className="mb-8 rounded-xl border border-[#e0e0e0] bg-white p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
                  <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                    <Image src={course.instructor.avatar} alt={course.instructor.name}
                      width={96} height={96}
                      className="h-24 w-24 shrink-0 rounded-full object-cover ring-4 ring-[#ff8c00]/30" />
                    <div>
                      <h2 className="mb-1 text-xl font-extrabold">
                        <span className="bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] bg-clip-text text-transparent">
                          {course.instructor.name}
                        </span>
                      </h2>
                      <p className="mb-3 text-sm text-[#666666] dark:text-[#94a3b8]">{course.instructor.title}</p>

                      {/* Stats */}
                      <div className="mb-4 flex flex-wrap gap-5">
                        {[
                          { label: 'Courses', value: course.instructor.courses },
                          { label: 'Students', value: course.instructor.students.toLocaleString('en-US') },
                          { label: 'Rating', value: course.instructor.rating.toFixed(1) },
                        ].map(({ label, value }) => (
                          <div key={label}>
                            <p className="text-lg font-extrabold text-[#ff8c00]">{value}</p>
                            <p className="text-xs text-[#666666] dark:text-[#94a3b8]">{label}</p>
                          </div>
                        ))}
                      </div>

                      <p className="mb-4 text-sm leading-relaxed text-[#444444] dark:text-[#94a3b8]">{course.instructor.bio}</p>

                      {/* Social links */}
                      <div className="flex gap-3">
                        {course.instructor.github && (
                          <a href={course.instructor.github} target="_blank" rel="noopener noreferrer"
                            className="text-[#ff8c00] transition-colors hover:text-[#ff6b35]">
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                        {course.instructor.linkedin && (
                          <a href={course.instructor.linkedin} target="_blank" rel="noopener noreferrer"
                            className="text-[#ff8c00] transition-colors hover:text-[#ff6b35]">
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        {course.instructor.twitter && (
                          <a href={course.instructor.twitter} target="_blank" rel="noopener noreferrer"
                            className="text-[#ff8c00] transition-colors hover:text-[#ff6b35]">
                            <Twitter className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other courses */}
                <h3 className="mb-4 text-base font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
                  Other Courses by {course.instructor.name}
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {relatedCourses.map((c) => <MiniCourseCard key={c.id} course={c} />)}
                </div>
              </div>
            )}
          </div>

          {/* ── STICKY SIDEBAR ── */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-4">
              <div className="overflow-hidden rounded-xl border border-[#e0e0e0] bg-white shadow-lg dark:border-[#1f1f1f] dark:bg-[#111111]">
                {/* Thumbnail */}
                <div className="relative h-44 overflow-hidden">
                  <Image src={course.thumbnail} alt={course.title} fill className="object-cover" />
                </div>

                <div className="p-5">
                  {/* Price */}
                  <div className="mb-4">
                    {isFree
                      ? <span className="rounded-full bg-[#ff8c00] px-4 py-1.5 text-xl font-black text-white">FREE</span>
                      : <p className="text-3xl font-extrabold text-[#ff8c00]">₹{course.price.toLocaleString('en-IN')}</p>
                    }
                  </div>

                  {/* Enroll CTA */}
                  <Link
                    href={`/courses/${course.id}/learn/${course.curriculum[0]?.lessons[0]?.id ?? '1'}`}
                    className="mb-3 block rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-6 py-3 text-center text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-[#ff8c00]/20"
                  >
                    Enroll Now →
                  </Link>

                  <p className="mb-5 text-center text-xs text-[#666666] dark:text-[#94a3b8]">
                    30-day money-back guarantee
                  </p>

                  {/* Key info */}
                  <div className="mb-5 space-y-2 border-t border-[#e0e0e0] pt-4 dark:border-[#1f1f1f]">
                    {[
                      { icon: Award, label: 'Level', value: course.level, orange: true },
                      { icon: Clock, label: 'Duration', value: course.duration, orange: false },
                      { icon: BookOpen, label: 'Lessons', value: String(course.lessons), orange: false },
                      { icon: Globe, label: 'Language', value: course.language, orange: false },
                    ].map(({ icon: Icon, label, value, orange }) => (
                      <div key={label} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1.5 text-[#666666] dark:text-[#94a3b8]">
                          <Icon className="h-4 w-4 text-[#ff8c00]" />
                          {label}
                        </span>
                        <span className={`font-semibold ${orange ? 'text-[#ff8c00]' : 'text-[#1a1a1a] dark:text-[#f1f5f9]'}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="space-y-2 border-t border-[#e0e0e0] pt-4 dark:border-[#1f1f1f]">
                    {[
                      { icon: Globe, label: 'Lifetime access' },
                      { icon: Smartphone, label: 'Mobile friendly' },
                      { icon: Award, label: 'Certificate of completion' },
                      { icon: ShieldCheck, label: 'Money-back guarantee' },
                      { icon: Download, label: 'Downloadable resources' },
                    ]
                      .filter((f) => course.features.some((cf) => cf.toLowerCase().includes(f.label.toLowerCase())))
                      .map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2 text-xs text-[#444444] dark:text-[#94a3b8]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-[#ff8c00]" />
                          {label}
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ── RELATED COURSES ── */}
        <section className="mt-16 border-t border-[#e0e0e0] pt-12 dark:border-[#1f1f1f]">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
            <span className="text-[#ff8c00]">🎓</span> Other Courses
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedCourses.map((c) => (
              <Link
                key={c.id}
                href={`/courses/${c.id}`}
                className="group overflow-hidden rounded-xl border border-[#e0e0e0] bg-white transition-all hover:border-[#ff8c00] hover:shadow-lg hover:shadow-[#ff8c00]/10 dark:border-[#1f1f1f] dark:bg-[#111111]"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image src={c.thumbnail} alt={c.title} fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  <span className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold ${LEVEL_STYLES[c.level]}`}>
                    {c.level}
                  </span>
                </div>
                <div className="p-3">
                  <p className="line-clamp-2 text-xs font-bold leading-snug text-[#1a1a1a] transition-colors group-hover:text-[#ff8c00] dark:text-[#f1f5f9]">
                    {c.title}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <StarRating rating={c.rating} size="sm" />
                    <span className="text-xs font-bold text-[#ff8c00]">
                      {c.price === 0 ? 'Free' : `₹${c.price.toLocaleString('en-IN')}`}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
