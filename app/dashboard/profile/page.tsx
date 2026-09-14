'use client';

import { PageHeader } from '@/components/shared/PageHeader';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function UserProfilePage() {
  return (
    <>
      <PageHeader title="Profile" role="user" />

      <div className="flex justify-center p-4">
        <div
          className="w-full max-w-[480px] rounded-xl border p-6"
          style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
        >
          {/* Avatar */}
          <div className="mb-4 flex flex-col items-center">
            <div
              className="mb-3 flex h-16 w-16 items-center justify-center rounded-full text-[24px] font-semibold"
              style={{
                background: 'rgba(255,140,0,0.20)',
                border: '2px solid #ff8c00',
                color: '#ff8c00',
              }}
            >
              DT
            </div>
            <h2 className="text-[18px] font-semibold" style={{ color: 'var(--dt-text)' }}>
              Dinesh T
            </h2>
            <p className="text-[14px]" style={{ color: 'var(--dt-muted)' }}>
              dinesh@digentic.com
            </p>
          </div>

          {/* Bio */}
          <div className="mb-3">
            <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
              Bio
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about yourself..."
              defaultValue="AI Engineer & MERN Developer. Building Digentic Tech."
              className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00] resize-none"
              style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
            />
          </div>

          {/* Social links */}
          <div className="space-y-3">
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--dt-muted)' }}>
                <Github className="h-3 w-3" style={{ color: '#ff8c00' }} /> GitHub
              </label>
              <input
                type="url"
                placeholder="https://github.com/..."
                className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
                style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
              />
            </div>
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--dt-muted)' }}>
                <Twitter className="h-3 w-3" style={{ color: '#ff8c00' }} /> Twitter
              </label>
              <input
                type="url"
                placeholder="https://twitter.com/..."
                className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
                style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
              />
            </div>
            <div>
              <label className="mb-1 flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--dt-muted)' }}>
                <Linkedin className="h-3 w-3" style={{ color: '#ff8c00' }} /> LinkedIn
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/..."
                className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
                style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
              />
            </div>
          </div>

          {/* Save */}
          <div className="mt-4">
            <button
              className="rounded-lg px-4 py-2 text-[14px] font-semibold"
              style={{ background: 'linear-gradient(135deg, #ff8c00, #ff6b35)', color: '#0a0a0a' }}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
