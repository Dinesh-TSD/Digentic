'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { AlertTriangle } from 'lucide-react';

const navItems = ['General', 'SEO defaults', 'Theme', 'Admin account', 'Danger zone'];

export default function AdminSettingsPage() {
  const [activeNav, setActiveNav] = useState('General');

  return (
    <>
      <PageHeader title="Settings" role="admin" />

      <div className="flex h-[calc(100vh-48px-41px)]">
        {/* Left nav */}
        <div className="w-44 shrink-0 overflow-y-auto border-r p-2" style={{ borderColor: 'var(--dt-border)' }}>
          {navItems.map((item) => {
            const isActive = item === activeNav;
            return (
              <button
                key={item}
                onClick={() => setActiveNav(item)}
                className="mb-px w-full rounded-lg px-2.5 py-[7px] text-left text-[14px] transition-colors"
                style={
                  isActive
                    ? {
                        background: 'rgba(255,140,0,0.10)',
                        borderLeft: '3px solid #ff8c00',
                        borderRadius: '0 8px 8px 0',
                        paddingLeft: '7px',
                        color: '#ff8c00',
                      }
                    : { background: 'transparent', color: 'var(--dt-muted)' }
                }
              >
                {item}
              </button>
            );
          })}
        </div>

        {/* Right panel */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeNav === 'Danger zone' ? (
            <div>
              <h2 className="mb-3 border-b pb-2 text-[15px] font-semibold" style={{ color: 'var(--dt-text)', borderColor: 'var(--dt-border)' }}>
                Danger zone
              </h2>
              <div
                className="rounded-[10px] border p-4"
                style={{ borderColor: '#ff5733' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4" style={{ color: '#ff5733' }} />
                  <span className="text-[14px] font-semibold" style={{ color: 'var(--dt-text)' }}>
                    Delete site content
                  </span>
                </div>
                <p className="mb-3 text-[13px]" style={{ color: 'var(--dt-muted)' }}>
                  This will permanently delete all posts, courses, and assets. This action cannot be undone.
                </p>
                <button
                  className="rounded-lg px-4 py-2 text-[14px] font-semibold text-white"
                  style={{ background: '#ff5733' }}
                >
                  Delete site
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="mb-3 border-b pb-2 text-[15px] font-semibold" style={{ color: 'var(--dt-text)', borderColor: 'var(--dt-border)' }}>
                {activeNav}
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
                    {activeNav === 'General' ? 'Site name' : activeNav === 'SEO defaults' ? 'Default meta title' : activeNav === 'Admin account' ? 'Display name' : 'Setting'}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter value..."
                    className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
                    style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>
                    {activeNav === 'General' ? 'Site description' : activeNav === 'SEO defaults' ? 'Default meta description' : activeNav === 'Admin account' ? 'Email' : 'Description'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter value..."
                    className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00] resize-none"
                    style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }}
                  />
                </div>
                <button
                  className="rounded-lg px-4 py-2 text-[14px] font-semibold"
                  style={{ background: 'linear-gradient(135deg, #ff8c00, #ff6b35)', color: '#0a0a0a' }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
