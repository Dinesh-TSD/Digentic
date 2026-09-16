import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/mongoose';
import { Post } from '@/models/Post';
import { Category } from '@/models/Category';
import { Tag } from '@/models/Tag';
import { Upload } from '@/models/Upload';
import { BLOG_CATEGORIES } from '@/types/blog';
import type { IPost } from '@/models/Post';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_TAGS = 30;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function generateUniqueSlug(title: string): Promise<string> {
  const base = slugify(title) || 'post';
  let slug = base;
  let attempt = 0;

  while ((await Post.exists({ slug })) && attempt < 5) {
    slug = `${base}-${crypto.randomBytes(3).toString('hex')}`;
    attempt += 1;
  }

  return slug;
}

function calculateReadingTime(blocks: any[], content: string, excerpt: string): number {
  let wordCount = (excerpt || '').split(/\s+/).filter(Boolean).length;
  wordCount += (content || '').split(/\s+/).filter(Boolean).length;

  if (Array.isArray(blocks)) {
    blocks.forEach((b) => {
      if (b.heading) wordCount += b.heading.split(/\s+/).length;
      if (b.content) wordCount += b.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
      if (b.quote) wordCount += b.quote.split(/\s+/).length;
      if (b.title) wordCount += b.title.split(/\s+/).length;
      if (b.description) wordCount += b.description.split(/\s+/).length;
      if (Array.isArray(b.tools)) {
        b.tools.forEach((t: any) => {
          if (t.name) wordCount += t.name.split(/\s+/).length;
          if (t.description) wordCount += t.description.split(/\s+/).length;
        });
      }
      if (Array.isArray(b.items)) {
        b.items.forEach((it: any) => {
          if (it.title) wordCount += it.title.split(/\s+/).length;
          if (it.description) wordCount += it.description.split(/\s+/).length;
          if (it.question) wordCount += it.question.split(/\s+/).length;
          if (it.answer) wordCount += it.answer.split(/\s+/).length;
        });
      }
    });
  }

  return Math.max(1, Math.ceil(wordCount / 180));
}

/**
 * GET /api/posts — query posts with projection and filtering.
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const featuredParam = searchParams.get('featured');
    const popularParam = searchParams.get('popular');
    const statusParam = searchParams.get('status') || 'Published';
    const limitParam = parseInt(searchParams.get('limit') || '100', 10);
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 200) : 100;

    const filter: Record<string, any> = {};

    if (statusParam !== 'all') {
      filter.status = statusParam;
    }
    if (category && category !== 'All') {
      filter.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }
    if (tag) {
      filter.tags = tag;
    }
    if (featuredParam === 'true') {
      filter.featured = true;
    }
    if (popularParam === 'true') {
      filter.popular = true;
    }
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    await connectToDatabase();

    const docs = await Post.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    const posts = docs.map((p: any) => ({
      id: String(p._id),
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      category: p.category,
      categorySlug: p.categorySlug || slugify(p.category || 'ai-tools'),
      tags: p.tags || [],
      featuredImage: p.featuredImage || p.image || null,
      image: p.featuredImage || p.image || null,
      featuredImageAlt: p.featuredImageAlt || '',
      published: Boolean(p.published),
      featured: Boolean(p.featured),
      popular: Boolean(p.popular),
      status: p.status,
      views: p.views || 0,
      readingTime: p.readingTime || 5,
      readTime: p.readTime || `${p.readingTime || 5} min read`,
      publishDate: p.createdAt
        ? new Date(p.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : '',
      publishedAt: p.publishedAt || p.createdAt,
      createdAt: p.createdAt,
      seo: p.seo || { metaTitle: '', metaDescription: '', keywords: [] },
      blocks: p.blocks || [],
      faq: p.faq || [],
    }));

    return NextResponse.json({ success: true, count: posts.length, posts });
  } catch (error: any) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/posts — create post with dynamic blocks (admin only).
 */
