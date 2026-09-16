import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/mongoose';
import { Upload } from '@/models/Upload';

/**
 * GET /api/uploads/[id] — serve a stored upload (image) from MongoDB.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid upload id.' }, { status: 400 });
    }

    await connectToDatabase();

    const upload = await Upload.findById(id);

    if (!upload) {
      return NextResponse.json({ error: 'File not found.' }, { status: 404 });
    }

    const bytes = new Uint8Array(upload.data);

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': upload.contentType || 'application/octet-stream',
        'Content-Length': String(bytes.byteLength),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: any) {
    console.error('Error serving upload:', error);
    return NextResponse.json({ error: 'Failed to load file.' }, { status: 500 });
  }
}

/**
 * DELETE /api/uploads/[id] — delete an upload (admin only)
 */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.email || (session.user as { role?: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid id.' }, { status: 400 });
    }

    await connectToDatabase();
    await Upload.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Upload deleted.' });
  } catch (error: any) {
    console.error('Error deleting upload:', error);
    return NextResponse.json({ error: 'Failed to delete upload.' }, { status: 500 });
  }
}
