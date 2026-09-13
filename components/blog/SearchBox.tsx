'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface SearchBoxProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export function SearchBox({ onSearch, placeholder = 'Search articles...' }: SearchBoxProps) {
  const [search, setSearch] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search — fires 300ms after the user stops typing
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onSearch?.(search);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [search, onSearch]);

  const handleClear = () => {
    setSearch('');
    onSearch?.('');
  };

  return (
    <div className="mb-6">
      <div className="relative group">
        {/* Search icon */}
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ff8c00] transition-colors group-focus-within:text-[#ff6b35]" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          aria-label="Search articles"
          className="
            w-full rounded-lg border
            border-[#e0e0e0] bg-[#f5f5f5]
            px-4 py-2.5 pl-10
            text-sm text-[#1a1a1a] placeholder-[#666666]
            transition-all duration-200
            focus:border-[#ff8c00] focus:outline-none focus:ring-2 focus:ring-[#ff8c00]/20
            dark:bg-[#0a0a0a] dark:border-[#1f1f1f]
            dark:text-[#f1f5f9] dark:placeholder-[#94a3b8]
            dark:focus:border-[#ff8c00] dark:focus:ring-[#ff8c00]/10
            pr-8
          "
        />

        {/* Clear button — only shown when there's input */}
        {search && (
          <button
            onClick={handleClear}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666666] transition-colors hover:text-[#ff8c00] dark:text-[#94a3b8] dark:hover:text-[#ff8c00]"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
