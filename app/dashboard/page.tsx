'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  User,
  BookOpen,
  Download,
  LogOut,
  ExternalLink,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { COURSES } from '@/lib/courses-data';
import { DIGITAL_PRODUCTS } from '@/lib/digital-products';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ff8c00] border-t-transparent"></div>
      </div>
    );
  }

  const user = session?.user;
  const enrolledCourseIds: string[] = (user as any)?.enrolledCourses || [];
  const purchasedProductIds: string[] = (user as any)?.purchasedDigital || [];

  // Filter real course and product data
  const enrolledCourses = COURSES.filter((c) => enrolledCourseIds.includes(c.id));
  const purchasedProducts = DIGITAL_PRODUCTS.filter((p) =>
    purchasedProductIds.includes(p.id) || purchasedProductIds.includes(p.slug)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-2xl border bg-white border-[#e0e0e0] dark:bg-[#111111] dark:border-[#1f1f1f] p-6 sm:p-8 shadow-sm"
      >
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#ff8c00] to-[#ff6b35] text-2xl font-bold text-white shadow-lg shadow-orange-500/20">
              {user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name || 'User'}
                  className="h-full w-full rounded-2xl object-cover"
                />
              ) : (
                user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user?.name || 'Welcome Back'}
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-[#ff8c00] border border-[#ff8c00]/20">
                  <ShieldCheck className="h-3 w-3" />
                  {(user as any)?.role === 'admin' ? 'Admin' : 'Member'}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-10">
        <div className="rounded-xl border bg-white border-[#e0e0e0] dark:bg-[#111111] dark:border-[#1f1f1f] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Enrolled Courses
            </span>
            <div className="rounded-lg bg-orange-500/10 p-2 text-[#ff8c00]">
              <GraduationCap className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
            {enrolledCourses.length}
          </p>
        </div>

        <div className="rounded-xl border bg-white border-[#e0e0e0] dark:bg-[#111111] dark:border-[#1f1f1f] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Digital Assets
            </span>
            <div className="rounded-lg bg-orange-500/10 p-2 text-[#ff8c00]">
              <Download className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
            {purchasedProducts.length}
          </p>
        </div>

        <div className="rounded-xl border bg-white border-[#e0e0e0] dark:bg-[#111111] dark:border-[#1f1f1f] p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Community Status
            </span>
            <div className="rounded-lg bg-orange-500/10 p-2 text-[#ff8c00]">
              <Sparkles className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-gray-900 dark:text-white">
            Active Member
          </p>
        </div>
      </div>

      {/* Sections: Courses and Digital Assets */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Enrolled Courses */}
        <div className="rounded-2xl border bg-white border-[#e0e0e0] dark:bg-[#111111] dark:border-[#1f1f1f] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#ff8c00]" />
              <span>My Courses</span>
            </h2>
            <Link
              href="/courses"
              className="text-xs font-medium text-[#ff8c00] hover:text-[#ff6b35] flex items-center gap-1"
            >
              <span>Explore More</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#e0e0e0] dark:border-[#262626] p-8 text-center">
              <GraduationCap className="mx-auto h-10 w-10 text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                No enrolled courses yet
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4">
                Explore our full-stack and AI engineering courses to get started.
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between rounded-xl border border-[#e0e0e0] dark:border-[#262626] bg-gray-50 dark:bg-[#161616] p-4"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {course.duration}
                      </span>
                      <span>•</span>
                      <span>{course.level}</span>
                    </div>
                  </div>
                  <Link
                    href={`/courses/${course.id}/learn`}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff8c00] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#ff6b35] transition-colors"
                  >
                    <span>Continue</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Purchased Digital Assets */}
        <div className="rounded-2xl border bg-white border-[#e0e0e0] dark:bg-[#111111] dark:border-[#1f1f1f] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Download className="h-5 w-5 text-[#ff8c00]" />
              <span>Purchased Digital Assets</span>
            </h2>
            <Link
              href="/digital"
              className="text-xs font-medium text-[#ff8c00] hover:text-[#ff6b35] flex items-center gap-1"
            >
              <span>Digital Store</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {purchasedProducts.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#e0e0e0] dark:border-[#262626] p-8 text-center">
              <Download className="mx-auto h-10 w-10 text-gray-400 mb-3" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                No digital downloads yet
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4">
                Access starter kits, boilerplates, AI templates, and e-books.
              </p>
              <Link
                href="/digital"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:opacity-95"
              >
                Browse Store
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {purchasedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="flex items-center justify-between rounded-xl border border-[#e0e0e0] dark:border-[#262626] bg-gray-50 dark:bg-[#161616] p-4"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {prod.category}
                    </p>
                  </div>
                  <Link
                    href={`/digital/downloads/${prod.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#ff8c00] px-3.5 py-1.5 text-xs font-semibold text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white transition-all"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
