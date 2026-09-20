/**
 * Course API Client
 * Centralized API calls for course-related operations
 */

import { Course, Lesson, Section } from '../courses-data';

const API_BASE = '/api/courses';

// Types for API responses
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface CourseFilters {
  category?: string;
  level?: string;
  minRating?: number;
  maxPrice?: number;
  onlyFree?: boolean;
  page?: number;
  limit?: number;
}

/**
 * Get all courses with optional filters and pagination
 */
export async function getCourses(filters: CourseFilters = {}): Promise<{
  courses: Course[];
  pagination: ApiResponse<Course[]>['pagination'];
} | null> {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.set('category', filters.category);
    if (filters.level) queryParams.set('level', filters.level);
    if (filters.minRating) queryParams.set('minRating', String(filters.minRating));
    if (filters.maxPrice) queryParams.set('maxPrice', String(filters.maxPrice));
    if (filters.onlyFree) queryParams.set('onlyFree', String(filters.onlyFree));
    if (filters.page) queryParams.set('page', String(filters.page));
    if (filters.limit) queryParams.set('limit', String(filters.limit));

    const response = await fetch(`${API_BASE}?${queryParams.toString()}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch courses');
      return null;
    }

    const result: ApiResponse<Course[]> = await response.json();
    
    if (!result.success || !result.data) {
      console.error('API error:', result.error);
      return null;
    }

    return {
      courses: result.data,
      pagination: result.pagination,
    };
  } catch (error) {
    console.error('Error fetching courses:', error);
    return null;
  }
}

/**
 * Get a single course by ID or slug
 */
export async function getCourseById(id: string): Promise<Course | null> {
  try {
    const response = await fetch(`${API_BASE}/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch course');
      return null;
    }

    const result: ApiResponse<Course> = await response.json();
    
    if (!result.success || !result.data) {
      console.error('API error:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

/**
 * Get user progress for a course
 */
export async function getCourseProgress(
  courseId: string,
  userId?: string
): Promise<{
  completedLessons: string[];
  currentLessonId?: string;
  progressPercentage: number;
  totalLessons: number;
  allLessonIds: string[];
  startedAt?: string;
  completedAt?: string;
} | null> {
  try {
    const url = userId 
      ? `${API_BASE}/${courseId}/progress?userId=${userId}`
      : `${API_BASE}/${courseId}/progress`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      // If not authenticated, return default progress
      if (response.status === 401) {
        return {
          completedLessons: [],
          progressPercentage: 0,
          totalLessons: 0,
          allLessonIds: [],
        };
      }
      console.error('Failed to fetch progress');
      return null;
    }

    const result = await response.json();
    
    if (!result.success || !result.data) {
      console.error('API error:', result.error);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching progress:', error);
    return null;
  }
}

/**
 * Update user progress (mark lesson as complete)
 */
export async function updateCourseProgress(
  courseId: string,
  lessonId: string,
  isComplete: boolean = true
): Promise<{
  completedLessons: string[];
  progressPercentage: number;
  totalLessons: number;
} | null> {
  try {
    const response = await fetch(`${API_BASE}/${courseId}/progress`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lessonId, isComplete }),
    });

    if (!response.ok) {
      console.error('Failed to update progress');
      return null;
    }

    const result = await response.json();
    
    if (!result.success || !result.data) {
      console.error('API error:', result.error);
      return null;
    }

    return {
      completedLessons: result.data.completedLessons,
      progressPercentage: result.data.progressPercentage,
      totalLessons: result.totalLessons,
    };
  } catch (error) {
    console.error('Error updating progress:', error);
    return null;
  }
}

/**
 * Check if certificate is available for download
 */
export async function checkCertificateAvailable(
  courseId: string
): Promise<{
  isAvailable: boolean;
  isDownloaded: boolean;
  certificateId?: string;
  issuedAt?: string;
  message?: string;
} | null> {
  try {
    const response = await fetch(`${API_BASE}/${courseId}/certificate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Failed to check certificate');
      return null;
    }

    const result = await response.json();
    
    if (!result.success) {
      console.error('API error:', result.error);
      return null;
    }

    return {
      isAvailable: result.isAvailable,
      isDownloaded: result.isDownloaded || false,
      certificateId: result.certificateId,
      issuedAt: result.issuedAt,
      message: result.message,
    };
  } catch (error) {
    console.error('Error checking certificate:', error);
    return null;
  }
}

/**
 * Download certificate
 */
export async function downloadCertificate(courseId: string): Promise<Blob | null> {
  try {
    const response = await fetch(`${API_BASE}/${courseId}/certificate`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to download certificate');
      return null;
    }

    return await response.blob();
  } catch (error) {
    console.error('Error downloading certificate:', error);
    return null;
  }
}

/**
 * Get next lesson in course
 */
export function getNextLesson(
  currentLessonId: string,
  curriculum: Section[]
): { lesson: Lesson; section: Section } | null {
  const allLessons: { lesson: Lesson; section: Section }[] = [];
  
  curriculum.forEach((section) => {
    section.lessons.forEach((lesson) => {
      allLessons.push({ lesson, section });
    });
  });

  const currentIndex = allLessons.findIndex((item) => item.lesson.id === currentLessonId);
  
  if (currentIndex === -1 || currentIndex >= allLessons.length - 1) {
    return null;
  }

  return allLessons[currentIndex + 1];
}

/**
 * Get previous lesson in course
 */
export function getPreviousLesson(
  currentLessonId: string,
  curriculum: Section[]
): { lesson: Lesson; section: Section } | null {
  const allLessons: { lesson: Lesson; section: Section }[] = [];
  
  curriculum.forEach((section) => {
    section.lessons.forEach((lesson) => {
      allLessons.push({ lesson, section });
    });
  });

  const currentIndex = allLessons.findIndex((item) => item.lesson.id === currentLessonId);
  
  if (currentIndex === -1 || currentIndex <= 0) {
    return null;
  }

  return allLessons[currentIndex - 1];
}
