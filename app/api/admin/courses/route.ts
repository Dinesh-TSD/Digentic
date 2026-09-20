import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Course } from '@/lib/models/course.model';
import { auth } from '@/auth';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const session = await auth();

    // Only admins can access this
    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: courses,
    });
  } catch (error) {
    console.error('Error fetching admin courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const session = await auth();

    // Only admins can create courses
    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['title', 'description', 'longDescription', 'category', 'duration', 'curriculum'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if at least one section and lesson exists
    if (body.curriculum.length === 0 || body.curriculum.some((s: any) => s.lessons.length === 0)) {
      return NextResponse.json(
        { success: false, error: 'At least one module with one lesson is required' },
        { status: 400 }
      );
    }

    // Create new course
    const course = new Course({
      id: body.id || Date.now().toString(),
      title: body.title,
      description: body.description,
      longDescription: body.longDescription,
      category: body.category,
      level: body.level || 'Beginner',
      duration: body.duration,
      lessons: body.lessons || body.curriculum.reduce((acc: number, s: any) => acc + s.lessons.length, 0),
      price: body.price || 0,
      rating: body.rating || 0,
      reviewCount: body.reviewCount || 0,
      students: body.students || 0,
      thumbnail: body.thumbnail || '',
      previewVideoUrl: body.previewVideoUrl || '',
      instructor: body.instructor || {},
      tags: body.tags || [],
      outcomes: body.outcomes || [],
      targetAudience: body.targetAudience || [],
      curriculum: body.curriculum || [],
      reviews: body.reviews || [],
      features: body.features || [],
      language: body.language || 'English',
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      isPublished: body.isPublished || false,
      createdAt: body.createdAt ? new Date(body.createdAt) : new Date(),
      updatedAt: body.updatedAt ? new Date(body.updatedAt) : new Date(),
    });

    await course.save();

    return NextResponse.json({
      success: true,
      data: course,
      message: 'Course created successfully',
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create course' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase();
    const session = await auth();

    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Course ID is required' },
        { status: 400 }
      );
    }

    const course = await Course.findOneAndUpdate(
      { id },
      {
        ...updateData,
        lessons: updateData.curriculum?.reduce((acc: number, s: any) => acc + s.lessons.length, 0) || updateData.lessons,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: course,
      message: 'Course updated successfully',
    });
  } catch (error: any) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update course' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();
    const session = await auth();

    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Course ID is required' },
        { status: 400 }
      );
    }

    const course = await Course.findOneAndDelete({ id });

    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete course' },
      { status: 500 }
    );
  }
}
