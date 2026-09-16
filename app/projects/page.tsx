'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  Search,
  Loader2,
  BarChart3,
  Wrench,
  Folder,
  Sparkles,
  CircleDot,
  X,
  Eye,
} from 'lucide-react';
import Image from 'next/image';
import { ProjectCard, ProjectItem } from '@/components/projects/ProjectCard';

const CATEGORIES = [
  'All',
  'Full Stack',
  'AI & ML',
  'Frontend',
  'Backend',
  'Open Source',
  'Featured',
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    let active = true;
    setLoading(true);

    fetch('/api/projects?status=Active')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.success && Array.isArray(data.projects)) {
          setProjects(data.projects);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch projects:', err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const allTechs = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach((p) => p.tech?.forEach((t) => techSet.add(t)));
    return Array.from(techSet).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      let matchesCategory = true;
      if (activeCategory === 'Featured') {
        matchesCategory = p.featured;
      } else if (activeCategory !== 'All') {
        matchesCategory = p.category === activeCategory;
      }
      const matchesTech = !selectedTech || p.tech?.includes(selectedTech);
      return matchesCategory && matchesTech;
    });
  }, [projects, activeCategory, selectedTech]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
      if (p.featured) counts['Featured'] = (counts['Featured'] || 0) + 1;
    });
    counts['All'] = projects.length;
    return counts;
  }, [projects]);

  const totalStars = useMemo(() => projects.reduce((sum, p) => sum + (p.stars || 0), 0), [projects]);
  const totalViews = useMemo(() => projects.reduce((sum, p) => sum + (p.views || 0), 0), [projects]);
  const featuredProjects = useMemo(() => projects.filter((p) => p.featured), [projects]);
  const activeCount = useMemo(
    () => projects.filter((p) => p.status === 'Active' || !p.status).length,
    [projects]
  );

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
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl font-bold md:text-5xl">
            <span className="text-orange-gradient">My Latest Projects</span>
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Building innovative solutions with AI, MERN, and modern web technologies.
          </p>
        </motion.div>
      </section>

      {/* Filter Tabs */}
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
            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="h-80 animate-pulse rounded-xl border border-border bg-[var(--bg-surface)] p-4"
                  >
                    <div className="h-40 w-full rounded-lg bg-border/40" />
                    <div className="mt-4 h-4 w-3/4 rounded bg-border/50" />
                    <div className="mt-2 h-3 w-full rounded bg-border/30" />
                    <div className="mt-4 flex gap-2">
                      <div className="h-5 w-12 rounded bg-border/40" />
                      <div className="h-5 w-16 rounded bg-border/40" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-[var(--bg-surface)] py-20 text-center">
                <Search className="h-12 w-12 text-orange-600/50" />
                <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">
                  {projects.length === 0 ? 'No projects published yet' : 'No matching projects found'}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {projects.length === 0
                    ? 'Projects added from the admin dashboard will appear here.'
                    : hasFilters
                    ? `Filtered by: ${activeCategory !== 'All' ? activeCategory : ''}${
                        selectedTech ? `${activeCategory !== 'All' ? ' + ' : ''}${selectedTech}` : ''
                      }`
                    : 'Try adjusting your filters.'}
                </p>
                {hasFilters && projects.length > 0 && (
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
                  {filtered.slice(0, visibleCount).map((project, index) => (
                    <ProjectCard
                      key={project.id || project.slug || project.title}
                      project={project}
                      index={index}
                    />
                  ))}
                </div>

                {visibleCount < filtered.length && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="inline-flex items-center gap-2 rounded-lg bg-orange-gradient px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-600/30"
                    >
                      Load More Projects
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Stats */}
            <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <BarChart3 className="h-4 w-4 text-orange-600" />
                Stats
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Total Projects</span>
                  <span className="text-sm font-bold text-orange-600">{projects.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">GitHub Stars</span>
                  <span className="text-sm font-bold text-orange-600">{totalStars}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Total Views</span>
                  <span className="text-sm font-bold text-orange-600">
                    {totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}K` : totalViews}
                  </span>
                </div>
                {allTechs.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Most Used Tech</span>
                    <span className="text-sm font-bold text-orange-600">{allTechs[0]}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Tech Stack */}
            {allTechs.length > 0 && (
              <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                  <Wrench className="h-4 w-4 text-orange-600" />
                  Tech Stack
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {allTechs.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => setSelectedTech(selectedTech === tech ? null : tech)}
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
            )}

            {/* Category Filter */}
            <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                <Folder className="h-4 w-4 text-orange-600" />
                Categories
              </h3>
              <div className="mt-4 space-y-2">
                {CATEGORIES.filter((c) => c !== 'All' && c !== 'Featured').map((cat) => (
                  <label key={cat} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(activeCategory === cat ? 'All' : cat)}
                      className="h-4 w-4 rounded border-border accent-orange-600"
                    />
                    <span className="text-[var(--text-primary)]">{cat}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {categoryCounts[cat] || 0}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Featured Projects list */}
            {featuredProjects.length > 0 && (
              <div className="rounded-xl border border-border bg-[var(--bg-surface)] p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-[var(--text-primary)]">
                  <Sparkles className="h-4 w-4 text-orange-600" />
                  Featured
                </h3>
                <div className="mt-4 space-y-3">
                  {featuredProjects.slice(0, 4).map((p) => (
                    <a
                      key={p.id || p.slug || p.title}
                      href={p.liveUrl || p.githubUrl || '#'}
                      target={p.liveUrl || p.githubUrl ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-orange-600/5"
                    >
                      {p.image ? (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                          <Image src={p.image} alt={p.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-600/10">
                          <Folder className="h-5 w-5 text-orange-600/60" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="truncate text-xs font-semibold text-orange-600">
                          {p.title}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-0.5">
                            <Star className="h-3 w-3 text-orange-600" fill="currentColor" />
                            {p.stars || 0}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Eye className="h-3 w-3 text-orange-600" />
                            {p.views || 0}
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
