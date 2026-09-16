export const BLOG_CATEGORIES = [
  'AI Tools',
  'Tutorials',
  'Roadmaps',
  'Comparisons',
  'News',
  'Career Guides',
  'Product Reviews',
  'Web Development',
  'MERN Stack',
  'AI & LLM',
] as const;

export const POST_STATUSES = ['Draft', 'Published', 'Archived'] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number] | string;
export type PostStatus = 'draft' | 'published' | 'archived' | 'Draft' | 'Published' | 'Archived';

// Block types
export type BlockType =
  | 'hero'
  | 'text'
  | 'image'
  | 'gallery'
  | 'table'
  | 'quote'
  | 'youtube'
  | 'code'
  | 'toolList'
  | 'comparisonTable'
  | 'timeline'
  | 'resources'
  | 'projects'
  | 'faq'
  | 'conclusion';

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface HeroBlockData extends BaseBlock {
  type: 'hero';
  title: string;
  subtitle?: string;
  badge?: string;
  image?: string;
}

export interface TextBlockData extends BaseBlock {
  type: 'text';
  heading?: string;
  content: string; // rich text or markdown/html
  image: string;
}

export interface ImageBlockData extends BaseBlock {
  type: 'image';
  url: string;
  alt: string;
  caption?: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface GalleryBlockData extends BaseBlock {
  type: 'gallery';
  images: GalleryImage[];
}

export interface TableBlockData extends BaseBlock {
  type: 'table';
  title?: string;
  columns: string[];
  rows: string[][];
  image?: string;
}

export interface QuoteBlockData extends BaseBlock {
  type: 'quote';
  quote: string;
  source?: string;
  image?: string;
}

export interface YoutubeBlockData extends BaseBlock {
  type: 'youtube';
  videoId: string;
  caption?: string;
  image?: string;
}

export interface CodeBlockData extends BaseBlock {
  type: 'code';
  title?: string;
  language: string;
  code: string;
  image?: string;
}

export interface ToolItem {
  name: string;
  logo: string;
  description: string;
  bestFor?: string;
  pricing?: string;
  website?: string;
  pros?: string[];
  cons?: string[];
}

export interface ToolListBlockData extends BaseBlock {
  type: 'toolList';
  title: string;
  tools: ToolItem[];
}

export interface ComparisonTableBlockData extends BaseBlock {
  type: 'comparisonTable';
  title?: string;
  columns: string[];
  rows: string[][];
  image?: string;
}

export interface TimelineItem {
  title: string;
  description: string;
  badge?: string;
}

export interface TimelineBlockData extends BaseBlock {
  type: 'timeline';
  title: string;
  items: TimelineItem[];
  image?: string;
}

export interface ResourceItem {
  title: string;
  url: string;
  description?: string;
  type?: string;
}

export interface ResourcesBlockData extends BaseBlock {
  type: 'resources';
  title: string;
  items: ResourceItem[];
  image?: string;
}

export interface ProjectItem {
  title: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  description?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ProjectsBlockData extends BaseBlock {
  type: 'projects';
  title: string;
  items: ProjectItem[];
  image?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqBlockData extends BaseBlock {
  type: 'faq';
  title?: string;
  items: FaqItem[];
  image?: string;
}

export interface ConclusionBlockData extends BaseBlock {
  type: 'conclusion';
  title?: string;
  content: string;
  callToAction?: {
    text: string;
    url: string;
  };
  image?: string;
}

export type ContentBlock =
  | HeroBlockData
  | TextBlockData
  | ImageBlockData
  | GalleryBlockData
  | TableBlockData
  | QuoteBlockData
  | YoutubeBlockData
  | CodeBlockData
  | ToolListBlockData
  | ComparisonTableBlockData
  | TimelineBlockData
  | ResourcesBlockData
  | ProjectsBlockData
  | FaqBlockData
  | ConclusionBlockData;

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface BlogPostData {
  _id?: string;
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug?: string;
  tags: string[];
  featuredImage?: string | null;
  featuredImageAlt?: string;
  content?: string; // legacy fallback
  published: boolean;
  featured: boolean;
  popular: boolean;
  views: number;
  readingTime?: string | number;
  readTime?: string;
  publishedAt?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  seo?: SeoSettings;
  blocks: ContentBlock[];
  faq: FaqItem[];
  status: 'draft' | 'published' | 'archived' | 'Draft' | 'Published' | 'Archived';
  createdBy?: string | null;
}
