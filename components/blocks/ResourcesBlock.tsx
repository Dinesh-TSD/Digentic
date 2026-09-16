import React from 'react';
import type { ResourcesBlockData } from '@/types/blog';
import { Bookmark, ExternalLink, FileText, Globe, Download, Link2 } from 'lucide-react';

export function ResourcesBlock({ block }: { block: ResourcesBlockData }) {
  if (!block.items || block.items.length === 0) return null;

  const getIcon = (type?: string) => {
    switch (type?.toLowerCase()) {
      case 'doc':
      case 'pdf':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'download':
        return <Download className="h-4 w-4 text-emerald-500" />;
      case 'website':
        return <Globe className="h-4 w-4 text-purple-500" />;
      default:
        return <Link2 className="h-4 w-4 text-[#ff8c00]" />;
    }
  };

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <Bookmark className="h-5 w-5 text-[#ff8c00]" />
        <h3 className="text-xl font-bold text-foreground">
          {block.title || 'Helpful Resources & References'}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {block.items.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 rounded-xl border border-border bg-background p-3.5 transition-all hover:border-[#ff8c00]/50 hover:shadow-md"
          >
            <div className="mt-0.5 rounded-lg bg-muted p-2 group-hover:bg-orange-500/10 transition-colors">
              {getIcon(item.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 font-semibold text-foreground group-hover:text-[#ff8c00] transition-colors">
                <span className="truncate text-sm">{item.title}</span>
                <ExternalLink className="h-3 w-3 shrink-0 opacity-60" />
              </div>
              {item.description && (
                <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
