import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { Post } from '@/models/Post';
import { BLOG_CATEGORIES } from '@/types/blog';

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
 * GET /api/categories — list all categories with post counts
 */
export async function GET() {
  try {
    await connectToDatabase();

    const dbCategories = await Category.find().sort({ count: -1, name: 1 }).lean();

    // If DB is empty, seed defaults
    if (dbCategories.length === 0) {
      const seeded = [];
      for (const name of BLOG_CATEGORIES) {
        const slug = slugify(name);
        const count = await Post.countDocuments({
          category: { $regex: new RegExp(`^${name}$`, 'i') },
        });
        const cat = await Category.create({ name, slug, count });
        seeded.push(cat);
      }
      return NextResponse.json({ success: true, categories: seeded });
    }

    // Refresh counts
    const updated = await Promise.all(
      dbCategories.map(async (c: any) => {
        const count = await Post.countDocuments({
          category: { $regex: new RegExp(`^${c.name}$`, 'i') },
        });
        return {
          id: String(c._id),
          name: c.name,
          slug: c.slug,
          description: c.description || '',
          count,
        };
      })
    );

    return NextResponse.json({ success: true, categories: updated });
  } catch (error: any) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories.' }, { status: 500 });
  }
}

/**
 * POST /api/categories — create new category (admin only)
 */
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email || (session.user as { role?: string }).role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
    }

    const { name, description } = await req.json();
    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: 'Category name must be at least 2 characters.' }, { status: 400 });
    }

    await connectToDatabase();
    const slug = slugify(name);

    const exists = await Category.findOne({ slug });
    if (exists) {
      return NextResponse.json({ error: 'Category already exists.' }, { status: 409 });
    }

    const category = await Category.create({
      name: name.trim(),
      slug,
      description: description?.trim() || '',
      count: 0,
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Failed to create category.' }, { status: 500 });
  }
}

/**
 * DELETE /api/categories — delete category by slug
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
      return NextResponse.json({ error: 'Category slug required.' }, { status: 400 });
    }

    await connectToDatabase();
    await Category.findOneAndDelete({ slug });

    return NextResponse.json({ success: true, message: 'Category deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ error: 'Failed to delete category.' }, { status: 500 });
  }
}
