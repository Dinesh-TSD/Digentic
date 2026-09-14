import { PageHeader } from '@/components/shared/PageHeader';
import { Upload } from 'lucide-react';

export default function AdminNewAssetPage() {
  return (
    <>
      <PageHeader title="New asset" subtitle="Upload a digital asset" role="admin" />

      <div className="p-4 space-y-4">
        {/* Asset name */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Asset name
          </label>
          <input
            type="text"
            placeholder="Enter asset name..."
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
          />
        </div>

        {/* File upload */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            File
          </label>
          <div
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-colors hover:border-[#ff8c00]"
            style={{ borderColor: 'var(--dt-border)' }}
          >
            <Upload className="mb-2 h-10 w-10" style={{ color: 'var(--dt-muted)' }} />
            <span className="text-[14px]" style={{ color: 'var(--dt-muted)' }}>
              Drag & drop or click to upload
            </span>
            <span className="mt-1 text-[12px]" style={{ color: 'var(--dt-muted)' }}>
              PNG, JPG, SVG, PDF up to 50MB
            </span>
          </div>
        </div>

        {/* Alt text */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Alt text
          </label>
          <input
            type="text"
            placeholder="Describe the asset..."
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
            Category
          </label>
          <select
            className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
            style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
          >
            <option value="">Select category</option>
            <option value="Image">Image</option>
            <option value="Template">Template</option>
            <option value="Document">Document</option>
            <option value="Code">Code</option>
          </select>
        </div>

        {/* Actions */}
        <div className="pt-2">
          <button
            className="rounded-lg px-4 py-2 text-[14px] font-semibold"
            style={{ background: 'linear-gradient(135deg, #ff8c00, #ff6b35)', color: '#0a0a0a' }}
          >
            Upload asset
          </button>
        </div>
      </div>
    </>
  );
}
