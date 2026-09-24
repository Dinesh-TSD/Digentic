'use client';

import { motion } from 'framer-motion';
import { Star, Play, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { MOCK_COURSES } from '@/lib/constants';

export function FeaturedCourses() {
  return (
    <section className="bg-[var(--bg-surface)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Courses"
          title="Featured Courses"
          subtitle="Learn AI engineering and full-stack development from real-world projects."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_COURSES.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover overflow-hidden rounded-xl border border-border bg-[var(--bg-base)]"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-md bg-[#0ea5e9] px-2.5 py-1 text-xs font-semibold text-white">
                  {course.level}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {course.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <BookOpen className="h-3.5 w-3.5" />
                      {course.lessons} lessons
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-[#0ea5e9]" fill="currentColor" />
                      {course.rating}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-[#0369a1]">
                    ₹{course.price}
                  </span>
                </div>
                <Link
                  href="/courses"
                  className="mt-4 flex items-center justify-center gap-1.5 rounded-lg border border-[#38bdf8] py-2 text-xs font-semibold text-[#0369a1] transition-all hover:bg-[#38bdf8] hover:text-white"
                >
                  <Play className="h-3.5 w-3.5" />
                  Enroll Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0ea5e9] hover:underline"
          >
            Browse Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
