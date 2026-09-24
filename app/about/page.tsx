'use client';

import { motion } from 'framer-motion';
import {
  MapPin,
  Download,
  Star,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  ExternalLink,
  Github,
  Sparkles,
} from 'lucide-react';
import Image from 'next/image';
import {
  MOCK_MILESTONES,
  MOCK_SKILLS,
  MOCK_EXPERIENCE,
  MOCK_EDUCATION,
  MOCK_CERTIFICATIONS,
  MOCK_PROJECTS,
  MOCK_TESTIMONIALS,
  MOCK_STATS,
} from '@/lib/constants';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { Code, FileText, Users } from 'lucide-react';

const STATS_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  FileText,
  GraduationCap,
  Users,
};

export default function AboutPage() {
  return (
    <div className="py-12">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 py-12 lg:py-20"
        >
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-600/30 bg-orange-600/10 px-4 py-1.5 text-sm text-orange-600 mb-6 lg:mb-4">
              <MapPin className="h-4 w-4" />
              Chennai, India
            </div>
            <h1 className="text-4xl font-bold md:text-5xl lg:text-6xl leading-tight">
              <span className="text-orange-gradient">Dinesh T</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              AI Engineer + MERN Developer
            </p>
            <p className="mt-6 text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Building intelligent systems and scalable web applications. Passionate about
              AI/ML, full-stack development, and creating impactful digital experiences.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-gradient px-6 py-3 text-base font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:shadow-xl hover:shadow-orange-600/30"
              >
                <Download className="h-5 w-5" />
                Download Resume
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-orange-600 px-6 py-3 text-base font-semibold text-orange-600 transition-all hover:bg-orange-600 hover:text-white"
              >
                <Github className="h-5 w-5" />
                GitHub
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="relative h-80 w-80 lg:h-96 lg:w-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 via-transparent to-purple-500/20 blur-2xl" />
              <div className="relative h-full w-full rounded-full border-4 border-orange-600/30 overflow-hidden bg-gradient-to-br from-orange-500/10 to-purple-500/10">
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-7xl lg:text-9xl font-bold text-orange-600/30">DT</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-orange-gradient flex items-center justify-center shadow-lg">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-purple-600/20 flex items-center justify-center">
                <Code className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* My Story */}
      <section className="mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Journey" title="My Story" />
          <div className="space-y-4">
            {MOCK_MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-border border-l-4 border-l-orange-600 bg-[var(--bg-surface)] p-6"
              >
                <div className="text-sm font-bold text-orange-600">{m.year}</div>
                <h3 className="mt-1 text-lg font-bold text-[var(--text-primary)]">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {m.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Expertise" title="Skills & Tech Stack" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(MOCK_SKILLS).map(([category, skills], i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-border border-t-4 border-t-orange-600 bg-[var(--bg-surface)] p-6"
              >
                <h3 className="mb-4 text-base font-bold text-orange-gradient">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-md border border-border bg-[var(--bg-base)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="mt-20 bg-[var(--bg-surface)] py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Career" title="Work Experience" />
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 h-full w-0.5 bg-orange-600 md:left-1/2 md:-translate-x-1/2" />
            {MOCK_EXPERIENCE.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative mb-8 pl-12 md:pl-0 ${
                  i % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 top-2 h-4 w-4 rounded-full bg-orange-600 ring-4 ring-[var(--bg-surface)] md:left-1/2 md:-translate-x-1/2" />
                <div className="rounded-xl border border-border bg-[var(--bg-base)] p-5">
                  <div className="flex items-center gap-2 text-orange-600">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm font-semibold">{exp.company}</span>
                  </div>
                  <h3 className="mt-1 text-base font-bold text-[var(--text-primary)]">
                    {exp.role}
                  </h3>
                  <p className="text-xs text-muted-foreground">{exp.duration}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mt-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Academics" title="Education" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-xl border border-border bg-[var(--bg-surface)] p-6"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600/10">
                <GraduationCap className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {MOCK_EDUCATION.degree}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {MOCK_EDUCATION.college}
                </p>
                <p className="mt-1 text-sm font-medium text-orange-600">
                  {MOCK_EDUCATION.year}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Credentials" title="Certifications" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-hover rounded-xl border border-border bg-[var(--bg-surface)] p-5"
              >
                <Award className="h-8 w-8 text-orange-600" />
                <h3 className="mt-3 text-sm font-bold text-[var(--text-primary)]">
                  {cert.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p>
                <p className="mt-1 text-xs font-medium text-orange-600">
                  {cert.year}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="mt-20 bg-[var(--bg-surface)] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Portfolio" title="All Projects" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MOCK_PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card-hover rounded-xl border border-border bg-[var(--bg-base)] p-6"
              >
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-orange-600/10 px-2.5 py-1 text-xs font-medium text-orange-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={project.liveUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-orange-600 px-3 py-1.5 text-xs font-semibold text-orange-600 transition-all hover:bg-orange-600 hover:text-white"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live
                  </a>
                  <a
                    href={project.githubUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-orange-600 px-3 py-1.5 text-xs font-semibold text-orange-600 transition-all hover:bg-orange-600 hover:text-white"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Code
                  </a>
                  <a
                    href={project.caseStudyUrl}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-orange-600 px-3 py-1.5 text-xs font-semibold text-orange-600 transition-all hover:bg-orange-600 hover:text-white"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    Case Study
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Download */}
      <section className="mt-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.a
            href="#"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-gradient px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-600/20 transition-all hover:shadow-xl hover:shadow-orange-600/30"
          >
            <Download className="h-5 w-5" />
            Download Resume
          </motion.a>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-20 border-y border-border bg-[var(--bg-surface)] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {MOCK_STATS.map((stat, i) => {
            const Icon = STATS_ICONS[stat.icon] || Code;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-center gap-4 rounded-lg border-l-4 border-orange-600 bg-[var(--bg-base)] p-4 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange-600/10">
                  <Icon className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-gradient">
                    {stat.value}+
                  </div>
                  <div className="text-xs text-muted-foreground sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader badge="Reviews" title="Client Testimonials" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {MOCK_TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-border bg-[var(--bg-surface)] p-6"
              >
                <div className="mb-3 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 text-orange-600"
                      fill="currentColor"
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
