'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';

const tabs = ['Account', 'Notifications', 'Password', 'Appearance'] as const;

export default function UserSettingsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Account');

  return (
    <>
      <PageHeader title="Settings" role="user" />

      <div className="p-4">
        {/* Tabs */}
        <div className="mb-4 flex gap-4 border-b" style={{ borderColor: 'var(--dt-border)' }}>
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="pb-2 text-[14px] font-medium transition-colors"
                style={{
                  color: isActive ? '#ff8c00' : 'var(--dt-muted)',
                  borderBottom: isActive ? '2px solid #ff8c00' : '2px solid transparent',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Account Tab */}
        {activeTab === 'Account' && (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>Name</label>
              <input type="text" defaultValue="Dinesh T"
                className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
                style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }} />
            </div>
            <div>
              <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>Email</label>
              <input type="email" defaultValue="dinesh@digentic.com"
                className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
                style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }} />
            </div>
            <div>
              <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>Username</label>
              <input type="text" defaultValue="dinesht"
                className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
                style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }} />
            </div>
            <button className="rounded-lg px-4 py-2 text-[14px] font-semibold"
              style={{ background: 'linear-gradient(135deg, #ff8c00, #ff6b35)', color: '#0a0a0a' }}>
              Save
            </button>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'Notifications' && (
          <div className="space-y-1">
            {[
              { label: 'Email notifications', desc: 'Receive email updates about your courses', on: true },
              { label: 'New post alerts', desc: 'Get notified when new blog posts are published', on: true },
              { label: 'Course updates', desc: 'Notifications about course content changes', on: false },
              { label: 'Marketing emails', desc: 'Promotional offers and announcements', on: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-[10px] border px-[14px] py-[11px] mb-1"
                style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}>
                <div>
                  <span className="text-[14px] font-medium" style={{ color: 'var(--dt-text)' }}>{item.label}</span>
                  <p className="text-[12px]" style={{ color: 'var(--dt-muted)' }}>{item.desc}</p>
                </div>
                <button
                  className="h-5 w-9 rounded-full p-0.5 transition-colors"
                  style={{ background: item.on ? '#ff8c00' : 'var(--dt-border)' }}
                >
                  <div
                    className="h-4 w-4 rounded-full bg-white transition-transform"
                    style={{ transform: item.on ? 'translateX(16px)' : 'translateX(0)' }}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'Password' && (
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>Current password</label>
              <input type="password" placeholder="••••••••"
                className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
                style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }} />
            </div>
            <div>
              <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>New password</label>
              <input type="password" placeholder="••••••••"
                className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
                style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }} />
            </div>
            <div>
              <label className="mb-1 block text-[13px]" style={{ color: 'var(--dt-muted)' }}>Confirm new password</label>
              <input type="password" placeholder="••••••••"
                className="w-full rounded-lg border px-3 py-2 text-[14px] outline-none transition-colors focus:border-[#ff8c00]"
                style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', color: 'var(--dt-text)' }} />
            </div>
            <button className="rounded-lg px-4 py-2 text-[14px] font-semibold"
              style={{ background: 'linear-gradient(135deg, #ff8c00, #ff6b35)', color: '#0a0a0a' }}>
              Update password
            </button>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === 'Appearance' && (
          <div className="space-y-3">
            <label className="block text-[13px]" style={{ color: 'var(--dt-muted)' }}>Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {['Dark', 'Light', 'System'].map((theme) => {
                const isSelected = theme === 'Dark';
                return (
                  <button
                    key={theme}
                    className="rounded-[10px] border p-4 text-center text-[14px] font-medium transition-colors"
                    style={
                      isSelected
                        ? { borderColor: '#ff8c00', background: 'rgba(255,140,0,0.10)', color: '#ff8c00' }
                        : { borderColor: 'var(--dt-border)', background: 'var(--dt-surface)', color: 'var(--dt-muted)' }
                    }
                  >
                    {theme}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
