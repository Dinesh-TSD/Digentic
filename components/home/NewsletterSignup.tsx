'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <section id="newsletter" className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-[var(--bg-surface)] p-8 text-center md:p-12"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-600/10">
            <Mail className="h-7 w-7 text-orange-600" />
          </div>
          <SectionHeader
            title="Get Free AI Tips Every Week"
            subtitle="Join 5,000+ developers getting weekly insights on AI, web dev, and building digital products."
          />

          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 flex-1 rounded-lg border border-border bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-orange-600"
            />
            <button
              type="submit"
              className="h-12 whitespace-nowrap rounded-lg bg-orange-gradient px-6 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-600/30"
            >
              {submitted ? (
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Subscribed!
                </span>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          <p className="mt-3 text-xs text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
