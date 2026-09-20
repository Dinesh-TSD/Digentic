import mongoose, { Document, Schema, models } from 'mongoose';

// Lesson Schema
interface ILesson extends Document {
  id: string;
  title: string;
  duration: string;
  preview: boolean;
  videoUrl?: string;
  description?: string;
  order: number;
}

const LessonSchema = new Schema<ILesson>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: String, required: true },
  preview: { type: Boolean, default: false },
  videoUrl: { type: String },
  description: { type: String },
  order: { type: Number, default: 0 },
});

// Section Schema
interface ISection extends Document {
  id: string;
  title: string;
  lessons: ILesson[];
  order: number;
}

const SectionSchema = new Schema<ISection>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  lessons: { type: [LessonSchema], default: [] },
  order: { type: Number, default: 0 },
});

// Review Schema
interface IReview extends Document {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
}

const ReviewSchema = new Schema<IReview>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: String, required: true },
  text: { type: String, required: true },
  helpful: { type: Number, default: 0 },
});

// Instructor Schema
interface IInstructor extends Document {
  name: string;
  avatar: string;
  title: string;
  bio: string;
  courses: number;
  students: number;
  rating: number;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

const InstructorSchema = new Schema<IInstructor>({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  courses: { type: Number, default: 0 },
  students: { type: Number, default: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  github: { type: String },
  linkedin: { type: String },
  twitter: { type: String },
});

// Course Schema
interface ICourse extends Document {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  rating: number;
  reviewCount: number;
  students: number;
  price: number;
  thumbnail: string;
  previewVideoUrl: string;
  instructor: IInstructor;
  tags: string[];
  outcomes: string[];
  targetAudience: string[];
  curriculum: ISection[];
  reviews: IReview[];
  features: string[];
  language: string;
  slug: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  category: { type: String, required: true },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  },
  duration: { type: String, required: true },
  lessons: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
  reviewCount: { type: Number, default: 0 },
  students: { type: Number, default: 0 },
  price: { type: Number, required: true, default: 0 },
  thumbnail: { type: String, required: true },
  previewVideoUrl: { type: String, required: true },
  instructor: { type: InstructorSchema, required: true },
  tags: { type: [String], default: [] },
  outcomes: { type: [String], default: [] },
  targetAudience: { type: [String], default: [] },
  curriculum: { type: [SectionSchema], default: [] },
  reviews: { type: [ReviewSchema], default: [] },
  features: { type: [String], default: [] },
  language: { type: String, default: 'English' },
  slug: { type: String, required: true, unique: true },
  isPublished: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

// Indexes for better query performance
CourseSchema.index({ category: 1 });
CourseSchema.index({ level: 1 });
CourseSchema.index({ price: 1 });
CourseSchema.index({ rating: 1 });
CourseSchema.index({ title: 'text', description: 'text' });

// Course Progress Schema
interface ICourseProgress extends Document {
  userId: mongoose.Types.ObjectId | string;
  courseId: string;
  completedLessons: string[];
  currentLessonId?: string;
  progressPercentage: number;
  startedAt: Date;
  completedAt?: Date;
  lastAccessed: Date;
}

const CourseProgressSchema = new Schema<ICourseProgress>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: String, required: true },
  completedLessons: { type: [String], default: [] },
  currentLessonId: { type: String },
  progressPercentage: { type: Number, default: 0, min: 0, max: 100 },
  startedAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
  lastAccessed: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

CourseProgressSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// Certificate Schema
interface ICertificate extends Document {
  userId: mongoose.Types.ObjectId | string;
  courseId: string;
  courseTitle: string;
  userName: string;
  issuedAt: Date;
  certificateId: string;
  isDownloaded: boolean;
}

const CertificateSchema = new Schema<ICertificate>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: String, required: true },
  courseTitle: { type: String, required: true },
  userName: { type: String, required: true },
  issuedAt: { type: Date, default: Date.now },
  certificateId: { type: String, required: true, unique: true },
  isDownloaded: { type: Boolean, default: false },
}, {
  timestamps: true,
});

// Export models
export const Course = models.Course || mongoose.model<ICourse>('Course', CourseSchema);
export const CourseProgress = models.CourseProgress || mongoose.model<ICourseProgress>('CourseProgress', CourseProgressSchema);
export const Certificate = models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);

// Export types
export type { ICourse, ICourseProgress, ICertificate, ILesson, ISection, IReview, IInstructor };
