'use client';

import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BookOpen,
  Clock,
  Users,
  CheckCircle2,
  ChevronRight,
  Lock,
  CreditCard,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import type { Course } from '@/lib/courses-data';

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

function Star({ className, fill, children, ...props }: any) {
  return (
    <svg className={className} fill={fill} viewBox="0 0 24 24" {...props}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

const LEVEL_STYLES: Record<Course['level'], string> = {
  Beginner: 'bg-orange-100 text-orange-700 dark:bg-[#ff8c00]/10 dark:text-[#ff8c00]',
  Intermediate: 'bg-orange-200 text-orange-700 dark:bg-[#ff8c00]/20 dark:text-[#ff8c00]',
  Advanced: 'bg-[#ff8c00] text-white',
};

export default function EnrollPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollError, setEnrollError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const paymentSuccess = searchParams.get('payment') === 'success';

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/courses/${id}`);
        const result = await response.json();
        
        if (result.success) {
          setCourse(result.data);
        } else {
          setError(result.error || 'Course not found');
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to load course');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();

    // Get session
    const getSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        setSession(data);
      } catch (e) {
        console.error('Failed to get session:', e);
      }
    };
    getSession();
  }, [id]);

  const handleEnroll = async () => {
    if (!session?.user) {
      router.push(`/auth/signin?callbackUrl=/courses/${id}/enroll`);
      return;
    }

    if (!course) return;

    setIsEnrolling(true);
    setEnrollError(null);

    try {
      const response = await fetch(`/api/courses/${id}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();

      if (result.success) {
        // Navigate to first lesson
        const firstLessonId = course.curriculum[0]?.lessons[0]?.id ?? '1';
        router.push(`/courses/${id}/learn/${firstLessonId}`);
        router.refresh();
      } else {
        setEnrollError(result.error || 'Failed to enroll');
      }
    } catch (err) {
      console.error('Enrollment error:', err);
      setEnrollError('An error occurred during enrollment');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handlePaidEnroll = () => {
    if (!session?.user) {
      router.push(`/auth/signin?callbackUrl=/courses/${id}/enroll`);
      return;
    }
    router.push(`/courses/${id}/payment`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#ff8c00] border-t-transparent" />
          <p className="text-sm text-[#666666] dark:text-[#94a3b8]">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    notFound();
  }

  const isFree = course.price === 0;

  // Show success state if payment was successful
  if (paymentSuccess && isFree) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center py-20 px-4">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mb-3 text-2xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Enrolled Successfully!</h1>
          <p className="mb-6 text-sm text-[#666666] dark:text-[#94a3b8]">
            You're now enrolled in <strong>{course.title}</strong>. Let's start learning!
          </p>
          <Link
            href={`/courses/${id}/learn/${course.curriculum[0]?.lessons[0]?.id ?? '1'}`}
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-8 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-[#ff8c00]/20"
          >
            <ChevronRight className="h-4 w-4" />
            Start Learning
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] py-12 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href={`/courses/${id}`}
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-[#666666] transition-colors hover:text-[#ff8c00] dark:text-[#94a3b8]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Course
        </Link>

        {/* Course Header */}
        <div className="mb-8 rounded-xl border border-[#e0e0e0] bg-white p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-1">
              <Image
                src={course.thumbnail}
                alt={course.title}
                width={320}
                height={180}
                className="rounded-lg object-cover"
              />
            </div>
            <div className="md:col-span-2">
              <span className={`mb-3 inline-block rounded-md px-3 py-1 text-xs font-bold ${LEVEL_STYLES[course.level]}`}>
                {course.level}
              </span>
              <h1 className="mb-3 text-2xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] bg-clip-text text-transparent">
                  {course.title}
                </span>
              </h1>
              <p className="mb-4 text-sm leading-relaxed text-[#666666] dark:text-[#94a3b8] line-clamp-3">
                {course.description}
              </p>

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

              <div className="flex flex-wrap gap-2">
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
            </div>
          </div>
        </div>

        {/* Enrollment Section */}
        <div className="rounded-xl border border-[#e0e0e0] bg-white p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          {isFree ? (
            // Free course enrollment
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">This course is FREE</h2>
                  <p className="mt-1 text-sm text-[#666666] dark:text-[#94a3b8]">
                    Enroll now and get immediate access to all lessons and resources.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-[#ff8c00]/20 bg-[#ff8c00]/5 p-4">
                <div className="flex items-center gap-2 text-sm text-[#ff8c00]">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="font-medium">30-day money-back guarantee</span>
                </div>
                <p className="mt-2 text-xs text-[#666666] dark:text-[#94a3b8]">
                  Lifetime access • Mobile friendly • Certificate of completion
                </p>
              </div>

              {enrollError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    {enrollError}
                  </div>
                </div>
              )}

              <button
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="w-full rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-6 py-3.5 text-base font-bold text-white transition-all hover:shadow-lg hover:shadow-[#ff8c00]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEnrolling ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enrolling...
                  </span>
                ) : (
                  'Enroll for Free'
                )}
              </button>

              <p className="text-center text-xs text-[#666666] dark:text-[#94a3b8]">
                By enrolling, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          ) : (
            // Paid course enrollment
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                  <CreditCard className="h-5 w-5 text-[#ff8c00]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Paid Course</h2>
                  <p className="mt-1 text-sm text-[#666666] dark:text-[#94a3b8]">
                    This course costs <strong>₹{course.price.toLocaleString('en-IN')}</strong>. Complete the payment to get full access.
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-[#ff8c00]/20 bg-[#ff8c00]/5 p-4">
                <h3 className="flex items-center gap-2 text-sm font-bold text-[#ff8c00]">
                  <ShieldCheck className="h-4 w-4" />
                  What you get
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm text-[#666666] dark:text-[#94a3b8]">
                  {course.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#ff8c00]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {enrollError && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-900/10">
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    {enrollError}
                  </div>
                </div>
              )}

              <button
                onClick={handlePaidEnroll}
                disabled={isEnrolling}
                className="w-full rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-6 py-3.5 text-base font-bold text-white transition-all hover:shadow-lg hover:shadow-[#ff8c00]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEnrolling ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Redirecting to Payment...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Pay ₹{course.price.toLocaleString('en-IN')} & Enroll
                  </span>
                )}
              </button>

              <p className="text-center text-xs text-[#666666] dark:text-[#94a3b8]">
                Secure payment via Razorpay. By proceeding, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          )}
        </div>

        {/* Instructor Info */}
        <div className="mt-6 rounded-xl border border-[#e0e0e0] bg-white p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <h3 className="mb-4 text-base font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Instructor</h3>
          <div className="flex items-center gap-4">
            <Image
              src={course.instructor.avatar}
              alt={course.instructor.name}
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-[#ff8c00]/30 shrink-0"
            />
            <div>
              <p className="font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">{course.instructor.name}</p>
              <p className="text-sm text-[#666666] dark:text-[#94a3b8]">{course.instructor.title}</p>
              <p className="mt-1 text-sm text-[#444444] dark:text-[#94a3b8] line-clamp-2">{course.instructor.bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}