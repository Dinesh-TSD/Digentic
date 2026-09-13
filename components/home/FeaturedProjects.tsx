'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { MOCK_PROJECTS_FULL } from '@/lib/constants';

export function FeaturedProjects() {
  const featured = MOCK_PROJECTS_FULL.slice(0, 3);

  return (
    <section className="bg-[var(--bg-surface)] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Portfolio"
          title="Featured Projects"
          subtitle="A selection of AI and full-stack applications I've built."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover group relative overflow-hidden rounded-xl border border-border border-l-4 border-l-orange-600 bg-[var(--bg-base)] transition-all duration-300"
            >
              {/* Background Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-orange-900/20 to-orange-600/20">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              </div>

              {/* Foreground Content */}
              <div className="relative p-6">
                {/* Category Badge */}
                <div className="mb-3 inline-block">
                  <span className="rounded-full bg-orange-600/20 px-3 py-1 text-xs font-semibold text-orange-500">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[var(--text-primary)] line-clamp-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-orange-600/10 px-2.5 py-1 text-xs font-medium text-orange-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>👁️ {project.views} views</span>
                  <span>⭐ {project.stars} stars</span>
                </div>

                {/* CTA Buttons */}
                <div className="mt-5 flex gap-3">
                  <a
                    href={project.liveUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-orange-gradient px-4 py-2 text-xs font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-600/20"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all hover:border-orange-600 hover:text-orange-600"
                  >
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange-gradient hover:underline"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
