'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Upload, Plus, X, ChevronUp, ChevronDown, BookOpen, Clock, DollarSign,
  Tag, Users, CheckCircle2, AlertCircle, Save, Loader2, Eye, EyeOff
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';

// Types
interface Lesson {
  id: string;
  title: string;
  duration: string;
  preview: boolean;
  videoUrl?: string;
  description?: string;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Instructor {
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

interface CourseFormData {
  title: string;
  description: string;
  longDescription: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  price: number;
  thumbnail: string | File;
  previewVideoUrl: string;
  instructor: Instructor;
  tags: string[];
  outcomes: string[];
  targetAudience: string[];
  curriculum: Section[];
  features: string[];
  language: string;
  isPublished: boolean;
}

const CATEGORIES = ['AI & Agents', 'MERN Stack', 'Next.js', 'LLM Engineering', 'Freelancing & Career'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;
const LANGUAGES = ['English', 'Tamil', 'Hindi'];
const FEATURES = ['Lifetime access', 'Mobile friendly', 'Certificate of completion', '30-day money-back guarantee', 'Downloadable resources', 'Private Discord community'];

const DEFAULT_INSTRUCTOR: Instructor = {
  name: 'Dinesh T',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  title: 'AI Engineer & MERN Developer',
  bio: 'Dinesh T is a full-stack AI engineer with 6+ years of production experience.',
  courses: 9,
  students: 28000,
  rating: 4.9,
  github: 'https://github.com/dinesht',
  linkedin: 'https://linkedin.com/in/dinesht',
  twitter: 'https://twitter.com/digentic_tech',
};

const SAMPLE_THUMBNAIL = 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800';
const SAMPLE_VIDEO = 'https://media.w3.org/2010/05/sintel/trailer.mp4';

let uid = 0;
const nextId = () => String(++uid);

export default function AdminNewCoursePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<CourseFormData>({
    title: '',
    description: '',
    longDescription: '',
    category: 'AI & Agents',
    level: 'Beginner',
    duration: '',
    lessons: 0,
    price: 0,
    thumbnail: SAMPLE_THUMBNAIL,
    previewVideoUrl: SAMPLE_VIDEO,
    instructor: DEFAULT_INSTRUCTOR,
    tags: [],
    outcomes: [],
    targetAudience: [],
    curriculum: [],
    features: ['Lifetime access', 'Mobile friendly', 'Certificate of completion'],
    language: 'English',
    isPublished: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(SAMPLE_THUMBNAIL);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const totalLessons = formData.curriculum.reduce((acc, s) => acc + s.lessons.length, 0);

  useEffect(() => {
    setFormData(prev => ({ ...prev, lessons: totalLessons }));
  }, [totalLessons]);

  const addSection = () => {
    const newSection: Section = {
      id: nextId(),
      title: `Module ${formData.curriculum.length + 1}`,
      lessons: [],
    };
    setFormData(prev => ({ ...prev, curriculum: [...prev.curriculum, newSection] }));
    setExpandedSections(prev => new Set(prev).add(newSection.id));
  };

  const removeSection = (id: string) => {
    setFormData(prev => ({ ...prev, curriculum: prev.curriculum.filter(s => s.id !== id) }));
  };

  const updateSectionTitle = (id: string, title: string) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map(s => s.id === id ? { ...s, title } : s)
    }));
  };

