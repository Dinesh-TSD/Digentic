import React from 'react';
import type { ComparisonTableBlockData } from '@/types/blog';
import { Check, X, Sparkles } from 'lucide-react';

export function ComparisonTableBlock({ block }: { block: ComparisonTableBlockData }) {
  if (!block.columns || block.columns.length === 0) return null;

  const renderCellContent = (cell: string) => {
    const trimmed = cell.trim().toLowerCase();
    if (trimmed === 'yes' || trimmed === 'true' || trimmed === '✓') {
      return (
        <span className="inline-flex items-center gap-1 text-emerald-500 font-semibold">
          <Check className="h-4 w-4" /> Yes
        </span>
      );
    }
    if (trimmed === 'no' || trimmed === 'false' || trimmed === '✗') {
      return (
        <span className="inline-flex items-center gap-1 text-red-500 font-semibold">
          <X className="h-4 w-4" /> No
        </span>
      );
    }
    return <span className="text-foreground font-medium">{cell}</span>;
  };

  return (
    <div className="my-8 space-y-4">
      {block.title && (
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#ff8c00]" />
          <h3 className="text-xl font-bold text-foreground">{block.title}</h3>
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-border shadow-md">
        <table className="w-full text-left text-sm">
          <thead className="bg-gradient-to-r from-orange-500/15 via-orange-500/10 to-orange-500/5 text-xs font-extrabold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            <tr>
              {block.columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3.5 border-b border-border">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {block.rows && block.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="transition-colors hover:bg-orange-500/5"
              >
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-3.5 border-r last:border-r-0 border-border">
                    {renderCellContent(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