export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    if ((session.user as { role?: string }).role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden. Only admins can create posts.' },
        { status: 403 }
      );
    }

    let title = '';
    let slug = '';
    let excerpt = '';
    let content = '';
    let category = 'AI Tools';
    let status: IPost['status'] = 'Published';
    let published = true;
    let featured = false;
    let popular = false;
    let tags: string[] = [];
    let featuredImage: string | null = null;
    let featuredImageAlt = '';
    let seoTitle = '';
    let seoDescription = '';
    let keywords: string[] = [];
    let blocks: any[] = [];
    let faq: any[] = [];

    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      title = String(formData.get('title') || '').trim();
      slug = String(formData.get('slug') || '').trim();
      excerpt = String(formData.get('excerpt') || '').trim();
      content = String(formData.get('content') || '').trim();
      category = String(formData.get('category') || 'AI Tools').trim();
      status = (formData.get('status') as IPost['status']) || 'Published';
      published = String(formData.get('published') || 'true') === 'true';
      featured = String(formData.get('featured') || 'false') === 'true';
      popular = String(formData.get('popular') || 'false') === 'true';
      featuredImageAlt = String(formData.get('featuredImageAlt') || '').trim();
      seoTitle = String(formData.get('seoTitle') || '').trim();
      seoDescription = String(formData.get('seoDescription') || '').trim();

      const rawKeywords = formData.get('keywords');
      if (typeof rawKeywords === 'string') {
        try {
          keywords = JSON.parse(rawKeywords);
        } catch {
          keywords = rawKeywords.split(',').map((k) => k.trim());
        }
      }

      const rawBlocks = formData.get('blocks');
      if (typeof rawBlocks === 'string') {
        try {
          blocks = JSON.parse(rawBlocks);
        } catch {
          blocks = [];
        }
      }

      const rawFaq = formData.get('faq');
      if (typeof rawFaq === 'string') {
        try {
          faq = JSON.parse(rawFaq);
        } catch {
          faq = [];
        }
      }

      tags = formData
        .getAll('tags')
        .map((t) => String(t).trim())
        .filter(Boolean)
        .slice(0, MAX_TAGS);

      const coverEntry = formData.get('coverImage');
      if (coverEntry && coverEntry instanceof File && coverEntry.size > 0) {
        if (!ALLOWED_IMAGE_TYPES.includes(coverEntry.type)) {
          return NextResponse.json(
            { error: 'Cover image must be a JPEG, PNG, WebP, or GIF file.' },
            { status: 400 }
          );
        }

        if (coverEntry.size > MAX_IMAGE_SIZE_BYTES) {
          return NextResponse.json(
            { error: 'Cover image must be smaller than 5MB.' },
            { status: 400 }
          );
        }

        await connectToDatabase();
        const bytes = Buffer.from(await coverEntry.arrayBuffer());
        const safeName =
          coverEntry.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 120) || 'cover-image';

        const upload = await Upload.create({
          filename: safeName,
          contentType: coverEntry.type,
          size: bytes.length,
          data: bytes,
          uploadedBy: session.user.email.toLowerCase().trim(),
        });

        featuredImage = `/api/uploads/${upload._id.toString()}`;
      } else {
        const rawImage = formData.get('featuredImage') || formData.get('image');
        if (typeof rawImage === 'string' && rawImage) {
          featuredImage = rawImage;
        }
      }
    } else {
      const body = await req.json();
      title = String(body.title || '').trim();
      slug = String(body.slug || '').trim();
      excerpt = String(body.excerpt || '').trim();
      content = String(body.content || '').trim();
      category = String(body.category || 'AI Tools').trim();
      status = body.status || 'Published';
      published = body.published !== undefined ? Boolean(body.published) : true;
      featured = Boolean(body.featured);
      popular = Boolean(body.popular);
      tags = Array.isArray(body.tags) ? body.tags.slice(0, MAX_TAGS) : [];
      featuredImage = body.featuredImage || body.image || null;
      featuredImageAlt = String(body.featuredImageAlt || '').trim();
      seoTitle = String(body.seo?.metaTitle || body.seoTitle || '').trim();
      seoDescription = String(body.seo?.metaDescription || body.seoDescription || '').trim();
      keywords = Array.isArray(body.seo?.keywords)
        ? body.seo.keywords
        : Array.isArray(body.keywords)
        ? body.keywords
        : [];
      blocks = Array.isArray(body.blocks) ? body.blocks : [];
      faq = Array.isArray(body.faq) ? body.faq : [];
    }

    if (title.length < 3 || title.length > 250) {
      return NextResponse.json(
        { error: 'Post title must be between 3 and 250 characters.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    if (!slug) {
      slug = await generateUniqueSlug(title);
    } else {
      slug = slugify(slug);
      const exists = await Post.exists({ slug });
      if (exists) {
        slug = await generateUniqueSlug(slug);
      }
    }

    const readingMinutes = calculateReadingTime(blocks, content, excerpt);
    const readTimeStr = `${readingMinutes} min read`;

    const categorySlug = slugify(category);

    const post = await Post.create({
      title,
      slug,
      excerpt: excerpt || title,
      content,
      category,
      categorySlug,
      tags,
      featuredImage,
      featuredImageAlt,
      image: featuredImage,
      published,
      featured,
      popular,
      status,
      views: 0,
      readingTime: readingMinutes,
      readTime: readTimeStr,
      publishedAt: published ? new Date() : null,
      seo: {
        metaTitle: seoTitle || title,
        metaDescription: seoDescription || excerpt,
        keywords,
      },
      blocks,
      faq,
      createdBy: session.user.email.toLowerCase().trim(),
    });

    // Update or create Category and Tag counters
    try {
      await Category.findOneAndUpdate(
        { slug: categorySlug },
        { $setOnInsert: { name: category, slug: categorySlug }, $inc: { count: 1 } },
        { upsert: true }
      );

      for (const t of tags) {
        const tSlug = slugify(t);
        if (tSlug) {
          await Tag.findOneAndUpdate(
            { slug: tSlug },
            { $setOnInsert: { name: t, slug: tSlug }, $inc: { count: 1 } },
            { upsert: true }
          );
        }
      }
    } catch (countErr) {
      console.warn('Error updating category/tag counts:', countErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Post created successfully!',
        post: {
          id: post._id.toString(),
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          category: post.category,
          tags: post.tags,
          featuredImage: post.featuredImage,
          featured: post.featured,
          popular: post.popular,
          status: post.status,
          views: post.views,
          readingTime: post.readingTime,
          readTime: post.readTime,
          blocks: post.blocks,
          faq: post.faq,
          createdAt: post.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating post:', error);

    if (error?.code === 11000) {
      return NextResponse.json(
        { error: 'A post with this slug already exists. Please choose a different title or slug.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create post.' },
      { status: 500 }
    );
  }
}
