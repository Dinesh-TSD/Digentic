'use client';

import React, { useState } from 'react';
import type { ContentBlock, BlockType } from '@/types/blog';
import { BlockModalEditor } from './BlockModalEditors';
import {
  Plus,
  GripVertical,
  Edit2,
  Trash2,
  Sparkles,
  Type,
  Image as ImageIcon,
  Images,
  Table as TableIcon,
  Quote,
  Video,
  Code2,
  Wrench,
  Columns,
  Milestone,
  Bookmark,
  Layers,
  HelpCircle,
  Award,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

interface BlockBuilderProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

const BLOCK_DEFINITIONS: {
  type: BlockType;
  label: string;
  desc: string;
  icon: React.ElementType;
  defaultData: () => ContentBlock;
}[] = [
  {
    type: 'hero',
    label: 'Hero Block',
    desc: 'Add a beautiful hero section with title, subtitle, and image.',
    icon: Sparkles,
    defaultData: () => ({
      id: `hero-${Date.now()}`,
      type: 'hero',
      title: 'Top AI Innovations in 2026',
      subtitle: 'The comprehensive guide to cutting-edge artificial intelligence.',
      badge: 'Featured Guide',
      image: '',
    }),
  },
  {
    type: 'text',
    label: 'Text Block',
    desc: 'Add rich text content with headings and formatting.',
    icon: Type,
    defaultData: () => ({
      id: `text-${Date.now()}`,
      type: 'text',
      heading: 'Introduction & Key Concepts',
      content: '<p>Artificial intelligence in 2026 has transitioned from simple assistance to autonomous agentic workflows that redefine productivity.</p>',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
    }),
  },
  {
    type: 'toolList',
    label: 'Tool List Block',
    desc: 'Show list of AI tools with details, pros, and cons.',
    icon: Wrench,
    defaultData: () => ({
      id: `toolList-${Date.now()}`,
      type: 'toolList',
      title: 'Best AI Tools Ranked',
      tools: [
        {
          name: 'ChatGPT Plus',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/OpenAI_logo.svg',
          description: 'Multimodal generative assistant powered by GPT-4o.',
          bestFor: 'General Purpose & Writing',
          pricing: '$20/month',
          website: 'https://chatgpt.com',
          pros: ['Advanced reasoning', 'Code interpreter', 'Voice mode'],
          cons: ['Usage cap during peak hours'],
        },
        {
          name: 'Claude 3.5 Sonnet',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Anthropic_logo.svg',
          description: 'Industry-leading coding and agentic model by Anthropic.',
          bestFor: 'Full-Stack Coding & Analysis',
          pricing: 'Free / $20/mo Pro',
          website: 'https://claude.ai',
          pros: ['Exceptional code accuracy', 'Nuanced tone', 'Fast generation'],
          cons: ['Lower message limits on free tier'],
        },
      ],
    }),
  },
  {
    type: 'comparisonTable',
    label: 'Comparison Table Block',
    desc: 'Compare features, pricing, or other details in a table.',
    icon: Columns,
    defaultData: () => ({
      id: `comp-${Date.now()}`,
      type: 'comparisonTable',
      title: 'AI Assistants Comparison Matrix',
      columns: ['Feature', 'ChatGPT', 'Claude', 'Gemini'],
      rows: [
        ['Context Window', '128K', '200K', '2M'],
        ['Coding Accuracy', '96%', '99%', '95%'],
        ['Multimodal Audio', 'Yes', 'No', 'Yes'],
        ['API Pricing', 'Flexible', 'Cost-effective', 'Ultra-fast'],
      ],
      image: '',
    }),
  },
  {
    type: 'image',
    label: 'Image Block',
    desc: 'Add images with captions and responsive styling.',
    icon: ImageIcon,
    defaultData: () => ({
      id: `img-${Date.now()}`,
      type: 'image',
      url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'AI Architecture Diagram',
      caption: 'Figure 1: Neural network routing and tool calling framework.',
    }),
  },
  {
    type: 'code',
    label: 'Code Block',
    desc: 'Show code snippets with syntax styling and copy action.',
    icon: Code2,
    defaultData: () => ({
      id: `code-${Date.now()}`,
      type: 'code',
      title: 'server/api/agent.ts',
      language: 'typescript',
      code: `import { GoogleGenAI } from '@google/genai';\n\nconst ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });\n\nexport async function runAgent(prompt: string) {\n  const response = await ai.models.generateContent({\n    model: 'gemini-2.5-flash',\n    contents: prompt,\n  });\n  return response.text;\n}`,
    }),
  },
  {
    type: 'timeline',
    label: 'Timeline Block',
    desc: 'Create roadmaps or step-by-step career timelines.',
    icon: Milestone,
    defaultData: () => ({
      id: `time-${Date.now()}`,
      type: 'timeline',
      title: 'Step-by-Step AI Mastery Roadmap',
      items: [
        {
          title: 'Foundation in Python & TypeScript',
          description: 'Master asynchronous programming, API design, and data structures.',
          badge: 'Month 1',
        },
        {
          title: 'Prompt Engineering & LLM APIs',
          description: 'Learn structured outputs, system prompts, few-shot tuning, and function calling.',
          badge: 'Month 2',
        },
        {
          title: 'RAG & Vector Databases',
          description: 'Build retrieval-augmented generation systems with Pinecone and MongoDB Atlas Vector Search.',
          badge: 'Month 3',
        },
      ],
      image: '',
    }),
  },
  {
    type: 'resources',
    label: 'Resources Block',
    desc: 'Add useful links, repositories, and documentation.',
    icon: Bookmark,
    defaultData: () => ({
      id: `res-${Date.now()}`,
      type: 'resources',
      title: 'Essential Resources & Guides',
      items: [
        {
          title: 'Official LangChain Documentation',
          url: 'https://js.langchain.com',
          description: 'Complete documentation for agent workflows and memory.',
          type: 'doc',
        },
        {
          title: 'Next.js 15 Full-Stack Starter',
          url: 'https://github.com',
          description: 'Production-ready starter repository with Tailwind CSS.',
          type: 'website',
        },
      ],
      image: '',
    }),
  },
  {
    type: 'projects',
    label: 'Projects Block',
    desc: 'Feature portfolio-worthy projects with difficulty badges.',
    icon: Layers,
    defaultData: () => ({
      id: `proj-${Date.now()}`,
      type: 'projects',
      title: 'Hands-On Projects to Build',
      items: [
        {
          title: 'Autonomous Research Agent',
          difficulty: 'Intermediate',
          description: 'Build a multi-agent system that browses the web, summarizes papers, and creates reports.',
          techStack: ['Next.js', 'LangGraph', 'Gemini API', 'MongoDB'],
          githubUrl: 'https://github.com',
          liveUrl: 'https://digentic.tech',
        },
      ],
      image: '',
    }),
  },
  {
    type: 'faq',
    label: 'FAQ Block',
    desc: 'Add frequently asked questions with accordion toggles.',
    icon: HelpCircle,
    defaultData: () => ({
      id: `faq-${Date.now()}`,
      type: 'faq',
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'What is the fastest way to get started with AI development?',
          answer: 'Start by building small wrappers around OpenAI or Gemini APIs using TypeScript and Next.js before moving to complex agent frameworks.',
        },
      ],
      image: '',
    }),
  },
  {
    type: 'conclusion',
    label: 'Conclusion Block',
    desc: 'Add a summary or final call-to-action.',
    icon: Award,
    defaultData: () => ({
      id: `conc-${Date.now()}`,
      type: 'conclusion',
      title: 'Final Thoughts & Next Steps',
      content: '<p>The landscape of AI technology is evolving rapidly. By mastering dynamic architectures and practical tool integrations, you stay ahead of the curve.</p>',
      callToAction: {
        text: 'Join Our AI Masterclass',
        url: '/courses',
      },
      image: '',
    }),
  },
  {
    type: 'gallery',
    label: 'Gallery Block',
    desc: 'Add responsive multi-image photo galleries.',
    icon: Images,
    defaultData: () => ({
      id: `gal-${Date.now()}`,
      type: 'gallery',
      images: [
        { url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'AI Workspace 1', caption: 'Interface Preview' },
        { url: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'AI Workspace 2', caption: 'Data Dashboard' },
      ],
    }),
  },
  {
    type: 'table',
    label: 'Standard Table Block',
    desc: 'Add a structured data table with custom headers and cells.',
    icon: TableIcon,
    defaultData: () => ({
      id: `tbl-${Date.now()}`,
      type: 'table',
      title: 'Performance Benchmark',
      columns: ['Metric', 'GPT-4o', 'Claude 3.5', 'Gemini 2.5'],
      rows: [
        ['Latency', '320ms', '410ms', '220ms'],
        ['Throughput', '80 tok/s', '70 tok/s', '110 tok/s'],
      ],
      image: '',
    }),
  },
  {
    type: 'quote',
    label: 'Quote Block',
    desc: 'Add an inspiring quote or testimonial.',
    icon: Quote,
    defaultData: () => ({
      id: `q-${Date.now()}`,
      type: 'quote',
      quote: 'The future belongs to those who build with intelligence and relentless curiosity.',
      source: 'AI Pioneer',
      image: '',
    }),
  },
  {
    type: 'youtube',
    label: 'YouTube Block',
    desc: 'Embed a video player with custom caption.',
    icon: Video,
    defaultData: () => ({
      id: `yt-${Date.now()}`,
      type: 'youtube',
      videoId: 'dQw4w9WgXcQ',
      caption: 'Watch the full walkthrough tutorial.',
      image: '',
    }),
  },
];

