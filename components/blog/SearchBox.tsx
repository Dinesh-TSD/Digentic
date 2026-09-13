'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';

interface SearchBoxProps {
  onSearch?: (query: string) => void;
}

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [search, setSearch] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch?.(value);
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-600" />
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search articles..."
          className="w-full rounded-lg border border-[#e0e0e0] bg-[#f5f5f5] px-4 py-2 pl-10 text-sm text-[#1a1a1a] placeholder-[#666666] focus:border-orange-600 focus:outline-none transition-colors dark:bg-[#0a0a0a] dark:border-[#1f1f1f] dark:text-[#f1f5f9] dark:placeholder-[#94a3b8]"
        />
      </div>
    </div>
  );
}
