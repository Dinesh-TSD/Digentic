import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/mongoose';
import { Tag } from '@/models/Tag';
import { Post } from '@/models/Post';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * GET /api/tags — list all tags
 */
export async function GET() {
  try {
    await connectToDatabase();
    const tags = await Tag.find().sort({ count: -1, name: 1 }).lean();

    return NextResponse.json({
      success: true,
      tags: tags.map((t: any) => ({
        id: String(t._id),
        name: t.name,
        slug: t.slug,
        count: t.count || 0,
      })),
    });
  } catch (error: any) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({ error: 'Failed to fetch tags.' }, { status: 500 });
  }
}

/**
 * POST /api/tags — create new tag (admin only)
 */
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email || (session.user as { role?: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    const { name } = await req.json();
    if (!name || name.trim().length < 1) {
      return NextResponse.json({ error: 'Tag name required.' }, { status: 400 });
    }

    await connectToDatabase();
    const slug = slugify(name);

    const exists = await Tag.findOne({ slug });
    if (exists) {
      return NextResponse.json({ error: 'Tag already exists.' }, { status: 409 });
    }

    const tag = await Tag.create({ name: name.trim(), slug, count: 0 });
    return NextResponse.json({ success: true, tag }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating tag:', error);
    return NextResponse.json({ error: 'Failed to create tag.' }, { status: 500 });
  }
}

/**
 * DELETE /api/tags — delete tag by slug
 */
export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email || (session.user as { role?: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Tag slug required.' }, { status: 400 });
    }

    await connectToDatabase();
    await Tag.findOneAndDelete({ slug });

    return NextResponse.json({ success: true, message: 'Tag deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting tag:', error);
    return NextResponse.json({ error: 'Failed to delete tag.' }, { status: 500 });
  }
}
