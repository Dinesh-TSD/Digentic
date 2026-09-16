'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  Upload as UploadIcon,
  Copy,
  Check,
  Trash2,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface UploadItem {
  id: string;
  filename: string;
  contentType: string;
  size: number;
  url: string;
  createdAt?: string;
}

export default function AdminMediaPage() {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchUploads = () => {
    setLoading(true);
    fetch('/api/uploads')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.uploads)) {
          setUploads(data.uploads);
        }
      })
      .catch((err) => console.error('Failed to fetch media:', err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload image.');

      setSuccessMsg('Image uploaded successfully!');
      fetchUploads();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Something went wrong.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleCopyUrl = (id: string, url: string) => {
    const fullUrl = window.location.origin + url;
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    try {
      const res = await fetch(`/api/uploads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setUploads((prev) => prev.filter((u) => u.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete media:', err);
    }
  };

  return (
    <>
      <PageHeader
        title="Media Library"
        subtitle="Upload and manage featured images and media assets"
        role="admin"
      />

      <div className="p-4 sm:p-6 max-w-7xl space-y-6">
        {/* Alerts */}
        {errorMsg && (
          <div className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-500">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-500">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Upload Dropzone */}
        <div className="rounded-2xl border-2 border-dashed border-border bg-card p-8 text-center hover:border-[#ff8c00] transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <UploadIcon className="mx-auto h-10 w-10 text-[#ff8c00] mb-3" />
          <h3 className="text-sm font-bold text-foreground">Upload Media Asset</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            JPEG, PNG, WebP, GIF up to 5MB
          </p>
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-5 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:scale-105 transition-transform disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Uploading...</span>
              </>
            ) : (
              <>
                <UploadIcon className="h-4 w-4" />
                <span>Choose Image</span>
              </>
            )}
          </button>
        </div>

        {/* Gallery Grid */}
        <div>
          <h3 className="text-sm font-bold text-foreground mb-4">
            Uploaded Files ({uploads.length})
          </h3>

          {loading ? (
            <div className="py-12 text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-[#ff8c00]" />
              <span>Loading media library...</span>
            </div>
          ) : uploads.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center text-xs text-muted-foreground">
              <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
              No images uploaded yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {uploads.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:border-[#ff8c00]/50 transition-all flex flex-col justify-between"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={item.url}
                      alt={item.filename}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="p-3">
                    <p className="text-xs font-semibold text-foreground truncate" title={item.filename}>
                      {item.filename}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {(item.size / 1024).toFixed(1)} KB
                    </p>

                    <div className="mt-2.5 flex items-center justify-between border-t border-border pt-2">
                      <button
                        type="button"
                        onClick={() => handleCopyUrl(item.id, item.url)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#ff8c00] hover:underline"
                        title="Copy Image URL"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Copy URL</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-muted-foreground hover:text-red-500 p-0.5"
                        title="Delete Image"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
