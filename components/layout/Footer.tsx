'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import { SITE_CONFIG, FOOTER_LINKS } from '@/lib/constants';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="border-t border-border bg-[var(--bg-base)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo size="md" showTagline />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {SITE_CONFIG.tagline}
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Github, href: SITE_CONFIG.social.github },
                { icon: Linkedin, href: SITE_CONFIG.social.linkedin },
                { icon: Twitter, href: SITE_CONFIG.social.twitter },
                { icon: Mail, href: `mailto:${SITE_CONFIG.email}` },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-orange-600 transition-all hover:border-orange-600 hover:shadow-[0_0_12px_rgba(255,140,0,0.3)]"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="mb-3 text-sm font-semibold text-orange-gradient">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-orange-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter mini-form */}
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-orange-gradient">
              Newsletter
            </h4>
            <p className="mt-1 text-xs text-muted-foreground">
              Get free AI tips and dev resources every week.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-10 w-full max-w-xs rounded-lg border border-border bg-[var(--bg-surface)] px-4 text-sm text-[var(--text-primary)] outline-none transition-colors focus:border-orange-600"
            />
            <button
              type="submit"
              className="whitespace-nowrap rounded-lg bg-orange-gradient px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-orange-600/30"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2025 {SITE_CONFIG.name} by {SITE_CONFIG.author}. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-orange-600" fill="currentColor" /> in Chennai, India
          </p>
        </div>
      </div>
    </footer>
  );
}
