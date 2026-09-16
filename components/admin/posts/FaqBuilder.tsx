'use client';

import React, { useState } from 'react';
import type { FaqItem } from '@/types/blog';
import { HelpCircle, Plus, Edit2, Trash2, Check, X } from 'lucide-react';

interface FaqBuilderProps {
  faq: FaqItem[];
  onChange: (faq: FaqItem[]) => void;
}

export function FaqBuilder({ faq, onChange }: FaqBuilderProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [qText, setQText] = useState('');
  const [aText, setAText] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const startAdd = () => {
    setIsAdding(true);
    setQText('');
    setAText('');
    setEditingIndex(null);
  };

  const startEdit = (idx: number) => {
    setEditingIndex(idx);
    setQText(faq[idx].question);
    setAText(faq[idx].answer);
    setIsAdding(false);
  };

  const saveItem = () => {
    if (!qText.trim() || !aText.trim()) return;

    if (isAdding) {
      onChange([...faq, { question: qText.trim(), answer: aText.trim() }]);
      setIsAdding(false);
    } else if (editingIndex !== null) {
      const updated = [...faq];
      updated[editingIndex] = { question: qText.trim(), answer: aText.trim() };
      onChange(updated);
      setEditingIndex(null);
    }
    setQText('');
    setAText('');
  };

  const removeItem = (idx: number) => {
    onChange(faq.filter((_, i) => i !== idx));
    if (editingIndex === idx) setEditingIndex(null);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-[#ff8c00]">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">FAQ Settings</h3>
            <p className="text-xs text-muted-foreground">Add frequently asked questions for this article</p>
          </div>
        </div>

        <button
          type="button"
          onClick={startAdd}
          className="inline-flex items-center gap-1.5 rounded-xl border border-orange-500/30 bg-orange-500/10 hover:bg-orange-500/20 px-3.5 py-1.5 text-xs font-bold text-[#ff8c00] transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      {/* Inline Form if adding or editing */}
      {(isAdding || editingIndex !== null) && (
        <div className="rounded-xl border border-[#ff8c00]/40 bg-muted/30 p-4 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#ff8c00]">
              {isAdding ? 'New Question' : `Editing Question #${(editingIndex ?? 0) + 1}`}
            </span>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingIndex(null);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <input
            type="text"
            value={qText}
            onChange={(e) => setQText(e.target.value)}
            placeholder="e.g., Which AI tool is best in 2026?"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs sm:text-sm text-foreground outline-none focus:border-[#ff8c00]"
          />
          <textarea
            rows={3}
            value={aText}
            onChange={(e) => setAText(e.target.value)}
            placeholder="e.g., ChatGPT, Claude, and Gemini are the leading general-purpose AI assistants."
            className="w-full rounded-lg border border-border bg-background p-3 text-xs sm:text-sm text-foreground outline-none focus:border-[#ff8c00]"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setEditingIndex(null);
              }}
              className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveItem}
              className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-4 py-1.5 text-xs font-bold text-white shadow-sm"
            >
              <Check className="h-3.5 w-3.5" /> Save Question
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      {faq.length === 0 ? (
        <p className="text-xs text-muted-foreground italic py-2 text-center">
          No FAQs added yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-muted/50 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
              <tr>
                <th className="px-3 py-2.5 w-12 text-center">#</th>
                <th className="px-3 py-2.5 w-1/3">Question</th>
                <th className="px-3 py-2.5">Answer</th>
                <th className="px-3 py-2.5 w-20 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {faq.map((item, idx) => (
                <tr key={idx} className="hover:bg-muted/30 transition-colors">
                  <td className="px-3 py-2.5 text-center font-mono font-semibold text-muted-foreground">
                    {idx + 1}
                  </td>
                  <td className="px-3 py-2.5 font-medium text-foreground">
                    {item.question}
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground line-clamp-2">
                    {item.answer}
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => startEdit(idx)}
                        className="rounded p-1 text-muted-foreground hover:text-[#ff8c00] hover:bg-muted"
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="rounded p-1 text-muted-foreground hover:text-red-500 hover:bg-muted"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
