import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/mongoose';
import { User } from '@/models/User';

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({
      email: session.user.email.toLowerCase().trim(),
    }).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User profile not found in database.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        enrolledCourses: user.enrolledCourses,
        purchasedDigital: user.purchasedDigital,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    console.error('Error fetching me profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile.' },
      { status: 500 }
    );
  }
}
