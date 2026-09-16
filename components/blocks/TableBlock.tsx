import React from 'react';
import type { TableBlockData } from '@/types/blog';

export function TableBlock({ block }: { block: TableBlockData }) {
  if (!block.columns || block.columns.length === 0) return null;

  return (
    <div className="my-8 space-y-3">
      {block.title && (
        <h3 className="text-xl font-bold text-foreground">{block.title}</h3>
      )}
      <div className="overflow-x-auto rounded-xl border border-border shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-orange-500/10 text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            <tr>
              {block.columns.map((col, idx) => (
                <th key={idx} className="px-4 py-3 border-b border-border">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {block.rows && block.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className="transition-colors hover:bg-muted/50"
              >
                {row.map((cell, cIdx) => (
                  <td key={cIdx} className="px-4 py-3 text-foreground whitespace-pre-wrap">
                    {cell}
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
