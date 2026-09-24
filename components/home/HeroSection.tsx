'use client';

import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  FileText,
  Package,
} from 'lucide-react';
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const overlayCards = [
  {
    title: 'Projects',
    count: 8,
    suffix: '+',
    href: '/projects',
    icon: BriefcaseBusiness,
    accent: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/25',
  },
  {
    title: 'Courses',
    count: 6,
    suffix: '',
    href: '/courses',
    icon: BookOpen,
    accent: 'text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/25',
  },
  {
    title: 'Digital Products',
    count: 3,
    suffix: '',
    href: '/digital',
    icon: Package,
    accent: 'text-[#22d3ee] bg-[#22d3ee]/10 border-[#22d3ee]/25',
  },
  {
    title: 'Blog Articles',
    count: 12,
    suffix: '+',
    href: '/blog',
    icon: FileText,
    accent: 'text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/25',
  },
];

const MotionLink = motion(Link);

const cardAccents = [
  'border-[#22c55e]/35 hover:border-[#22c55e]/70 hover:bg-[#22c55e]/[0.06] dark:border-[#22c55e]/45',
  'border-[#a855f7]/35 hover:border-[#a855f7]/70 hover:bg-[#a855f7]/[0.06] dark:border-[#a855f7]/45',
  'border-[#22d3ee]/35 hover:border-[#22d3ee]/70 hover:bg-[#22d3ee]/[0.06] dark:border-[#22d3ee]/45',
  'border-[#ec4899]/35 hover:border-[#ec4899]/70 hover:bg-[#ec4899]/[0.06] dark:border-[#ec4899]/45',
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/dinesht', icon: FaGithub, color: 'text-[#111827] dark:text-[#f8fafc]' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/dinesht', icon: FaLinkedinIn, color: 'text-[#0a66c2]' },
  { label: 'X', href: 'https://twitter.com/digentic_tech', icon: FaXTwitter, color: 'text-[#111827] dark:text-[#f8fafc]' },
  { label: 'Instagram', href: '#', icon: FaInstagram, color: 'text-[#e1306c]' },
  { label: 'YouTube', href: '#', icon: FaYoutube, color: 'text-[#ff0000]' },
];

const roleMatrix = [
  'Full Stack Developer',
  'AI Engineer',
  'Cybersecurity Explorer',
  'MERN Architect',
];

function AnimatedCount({ value, suffix }: { value: number; suffix: string }) {
  const count = useMotionValue(0);
  const roundedCount = useTransform(count, (latest) => `${Math.round(latest)}${suffix}`);

  useEffect(() => {
    const controls = animate(count, value, { duration: 0.9, ease: 'easeOut' });
    return () => controls.stop();
  }, [count, value]);

  return <motion.span>{roundedCount}</motion.span>;
}

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeletingRole, setIsDeletingRole] = useState(false);

  useEffect(() => {
    const currentRole = roleMatrix[roleIndex];
    const isRoleComplete = displayedRole === currentRole;
    const roleTimer = window.setTimeout(() => {
      if (isDeletingRole) {
        const nextText = displayedRole.slice(0, -1);
        setDisplayedRole(nextText);
        if (nextText.length === 0) {
          setIsDeletingRole(false);
          setRoleIndex((current) => (current + 1) % roleMatrix.length);
        }
      } else {
        const nextText = currentRole.slice(0, displayedRole.length + 1);
        setDisplayedRole(nextText);
        if (nextText === currentRole) setIsDeletingRole(true);
      }
    }, isRoleComplete ? 900 : isDeletingRole ? 18 : 35);

    return () => window.clearTimeout(roleTimer);
  }, [displayedRole, isDeletingRole, roleIndex]);

  return (
    <section className="relative overflow-hidden bg-white  pt-8 text-[#0f172a] dark:bg-[#020617] dark:text-[#f8fafc]  lg:pt-0">
      <div className="absolute inset-x-0 top-0 h-[580px] bg-[url('/images/herobg.png')] bg-cover bg-center bg-no-repeat lg:h-[580px]" />
      <div className="pointer-events-none absolute left-0 top-0 h-[580px] w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.68)_42%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(90deg,rgba(2,8,23,0.9)_0%,rgba(2,8,23,0.62)_42%,rgba(2,8,23,0)_100%)] lg:w-[50%]" />
      <div className="pointer-events-none absolute left-[42%] top-1/4 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-[130px]" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className=" min-h-[570px]  pb-8 pt-6 lg:pb-0 lg:pt-5">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="max-w-[510px] origin-left scale-[0.88] sm:scale-[0.9] lg:scale-[0.92]"
          >
            <p className="mb-3 text-lg font-medium text-[#1e3a8a] dark:text-[#bfdbfe] sm:text-xl">Hello, I&apos;m</p>
            <h1 className="text-5xl font-extrabold leading-none tracking-tight text-[#0f172a] dark:text-white sm:text-6xl lg:text-7xl">
              DINESH<span className="text-[#22d3ee]"> TS</span>
            </h1>
            <div className="mt-5 flex min-h-7 items-center gap-2 text-base font-semibold leading-7 text-[#0f172a] dark:text-[#f8fafc] sm:text-lg" aria-live="polite">
              <span className="text-[#38bdf8]">&gt;</span>
              <motion.span
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[#22d3ee]"
              >
                |
              </motion.span>
              <span className="inline-block min-w-0 flex-1 text-[#0f172a] dark:text-[#f8fafc] sm:min-w-[260px]">
                {displayedRole}
              </span>
            </div>
            <p className="mt-5 max-w-[470px] text-sm leading-6 text-[#475569] dark:text-[#cbd5e1] sm:text-base">
              I build modern web applications, explore the power of AI, and focus on security to
              create innovative and reliable solutions.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                ['MERN Stack', 'text-[#84cc16]'],
                ['AI & Machine Learning', 'text-[#a855f7]'],
                ['Cybersecurity', 'text-[#0ea5e9]'],
              ].map(([label, color]) => (
                <span
                  key={label}
                  className={`rounded-full border border-[#93c5fd] bg-white/80 px-3.5 py-2 text-xs font-medium text-[#334155] dark:border-[#38bdf8]/35 dark:bg-[rgba(3,18,40,0.65)] dark:text-[#e2e8f0] ${color}`}
                >
                  <span className="mr-1.5">◆</span>{label}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-gradient-to-br from-[#67e8f9] to-[#22d3ee] px-5 text-sm font-bold text-[#00111f] shadow-[0_8px_28px_rgba(34,211,238,0.22)] transition-transform hover:-translate-y-0.5"
              >
                Explore My Work <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/digital"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#0ea5e9] bg-white/80 px-5 text-sm font-semibold text-[#0369a1] transition-colors hover:bg-[#e0f2fe] dark:bg-[rgba(2,15,35,0.5)] dark:text-[#67e8f9] dark:hover:bg-[#22d3ee]/10"
              >
                Download Resume <ArrowDown className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#93c5fd] bg-white/80 text-[#475569] transition-colors hover:border-[#22d3ee] hover:text-[#0369a1] dark:border-[#38bdf8]/35 dark:bg-[rgba(2,15,35,0.7)] dark:text-[#cbd5e1] dark:hover:text-[#22d3ee]"
                >
                  <Icon className={`h-4 w-4 ${color}`} />
                </a>
              ))}
              <span className="ml-1 flex items-center gap-2 text-xs text-[#1e3a8a] dark:text-[#bfdbfe]">
                <span className="h-2 w-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.9)]" />
                Available for new opportunities
              </span>
            </div>
          </motion.div>
                                                                
          <div className="mt-8 z-30 grid w-full grid-cols-1 gap-3 pb-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {overlayCards.map(({ title, count, suffix, href, icon: Icon, accent }, index) => (
            <MotionLink
              key={title}
              href={href}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 + index * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              className={`group flex h-[88px] min-h-[88px] items-center gap-3 rounded-xl border bg-white/90 p-3.5 shadow-[0_8px_24px_rgba(15,23,42,0.12)] backdrop-blur-lg transition-colors dark:bg-[rgba(4,20,42,0.88)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.25)] ${cardAccents[index]}`}
            >
              <span className="flex min-w-0 flex-1 items-center gap-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${accent}`}>
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <span className="truncate text-sm font-bold tracking-wide text-[#0f172a] dark:text-[#f8fafc]">{title}</span>
              </span>
              <motion.span
                initial={{ opacity: 0, y: 8, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.35 + index * 0.12, ease: 'backOut' }}
                className="shrink-0 text-2xl font-black leading-none tracking-tight text-[#0ea5e9] dark:text-[#22d3ee] sm:text-3xl"
              >
                <AnimatedCount value={count} suffix={suffix} />
              </motion.span>
            </MotionLink>
          ))}
        </div>
        </div>        
      </div>
    </section>
  );
}
