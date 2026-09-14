'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  ShoppingBag,
  Bookmark,
  UserCircle,
  SlidersHorizontal,
} from 'lucide-react';

const navItems = [
  {
    section: 'LEARN',
    items: [
      { label: 'My courses', icon: BookOpen, href: '/dashboard' },
      { label: 'Purchases', icon: ShoppingBag, href: '/dashboard/purchases', badge: { type: 'solid' as const, text: '1' } },
    ],
  },
  {
    section: 'LIBRARY',
    items: [
      { label: 'Saved posts', icon: Bookmark, href: '/dashboard/saved', badge: { type: 'solid' as const, text: '18' } },
    ],
  },
  {
    section: '',
    items: [
      { label: 'Profile', icon: UserCircle, href: '/dashboard/profile' },
      { label: 'Settings', icon: SlidersHorizontal, href: '/dashboard/settings' },
    ],
  },
];

export function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex w-[260px] shrink-0 flex-col overflow-y-auto border-r py-4 px-3"
      style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
    >
      {navItems.map((group, gi) => (
        <div key={gi}>
          {gi === 2 && (
            <div className="mx-3 my-2.5 h-px" style={{ background: 'var(--dt-border)' }} />
          )}
          {group.section && (
            <div
              className="px-3 pb-1.5 pt-3 text-[13px] font-medium uppercase tracking-[0.08em]"
              style={{ color: 'var(--dt-muted)' }}
            >
              {group.section}
            </div>
          )}
          {group.items.map((item) => {
            const isActive =
              item.href === '/dashboard'
                ? pathname === '/dashboard' || pathname === '/dashboard/courses'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-[16px] transition-colors"
                style={
                  isActive
                    ? {
                        background: 'rgba(255,140,0,0.10)',
                        borderLeft: '3px solid #ff8c00',
                        borderRadius: '0 8px 8px 0',
                        paddingLeft: '9px',
                        color: '#ff8c00',
                      }
                    : { background: 'transparent', color: 'var(--dt-muted)' }
                }
              >
                <item.icon className="h-[20px] w-[20px] shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className="rounded-md px-2 py-[2px] text-[13px] font-semibold"
                    style={
                      item.badge.type === 'solid'
                        ? { background: '#ff8c00', color: '#0a0a0a' }
                        : { background: 'var(--dt-border)', color: '#ff8c00', border: '1px solid #ff8c00' }
                    }
                  >
                    {item.badge.text}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
