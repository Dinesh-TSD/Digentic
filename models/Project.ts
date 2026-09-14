import mongoose, { Schema, Document, Model } from 'mongoose';

export const PROJECT_CATEGORIES = [
  'Full Stack',
  'AI & ML',
  'Frontend',
  'Backend',
  'Open Source',
] as const;

export const PROJECT_STATUSES = ['Draft', 'Active', 'Archived'] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface IProject extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  tech: string[];
  category: ProjectCategory;
  featured: boolean;
  status: ProjectStatus;
  views: number;
  stars: number;
  image?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  caseStudyUrl?: string | null;
  createdBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    tech: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: [...PROJECT_CATEGORIES],
      default: 'Full Stack',
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    status: {
      type: String,
      enum: [...PROJECT_STATUSES],
      default: 'Active',
    },
    views: {
      type: Number,
      default: 0,
      min: 0,
    },
    stars: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      default: null,
    },
    liveUrl: {
      type: String,
      default: null,
    },
    githubUrl: {
      type: String,
      default: null,
    },
    caseStudyUrl: {
      type: String,
      default: null,
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
    collection: 'projects',
  }
);

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
