'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  BookOpen,
  Clock,
  Users,
  Loader2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import type { Course } from '@/lib/courses-data';

const ITEMS_PER_PAGE = 10;

export default function AdminCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const categories = ['All', 'AI & Agents', 'MERN Stack', 'Next.js', 'LLM Engineering', 'Freelancing & Career'];

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/courses');
      
      if (!response.ok) {
        if (response.status === 403) {
          setError('You do not have permission to view this page');
        } else {
          setError('Failed to load courses');
        }
        return;
      }

      const result = await response.json();
      
      if (result.success) {
        setCourses(result.data);
        setFilteredCourses(result.data);
      } else {
        setError(result.error || 'Failed to load courses');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Filter courses based on search and category
    let filtered = [...courses];
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        c => c.title.toLowerCase().includes(query) || 
             c.description.toLowerCase().includes(query) ||
             c.instructor.name.toLowerCase().includes(query)
      );
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(c => c.category === categoryFilter);
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE)));
  }, [searchQuery, categoryFilter, courses]);

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/courses?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || 'Failed to delete course');
        return;
      }

      // Remove from local state
      setCourses(prev => prev.filter(c => c.id !== id));
      setFilteredCourses(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      console.error('Error deleting course:', err);
      setError('Failed to delete course');
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch('/api/admin/courses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isPublished: !currentStatus }),
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.error || 'Failed to update course');
        return;
      }

      // Update local state
      setCourses(prev => prev.map(c =>
        c.id === id ? { ...c, isPublished: !currentStatus } : c
      ));
      setFilteredCourses(prev => prev.map(c =>
        c.id === id ? { ...c, isPublished: !currentStatus } : c
      ));
    } catch (err) {
      console.error('Error updating course:', err);
      setError('Failed to update course');
    }
  };

  if (isLoading && courses.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
        <PageHeader title="Courses" subtitle="Manage all courses" role="admin" />
        <div className="p-4 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#ff8c00]" />
            <p className="text-sm text-[#666666] dark:text-[#94a3b8]">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && courses.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
        <PageHeader title="Courses" subtitle="Manage all courses" role="admin" />
        <div className="p-4 text-center">
          <p className="text-lg font-semibold text-red-500 dark:text-red-400">{error}</p>
          {error.includes('permission') && (
            <Link
              href="/"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#ff8c00] px-4 py-2 text-sm font-semibold text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0a0a0a]">
      <PageHeader title="Courses" subtitle="Manage all courses" role="admin" />

      <div className="p-4">
        {/* Actions Bar */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/courses/new"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#ff8c00]/20 hover:shadow-xl hover:shadow-[#ff8c00]/30"
            >
              <Plus className="h-4 w-4" />
              New Course
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666] dark:text-[#94a3b8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full md:w-64 rounded-lg border border-[#e0e0e0] pl-10 pr-4 py-2 text-sm outline-none transition-colors focus:border-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm outline-none transition-colors focus:border-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-500 bg-red-50/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {/* Courses Table */}
        <div className="overflow-x-auto rounded-xl border border-[#e0e0e0] dark:border-[#1f1f1f]">
          <table className="w-full text-sm">
            <thead className="bg-[#f5f5f5] dark:bg-[#111111]">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">Course</th>
                <th className="px-4 py-3 text-left font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">Category</th>
                <th className="px-4 py-3 text-left font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">Level</th>
                <th className="px-4 py-3 text-left font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">Price</th>
                <th className="px-4 py-3 text-left font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">Lessons</th>
                <th className="px-4 py-3 text-left font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">Status</th>
                <th className="px-4 py-3 text-right font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e0e0e0] dark:divide-[#1f1f1f]">
              {paginatedCourses.length > 0 ? (
                paginatedCourses.map((course) => (
                  <tr key={course.id} className="hover:bg-[#f5f5f5]/50 dark:hover:bg-[#111111]">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-14 overflow-hidden rounded-md">
                          <Image
                            src={course.thumbnail}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-[#1a1a1a] dark:text-[#f1f5f9] line-clamp-1">{course.title}</p>
                          <p className="text-xs text-[#666666] dark:text-[#94a3b8] line-clamp-1">{course.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="rounded-full bg-[#ff8c00]/10 px-2.5 py-1 text-xs font-medium text-[#ff8c00]">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        course.level === 'Beginner' ? 'bg-orange-100 text-orange-700 dark:bg-[#ff8c00]/10 dark:text-[#ff8c00]' :
                        course.level === 'Intermediate' ? 'bg-orange-200 text-orange-700 dark:bg-[#ff8c00]/20 dark:text-[#ff8c00]' :
                        'bg-[#ff8c00] text-white'
                      }`}>
                        {course.level}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">
                        {course.price === 0 ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1 text-[#666666] dark:text-[#94a3b8]">
                        <BookOpen className="h-3.5 w-3.5" />
                        {course.lessons}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        course.isPublished ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                      }`}>
                        {course.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/courses/${course.id}`}
                          target="_blank"
                          className="rounded-lg p-2 text-[#666666] hover:bg-[#f5f5f5] hover:text-[#ff8c00] transition-colors dark:text-[#94a3b8] dark:hover:bg-[#1f1f1f]"
                          title="View course"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/courses/${course.id}/edit`}
                          className="rounded-lg p-2 text-[#666666] hover:bg-[#f5f5f5] hover:text-[#ff8c00] transition-colors dark:text-[#94a3b8] dark:hover:bg-[#1f1f1f]"
                          title="Edit course"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => togglePublishStatus(course.id, course.isPublished)}
                          className="rounded-lg p-2 text-[#666666] hover:bg-[#f5f5f5] hover:text-[#ff8c00] transition-colors dark:text-[#94a3b8] dark:hover:bg-[#1f1f1f]"
                          title={course.isPublished ? 'Unpublish course' : 'Publish course'}
                        >
                          {course.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50/10 transition-colors"
                          title="Delete course"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <BookOpen className="h-12 w-12 text-[#999] dark:text-[#64748b]" />
                      <p className="text-lg font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">No courses found</p>
                      <p className="text-sm text-[#666666] dark:text-[#94a3b8]">
                        {searchQuery || categoryFilter !== 'All' 
                          ? 'No courses match your filters' 
                          : 'Create your first course to get started'}
                      </p>
                      {(searchQuery || categoryFilter !== 'All') && (
                        <button
                          onClick={() => { setSearchQuery(''); setCategoryFilter('All'); }}
                          className="rounded-lg border border-[#ff8c00] px-4 py-2 text-sm font-medium text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-[#666666] dark:text-[#94a3b8]">
              Showing {((currentPage - 1) * ITEMS_PER_PAGE + 1)} - {Math.min(currentPage * ITEMS_PER_PAGE, filteredCourses.length)} of {filteredCourses.length} courses
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm font-medium text-[#1a1a1a] transition-colors disabled:opacity-40 hover:border-[#ff8c00] hover:text-[#ff8c00] dark:border-[#1f1f1f] dark:text-[#f1f5f9]"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum = currentPage - 2 + i;
                if (pageNum < 1) pageNum = totalPages - (5 - 1 - i);
                if (pageNum > totalPages) pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      pageNum === currentPage
                        ? 'bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] text-white shadow-sm'
                        : 'border border-[#e0e0e0] text-[#1a1a1a] hover:border-[#ff8c00] hover:text-[#ff8c00] dark:border-[#1f1f1f] dark:text-[#f1f5f9]'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm font-medium text-[#1a1a1a] transition-colors disabled:opacity-40 hover:border-[#ff8c00] hover:text-[#ff8c00] dark:border-[#1f1f1f] dark:text-[#f1f5f9]"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-[#e0e0e0] bg-white p-4 dark:border-[#1f1f1f] dark:bg-[#111111]">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#ff8c00]/10 p-2">
                <BookOpen className="h-5 w-5 text-[#ff8c00]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">{filteredCourses.length}</p>
                <p className="text-xs text-[#666666] dark:text-[#94a3b8]">Total Courses</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[#e0e0e0] bg-white p-4 dark:border-[#1f1f1f] dark:bg-[#111111]">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#ff8c00]/10 p-2">
                <Eye className="h-5 w-5 text-[#ff8c00]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
                  {courses.filter(c => c.isPublished).length}
                </p>
                <p className="text-xs text-[#666666] dark:text-[#94a3b8]">Published</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[#e0e0e0] bg-white p-4 dark:border-[#1f1f1f] dark:bg-[#111111]">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#ff8c00]/10 p-2">
                <Users className="h-5 w-5 text-[#ff8c00]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
                  {courses.reduce((acc, c) => acc + c.lessons, 0)}
                </p>
                <p className="text-xs text-[#666666] dark:text-[#94a3b8]">Total Lessons</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[#e0e0e0] bg-white p-4 dark:border-[#1f1f1f] dark:bg-[#111111]">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#ff8c00]/10 p-2">
                <Clock className="h-5 w-5 text-[#ff8c00]" />
              </div>
              <div>
                <p className="text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
                  {courses.filter(c => !c.isPublished).length}
                </p>
                <p className="text-xs text-[#666666] dark:text-[#94a3b8]">Drafts</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
