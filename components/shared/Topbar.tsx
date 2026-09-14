'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Search, Bell, Settings, LogOut, ChevronDown, Sun, Moon } from 'lucide-react';

interface TopbarProps {
  role: 'admin' | 'user';
  userName?: string;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export function Topbar({ role, userName = 'DT', theme = 'dark', onToggleTheme }: TopbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    setMenuOpen(false);
    await signOut({ callbackUrl: '/auth/login' });
  };

  return (
    <div
      className="flex h-16 shrink-0 items-center justify-between border-b px-6"
      style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
    >
      {/* Left — Brand (click to go home) */}
      <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-85">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-[10px] text-[18px] font-bold"
          style={{ background: '#ff8c00', color: '#0a0a0a' }}
        >
          DT
        </div>
        <div className="flex flex-col">
          <span className="text-[18px] font-semibold leading-tight" style={{ color: 'var(--dt-text)' }}>
            Digentic Tech
          </span>
          <span className="text-[13px] leading-tight" style={{ color: 'var(--dt-muted)' }}>
            {role === 'admin' ? 'Admin panel' : 'My dashboard'}
          </span>
        </div>
      </Link>

      {/* Right — Actions */}
      <div className="flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-[var(--dt-hover)] hover:text-[#ff8c00]"
          style={{ color: 'var(--dt-muted)' }}
        >
          {theme === 'dark' ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </button>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-[var(--dt-hover)] hover:text-[#ff8c00]"
          style={{ color: 'var(--dt-muted)' }}
        >
          <Search className="h-[18px] w-[18px]" />
        </button>

        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-[var(--dt-hover)] hover:text-[#ff8c00]"
          style={{ color: 'var(--dt-muted)' }}
        >
          <Bell className="h-[18px] w-[18px]" />
          {/* Notification dot */}
          <span
            className="absolute right-2 top-2 h-2 w-2 rounded-full border-[1.5px]"
            style={{ background: '#ff5733', borderColor: 'var(--dt-surface)' }}
          />
        </button>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-[var(--dt-hover)] hover:text-[#ff8c00]"
          style={{ color: 'var(--dt-muted)' }}
        >
          <Settings className="h-[18px] w-[18px]" />
        </button>

        {/* Profile dropdown */}
        <div ref={menuRef} className="relative ml-1">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-full transition-opacity hover:opacity-80"
          >
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-semibold"
              style={{
                background: 'rgba(255,140,0,0.20)',
                border: '1.5px solid #ff8c00',
                color: '#ff8c00',
              }}
            >
              {initials}
            </div>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
              style={{ color: 'var(--dt-muted)' }}
            />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-11 w-52 overflow-hidden rounded-lg border shadow-xl"
              style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)', zIndex: 100 }}
            >
              {/* User info */}
              <div className="border-b px-4 py-3" style={{ borderColor: 'var(--dt-border)' }}>
                <p className="text-[15px] font-medium" style={{ color: 'var(--dt-text)' }}>
                  {userName}
                </p>
                <p className="mt-0.5 text-[13px]" style={{ color: 'var(--dt-muted)' }}>
                  {role === 'admin' ? 'Administrator' : 'Member'}
                </p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <Link
                  href={role === 'admin' ? '/admin/settings' : '/dashboard/profile'}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-[15px] transition-colors hover:bg-[var(--dt-hover)]"
                  style={{ color: 'var(--dt-text)' }}
                >
                  <Settings className="h-4 w-4" style={{ color: 'var(--dt-muted)' }} />
                  <span>Settings</span>
                </Link>

                <div className="mx-2 my-1 h-px" style={{ background: 'var(--dt-border)' }} />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-[15px] transition-colors hover:bg-[var(--dt-hover)]"
                  style={{ color: '#ff5733' }}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
