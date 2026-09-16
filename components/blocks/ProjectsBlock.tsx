import React from 'react';
import type { ProjectsBlockData } from '@/types/blog';
import { Code2, Github, ExternalLink, Sparkles } from 'lucide-react';

export function ProjectsBlock({ block }: { block: ProjectsBlockData }) {
  if (!block.items || block.items.length === 0) return null;

  const getDifficultyColor = (diff?: string) => {
    switch (diff?.toLowerCase()) {
      case 'beginner':
        return 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500';
      case 'intermediate':
        return 'border-amber-500/30 bg-amber-500/10 text-amber-500';
      case 'advanced':
        return 'border-purple-500/30 bg-purple-500/10 text-purple-500';
      default:
        return 'border-orange-500/30 bg-orange-500/10 text-[#ff8c00]';
    }
  };

  return (
    <div className="my-10 space-y-6">
      {block.title && (
        <div className="flex items-center gap-2">
          <Code2 className="h-6 w-6 text-[#ff8c00]" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {block.title}
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {block.items.map((proj, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:border-[#ff8c00]/50 hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-[#ff8c00]">
                  PROJECT #{idx + 1}
                </span>
                {proj.difficulty && (
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getDifficultyColor(
                      proj.difficulty
                    )}`}
                  >
                    {proj.difficulty}
                  </span>
                )}
              </div>

              <h3 className="mt-3 text-lg font-bold text-foreground">
                {proj.title}
              </h3>

              {proj.description && (
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {proj.description}
                </p>
              )}

              {proj.techStack && proj.techStack.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {proj.techStack.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Links */}
            <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
              )}
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#ff8c00] hover:underline"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
