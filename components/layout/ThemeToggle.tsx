'use client';

import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const isDark = !mounted || theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`relative flex h-10 w-10 items-center justify-center rounded-lg border transition-all ${
        isDark
          ? 'border-[#38bdf8]/35 bg-[rgba(3,18,40,0.55)] text-[#f8fafc] hover:border-[#22d3ee] hover:bg-[#22d3ee]/10'
          : 'border-[#0ea5e9]/35 bg-white text-[#0f172a] hover:border-[#2563eb] hover:bg-[#e0f2fe]'
      }`}
    >
      {!mounted ? (
        <Sun className="h-5 w-5 text-[#f8fafc]" />
      ) : (
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-[#f8fafc]" />
          ) : (
            <Moon className="h-5 w-5 text-[#0f172a]" />
          )}
        </motion.div>
      )}
    </button>
  );
}
