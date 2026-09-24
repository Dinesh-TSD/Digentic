import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { connectToDatabase } from '@/lib/mongoose';
import { Course } from '@/lib/models/course.model';
import { User } from '@/models/User';

async function findPublishedCourse(courseRef: string) {
  return Course.findOne({
    $or: [{ id: courseRef }, { slug: courseRef }],
    isPublished: true,
  })
    .select('id title')
    .lean();
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    const { id: courseRef } = await params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const course = await findPublishedCourse(courseRef);
    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    const sessionUser = session.user as any;
    if (sessionUser.role !== 'admin') {
      if (!session.user.email) {
        return NextResponse.json(
          { success: false, error: 'User email not available' },
          { status: 400 }
        );
      }

      const user = await User.findOne({
        email: session.user.email.toLowerCase().trim(),
      }).select('enrolledCourses');

      if (!user) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }

      if (!user.enrolledCourses.includes(course.id)) {
        user.enrolledCourses = Array.from(
          new Set([...user.enrolledCourses, course.id])
        );
        await user.save();
      }

      return NextResponse.json({
        success: true,
        data: {
          courseId: course.id,
          enrolledCourses: user.enrolledCourses,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        courseId: course.id,
        enrolledCourses: ['all'],
      },
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to enroll in course' },
      { status: 500 }
    );
  }
}
