'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { MOCK_SKILLS } from '@/lib/constants';

export function AboutSnapshot() {
  const allSkills = Object.values(MOCK_SKILLS).flat();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="About Me"
          title="Who I Am"
          subtitle="A passionate engineer bridging AI and full-stack development."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              I&apos;m Dinesh T, an AI Engineer and MERN Developer based in
              Chennai, India. I specialize in building intelligent applications
              that combine the power of Large Language Models with robust
              full-stack architecture.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              From AI agents that reason and act, to MERN platforms that scale,
              I build technology that solves real problems. DIGENTIC TECH is my
              platform to share knowledge, courses, and digital assets with the
              developer community.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-orange-600 transition-colors hover:underline"
            >
              View Full Profile
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {allSkills.map((skill, i) => (
              <span
                key={skill}
                className="rounded-lg border border-border bg-[var(--bg-surface)] px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-all hover:border-orange-600 hover:text-orange-600"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
