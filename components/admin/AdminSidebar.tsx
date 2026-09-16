'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart,
  FileText,
  FilePen,
  Image,
  Box,
  GraduationCap,
  Heart,
  SlidersHorizontal,
  FolderTree,
  Tags,
  Upload,
} from 'lucide-react';

const navItems = [
  {
    section: 'MAIN',
    items: [
      { label: 'Overview', icon: LayoutDashboard, href: '/admin' },
      { label: 'Analytics', icon: BarChart, href: '/admin/analytics' },
    ],
  },
  {
    section: 'BLOG CMS',
    items: [
      { label: 'All Posts', icon: FileText, href: '/admin/posts' },
      { label: 'Create Post', icon: FileText, href: '/admin/posts/new', badge: { type: 'solid' as const, text: '+' } },
      { label: 'Drafts', icon: FilePen, href: '/admin/posts/drafts' },
      { label: 'Categories', icon: FolderTree, href: '/admin/categories' },
      { label: 'Tags', icon: Tags, href: '/admin/tags' },
      { label: 'Media Library', icon: Image, href: '/admin/media' },
    ],
  },
  {
    section: 'CONTENT',
    items: [
      { label: 'New asset', icon: Image, href: '/admin/assets/new' },
      { label: 'New project', icon: Box, href: '/admin/projects/new' },
      { label: 'New course', icon: GraduationCap, href: '/admin/courses/new' },
    ],
  },
  {
    section: '',
    items: [
      { label: 'Likes', icon: Heart, href: '/admin/likes' },
      { label: 'Settings', icon: SlidersHorizontal, href: '/admin/settings' },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="flex w-[260px] shrink-0 flex-col overflow-y-auto border-r py-4 px-3"
      style={{ background: 'var(--dt-surface)', borderColor: 'var(--dt-border)' }}
    >
      {navItems.map((group, gi) => (
        <div key={gi}>
          {gi > 0 && group.section && (
            <div className="mx-3 my-2.5 h-px" style={{ background: 'var(--dt-border)' }} />
          )}
          {group.section && (
            <div
              className="px-3 pb-1.5 pt-3 text-[12px] font-bold uppercase tracking-[0.08em]"
              style={{ color: 'var(--dt-muted)' }}
            >
              {group.section}
            </div>
          )}
          {group.items.map((item) => {
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname === item.href || (item.href !== '/admin' && item.href !== '/admin/posts' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-[14px] font-medium transition-colors"
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
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span
                    className="rounded-md px-1.5 py-[1px] text-[11px] font-bold"
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