  const toggleSection = (id: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const addLesson = (sectionId: string) => {
    const newLesson: Lesson = {
      id: nextId(),
      title: `Lesson ${formData.curriculum.find(s => s.id === sectionId)?.lessons.length + 1 || 1}`,
      duration: '10:00',
      preview: false,
      videoUrl: SAMPLE_VIDEO,
      description: '',
    };
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map(s =>
        s.id === sectionId ? { ...s, lessons: [...s.lessons, newLesson] } : s
      )
    }));
  };

  const removeLesson = (sectionId: string, lessonId: string) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map(s =>
        s.id === sectionId ? { ...s, lessons: s.lessons.filter(l => l.id !== lessonId) } : s
      )
    }));
  };

  const updateLesson = (sectionId: string, lessonId: string, field: keyof Lesson, value: any) => {
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map(s =>
        s.id === sectionId ? {
          ...s,
          lessons: s.lessons.map(l =>
            l.id === lessonId ? { ...l, [field]: value } : l
          )
        } : s
      )
    }));
  };

  const addOutcome = () => setFormData(prev => ({ ...prev, outcomes: [...prev.outcomes, ''] }));
  const removeOutcome = (i: number) => setFormData(prev => ({ ...prev, outcomes: prev.outcomes.filter((_, index) => index !== i) }));
  const updateOutcome = (i: number, value: string) => setFormData(prev => ({
    ...prev,
    outcomes: prev.outcomes.map((o, index) => index === i ? value : o)
  }));

  const addTargetAudience = () => setFormData(prev => ({ ...prev, targetAudience: [...prev.targetAudience, ''] }));
  const removeTargetAudience = (i: number) => setFormData(prev => ({ ...prev, targetAudience: prev.targetAudience.filter((_, index) => index !== i) }));
  const updateTargetAudience = (i: number, value: string) => setFormData(prev => ({
    ...prev,
    targetAudience: prev.targetAudience.map((a, index) => index === i ? value : a)
  }));

  const addTag = () => setFormData(prev => ({ ...prev, tags: [...prev.tags, ''] }));
  const removeTag = (i: number) => setFormData(prev => ({ ...prev, tags: prev.tags.filter((_, index) => index !== i) }));
  const updateTag = (i: number, value: string) => setFormData(prev => ({
    ...prev,
    tags: prev.tags.map((t, index) => index === i ? value : t)
  }));

  const toggleFeature = (feature: string) => setFormData(prev => ({
    ...prev,
    features: prev.features.includes(feature)
      ? prev.features.filter(f => f !== feature)
      : [...prev.features, feature]
  }));

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, thumbnail: 'Please upload an image file' }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, thumbnail: 'Image must be less than 5MB' }));
      return;
    }
    
    // Show preview immediately
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
    setErrors(prev => ({ ...prev, thumbnail: '' }));

    // Upload to server
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Update formData with the uploaded URL
        setFormData(prev => ({ ...prev, thumbnail: result.data.url }));
      } else {
        setErrors(prev => ({ ...prev, thumbnail: result.error || 'Upload failed' }));
      }
    } catch (err) {
      console.error('Upload error:', err);
      setErrors(prev => ({ ...prev, thumbnail: 'Upload failed' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Course title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.longDescription.trim()) newErrors.longDescription = 'Long description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (formData.price < 0) newErrors.price = 'Price must be a positive number';
    if (formData.curriculum.length === 0) {
      newErrors.curriculum = 'At least one section is required';
    } else {
      formData.curriculum.forEach((s, si) => {
        if (!s.title.trim()) newErrors[`section_${si}`] = `Section ${si + 1} title is required`;
        if (s.lessons.length === 0) newErrors[`section_${si}_lessons`] = `Section ${si + 1} must have at least one lesson`;
        else s.lessons.forEach((l, li) => {
          if (!l.title.trim()) newErrors[`section_${si}_lesson_${li}`] = `Lesson ${li + 1} in Section ${si + 1} is required`;
        });
      });
    }
    if (formData.outcomes.length === 0) {
      newErrors.outcomes = 'At least one outcome is required';
    } else {
      formData.outcomes.forEach((o, i) => {
        if (!o.trim()) newErrors[`outcome_${i}`] = `Outcome ${i + 1} is required`;
      });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    try {
      setIsSubmitting(true);
      const courseData = {
        ...formData,
        id: Date.now().toString(),
        slug: formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        rating: 0,
        reviewCount: 0,
        students: 0,
        reviews: [],
        isPublished: formData.isPublished,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        // thumbnail is already a URL string from the upload
      };

      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) throw new Error('Failed to create course');
      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        setTimeout(() => router.push('/admin/courses'), 2000);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors(prev => ({ ...prev, form: 'Failed to create course. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    setFormData(prev => ({ ...prev, isPublished: false }));
    handleSubmit(new Event('submit') as any);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      category: 'AI & Agents',
      level: 'Beginner',
      duration: '',
      lessons: 0,
      price: 0,
      thumbnail: SAMPLE_THUMBNAIL,
      previewVideoUrl: SAMPLE_VIDEO,
      instructor: DEFAULT_INSTRUCTOR,
      tags: [],
      outcomes: [],
      targetAudience: [],
      curriculum: [],
      features: ['Lifetime access', 'Mobile friendly', 'Certificate of completion'],
      language: 'English',
      isPublished: false,
    });
    setThumbnailPreview(SAMPLE_THUMBNAIL);
    setThumbnailFile(null);
    setErrors({});
    setExpandedSections(new Set());
    uid = 0;
  };

  const moveSection = (id: string, direction: 'up' | 'down') => {
    const index = formData.curriculum.findIndex(s => s.id === id);
    if (index === -1) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= formData.curriculum.length) return;
    const newCurriculum = [...formData.curriculum];
    [newCurriculum[index], newCurriculum[newIndex]] = [newCurriculum[newIndex], newCurriculum[index]];
    setFormData(prev => ({ ...prev, curriculum: newCurriculum }));
  };

  const moveLesson = (sectionId: string, lessonId: string, direction: 'up' | 'down') => {
    const section = formData.curriculum.find(s => s.id === sectionId);
    if (!section) return;
    const index = section.lessons.findIndex(l => l.id === lessonId);
    if (index === -1) return;
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= section.lessons.length) return;
    const newLessons = [...section.lessons];
    [newLessons[index], newLessons[newIndex]] = [newLessons[newIndex], newLessons[index]];
    setFormData(prev => ({
      ...prev,
      curriculum: prev.curriculum.map(s =>
        s.id === sectionId ? { ...s, lessons: newLessons } : s
      )
    }));
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
        <PageHeader title="New Course" subtitle="Create a new course" role="admin" />
        <div className="p-4 flex items-center justify-center">
          <div className="rounded-xl border border-[#e0e0e0] bg-[#f5f5f5] p-8 text-center dark:border-[#1f1f1f] dark:bg-[#111111] max-w-md">
            <CheckCircle2 className="mx-auto h-16 w-16 text-[#ff8c00]" />
            <h2 className="mt-4 text-xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Course Created Successfully!</h2>
            <p className="mt-2 text-sm text-[#666666] dark:text-[#94a3b8]">Your course has been saved.</p>
            <div className="mt-6 flex justify-center gap-4">
              <button onClick={() => router.push('/admin/courses')} className="rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-6 py-2 text-sm font-semibold text-white">View Courses</button>
              <button onClick={handleReset} className="rounded-lg border border-[#ff8c00] px-6 py-2 text-sm font-semibold text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white">Create Another</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#0a0a0a]">
      <PageHeader title="New Course" subtitle="Create a new course" role="admin" />
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {errors.form && <div className="rounded-lg border border-red-500 bg-red-50/10 p-3 text-sm text-red-500 flex items-center gap-2"><AlertCircle className="h-4 w-4" />{errors.form}</div>}

        {/* Course Details Section */}
        <div className="rounded-xl border border-[#e0e0e0] p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <h2 className="mb-4 text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Course Details</h2>
          
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">Course Title *</label>
            <input type="text" value={formData.title} onChange={e => setFormData(p => ({...p, title: e.target.value}))} placeholder="Enter course title..."
              className={`w-full rounded-lg border px-4 py-2 text-sm outline-none transition-all ${errors.title ? 'border-red-500' : 'border-[#e0e0e0] focus:border-[#ff8c00]'} dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]`} />
            {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">Category *</label>
              <select value={formData.category} onChange={e => setFormData(p => ({...p, category: e.target.value}))}
                className="w-full rounded-lg border border-[#e0e0e0] px-4 py-2 text-sm outline-none focus:border-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">Level *</label>
              <select value={formData.level} onChange={e => setFormData(p => ({...p, level: e.target.value as any}))}
                className="w-full rounded-lg border border-[#e0e0e0] px-4 py-2 text-sm outline-none focus:border-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]">
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">Price (₹)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666] dark:text-[#94a3b8]" />
                <input type="number" value={formData.price} onChange={e => setFormData(p => ({...p, price: Math.max(0, parseInt(e.target.value) || 0)}))} min="0"
                  className="w-full rounded-lg border border-[#e0e0e0] pl-8 pr-4 py-2 text-sm outline-none focus:border-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">Duration *</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666666] dark:text-[#94a3b8]" />
                <input type="text" value={formData.duration} onChange={e => setFormData(p => ({...p, duration: e.target.value}))} placeholder="e.g., 8 weeks"
                  className={`w-full rounded-lg border px-8 py-2 text-sm outline-none ${errors.duration ? 'border-red-500' : 'border-[#e0e0e0] focus:border-[#ff8c00]'} dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]`} />
              </div>
              {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">Language</label>
            <select value={formData.language} onChange={e => setFormData(p => ({...p, language: e.target.value}))}
              className="w-full rounded-lg border border-[#e0e0e0] px-4 py-2 text-sm outline-none focus:border-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]">
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={formData.isPublished} onChange={e => setFormData(p => ({...p, isPublished: e.target.checked}))} className="h-4 w-4 rounded accent-[#ff8c00]" />
              <span className="text-sm font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">Publish immediately</span>
            </label>
            <div className="rounded-lg bg-[#ff8c00]/10 p-2">
              {formData.isPublished ? <Eye className="h-4 w-4 text-[#ff8c00]" /> : <EyeOff className="h-4 w-4 text-[#666666] dark:text-[#94a3b8]" />}
            </div>
          </div>
        </div>

        {/* Descriptions Section */}
        <div className="rounded-xl border border-[#e0e0e0] p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <h2 className="mb-4 text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Descriptions</h2>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">Short Description *</label>
            <textarea value={formData.description} onChange={e => setFormData(p => ({...p, description: e.target.value}))} placeholder="Brief description for course listings..."
              rows={3} className={`w-full rounded-lg border px-4 py-2 text-sm resize-none ${errors.description ? 'border-red-500' : 'border-[#e0e0e0] focus:border-[#ff8c00]'} dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]`} />
            {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description}</p>}
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">Long Description *</label>
            <textarea value={formData.longDescription} onChange={e => setFormData(p => ({...p, longDescription: e.target.value}))} placeholder="Detailed course description..."
              rows={6} className={`w-full rounded-lg border px-4 py-2 text-sm resize-none ${errors.longDescription ? 'border-red-500' : 'border-[#e0e0e0] focus:border-[#ff8c00]'} dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]`} />
            {errors.longDescription && <p className="mt-1 text-xs text-red-500">{errors.longDescription}</p>}
          </div>
        </div>

        {/* Thumbnail Section */}
        <div className="rounded-xl border border-[#e0e0e0] p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <h2 className="mb-4 text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Course Thumbnail</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="relative h-48 w-64 overflow-hidden rounded-xl border border-[#e0e0e0] dark:border-[#1f1f1f]">
                <Image src={thumbnailPreview} alt="Preview" fill className="object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <p className="mb-4 text-sm text-[#666666] dark:text-[#94a3b8]">Upload thumbnail (1280x720 recommended, max 5MB)</p>
              <label className="cursor-pointer">
                <input type="file" accept="image/*" onChange={handleThumbnailUpload} className="hidden" />
                <div className="inline-flex items-center gap-2 rounded-lg border border-[#ff8c00] bg-[#ff8c00]/10 px-4 py-2 text-sm font-medium text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white">
                  <Upload className="h-4 w-4" /> Upload Thumbnail
                </div>
              </label>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-[#1a1a1a] dark:text-[#f1f5f9]">Preview Video URL</label>
                <input type="url" value={formData.previewVideoUrl} onChange={e => setFormData(p => ({...p, previewVideoUrl: e.target.value}))} placeholder="https://example.com/video.mp4"
                  className="w-full rounded-lg border border-[#e0e0e0] px-4 py-2 text-sm focus:border-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]" />
              </div>
            </div>
          </div>
        </div>

        {/* Curriculum Section */}
        <div className="rounded-xl border border-[#e0e0e0] p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Course Curriculum</h2>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <span className="text-sm text-[#666666] dark:text-[#94a3b8]">{totalLessons} lessons</span>
              <button type="button" onClick={addSection} className="inline-flex items-center gap-1 rounded-lg border border-[#ff8c00] px-3 py-1.5 text-xs font-medium text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white">
                <Plus className="h-3.5 w-3.5" /> Add Module
              </button>
            </div>
          </div>
          {errors.curriculum && <p className="mb-4 text-xs text-red-500">{errors.curriculum}</p>}
          
          <div className="space-y-4">
            {formData.curriculum.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#999] p-8 text-center dark:border-[#64748b]">
                <BookOpen className="mx-auto h-8 w-8 text-[#999] dark:text-[#64748b]" />
                <p className="mt-2 text-sm text-[#666666] dark:text-[#94a3b8]">No modules yet. Click "Add Module" to start.</p>
                <button type="button" onClick={addSection} className="mt-4 inline-flex items-center gap-1 rounded-lg border border-[#ff8c00] px-4 py-2 text-sm text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white">
                  <Plus className="h-4 w-4" /> Add Module
                </button>
              </div>
            ) : formData.curriculum.map((s, si) => (
              <div key={s.id} className="rounded-lg border border-[#e0e0e0] overflow-hidden dark:border-[#1f1f1f] dark:bg-[#0a0a0a]">
                <div className="flex items-center gap-3 p-4">
                  <button type="button" onClick={() => toggleSection(s.id)} className="flex-shrink-0 p-1">
                    {expandedSections.has(s.id) ? <ChevronUp className="h-4 w-4 text-[#ff8c00]" /> : <ChevronDown className="h-4 w-4 text-[#ff8c00]" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[#ff8c00]" />
                      <input type="text" value={s.title} onChange={e => updateSectionTitle(s.id, e.target.value)} placeholder={`Module ${si + 1}`}
                        className={`w-full bg-transparent px-2 py-1 text-sm font-medium outline-none ${errors[`section_${si}`] ? 'text-red-500' : 'text-[#1a1a1a] dark:text-[#f1f5f9]'}`} />
                    </div>
                    {errors[`section_${si}`] && <p className="mt-1 text-xs text-red-500">{errors[`section_${si}`]}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#666666] dark:text-[#94a3b8]">{s.lessons.length} lessons</span>
                    <button type="button" onClick={() => moveSection(s.id, 'up')} disabled={si === 0} className="p-1 disabled:opacity-40">
                      <ChevronUp className="h-3.5 w-3.5 text-[#666666] dark:text-[#94a3b8]" />
                    </button>
                    <button type="button" onClick={() => moveSection(s.id, 'down')} disabled={si === formData.curriculum.length - 1} className="p-1 disabled:opacity-40">
                      <ChevronDown className="h-3.5 w-3.5 text-[#666666] dark:text-[#94a3b8]" />
                    </button>
                    {formData.curriculum.length > 1 && (
                      <button type="button" onClick={() => removeSection(s.id)} className="p-1">
                        <X className="h-3.5 w-3.5 text-red-500" />
                      </button>
                    )}
                  </div>
                </div>
                {expandedSections.has(s.id) && (
                  <div className="border-t border-[#e0e0e0] dark:border-[#1f1f1f]">
                    {errors[`section_${si}_lessons`] && <p className="px-4 py-2 text-xs text-red-500">{errors[`section_${si}_lessons`]}</p>}
                    <div className="divide-y divide-[#e0e0e0] dark:divide-[#1f1f1f]">
                      {s.lessons.map((l, li) => (
                        <div key={l.id} className="flex items-center gap-3 p-3">
                          <div className="flex-shrink-0 text-xs text-[#666666] dark:text-[#94a3b8] w-8">{li + 1}.</div>
                          <div className="flex-1">
                            <input type="text" value={l.title} onChange={e => updateLesson(s.id, l.id, 'title', e.target.value)} placeholder="Lesson title"
                              className={`w-full bg-transparent px-2 py-1 text-sm outline-none ${errors[`section_${si}_lesson_${li}`] ? 'text-red-500' : 'text-[#1a1a1a] dark:text-[#f1f5f9]'}`} />
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-2">
                            <input type="text" value={l.duration} onChange={e => updateLesson(s.id, l.id, 'duration', e.target.value)} className="w-16 text-xs bg-transparent text-center outline-none" />
                            <label className="flex items-center gap-1 cursor-pointer">
                              <input type="checkbox" checked={l.preview} onChange={e => updateLesson(s.id, l.id, 'preview', e.target.checked)} className="h-3.5 w-3.5 rounded accent-[#ff8c00]" />
                              <span className="text-xs text-[#666666] dark:text-[#94a3b8]">Preview</span>
                            </label>
                            <button type="button" onClick={() => moveLesson(s.id, l.id, 'up')} disabled={li === 0} className="p-1 disabled:opacity-40">
                              <ChevronUp className="h-3 w-3 text-[#666666] dark:text-[#94a3b8]" />
                            </button>
                            <button type="button" onClick={() => moveLesson(s.id, l.id, 'down')} disabled={li === s.lessons.length - 1} className="p-1 disabled:opacity-40">
                              <ChevronDown className="h-3 w-3 text-[#666666] dark:text-[#94a3b8]" />
                            </button>
                            <button type="button" onClick={() => removeLesson(s.id, l.id)} className="p-1">
                              <X className="h-3 w-3 text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-[#e0e0e0] dark:border-[#1f1f1f]">
                      <button type="button" onClick={() => addLesson(s.id)} className="w-full flex items-center justify-center gap-2 rounded-lg border border-dashed border-[#999] py-2 text-xs text-[#666666] hover:border-[#ff8c00] hover:text-[#ff8c00] dark:border-[#64748b]">
                        <Plus className="h-3.5 w-3.5" /> Add Lesson
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes Section */}
        <div className="rounded-xl border border-[#e0e0e0] p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">What Students Will Learn</h2>
            <button type="button" onClick={addOutcome} className="inline-flex items-center gap-1 rounded-lg border border-[#ff8c00] px-3 py-1.5 text-xs font-medium text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white mt-2 md:mt-0">
              <Plus className="h-3.5 w-3.5" /> Add Outcome
            </button>
          </div>
          {errors.outcomes && <p className="mb-4 text-xs text-red-500">{errors.outcomes}</p>}
          <div className="space-y-3">
            {formData.outcomes.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#999] p-4 text-center dark:border-[#64748b]">
                <CheckCircle2 className="mx-auto h-6 w-6 text-[#999] dark:text-[#64748b]" />
                <p className="mt-2 text-xs text-[#666666] dark:text-[#94a3b8]">No outcomes yet. Add learning objectives.</p>
              </div>
            ) : formData.outcomes.map((o, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#ff8c00]" />
                <input type="text" value={o} onChange={e => updateOutcome(i, e.target.value)} placeholder="Learning outcome..."
                  className={`flex-1 rounded-lg border px-3 py-2 text-sm ${errors[`outcome_${i}`] ? 'border-red-500' : 'border-[#e0e0e0] focus:border-[#ff8c00]'} dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]`} />
                {errors[`outcome_${i}`] && <p className="text-xs text-red-500">{errors[`outcome_${i}`]}</p>}
                <button type="button" onClick={() => removeOutcome(i)} className="p-1.5"><X className="h-3.5 w-3.5 text-red-500" /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div className="rounded-xl border border-[#e0e0e0] p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Target Audience</h2>
            <button type="button" onClick={addTargetAudience} className="inline-flex items-center gap-1 rounded-lg border border-[#ff8c00] px-3 py-1.5 text-xs font-medium text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white mt-2 md:mt-0">
              <Plus className="h-3.5 w-3.5" /> Add Audience
            </button>
          </div>
          <div className="space-y-3">
            {formData.targetAudience.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#999] p-4 text-center dark:border-[#64748b]">
                <Users className="mx-auto h-6 w-6 text-[#999] dark:text-[#64748b]" />
                <p className="mt-2 text-xs text-[#666666] dark:text-[#94a3b8]">No audience defined. Who is this for?</p>
              </div>
            ) : formData.targetAudience.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <Users className="h-4 w-4 flex-shrink-0 text-[#ff8c00]" />
                <input type="text" value={a} onChange={e => updateTargetAudience(i, e.target.value)} placeholder="Audience group..."
                  className="flex-1 rounded-lg border border-[#e0e0e0] px-3 py-2 text-sm focus:border-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#0a0a0a] dark:text-[#f1f5f9]" />
                <button type="button" onClick={() => removeTargetAudience(i)} className="p-1.5"><X className="h-3.5 w-3.5 text-red-500" /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="rounded-xl border border-[#e0e0e0] p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Tags</h2>
            <button type="button" onClick={addTag} className="inline-flex items-center gap-1 rounded-lg border border-[#ff8c00] px-3 py-1.5 text-xs font-medium text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white mt-2 md:mt-0">
              <Plus className="h-3.5 w-3.5" /> Add Tag
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[#999] p-4 text-center dark:border-[#64748b] w-full">
                <Tag className="mx-auto h-6 w-6 text-[#999] dark:text-[#64748b]" />
                <p className="mt-2 text-xs text-[#666666] dark:text-[#94a3b8]">No tags yet. Add keywords.</p>
              </div>
            ) : formData.tags.map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 rounded-lg border border-[#e0e0e0] bg-white px-2.5 py-1 dark:border-[#1f1f1f] dark:bg-[#0a0a0a]">
                <Tag className="h-3.5 w-3.5 text-[#ff8c00]" />
                <input type="text" value={t} onChange={e => updateTag(i, e.target.value)} placeholder="Tag" className="bg-transparent text-sm outline-none w-20" />
                <button type="button" onClick={() => removeTag(i)} className="p-0.5"><X className="h-3 w-3 text-red-500" /></button>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="rounded-xl border border-[#e0e0e0] p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <h2 className="mb-4 text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">Course Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {FEATURES.map(f => (
              <label key={f} className="flex items-center gap-2 rounded-lg border border-[#e0e0e0] p-3 cursor-pointer hover:border-[#ff8c00] dark:border-[#1f1f1f] dark:bg-[#0a0a0a]">
                <input type="checkbox" checked={formData.features.includes(f)} onChange={() => toggleFeature(f)} className="h-4 w-4 rounded accent-[#ff8c00]" />
                <span className="text-sm text-[#1a1a1a] dark:text-[#f1f5f9]">{f}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-[#e0e0e0] p-4 dark:bg-[#0a0a0a]/90 dark:border-[#1f1f1f]">
          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={handleReset} disabled={isSubmitting} className="flex items-center gap-2 rounded-lg border border-[#999] px-4 py-2 text-sm text-[#666666] hover:border-red-500 hover:text-red-500 disabled:opacity-40">
              <X className="h-4 w-4" /> Reset
            </button>
            <button type="button" onClick={handleSaveDraft} disabled={isSubmitting} className="flex items-center gap-2 rounded-lg border border-[#ff8c00] px-4 py-2 text-sm font-medium text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white disabled:opacity-40">
              <Save className="h-4 w-4" /> Save Draft
            </button>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-[#ff8c00]/20 hover:shadow-xl hover:shadow-[#ff8c00]/30 disabled:opacity-70">
              {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating...</> : <><Save className="h-4 w-4" /> Publish Course</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
