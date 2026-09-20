import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { Course } from '@/lib/models/course.model';

// GET all courses with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const level = searchParams.get('level');
    const minRating = searchParams.get('minRating');
    const maxPrice = searchParams.get('maxPrice');
    const onlyFree = searchParams.get('onlyFree');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '6', 10);
    const skip = (page - 1) * limit;

    // Build query
    const query: any = { isPublished: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (level) {
      query.level = level;
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    if (maxPrice) {
      query.price = { $lte: parseFloat(maxPrice) };
    }

    if (onlyFree === 'true') {
      query.price = 0;
    }

    // Get courses
    const courses = await Course.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get total count for pagination
    const total = await Course.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: courses,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}
