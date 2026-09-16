import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/mongoose';
import { Upload } from '@/models/Upload';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * GET /api/uploads — list all uploads
 */
export async function GET() {
  try {
    await connectToDatabase();
    const docs = await Upload.find()
      .select('_id filename contentType size createdAt')
      .sort({ createdAt: -1 })
      .lean();

    const uploads = docs.map((doc: any) => ({
      id: String(doc._id),
      filename: doc.filename,
      contentType: doc.contentType,
      size: doc.size,
      url: `/api/uploads/${doc._id.toString()}`,
      createdAt: doc.createdAt,
    }));

    return NextResponse.json({ success: true, uploads });
  } catch (error: any) {
    console.error('Error fetching uploads:', error);
    return NextResponse.json({ error: 'Failed to fetch uploads.' }, { status: 500 });
  }
}

/**
 * POST /api/uploads — upload image
 */
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email || (session.user as { role?: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden. Admin only.' }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'File must be JPEG, PNG, WebP, or GIF.' },
        { status: 400 }
      );
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      return NextResponse.json({ error: 'File exceeds 5MB limit.' }, { status: 400 });
    }

    await connectToDatabase();
    const bytes = Buffer.from(await file.arrayBuffer());
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) || 'upload-image';

    const upload = await Upload.create({
      filename: safeName,
      contentType: file.type,
      size: bytes.length,
      data: bytes,
      uploadedBy: session.user.email.toLowerCase().trim(),
    });

    return NextResponse.json(
      {
        success: true,
        upload: {
          id: String(upload._id),
          filename: upload.filename,
          url: `/api/uploads/${upload._id.toString()}`,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file.' }, { status: 500 });
  }
}
