'use client';

import React, { useState } from 'react';
import type {
  ContentBlock,
  HeroBlockData,
  TextBlockData,
  ImageBlockData,
  GalleryBlockData,
  TableBlockData,
  QuoteBlockData,
  YoutubeBlockData,
  CodeBlockData,
  ToolListBlockData,
  ComparisonTableBlockData,
  TimelineBlockData,
  ResourcesBlockData,
  ProjectsBlockData,
  FaqBlockData,
  ConclusionBlockData,
} from '@/types/blog';
import { X, Plus, Trash2 } from 'lucide-react';

interface BlockEditorProps {
  block: ContentBlock;
  onSave: (updatedBlock: ContentBlock) => void;
  onClose: () => void;
}

export function BlockModalEditor({ block, onSave, onClose }: BlockEditorProps) {
  const [formData, setFormData] = useState<ContentBlock>(JSON.parse(JSON.stringify(block)));

  const handleUpdate = (fields: Partial<ContentBlock>) => {
    setFormData((prev) => ({ ...prev, ...fields } as ContentBlock));
  };

  const renderFields = () => {
    switch (formData.type) {
      case 'hero': {
        const b = formData as HeroBlockData;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Title *</label>
              <input
                type="text"
                value={b.title || ''}
                onChange={(e) => handleUpdate({ title: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Hero Headline"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Subtitle</label>
              <input
                type="text"
                value={b.subtitle || ''}
                onChange={(e) => handleUpdate({ subtitle: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Supporting description"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Badge Text</label>
              <input
                type="text"
                value={b.badge || ''}
                onChange={(e) => handleUpdate({ badge: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="e.g., Ultimate Guide 2026"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Hero Image URL</label>
              <input
                type="text"
                value={b.image || ''}
                onChange={(e) => handleUpdate({ image: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="https://..."
              />
            </div>
          </div>
        );
      }

      case 'text': {
        const b = formData as TextBlockData;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Section Heading (Optional)</label>
              <input
                type="text"
                value={b.heading || ''}
                onChange={(e) => handleUpdate({ heading: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Heading 2"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Content (HTML or Text) *</label>
              <textarea
                rows={6}
                value={b.content || ''}
                onChange={(e) => handleUpdate({ content: e.target.value })}
                className="w-full font-mono rounded-lg border border-border bg-background p-3 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="<p>Write your detailed section content here...</p>"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Featured Image *</label>
              <input
                type="text"
                value={b.image || ''}
                onChange={(e) => handleUpdate({ image: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">Required: Add a featured image URL for this text block</p>
            </div>
          </div>
        );
      }

      case 'image': {
        const b = formData as ImageBlockData;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Image URL *</label>
              <input
                type="text"
                value={b.url || ''}
                onChange={(e) => handleUpdate({ url: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Alt Text</label>
              <input
                type="text"
                value={b.alt || ''}
                onChange={(e) => handleUpdate({ alt: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Descriptive alt text"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Caption</label>
              <input
                type="text"
                value={b.caption || ''}
                onChange={(e) => handleUpdate({ caption: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Image caption"
              />
            </div>
          </div>
        );
      }

      case 'code': {
        const b = formData as CodeBlockData;
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Title / File</label>
                <input
                  type="text"
                  value={b.title || ''}
                  onChange={(e) => handleUpdate({ title: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                  placeholder="e.g., app/api/route.ts"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Language</label>
                <input
                  type="text"
                  value={b.language || 'typescript'}
                  onChange={(e) => handleUpdate({ language: e.target.value })}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                  placeholder="typescript / python / bash"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Code *</label>
              <textarea
                rows={8}
                value={b.code || ''}
                onChange={(e) => handleUpdate({ code: e.target.value })}
                className="w-full font-mono rounded-lg border border-border bg-background p-3 text-xs sm:text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="console.log('Hello World');"
              />
            </div>
          </div>
        );
      }

      case 'quote': {
        const b = formData as QuoteBlockData;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Quote *</label>
              <textarea
                rows={4}
                value={b.quote || ''}
                onChange={(e) => handleUpdate({ quote: e.target.value })}
                className="w-full rounded-lg border border-border bg-background p-3 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="The inspirational quote..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Author / Source</label>
              <input
                type="text"
                value={b.source || ''}
                onChange={(e) => handleUpdate({ source: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Sam Altman, CEO of OpenAI"
              />
            </div>
          </div>
        );
      }

      case 'youtube': {
        const b = formData as YoutubeBlockData;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">YouTube Video ID or URL *</label>
              <input
                type="text"
                value={b.videoId || ''}
                onChange={(e) => handleUpdate({ videoId: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="dQw4w9WgXcQ or https://youtube.com/watch?v=..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Caption</label>
              <input
                type="text"
                value={b.caption || ''}
                onChange={(e) => handleUpdate({ caption: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Video demonstration"
              />
            </div>
          </div>
        );
      }

      case 'toolList': {
        const b = formData as ToolListBlockData;
        const tools = b.tools || [];

        const addTool = () => {
          const newTools = [
            ...tools,
            {
              name: 'New AI Tool',
              logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/OpenAI_logo.svg',
              description: 'Powerful AI capability for workflows.',
              bestFor: 'Developers',
              pricing: 'Freemium',
              website: 'https://',
              pros: ['Fast response', 'Easy API'],
              cons: ['Paid tier needed for high volume'],
            },
          ];
          handleUpdate({ tools: newTools } as any);
        };

        const removeTool = (idx: number) => {
          handleUpdate({ tools: tools.filter((_, i) => i !== idx) } as any);
        };

        const updateTool = (idx: number, field: string, val: any) => {
          const updated = [...tools];
          updated[idx] = { ...updated[idx], [field]: val };
          handleUpdate({ tools: updated } as any);
        };

        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Section Title</label>
              <input
                type="text"
                value={b.title || ''}
                onChange={(e) => handleUpdate({ title: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Top AI Tools in 2026"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tools List ({tools.length})
              </span>
              <button
                type="button"
                onClick={addTool}
                className="inline-flex items-center gap-1 rounded-md bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-[#ff8c00] hover:bg-orange-500/20"
              >
                <Plus className="h-3.5 w-3.5" /> Add Tool
              </button>
            </div>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {tools.map((t, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-3.5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ff8c00]">#{idx + 1} Tool</span>
                    <button
                      type="button"
                      onClick={() => removeTool(idx)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => updateTool(idx, 'name', e.target.value)}
                      placeholder="Tool Name"
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                    />
                    <input
                      type="text"
                      value={t.bestFor || ''}
                      onChange={(e) => updateTool(idx, 'bestFor', e.target.value)}
                      placeholder="Best For (e.g. Coding)"
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <input
                      type="text"
                      value={t.logo}
                      onChange={(e) => updateTool(idx, 'logo', e.target.value)}
                      placeholder="Logo URL *"
                      className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                    />
                    <p className="text-[11px] text-muted-foreground">Required: Add logo image URL for this tool</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={t.pricing || ''}
                      onChange={(e) => updateTool(idx, 'pricing', e.target.value)}
                      placeholder="Pricing (e.g. Free / $20/mo)"
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                    />
                    <input
                      type="text"
                      value={t.website || ''}
                      onChange={(e) => updateTool(idx, 'website', e.target.value)}
                      placeholder="Website URL"
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={t.description}
                    onChange={(e) => updateTool(idx, 'description', e.target.value)}
                    placeholder="Tool description..."
                    className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'comparisonTable':
      case 'table': {
        const b = formData as ComparisonTableBlockData;
        const cols = b.columns || ['Tool', 'Pricing', 'API Access', 'Accuracy'];
        const rows = b.rows || [
          ['ChatGPT Plus', '$20/mo', 'Yes', '98%'],
          ['Claude Pro', '$20/mo', 'Yes', '99%'],
        ];

        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Table Title</label>
              <input
                type="text"
                value={b.title || ''}
                onChange={(e) => handleUpdate({ title: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Comparison Matrix"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Columns (Comma-separated)
              </label>
              <input
                type="text"
                value={cols.join(', ')}
                onChange={(e) =>
                  handleUpdate({
                    columns: e.target.value.split(',').map((c) => c.trim()),
                  } as any)
                }
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">
                Rows (One line per row, cells comma-separated)
              </label>
              <textarea
                rows={5}
                value={rows.map((r) => r.join(', ')).join('\n')}
                onChange={(e) =>
                  handleUpdate({
                    rows: e.target.value
                      .split('\n')
                      .filter(Boolean)
                      .map((l) => l.split(',').map((c) => c.trim())),
                  } as any)
                }
                className="w-full font-mono rounded-lg border border-border bg-background p-3 text-xs sm:text-sm text-foreground outline-none focus:border-[#ff8c00]"
              />
            </div>
          </div>
        );
      }

      case 'timeline': {
        const b = formData as TimelineBlockData;
        const items = b.items || [];

        const addItem = () => {
          handleUpdate({
            items: [
              ...items,
              { title: `Step ${items.length + 1}: Milestone`, description: 'Step description', badge: 'Phase 1' },
            ],
          } as any);
        };

        const updateItem = (idx: number, field: string, val: string) => {
          const updated = [...items];
          updated[idx] = { ...updated[idx], [field]: val };
          handleUpdate({ items: updated } as any);
        };

        const removeItem = (idx: number) => {
          handleUpdate({ items: items.filter((_, i) => i !== idx) } as any);
        };

        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Timeline Title</label>
              <input
                type="text"
                value={b.title || ''}
                onChange={(e) => handleUpdate({ title: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Full-Stack AI Developer Roadmap"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Milestones ({items.length})
              </span>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 rounded-md bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-[#ff8c00] hover:bg-orange-500/20"
              >
                <Plus className="h-3.5 w-3.5" /> Add Step
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {items.map((it, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ff8c00]">Step #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={it.title}
                      onChange={(e) => updateItem(idx, 'title', e.target.value)}
                      placeholder="Step Title"
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                    />
                    <input
                      type="text"
                      value={it.badge || ''}
                      onChange={(e) => updateItem(idx, 'badge', e.target.value)}
                      placeholder="Badge (e.g. Month 1)"
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                    />
                  </div>
                  <textarea
                    rows={2}
                    value={it.description}
                    onChange={(e) => updateItem(idx, 'description', e.target.value)}
                    placeholder="Description..."
                    className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'resources': {
        const b = formData as ResourcesBlockData;
        const items = b.items || [];

        const addItem = () => {
          handleUpdate({
            items: [
              ...items,
              { title: 'Resource Link', url: 'https://', description: 'Useful guide', type: 'doc' },
            ],
          } as any);
        };

        const updateItem = (idx: number, field: string, val: string) => {
          const updated = [...items];
          updated[idx] = { ...updated[idx], [field]: val };
          handleUpdate({ items: updated } as any);
        };

        const removeItem = (idx: number) => {
          handleUpdate({ items: items.filter((_, i) => i !== idx) } as any);
        };

        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Section Title</label>
              <input
                type="text"
                value={b.title || ''}
                onChange={(e) => handleUpdate({ title: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Helpful Resources"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Resources ({items.length})
              </span>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 rounded-md bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-[#ff8c00] hover:bg-orange-500/20"
              >
                <Plus className="h-3.5 w-3.5" /> Add Resource
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {items.map((it, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ff8c00]">Resource #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={it.title}
                      onChange={(e) => updateItem(idx, 'title', e.target.value)}
                      placeholder="Title"
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                    />
                    <input
                      type="text"
                      value={it.url}
                      onChange={(e) => updateItem(idx, 'url', e.target.value)}
                      placeholder="https://..."
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                    />
                  </div>
                  <input
                    type="text"
                    value={it.description || ''}
                    onChange={(e) => updateItem(idx, 'description', e.target.value)}
                    placeholder="Short description"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'faq': {
        const b = formData as FaqBlockData;
        const items = b.items || [];

        const addItem = () => {
          handleUpdate({
            items: [
              ...items,
              { question: 'What is the best AI tool in 2026?', answer: 'ChatGPT, Claude, and Gemini lead the field.' },
            ],
          } as any);
        };

        const updateItem = (idx: number, field: string, val: string) => {
          const updated = [...items];
          updated[idx] = { ...updated[idx], [field]: val };
          handleUpdate({ items: updated } as any);
        };

        const removeItem = (idx: number) => {
          handleUpdate({ items: items.filter((_, i) => i !== idx) } as any);
        };

        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">FAQ Section Title</label>
              <input
                type="text"
                value={b.title || ''}
                onChange={(e) => handleUpdate({ title: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Frequently Asked Questions"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Questions ({items.length})
              </span>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-1 rounded-md bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-[#ff8c00] hover:bg-orange-500/20"
              >
                <Plus className="h-3.5 w-3.5" /> Add Question
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {items.map((it, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ff8c00]">Q#{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeItem(idx)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={it.question}
                    onChange={(e) => updateItem(idx, 'question', e.target.value)}
                    placeholder="Question?"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                  <textarea
                    rows={2}
                    value={it.answer}
                    onChange={(e) => updateItem(idx, 'answer', e.target.value)}
                    placeholder="Answer..."
                    className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'conclusion': {
        const b = formData as ConclusionBlockData;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Conclusion Title</label>
              <input
                type="text"
                value={b.title || ''}
                onChange={(e) => handleUpdate({ title: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Final Thoughts"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Content (HTML or Text) *</label>
              <textarea
                rows={5}
                value={b.content || ''}
                onChange={(e) => handleUpdate({ content: e.target.value })}
                className="w-full font-mono rounded-lg border border-border bg-background p-3 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="<p>Summary of the article and recommendation...</p>"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={b.callToAction?.text || ''}
                  onChange={(e) =>
                    handleUpdate({
                      callToAction: { text: e.target.value, url: b.callToAction?.url || '/#newsletter' },
                    })
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                  placeholder="Get Started with AI"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">CTA Button URL</label>
                <input
                  type="text"
                  value={b.callToAction?.url || ''}
                  onChange={(e) =>
                    handleUpdate({
                      callToAction: { text: b.callToAction?.text || 'Explore', url: e.target.value },
                    })
                  }
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                  placeholder="/courses"
                />
              </div>
            </div>
          </div>
        );
      }

      case 'gallery': {
        const b = formData as GalleryBlockData;
        const images = b.images || [];

        const addImage = () => {
          handleUpdate({
            images: [
              ...images,
              { url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'New Image', caption: '' },
            ],
          } as any);
        };

        const removeImage = (idx: number) => {
          handleUpdate({ images: images.filter((_, i) => i !== idx) } as any);
        };

        const updateImage = (idx: number, field: string, val: string) => {
          const updated = [...images];
          updated[idx] = { ...updated[idx], [field]: val };
          handleUpdate({ images: updated } as any);
        };

        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Gallery Images ({images.length})
              </span>
              <button
                type="button"
                onClick={addImage}
                className="inline-flex items-center gap-1 rounded-md bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-[#ff8c00] hover:bg-orange-500/20"
              >
                <Plus className="h-3.5 w-3.5" /> Add Image
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {images.map((img, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ff8c00]">Image #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={img.url}
                    onChange={(e) => updateImage(idx, 'url', e.target.value)}
                    placeholder="Image URL (https://...)"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                  <input
                    type="text"
                    value={img.alt}
                    onChange={(e) => updateImage(idx, 'alt', e.target.value)}
                    placeholder="Alt text for accessibility"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                  <input
                    type="text"
                    value={img.caption || ''}
                    onChange={(e) => updateImage(idx, 'caption', e.target.value)}
                    placeholder="Caption (optional)"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'projects': {
        const b = formData as ProjectsBlockData;
        const items = b.items || [];

        const addProject = () => {
          handleUpdate({
            items: [
              ...items,
              { title: 'New Project', difficulty: 'Beginner', description: 'Project description', techStack: [] },
            ],
          } as any);
        };

        const removeProject = (idx: number) => {
          handleUpdate({ items: items.filter((_, i) => i !== idx) } as any);
        };

        const updateProject = (idx: number, field: string, val: any) => {
          const updated = [...items];
          updated[idx] = { ...updated[idx], [field]: val };
          handleUpdate({ items: updated } as any);
        };

        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Section Title</label>
              <input
                type="text"
                value={b.title || ''}
                onChange={(e) => handleUpdate({ title: e.target.value })}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-[#ff8c00]"
                placeholder="Featured Projects"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Projects ({items.length})
              </span>
              <button
                type="button"
                onClick={addProject}
                className="inline-flex items-center gap-1 rounded-md bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-[#ff8c00] hover:bg-orange-500/20"
              >
                <Plus className="h-3.5 w-3.5" /> Add Project
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {items.map((proj, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ff8c00]">Project #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeProject(idx)}
                      className="text-red-500 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={proj.title}
                    onChange={(e) => updateProject(idx, 'title', e.target.value)}
                    placeholder="Project title"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                  <input
                    type="text"
                    value={proj.difficulty || ''}
                    onChange={(e) => updateProject(idx, 'difficulty', e.target.value)}
                    placeholder="Difficulty (Beginner/Intermediate/Advanced)"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                  <textarea
                    rows={2}
                    value={proj.description || ''}
                    onChange={(e) => updateProject(idx, 'description', e.target.value)}
                    placeholder="Project description..."
                    className="w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                  <input
                    type="text"
                    value={(proj.techStack || []).join(', ')}
                    onChange={(e) => updateProject(idx, 'techStack', e.target.value.split(',').map((t: string) => t.trim()))}
                    placeholder="Tech stack (comma-separated)"
                    className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={proj.githubUrl || ''}
                      onChange={(e) => updateProject(idx, 'githubUrl', e.target.value)}
                      placeholder="GitHub URL"
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                    />
                    <input
                      type="text"
                      value={proj.liveUrl || ''}
                      onChange={(e) => updateProject(idx, 'liveUrl', e.target.value)}
                      placeholder="Live Demo URL"
                      className="rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-[#ff8c00]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      default:
        return (
          <div className="text-xs text-muted-foreground">
            Generic JSON editor:
            <textarea
              rows={8}
              value={JSON.stringify(formData, null, 2)}
              onChange={(e) => {
                try {
                  setFormData(JSON.parse(e.target.value));
                } catch {}
              }}
              className="mt-2 w-full font-mono text-xs rounded-lg border border-border bg-background p-3"
            />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-6 py-4">
          <h3 className="font-bold text-foreground capitalize">
            Edit {formData.type} Block
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{renderFields()}</div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border bg-muted/20 px-6 py-3.5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSave(formData)}
            className="rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-5 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/20 transition-transform hover:scale-105"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
}
