'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye,
  Star,
  Github,
  ExternalLink,
  FileText,
  Search,
  Loader2,
  BarChart3,
  Code2,
  Wrench,
  Folder,
  Sparkles,
  CircleDot,
  X,
} from 'lucide-react';
import Image from 'next/image';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { MOCK_PROJECTS_FULL } from '@/lib/constants';

const CATEGORIES = [
  'All',
  'Full Stack',
  'AI & ML',
  'Frontend',
  'Backend',
  'Open Source',
  'Featured',
];

const CATEGORY_STYLES: Record<string, string> = {
  'Full Stack': 'bg-orange-600 text-white',
  'AI & ML': 'bg-orange-700 text-white',
  Frontend: 'bg-orange-100 text-orange-700',
  Backend: 'bg-orange-500 text-white',
  'Open Source': 'bg-orange-600/20 text-orange-600 border border-orange-600/30',
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(false);

  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    MOCK_PROJECTS_FULL.forEach((p) => p.tech.forEach((t) => techSet.add(t)));
    return Array.from(techSet).sort();
  }, []);

  const filtered = useMemo(() => {
    return MOCK_PROJECTS_FULL.filter((p) => {
      let matchesCategory = true;
      if (activeCategory === 'Featured') {
        matchesCategory = p.featured;
      } else if (activeCategory !== 'All') {
        matchesCategory = p.category === activeCategory;
      }
      const matchesTech = !selectedTech || p.tech.includes(selectedTech);
      return matchesCategory && matchesTech;
    });
  }, [activeCategory, selectedTech]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_PROJECTS_FULL.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
      if (p.featured) counts['Featured'] = (counts['Featured'] || 0) + 1;
    });
    counts['All'] = MOCK_PROJECTS_FULL.length;
    return counts;
  }, []);

  const totalStars = MOCK_PROJECTS_FULL.reduce((sum, p) => sum + p.stars, 0);
  const totalViews = MOCK_PROJECTS_FULL.reduce((sum, p) => sum + p.views, 0);
  const featuredProjects = MOCK_PROJECTS_FULL.filter((p) => p.featured);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 4);
      setLoading(false);
    }, 800);
  };

  const clearFilters = () => {
    setActiveCategory('All');
    setSelectedTech(null);
  };

  const hasFilters = activeCategory !== 'All' || selectedTech !== null;

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold md:text-5xl">
            <span className="text-orange-gradient">My Latest Projects</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Building innovative solutions with AI, MERN, and modern web
            technologies.
          </p>

          {/* Stats bar */}
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-4">
              <div className="text-xs text-muted-foreground">Total Projects</div>
              <div className="mt-1 text-2xl font-bold text-orange-gradient">
                {MOCK_PROJECTS_FULL.length}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-4">
              <div className="text-xs text-muted-foreground">GitHub Stars</div>
              <div className="mt-1 flex items-center gap-1 text-2xl font-bold text-orange-gradient">
                {totalStars}
                <Star className="h-4 w-4 text-orange-600" fill="currentColor" />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-4">
              <div className="text-xs text-muted-foreground">Active Projects</div>
              <div className="mt-1 flex items-center gap-1.5 text-2xl font-bold text-orange-gradient">
                <CircleDot className="h-3 w-3 text-green-500" fill="currentColor" />
                {MOCK_PROJECTS_FULL.filter((p) => p.status === 'Active').length}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-4">
              <div className="text-xs text-muted-foreground">Avg Rating</div>
              <div className="mt-1 flex items-center gap-1 text-2xl font-bold text-orange-gradient">
                4.9
                <Star className="h-4 w-4 text-orange-600" fill="currentColor" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-16 z-30 mt-8 border-y border-border bg-[var(--bg-base)]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative whitespace-nowrap px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'text-orange-600'
                    : 'text-muted-foreground hover:text-orange-600'
                }`}
              >
                {cat}
                <span className="ml-1 text-xs opacity-60">
                  ({categoryCounts[cat] || 0})
                </span>
                {activeCategory === cat && (
                  <motion.div
                    layoutId="filter-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-orange-gradient"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_300px]">
          {/* Projects Grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-[var(--bg-surface)] py-20 text-center">
                <Search className="h-12 w-12 text-orange-600/50" />
                <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                  No projects found
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {hasFilters
                    ? `Filtered by: ${activeCategory !== 'All' ? activeCategory : ''}${selectedTech ? `${activeCategory !== 'All' ? ' + ' : ''}${selectedTech}` : ''}`
                    : 'Try adjusting your filters.'}
                </p>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-orange-600 px-4 py-2 text-sm font-semibold text-orange-600 transition-all hover:bg-orange-600/10"
                  >
                    <X className="h-4 w-4" />
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.slice(0, visibleCount).map((project, i) => (
                    <motion.article
                      key={project.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                      className="card-hover group overflow-hidden rounded-xl border border-border bg-[var(--bg-surface)]"
                    >
                      {/* Cover */}
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {project.featured && (
                          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-orange-600 px-2.5 py-1 text-xs font-semibold text-white">
                            <Star className="h-3 w-3" fill="currentColor" />
                            Featured
                          </span>
                        )}
                        <span
                          className={`absolute right-3 top-3 rounded-md px-2.5 py-1 text-xs font-semibold ${
                            CATEGORY_STYLES[project.category] ||
                            'bg-orange-600 text-white'
                          }`}
                        >
                          {project.category}
                        </span>
                      </div>

                      {/* Body */}
                      <div className="p-5">
                        <h3 className="text-base font-bold text-[var(--text-primary)] transition-colors group-hover:text-orange-600">
                          {project.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tech tags */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.tech.map((t) => (
                            <span
                              key={t}
                              className="rounded-md bg-orange-600/10 px-2 py-0.5 text-xs font-medium text-orange-600"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        {/* Stats row */}
                        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3.5 w-3.5 text-orange-600" />
                            {project.views >= 1000
                              ? `${(project.views / 1000).toFixed(1)}K`
                              : project.views}{' '}
                            views
                          </span>
                          <span className="flex items-center gap-1">
                            <Star
                              className="h-3.5 w-3.5 text-orange-600"
                              fill="currentColor"
                            />
                            {project.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <CircleDot
                              className={`h-3 w-3 ${
                                project.status === 'Active'
                                  ? 'text-green-500'
                                  : 'text-blue-500'
                              }`}
                              fill="currentColor"
                            />
                            {project.status}
                          </span>
                        </div>

                        {/* Buttons */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <a
                            href={project.liveUrl}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-orange-600 px-3 py-1.5 text-xs font-semibold text-orange-600 transition-all hover:bg-orange-600 hover:text-white"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Live Demo
                          </a>
                          <a
                            href={project.githubUrl}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-orange-600 px-3 py-1.5 text-xs font-semibold text-orange-600 transition-all hover:bg-orange-600 hover:text-white"
                          >
                            <Github className="h-3.5 w-3.5" />
                            GitHub
                          </a>
                          <a
                            href={project.caseStudyUrl}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-orange-gradient px-3 py-1.5 text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-600/20"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Case Study
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Load More */}
                {visibleCount < filtered.length && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loading}
                      className="inline-flex items-center gap-2 rounded-lg bg-orange-gradient px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-600/30 disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        'Load More Projects'
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Project Statistics */}
            <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <BarChart3 className="h-4 w-4 text-orange-600" />
                Stats
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Total Projects
                  </span>
                  <span className="text-sm font-bold text-orange-600">
                    {MOCK_PROJECTS_FULL.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    GitHub Stars
                  </span>
                  <span className="text-sm font-bold text-orange-600">
                    {totalStars}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Total Views
                  </span>
                  <span className="text-sm font-bold text-orange-600">
                    {totalViews >= 1000
                      ? `${(totalViews / 1000).toFixed(1)}K`
                      : totalViews}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Most Used Tech
                  </span>
                  <span className="text-sm font-bold text-orange-600">
                    {allTechs[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Tech Stack Cloud */}
            <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <Wrench className="h-4 w-4 text-orange-600" />
                Tech Stack
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {allTechs.map((tech) => (
                  <button
                    key={tech}
                    onClick={() =>
                      setSelectedTech(selectedTech === tech ? null : tech)
                    }
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                      selectedTech === tech
                        ? 'bg-orange-600 text-white'
                        : 'bg-orange-600/10 text-orange-600 hover:bg-orange-600 hover:text-white'
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <Folder className="h-4 w-4 text-orange-600" />
                Categories
              </h3>
              <div className="mt-4 space-y-2">
                {CATEGORIES.filter((c) => c !== 'All' && c !== 'Featured').map(
                  (cat) => (
                    <label
                      key={cat}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={activeCategory === cat}
                        onChange={() =>
                          setActiveCategory(
                            activeCategory === cat ? 'All' : cat
                          )
                        }
                        className="h-4 w-4 rounded border-border accent-orange-600"
                      />
                      <span className="text-[var(--text-primary)]">{cat}</span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {categoryCounts[cat] || 0}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>

            {/* Featured Projects */}
            <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <Sparkles className="h-4 w-4 text-orange-600" />
                Featured
              </h3>
              <div className="mt-4 space-y-3">
                {featuredProjects.slice(0, 4).map((p) => (
                  <a
                    key={p.title}
                    href={p.liveUrl}
                    className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-orange-600/5"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-xs font-semibold text-orange-600">
                        {p.title}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <Star
                            className="h-3 w-3 text-orange-600"
                            fill="currentColor"
                          />
                          {p.stars}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Eye className="h-3 w-3 text-orange-600" />
                          {p.views}
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
