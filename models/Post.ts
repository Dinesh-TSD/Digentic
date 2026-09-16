import mongoose, { Schema, Document, Model } from 'mongoose';
import { BLOG_CATEGORIES, POST_STATUSES, type ContentBlock, type FaqItem, type SeoSettings } from '@/types/blog';

export { BLOG_CATEGORIES as POST_CATEGORIES, POST_STATUSES };

export interface IPost extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  excerpt: string;
  content?: string; // fallback
  category: string;
  categorySlug?: string;
  tags: string[];
  featuredImage?: string | null;
  featuredImageAlt?: string;
  image?: string | null; // legacy alias

  published: boolean;
  featured: boolean;
  popular: boolean;

  views: number;
  readingTime: number;
  readTime?: string; // legacy display string
  publishedAt?: Date | null;

  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };

  blocks: ContentBlock[];
  faq: FaqItem[];

  status: 'draft' | 'published' | 'archived' | 'Draft' | 'Published' | 'Archived';
  createdBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [250, 'Title cannot exceed 250 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Post slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    excerpt: {
      type: String,
      default: '',
      trim: true,
      maxlength: [600, 'Excerpt cannot exceed 600 characters'],
    },
    content: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'AI Tools',
      index: true,
    },
    categorySlug: {
      type: String,
      default: 'ai-tools',
      index: true,
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    featuredImage: {
      type: String,
      default: null,
    },
    featuredImageAlt: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: null,
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    popular: {
      type: Boolean,
      default: false,
      index: true,
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    readingTime: {
      type: Number,
      default: 5,
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: { type: [String], default: [] },
    },
    blocks: {
      type: [Schema.Types.Mixed] as any,
      default: [],
    },
    faq: {
      type: [
        {
          question: { type: String, default: '' },
          answer: { type: String, default: '' },
        },
      ],
      default: [],
    },
    status: {
      type: String,
      default: 'Published',
      index: true,
    },
    createdBy: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: 'posts',
    minimize: false,
  }
);

PostSchema.pre('save', function (this: IPost) {
  if (this.featuredImage && !this.image) {
    this.image = this.featuredImage;
  } else if (this.image && !this.featuredImage) {
    this.featuredImage = this.image;
  }
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
});

export const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;
