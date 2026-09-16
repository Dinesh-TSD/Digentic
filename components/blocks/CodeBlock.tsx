'use client';

import React, { useState } from 'react';
import type { CodeBlockData } from '@/types/blog';
import { Check, Copy, Terminal } from 'lucide-react';

export function CodeBlock({ block }: { block: CodeBlockData }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(block.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  return (
    <div className="my-8 overflow-hidden rounded-xl border border-neutral-800 bg-[#0d1117] shadow-xl text-neutral-100">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 bg-[#161b22] px-4 py-2.5 text-xs text-neutral-400">
        <div className="flex items-center gap-2 font-mono">
          <Terminal className="h-3.5 w-3.5 text-[#ff8c00]" />
          <span>{block.title || block.language || 'code'}</span>
        </div>
        <div className="flex items-center gap-3">
          {block.language && (
            <span className="rounded bg-neutral-800 px-2 py-0.5 text-[11px] font-semibold text-neutral-300 uppercase">
              {block.language}
            </span>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 rounded bg-neutral-800/80 px-2 py-1 text-[12px] font-medium text-neutral-300 transition-colors hover:bg-neutral-700 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Area */}
      <pre className="overflow-x-auto p-4 text-xs sm:text-sm font-mono leading-relaxed text-neutral-200">
        <code>{block.code}</code>
      </pre>
    </div>
  );
}
