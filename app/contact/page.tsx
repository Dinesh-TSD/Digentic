'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Github,
  Twitter,
  MapPin,
  Send,
  CheckCircle,
  CircleDot,
} from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';
import { SITE_CONFIG } from '@/lib/constants';

const SUBJECTS = [
  'Job Opportunity',
  'Project Inquiry',
  'Collaboration',
  'Other',
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: SUBJECTS[0],
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Invalid email format';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const contactLinks = [
    { icon: Mail, label: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: '/in/dinesht', href: SITE_CONFIG.social.linkedin },
    { icon: Github, label: 'GitHub', value: '/dinesht', href: SITE_CONFIG.social.github },
    { icon: Twitter, label: 'Twitter/X', value: '@digentic_tech', href: SITE_CONFIG.social.twitter },
  ];

  return (
    <div className="py-12">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold md:text-5xl">
            <span className="text-orange-gradient">
              Let&apos;s Build Something Together
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a project in mind or want to collaborate? I&apos;d love to hear
            from you.
          </p>
        </motion.div>
      </section>

      {/* Contact Form + Info */}
      <section className="mt-12">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border bg-[var(--bg-surface)] p-6 md:p-8"
          >
            <h2 className="mb-6 text-xl font-bold text-[var(--text-primary)]">
              Send a Message
            </h2>

            {submitted && (
              <div className="mb-4 flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Message sent successfully! I&apos;ll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-11 w-full rounded-lg border border-border bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-orange-600"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-11 w-full rounded-lg border border-border bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-orange-600"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="h-11 w-full rounded-lg border border-border bg-[var(--bg-base)] px-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-orange-600"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-border bg-[var(--bg-base)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-orange-600"
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange-gradient text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-600/30"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Direct Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Availability Badge */}
            <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
              <CircleDot className="h-5 w-5 text-green-500" fill="currentColor" />
              <span className="text-sm font-medium text-orange-600">
                Currently Open to Work &amp; Projects
              </span>
            </div>

            {/* Contact Cards */}
            {contactLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-4 rounded-xl border border-border bg-[var(--bg-surface)] p-4 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600/10">
                  <link.icon className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{link.label}</div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {link.value}
                  </div>
                </div>
              </a>
            ))}

            {/* Location */}
            <div className="flex items-center gap-4 rounded-xl border border-border bg-[var(--bg-surface)] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-600/10">
                <MapPin className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Location</div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">
                  {SITE_CONFIG.location}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
