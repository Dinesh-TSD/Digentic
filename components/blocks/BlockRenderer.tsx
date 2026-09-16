import React from 'react';
import type { ContentBlock } from '@/types/blog';
import { HeroBlock } from './HeroBlock';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { GalleryBlock } from './GalleryBlock';
import { TableBlock } from './TableBlock';
import { QuoteBlock } from './QuoteBlock';
import { YoutubeBlock } from './YoutubeBlock';
import { CodeBlock } from './CodeBlock';
import { ToolListBlock } from './ToolListBlock';
import { ComparisonTableBlock } from './ComparisonTableBlock';
import { TimelineBlock } from './TimelineBlock';
import { ResourcesBlock } from './ResourcesBlock';
import { ProjectsBlock } from './ProjectsBlock';
import { FaqBlock } from './FaqBlock';
import { ConclusionBlock } from './ConclusionBlock';

export function RenderBlock({ block }: { block: ContentBlock }) {
  if (!block || !block.type) return null;

  switch (block.type) {
    case 'hero':
      return <HeroBlock block={block} />;
    case 'text':
      return <TextBlock block={block} />;
    case 'image':
      return <ImageBlock block={block} />;
    case 'gallery':
      return <GalleryBlock block={block} />;
    case 'table':
      return <TableBlock block={block} />;
    case 'quote':
      return <QuoteBlock block={block} />;
    case 'youtube':
      return <YoutubeBlock block={block} />;
    case 'code':
      return <CodeBlock block={block} />;
    case 'toolList':
      return <ToolListBlock block={block} />;
    case 'comparisonTable':
      return <ComparisonTableBlock block={block} />;
    case 'timeline':
      return <TimelineBlock block={block} />;
    case 'resources':
      return <ResourcesBlock block={block} />;
    case 'projects':
      return <ProjectsBlock block={block} />;
    case 'faq':
      return <FaqBlock block={block} />;
    case 'conclusion':
      return <ConclusionBlock block={block} />;
    default:
      console.warn(`Unknown block type: ${(block as any).type}`);
      return null;
  }
}

export function BlockRenderer({ blocks }: { blocks?: ContentBlock[] }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null;
  }

  return (
    <div className="dynamic-blocks space-y-6">
      {blocks.map((block, index) => (
        <React.Fragment key={block.id || `block-${index}`}>
          <RenderBlock block={block} />
        </React.Fragment>
      ))}
    </div>
  );
}

export default BlockRenderer;
