'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github, FileText, Star, Folder } from 'lucide-react';

export interface ProjectItem {
  id?: string;
  title: string;
  slug?: string;
  description: string;
  tech: string[];
  category: string;
  featured: boolean;
  status?: string;
  views?: number;
  stars?: number;
  image?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  caseStudyUrl?: string | null;
  createdAt?: string | Date;
}

const CATEGORY_STYLES: Record<string, string> = {
  'Full Stack': 'bg-orange-600 text-white',
  'AI & ML': 'bg-orange-700 text-white',
  Frontend: 'bg-orange-100 text-orange-700',
  Backend: 'bg-orange-500 text-white',
  'Open Source': 'bg-orange-600/20 text-orange-600 border border-orange-600/30',
};

interface ProjectCardProps {
  project: ProjectItem;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
      className="card-hover group flex flex-col overflow-hidden rounded-xl border border-border bg-[var(--bg-surface)] transition-all"
    >
      {/* Media Header */}
      <div className="relative h-44 w-full overflow-hidden bg-orange-600/10">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Folder className="h-10 w-10 text-orange-600/50" />
          </div>
        )}

        {project.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-orange-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            <Star className="h-3 w-3" fill="currentColor" />
            Featured
          </span>
        )}

        <span
          className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold ${
            CATEGORY_STYLES[project.category] || 'bg-orange-600 text-white'
          }`}
        >
          {project.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold text-[var(--text-primary)] transition-colors group-hover:text-orange-600">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.tech?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-orange-600/10 px-2 py-0.5 text-xs font-medium text-orange-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-auto pt-5 flex flex-wrap gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-orange-600 px-3 py-1.5 text-xs font-semibold text-orange-600 transition-all hover:bg-orange-600 hover:text-white"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-orange-600 px-3 py-1.5 text-xs font-semibold text-orange-600 transition-all hover:bg-orange-600 hover:text-white"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub
            </a>
          )}

          {project.caseStudyUrl && (
            <a
              href={project.caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-orange-gradient px-3 py-1.5 text-xs font-semibold text-white transition-all hover:shadow-md hover:shadow-orange-600/20"
            >
              <FileText className="h-3.5 w-3.5" />
              Case Study
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
