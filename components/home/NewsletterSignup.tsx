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

  const benefits = [
    'Weekly AI insights & tutorials',
    'Web dev best practices',
    'Digital product strategies',
  ];

  return (
    <section id="newsletter" className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border bg-[var(--bg-surface)] p-8 text-center md:p-12"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-orange-600/10">
            <Mail className="h-8 w-8 text-orange-600" />
          </div>
          
          <SectionHeader
            title="Get Free AI Tips Every Week"
            subtitle="Join 5,000+ developers getting weekly insights on AI, web dev, and building digital products."
          />

          <div className="mx-auto mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3 md:max-w-2xl">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg border border-border/50 bg-[var(--bg-base)] p-3"
              >
                <p className="text-sm font-medium text-[var(--text-primary)]">✨ {benefit}</p>
              </motion.div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
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
              className="h-12 whitespace-nowrap rounded-lg bg-orange-gradient px-8 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-600/30"
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

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
            <p className="text-xs text-muted-foreground">
              ✓ No spam. Unsubscribe anytime.
            </p>
            <span className="hidden text-xs text-muted-foreground sm:inline">•</span>
            <p className="text-xs text-muted-foreground">
              ✓ Exclusive content just for subscribers
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
