'use client';

import { motion } from 'framer-motion';
import { Star, Play, BookOpen, Clock } from 'lucide-react';
import Image from 'next/image';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { MOCK_COURSES } from '@/lib/constants';

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function CoursesPage() {
  return (
    <div className="py-12">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Courses"
          title="All Courses"
          subtitle="Master AI engineering and full-stack development with hands-on, project-based courses."
        />

        {/* Level filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {LEVELS.map((level, i) => (
            <button
              key={level}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                i === 0
                  ? 'bg-orange-gradient text-white'
                  : 'border border-border bg-[var(--bg-surface)] text-muted-foreground hover:border-orange-600 hover:text-orange-600'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_COURSES.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover overflow-hidden rounded-xl border border-border bg-[var(--bg-surface)]"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 rounded-md bg-orange-600 px-2.5 py-1 text-xs font-semibold text-white">
                  {course.level}
                </span>
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-600/80 opacity-0 transition-opacity group-hover:opacity-100">
                    <Play className="h-5 w-5 text-white" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {course.description}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Self-paced
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-orange-600" fill="currentColor" />
                    {course.rating}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">
                    ₹{course.price}
                  </span>
                  <button className="rounded-lg bg-orange-gradient px-5 py-2 text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-600/20">
                    Enroll Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
