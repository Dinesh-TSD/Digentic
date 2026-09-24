import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import { CourseProgress, Certificate, Course } from '@/lib/models/course.model';
import { auth } from '@/auth';

async function getUserId(session: any): string | null {
  return session?.user?._id || session?.user?.id || null;
}

// Helper to check if user has completed the course
async function isCourseCompleted(userId: string, courseId: string): Promise<boolean> {
  const progress = await CourseProgress.findOne({
    userId,
    courseId,
  }).lean();

  if (!progress) {
    return false;
  }

  // Get all lesson IDs from the course
  const course = await Course.findOne({ id: courseId }).lean();
  if (!course) {
    return false;
  }

  const allLessonIds: string[] = [];
  course.curriculum.forEach((section: any) => {
    section.lessons.forEach((lesson: any) => {
      allLessonIds.push(lesson.id);
    });
  });

  return progress.completedLessons.length === allLessonIds.length;
}

// GET certificate or generate if not exists
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

    // Check if course is completed
    const isCompleted = await isCourseCompleted(String(userId), courseId);
    
    if (!isCompleted) {
      return NextResponse.json(
        { success: false, error: 'Course not completed yet' },
        { status: 400 }
      );
    }

    // Check if certificate already exists
    let certificate = await Certificate.findOne({
      userId,
      courseId,
    });

    const course = await Course.findOne({ id: courseId }).lean();
    if (!course) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }

    if (!certificate) {
      // Generate new certificate
      const certificateId = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      certificate = new Certificate({
        userId,
        courseId,
        courseTitle: course.title,
        userName: session.user.name || String(userId),
        certificateId,
        issuedAt: new Date(),
        isDownloaded: false,
      });
      
      await certificate.save();
    }

    // Generate PDF
    const pdfBuffer = await generateCertificatePDFServer({
      userName: certificate.userName,
      courseTitle: certificate.courseTitle,
      certificateId: certificate.certificateId,
      issuedAt: certificate.issuedAt,
    });

    // Mark as downloaded
    if (!certificate.isDownloaded) {
      certificate.isDownloaded = true;
      await certificate.save();
    }

    // Return PDF for download
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="certificate-${certificate.certificateId}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate certificate' },
      { status: 500 }
    );
  }
}

// POST to check if certificate is available
export async function POST(
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

    const isCompleted = await isCourseCompleted(String(userId), courseId);
    
    if (!isCompleted) {
      return NextResponse.json({
        success: true,
        isAvailable: false,
        message: 'Complete all lessons to unlock your certificate',
      });
    }

    // Check if certificate exists
    const certificate = await Certificate.findOne({
      userId,
      courseId,
    });

    return NextResponse.json({
      success: true,
      isAvailable: true,
      isDownloaded: certificate?.isDownloaded || false,
      certificateId: certificate?.certificateId,
      issuedAt: certificate?.issuedAt,
    });
  } catch (error) {
    console.error('Error checking certificate:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check certificate status' },
      { status: 500 }
    );
  }
}