export function BlockBuilder({ blocks, onChange }: BlockBuilderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<ContentBlock | null>(null);

  const addBlock = (def: typeof BLOCK_DEFINITIONS[0]) => {
    const newBlock = def.defaultData();
    onChange([...blocks, newBlock]);
    setDropdownOpen(false);
  };

  const removeBlock = (index: number) => {
    const updated = blocks.filter((_, i) => i !== index);
    onChange(updated);
  };

  const moveBlock = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= blocks.length) return;
    const updated = [...blocks];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onChange(updated);
  };

  const handleSaveBlock = (updated: ContentBlock) => {
    const index = blocks.findIndex((b) => b.id === updated.id);
    if (index !== -1) {
      const updatedList = [...blocks];
      updatedList[index] = updated;
      onChange(updatedList);
    }
    setEditingBlock(null);
  };

  const getBlockMeta = (type: BlockType) => {
    return BLOCK_DEFINITIONS.find((d) => d.type === type) || {
      type,
      label: `${type} block`,
      desc: 'Content block',
      icon: Sparkles,
    };
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-[#ff8c00]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">Dynamic Content Builder</h3>
            <p className="text-xs text-muted-foreground">Add and arrange content blocks to build your article</p>
          </div>
        </div>

        {/* Add Block Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#4f46e5] hover:to-[#7c3aed] px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:scale-105"
          >
            <Plus className="h-4 w-4" />
            <span>Add Block</span>
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full mt-2 z-40 w-72 max-h-96 overflow-y-auto rounded-xl border border-border bg-popover p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Choose Block Type
                </div>
                <div className="space-y-1">
                  {BLOCK_DEFINITIONS.map((def) => {
                    const Icon = def.icon;
                    return (
                      <button
                        key={def.type}
                        type="button"
                        onClick={() => addBlock(def)}
                        className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-xs transition-colors hover:bg-muted"
                      >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-orange-500/10 text-[#ff8c00]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-foreground truncate">{def.label}</p>
                          <p className="text-[10px] text-muted-foreground truncate">{def.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Blocks List */}
      {blocks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-8 text-center bg-muted/20">
          <Sparkles className="mx-auto h-8 w-8 text-muted-foreground/60 mb-2" />
          <p className="text-sm font-semibold text-foreground">No blocks added yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Click &ldquo;+ Add Block&rdquo; to build your structured article.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {blocks.map((block, idx) => {
            const meta = getBlockMeta(block.type);
            const Icon = meta.icon;

            return (
              <div
                key={block.id || idx}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3.5 transition-all hover:border-[#ff8c00]/50 hover:shadow-sm"
              >
                {/* Drag / Move handles */}
                <div className="flex items-center gap-2">
                  <div className="flex flex-col text-muted-foreground hover:text-foreground">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveBlock(idx, idx - 1)}
                      className="disabled:opacity-20 hover:text-[#ff8c00] transition-colors p-0.5"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === blocks.length - 1}
                      onClick={() => moveBlock(idx, idx + 1)}
                      className="disabled:opacity-20 hover:text-[#ff8c00] transition-colors p-0.5"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Icon badge */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-[#ff8c00]">
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Title & info */}
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-foreground">
                      {idx + 1}. {meta.label}
                    </h4>
                    <p className="text-[11px] text-muted-foreground truncate max-w-xs sm:max-w-md">
                      {(block as any).title || (block as any).heading || (block as any).quote || meta.desc}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditingBlock(block)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:border-[#ff8c00] hover:text-[#ff8c00] transition-colors"
                    title="Edit block content"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeBlock(idx)}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-background text-muted-foreground hover:border-red-500 hover:text-red-500 transition-colors"
                    title="Delete block"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      {editingBlock && (
        <BlockModalEditor
          block={editingBlock}
          onSave={handleSaveBlock}
          onClose={() => setEditingBlock(null)}
        />
      )}
    </div>
  );
}
