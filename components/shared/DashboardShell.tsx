'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Topbar } from '@/components/shared/Topbar';

interface DashboardShellProps {
  role: 'admin' | 'user';
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function DashboardShell({ role, sidebar, children }: DashboardShellProps) {
  const { data: session } = useSession();
  const userName = session?.user?.name || 'DT';

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('dt-dashboard-theme');
    if (saved === 'light' || saved === 'dark') setTheme(saved);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('dt-dashboard-theme', next);
      return next;
    });
  }, []);

  return (
    <div
      className="dt-shell fixed inset-0 z-50 flex flex-col"
      data-dt-theme={theme}
      style={{ background: 'var(--dt-bg)', color: 'var(--dt-text)' }}
    >
      <Topbar role={role} userName={userName} theme={theme} onToggleTheme={toggleTheme} />
      <div className="flex flex-1 overflow-hidden">
        {sidebar}
        <main className="flex-1 overflow-y-auto" style={{ background: 'var(--dt-bg)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
