import { BookOpen, BarChart3, Bookmark, ShoppingBag } from 'lucide-react';
import { StatCard } from '@/components/shared/StatCard';
import { PageHeader } from '@/components/shared/PageHeader';
import { CourseCard } from '@/components/user/CourseCard';
import { SavedPostRow } from '@/components/user/SavedPostRow';

export default function UserCoursesPage() {
  return (
    <>
      <PageHeader title="My courses" subtitle="Continue your learning journey" role="user" />

      <div className="p-4">
        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <StatCard value="4" label="Enrolled" icon={BookOpen} />
          <StatCard value="62%" label="Avg progress" icon={BarChart3} />
          <StatCard value="18" label="Saved posts" icon={Bookmark} />
          <StatCard value="1" label="Purchased" icon={ShoppingBag} />
        </div>

        {/* Continue Learning */}
        <h2 className="mb-2 px-1 text-[14px] font-semibold" style={{ color: 'var(--dt-text)' }}>
          Continue learning
        </h2>
        <div className="mb-4">
          <CourseCard
            title="MERN stack bootcamp"
            progress={72}
            nextLesson="Chapter 12 — Authentication with JWT"
            href="/courses"
          />
          <CourseCard
            title="AI APIs with Next.js 15"
            progress={45}
            nextLesson="Lesson 8 — Streaming responses"
            href="/courses"
          />
          <CourseCard
            title="TypeScript mastery"
            progress={18}
            nextLesson="Lesson 4 — Generics & utility types"
            href="/courses"
          />
        </div>

        {/* Saved Posts Preview */}
        <h2 className="mb-2 px-1 text-[14px] font-semibold" style={{ color: 'var(--dt-text)' }}>
          Saved posts
        </h2>
        <div>
          <SavedPostRow
            title="LangChain agents tutorial"
            date="Sep 10, 2025"
            tag="AI"
          />
          <SavedPostRow
            title="Next.js 15 server actions guide"
            date="Sep 8, 2025"
            tag="Next.js"
          />
          <SavedPostRow
            title="MERN auth with NextAuth v5"
            date="Sep 5, 2025"
            tag="MERN"
          />
        </div>
      </div>
    </>
  );
}
