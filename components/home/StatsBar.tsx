'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, FileText, GraduationCap, Users } from 'lucide-react';
import { MOCK_STATS } from '@/lib/constants';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Code,
  FileText,
  GraduationCap,
  Users,
};

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (inView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [inView, target]);

  return <span ref={ref}>{count}+</span>;
}

export function StatsBar() {
  return (
    <section className="border-y border-border bg-[var(--bg-surface)] py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {MOCK_STATS.map((stat, i) => {
          const Icon = ICONS[stat.icon] || Code;
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
                  <CountUp target={stat.value} />
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
  );
}
