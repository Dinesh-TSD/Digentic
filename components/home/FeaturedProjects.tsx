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
              className="card-hover group relative overflow-hidden rounded-xl border border-border border-l-4 border-l-[#38bdf8] bg-[var(--bg-base)] transition-all duration-300"
            >
              {/* Background Image */}
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[#e0f2fe] via-[#bae6fd] to-[#dbeafe]">
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
                  <span className="rounded-full bg-[#e0f2fe] px-3 py-1 text-xs font-semibold text-[#0369a1]">
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
                      className="rounded-md bg-[#ecfeff] px-2.5 py-1 text-xs font-medium text-[#0f766e]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-5 flex gap-3">
                  <a
                    href={project.liveUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#67e8f9] via-[#38bdf8] to-[#2563eb] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/30"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-all hover:border-[#38bdf8] hover:text-[#0ea5e9]"
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
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#0ea5e9] hover:underline"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
