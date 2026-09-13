import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongoose';
import { User } from '@/models/User';
import { PasswordReset } from '@/models/PasswordReset';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { error: 'Invalid or missing password reset token.' },
        { status: 400 }
      );
    }

    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const resetRecord = await PasswordReset.findOne({ token });

    if (!resetRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired password reset link. Please request a new one.' },
        { status: 400 }
      );
    }

    if (new Date() > new Date(resetRecord.expiresAt)) {
      await PasswordReset.deleteOne({ _id: resetRecord._id });
      return NextResponse.json(
        { error: 'Password reset link has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.updateOne(
      { email: resetRecord.email },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    // Clean up reset record
    await PasswordReset.deleteOne({ _id: resetRecord._id });

    return NextResponse.json({
      success: true,
      message: 'Your password has been updated successfully! You can now sign in.',
    });
  } catch (error: any) {
    console.error('Error in Mongoose reset-password route:', error);
    return NextResponse.json(
      { error: 'Failed to reset password. Please try again later.' },
      { status: 500 }
    );
  }
}
