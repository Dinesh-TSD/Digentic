import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/mongoose';
import { Project, PROJECT_CATEGORIES } from '@/models/Project';
import { Upload } from '@/models/Upload';
import type { IProject } from '@/models/Project';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_TECH_TAGS = 20;
const URL_PATTERN = /^https?:\/\/\S+$/i;

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
  const base = slugify(title) || 'project';
  let slug = base;
  let attempt = 0;

  // Random suffix fallback for titles that collide with an existing slug
  while ((await Project.exists({ slug })) && attempt < 5) {
    slug = `${base}-${crypto.randomBytes(3).toString('hex')}`;
    attempt += 1;
  }

  return slug;
}

/**
 * GET /api/projects — public project listing.
 * Optional query params: category, featured=true, status (default "Active", "all" for everything), limit
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featuredParam = searchParams.get('featured');
    const statusParam = searchParams.get('status') || 'Active';
    const limitParam = parseInt(searchParams.get('limit') || '100', 10);
    const limit =
      Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, 200) : 100;

    const filter: {
      status?: IProject['status'];
      category?: IProject['category'];
      featured?: boolean;
    } = {};
    if (statusParam !== 'all') {
      filter.status = statusParam as IProject['status'];
    }
    if (category && category !== 'All') {
      filter.category = category as IProject['category'];
    }
    if (featuredParam === 'true') {
      filter.featured = true;
    }

    await connectToDatabase();

    const docs = await Project.find(filter).sort({ createdAt: -1 }).limit(limit).lean();

    const projects = docs.map((p) => ({
      id: String(p._id),
      title: p.title,
      slug: p.slug,
      description: p.description,
      tech: p.tech,
      category: p.category,
      featured: p.featured,
      status: p.status,
      views: p.views,
      stars: p.stars,
      image: p.image ?? null,
      liveUrl: p.liveUrl ?? null,
      githubUrl: p.githubUrl ?? null,
      caseStudyUrl: p.caseStudyUrl ?? null,
      createdAt: p.createdAt,
    }));

    return NextResponse.json({ success: true, count: projects.length, projects });
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects — create a portfolio project (admin only).
 * Accepts multipart/form-data with text fields plus an optional
 * `coverImage` file, which is stored in the `uploads` collection.
 */
export async function POST(req: Request) {
  try {
    // ── Auth guard: must be signed in as admin ──
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in.' },
        { status: 401 }
      );
    }

    if ((session.user as { role?: string }).role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden. Only admins can create projects.' },
        { status: 403 }
      );
    }

    // ── Parse form data ──
    const formData = await req.formData();

    const title = String(formData.get('title') || '').trim();
    const description = String(formData.get('description') || '').trim();
    const category = String(formData.get('category') || 'Full Stack').trim();
    const featured = String(formData.get('featured') || 'false') === 'true';
    const liveUrl = String(formData.get('liveUrl') || '').trim();
    const githubUrl = String(formData.get('githubUrl') || '').trim();
    const caseStudyUrl = String(formData.get('caseStudyUrl') || '').trim();
    const tech = formData
      .getAll('tech')
      .map((t) => String(t).trim())
      .filter(Boolean)
      .slice(0, MAX_TECH_TAGS);

    // ── Validation ──
    if (title.length < 3 || title.length > 120) {
      return NextResponse.json(
        { error: 'Project title must be between 3 and 120 characters.' },
        { status: 400 }
      );
    }

    if (description.length < 10 || description.length > 2000) {
      return NextResponse.json(
        { error: 'Description must be between 10 and 2000 characters.' },
        { status: 400 }
      );
    }

    if (tech.length === 0) {
      return NextResponse.json(
        { error: 'Add at least one tech stack tag.' },
        { status: 400 }
      );
    }

    if (!(PROJECT_CATEGORIES as readonly string[]).includes(category)) {
      return NextResponse.json(
        { error: `Category must be one of: ${PROJECT_CATEGORIES.join(', ')}.` },
        { status: 400 }
      );
    }

    if (liveUrl && !URL_PATTERN.test(liveUrl)) {
      return NextResponse.json(
        { error: 'Live URL must be a valid http(s) URL.' },
        { status: 400 }
      );
    }

    if (githubUrl && !URL_PATTERN.test(githubUrl)) {
      return NextResponse.json(
        { error: 'GitHub URL must be a valid http(s) URL.' },
        { status: 400 }
      );
    }

    if (caseStudyUrl && !URL_PATTERN.test(caseStudyUrl)) {
      return NextResponse.json(
        { error: 'Case study URL must be a valid http(s) URL.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // ── Cover image upload (stored in MongoDB `uploads` collection) ──
    const coverEntry = formData.get('coverImage');
    let image: string | null = null;

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

      image = `/api/uploads/${upload._id.toString()}`;
    }

    // ── Create project ──
    const slug = await generateUniqueSlug(title);

    const project = await Project.create({
      title,
      slug,
      description,
      tech,
      category: category as IProject['category'],
      featured,
      status: 'Active',
      views: 0,
      stars: 0,
      image,
      liveUrl: liveUrl || null,
      githubUrl: githubUrl || null,
      caseStudyUrl: caseStudyUrl || null,
      createdBy: session.user.email.toLowerCase().trim(),
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Project created successfully!',
        project: {
          id: project._id.toString(),
          title: project.title,
          slug: project.slug,
          description: project.description,
          tech: project.tech,
          category: project.category,
          featured: project.featured,
          status: project.status,
          image: project.image,
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
          caseStudyUrl: project.caseStudyUrl,
          createdAt: project.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating project:', error);

    if (error?.name === 'ValidationError') {
      return NextResponse.json(
        { error: error?.message || 'Project validation failed.' },
        { status: 400 }
      );
    }

    if (error?.code === 11000) {
      return NextResponse.json(
        { error: 'A project with this title already exists. Try a different title.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create project.' },
      { status: 500 }
    );
  }
}
