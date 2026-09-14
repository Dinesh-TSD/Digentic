'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/shared/PageHeader';
import { Upload, X, Loader2, CheckCircle2, CircleAlert } from 'lucide-react';
import { TagPill } from '@/components/shared/TagPill';

const CATEGORIES = ['Full Stack', 'AI & ML', 'Frontend', 'Backend', 'Open Source'];
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const URL_PATTERN = /^https?:\/\/\S+$/i;

export default function AdminNewProjectPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Full Stack');
  const [featured, setFeatured] = useState(false);
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputStyle = {
    background: 'var(--dt-surface)',
    borderColor: 'var(--dt-border)',
    color: 'var(--dt-text)',
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const clearFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setError('');

    if (!selected) return;

    if (!ALLOWED_IMAGE_TYPES.includes(selected.type)) {
      setError('Cover image must be a JPEG, PNG, WebP, or GIF file.');
      return;
    }

    if (selected.size > MAX_IMAGE_SIZE_BYTES) {
      setError('Cover image must be smaller than 5MB.');
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const resetForm = () => {
    clearFile();
    setTitle('');
    setDescription('');
    setCategory('Full Stack');
    setFeatured(false);
    setLiveUrl('');
    setGithubUrl('');
    setTags([]);
    setTagInput('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // ── Client-side validation ──
    if (title.trim().length < 3) {
      setError('Project title must be at least 3 characters.');
      return;
    }

    if (description.trim().length < 10) {
      setError('Description must be at least 10 characters.');
      return;
    }

    if (tags.length === 0) {
      setError('Add at least one tech stack tag.');
      return;
    }

    if (liveUrl.trim() && !URL_PATTERN.test(liveUrl.trim())) {
      setError('Live URL must start with http:// or https://');
      return;
    }

    if (githubUrl.trim() && !URL_PATTERN.test(githubUrl.trim())) {
      setError('GitHub URL must start with http:// or https://');
      return;
    }

    // ── Build multipart form data ──
    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('category', category);
    formData.append('featured', String(featured));
    formData.append('liveUrl', liveUrl.trim());
    formData.append('githubUrl', githubUrl.trim());
    tags.forEach((tag) => formData.append('tech', tag));
    if (file) formData.append('coverImage', file);

    setSaving(true);

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || 'Failed to create project. Please try again.');
        return;
      }

      setSuccess(
        `"${data?.project?.title || title.trim()}" was saved successfully and is now live on the Projects page.`
      );
      resetForm();
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <PageHeader title="New project" subtitle="Add a portfolio project" role="admin" />

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Feedback banners */}
        {error && (
          <div
            className="flex items-start gap-2 rounded-lg border px-3 py-2 text-[13px]"
            style={{
              borderColor: 'rgba(239,68,68,0.4)',
              background: 'rgba(239,68,68,0.08)',
              color: '#ef4444',
            }}
          >
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div
            className="flex items-start gap-2 rounded-lg border px-3 py-2 text-[13px]"
            style={{
              borderColor: 'rgba(34,197,94,0.4)',
              background: 'rgba(34,197,94,0.08)',
              color: '#22c55e',
            }}
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Project title */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Project title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title..."
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
            style={inputStyle}
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the project..."
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00] resize-none"
            style={inputStyle}
          />
        </div>

        {/* Category + Featured */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
              style={inputStyle}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end pb-1">
            <label
              className="flex cursor-pointer items-center gap-2 text-[14px]"
              style={{ color: 'var(--dt-text)' }}
            >
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 accent-[#ff8c00]"
              />
              Feature this project
            </label>
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Tech stack
          </label>
          <div
            className="flex flex-wrap items-center gap-1.5 rounded-lg border px-3 py-2"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
          >
            {tags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1">
                <TagPill label={tag} />
                <button type="button" onClick={() => removeTag(tag)}>
                  <X className="h-3 w-3" style={{ color: 'var(--dt-muted)' }} />
                </button>
              </span>
            ))}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              placeholder="Add tech..."
              className="flex-1 min-w-[80px] bg-transparent text-[14px] outline-none"
              style={{ color: 'var(--dt-text)' }}
            />
          </div>
        </div>

        {/* URLs */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
              Live URL
            </label>
            <input
              type="url"
              value={liveUrl}
              onChange={(e) => setLiveUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
              GitHub URL
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Cover image */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Cover image
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />

          {file && previewUrl ? (
            <div
              className="relative overflow-hidden rounded-lg border"
              style={{ borderColor: 'var(--dt-border)' }}
            >
              <div className="relative h-44 w-full">
                <Image
                  src={previewUrl}
                  alt="Cover preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="absolute right-2 top-2 rounded-lg p-1.5"
                style={{ background: 'rgba(0,0,0,0.55)', color: '#fff' }}
                aria-label="Remove cover image"
              >
                <X className="h-4 w-4" />
              </button>
              <div
                className="flex items-center justify-between gap-3 px-3 py-2 text-[12px]"
                style={{ background: 'var(--dt-surface)', color: 'var(--dt-muted)' }}
              >
                <span className="truncate">{file.name}</span>
                <span className="shrink-0">{(file.size / 1024).toFixed(0)} KB</span>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors hover:border-[#ff8c00]"
              style={{ borderColor: 'var(--dt-border)' }}
            >
              <Upload className="mb-2 h-8 w-8" style={{ color: 'var(--dt-muted)' }} />
              <span className="text-[14px]" style={{ color: 'var(--dt-muted)' }}>
                Click to upload cover image
              </span>
              <span className="mt-1 text-[12px]" style={{ color: 'var(--dt-muted)' }}>
                PNG, JPG, WebP or GIF up to 5MB
              </span>
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[14px] font-semibold disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #ff8c00, #ff6b35)',
              color: '#0a0a0a',
            }}
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save project'
            )}
          </button>
        </div>
      </form>
    </>
  );
}
