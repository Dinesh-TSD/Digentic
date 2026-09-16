import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import connectToDatabase from '@/lib/mongoose';
import { Post } from '@/models/Post';

/**
 * GET /api/posts/[slug] — get post by slug or ID, increment views, return related posts
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectToDatabase();

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
    const query = isObjectId ? { $or: [{ slug }, { _id: slug }] } : { slug };

    const post = await Post.findOneAndUpdate(
      query,
      { $inc: { views: 1 } },
      { new: true }
    ).lean();

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const relatedDocs = await Post.find({
      _id: { $ne: post._id },
      category: post.category,
      status: 'Published',
    })
      .limit(3)
      .lean();

    const formattedPost = {
      id: String(post._id),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      categorySlug: post.categorySlug || 'ai-tools',
      tags: post.tags || [],
      featuredImage: post.featuredImage || post.image || null,
      featuredImageAlt: post.featuredImageAlt || '',
      image: post.featuredImage || post.image || null,
      featured: Boolean(post.featured),
      popular: Boolean(post.popular),
      published: Boolean(post.published),
      status: post.status,
      views: post.views || 0,
      readingTime: post.readingTime || 5,
      readTime: post.readTime || `${post.readingTime || 5} min read`,
      seo: post.seo || { metaTitle: '', metaDescription: '', keywords: [] },
      blocks: post.blocks || [],
      faq: post.faq || [],
      publishDate: post.createdAt
        ? new Date(post.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : '',
      publishedAt: post.publishedAt || post.createdAt,
      createdAt: post.createdAt,
    };

    const relatedPosts = relatedDocs.map((r: any) => ({
      id: String(r._id),
      title: r.title,
      slug: r.slug,
      excerpt: r.excerpt,
      category: r.category,
      tags: r.tags || [],
      featuredImage: r.featuredImage || r.image || null,
      image: r.featuredImage || r.image || null,
      views: r.views,
      readingTime: r.readingTime || 5,
      readTime: r.readTime || '5 min read',
      publishDate: r.createdAt
        ? new Date(r.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })
        : '',
    }));

    return NextResponse.json({
      success: true,
      post: formattedPost,
      relatedPosts,
    });
  } catch (error: any) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/posts/[slug] — update post by slug or ID (admin only)
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.email || (session.user as { role?: string }).role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden. Only admins can edit posts.' },
        { status: 403 }
      );
    }

    const { slug } = await params;
    const body = await req.json();

    await connectToDatabase();

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
    const query = isObjectId ? { $or: [{ slug }, { _id: slug }] } : { slug };

    const updateData: Record<string, any> = { ...body };
    delete updateData._id;
    delete updateData.id;

    if (updateData.featuredImage) {
      updateData.image = updateData.featuredImage;
    }

    const updated = await Post.findOneAndUpdate(query, updateData, { new: true });

    if (!updated) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Post updated successfully.',
      post: updated,
    });
  } catch (error: any) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

/**
 * DELETE /api/posts/[slug] — delete post (admin only)
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.email || (session.user as { role?: string }).role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden. Only admins can delete posts.' },
        { status: 403 }
      );
    }

    const { slug } = await params;
    await connectToDatabase();

    const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
    const query = isObjectId ? { $or: [{ slug }, { _id: slug }] } : { slug };

    const deleted = await Post.findOneAndDelete(query);
    if (!deleted) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Post deleted successfully.' });
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
