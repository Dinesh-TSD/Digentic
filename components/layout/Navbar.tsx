'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { ThemeToggle } from './ThemeToggle';
import { cn } from '@/lib/utils';

const NAVBAR_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Courses', href: '/courses' },
  { label: 'Digital Products', href: '/digital' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    setMobileOpen(false);
    setUserDropdownOpen(false);
  }, [pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const user = session?.user;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        'border-b border-[#bfdbfe] bg-[rgba(255,255,255,0.9)] backdrop-blur-[14px] dark:border-[#38bdf8]/20 dark:bg-[rgba(2,8,23,0.88)]'
      )}
    >
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 lg:px-16">
        {/* Logo */}
        <Link href="/" className="shrink-0 text-xl font-bold tracking-tight text-[#0f172a] dark:text-[#f8fafc]">
          DINESH<span className="text-[#38bdf8]">.DEV</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAVBAR_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-[#22d3ee]'
                    : 'text-[#334155] hover:text-[#2563eb] dark:text-[#cbd5e1] dark:hover:text-[#38bdf8]'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#22d3ee] via-[#38bdf8] to-[#2563eb]"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-[#bfdbfe] bg-white/80 p-1 pr-3 text-sm font-medium text-[#0f172a] transition-colors hover:border-[#22d3ee] dark:border-[#38bdf8]/30 dark:bg-[#031225]/70 dark:text-[#f8fafc]"
                aria-label="User menu"
              >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-[#22d3ee] via-[#38bdf8] to-[#2563eb] text-xs font-bold text-[#00111f]">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'
                  )}
                </div>
                <span className="hidden max-w-[100px] truncate text-xs font-semibold sm:inline-block">
                  {user.name || user.email?.split('@')[0]}
                </span>
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl border border-[#e0e0e0] dark:border-[#262626] bg-white dark:bg-[#141414] p-2 shadow-xl z-50"
                  >
                    <div className="px-3 py-2 border-b border-[#e0e0e0] dark:border-[#262626] mb-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {user.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-[#22d3ee]/10 hover:text-[#0ea5e9] dark:text-gray-300"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="hidden items-center justify-center rounded-lg border border-[#0ea5e9] bg-white/80 px-4 py-2 text-sm font-semibold text-[#0369a1] shadow-[0_0_14px_rgba(14,165,233,0.14)] transition-all hover:bg-[#e0f2fe] hover:shadow-[0_0_20px_rgba(14,165,233,0.22)] sm:inline-flex dark:border-[#00bfff] dark:bg-[rgba(3,18,40,0.55)] dark:text-[#67e8f9] dark:hover:bg-[#22d3ee]/10"
            >
              Login
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-[#0369a1] dark:text-[#22d3ee] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-[#bfdbfe] bg-white md:hidden dark:border-border dark:bg-[var(--bg-base)]"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAVBAR_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-[#22d3ee]/10 text-[#22d3ee]'
                      : 'text-[#334155] hover:bg-[#e0f2fe] hover:text-[#2563eb] dark:text-[var(--text-primary)] dark:hover:bg-[#22d3ee]/10 dark:hover:text-[#38bdf8]'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="mt-2 rounded-lg bg-[#22d3ee]/10 px-4 py-3 text-sm font-semibold text-[#22d3ee]"
                  >
                    Dashboard ({user.name || user.email})
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="rounded-lg border border-red-500/30 px-4 py-3 text-center text-sm font-semibold text-red-500 hover:bg-red-500/10"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth/login"
                  className="mt-2 block rounded-lg border border-[#0ea5e9] bg-white px-4 py-3 text-center text-sm font-semibold text-[#0369a1] shadow-[0_0_14px_rgba(14,165,233,0.14)] transition-all hover:bg-[#e0f2fe] dark:border-[#00bfff] dark:bg-[rgba(3,18,40,0.55)] dark:text-[#67e8f9] dark:hover:bg-[#22d3ee]/10"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
