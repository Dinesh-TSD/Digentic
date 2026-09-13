'use client';

import { ExternalLink } from 'lucide-react';

interface AffiliateProduct {
  id: string;
  name: string;
  description: string;
  link: string;
  icon?: string;
}

interface AffiliateLinksProps {
  products: AffiliateProduct[];
}

export function AffiliateLinks({ products }: AffiliateLinksProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-4 flex items-center gap-2 text-base font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">
        <span className="text-[#ff8c00]">🎁</span>
        Recommended Tools
      </h3>

      <div className="space-y-3">
        {products.map((product) => (
          <a
            key={product.id}
            href={product.link}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="
              group flex flex-col gap-2 rounded-lg
              border border-[#e0e0e0] bg-white p-3.5
              transition-all duration-200
              hover:border-[#ff8c00] hover:shadow-sm hover:shadow-[#ff8c00]/10
              dark:bg-[#111111] dark:border-[#1f1f1f] dark:hover:border-[#ff8c00]
            "
          >
            {/* Header row */}
            <div className="flex items-center gap-2">
              {product.icon && (
                <span className="text-xl leading-none">{product.icon}</span>
              )}
              <span className="flex-1 text-sm font-semibold text-[#ff8c00]">
                {product.name}
              </span>
              <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-[#999999] transition-colors group-hover:text-[#ff8c00] dark:text-[#64748b]" />
            </div>

            {/* Description */}
            <p className="line-clamp-2 text-xs leading-relaxed text-[#666666] dark:text-[#94a3b8]">
              {product.description}
            </p>

            {/* CTA button */}
            <span className="mt-1 inline-block self-start rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-3.5 py-1.5 text-xs font-semibold text-white transition-opacity group-hover:opacity-90">
              Check Price →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
