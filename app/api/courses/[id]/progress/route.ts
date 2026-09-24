import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { CourseProgress } from '@/lib/models/course.model';
import { Course } from '@/lib/models/course.model';
import { auth } from '@/auth';

async function getUserId(session: any): string | null {
  // For credentials users: session.user._id
  // For OAuth users: session.user.id (set in jwt callback)
  return session?.user?._id || session?.user?.id || null;
}

// Helper to get all lesson IDs from a course
async function getAllLessonIds(courseId: string): Promise<string[]> {
  const course = await Course.findOne({ id: courseId }).lean();
  if (!course) {
    return [];
  }
  
  const lessonIds: string[] = [];
  course.curriculum.forEach((section: any) => {
    section.lessons.forEach((lesson: any) => {
      lessonIds.push(lesson.id);
    });
  });
  
  return lessonIds;
}

// GET user progress for a course
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id: courseId } = await params;
    const session = await auth();

    const userId = getUserId(session);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const progress = await CourseProgress.findOne({
      userId,
      courseId,
    }).lean();

    if (!progress) {
      // Create new progress record
      const allLessonIds = await getAllLessonIds(courseId);
      const newProgress = new CourseProgress({
        userId: session.user._id,
        courseId,
        completedLessons: [],
        progressPercentage: 0,
        startedAt: new Date(),
        lastAccessed: new Date(),
      });
      await newProgress.save();
      
      return NextResponse.json({
        success: true,
        data: {
          ...newProgress.toObject(),
          allLessonIds,
          totalLessons: allLessonIds.length,
        },
      });
    }

    const allLessonIds = await getAllLessonIds(courseId);

    return NextResponse.json({
      success: true,
      data: {
        ...progress,
        allLessonIds,
        totalLessons: allLessonIds.length,
      },
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch progress' },
      { status: 500 }
    );
  }
}

// POST to update user progress (mark lesson as complete)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id: courseId } = await params;
    const session = await auth();
    const body = await request.json();
    const { lessonId, isComplete = true } = body;

    const userId = getUserId(session);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const allLessonIds = await getAllLessonIds(courseId);
    
    // Find or create progress
    let progress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    if (!progress) {
      progress = new CourseProgress({
        userId,
        courseId,
        completedLessons: [],
        startedAt: new Date(),
        lastAccessed: new Date(),
      });
    }

    // Update completed lessons
    if (isComplete) {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
      }
    } else {
      progress.completedLessons = progress.completedLessons.filter(
        (id) => id !== lessonId
      );
    }

    // Update current lesson
    progress.currentLessonId = lessonId;
    progress.lastAccessed = new Date();

    // Calculate progress percentage
    progress.progressPercentage = Math.round(
      (progress.completedLessons.length / allLessonIds.length) * 100
    );

    // Check if course is completed
    if (progress.completedLessons.length === allLessonIds.length) {
      progress.completedAt = new Date();
    } else {
      progress.completedAt = undefined;
    }

    await progress.save();

    return NextResponse.json({
      success: true,
      data: progress,
      totalLessons: allLessonIds.length,
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update progress' },
      { status: 500 }
    );
  }
}
