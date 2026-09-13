'use client';

import Link from 'next/link';

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
        <span>🎁</span>
        Recommended Tools
      </h3>
      <div className="space-y-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-[#e0e0e0] bg-white p-3 transition-all hover:bg-orange-600 hover:text-white dark:bg-[#111111] dark:border-[#1f1f1f] dark:hover:bg-orange-600 dark:hover:text-white"
          >
            <p className="font-medium text-orange-600 hover:text-white transition-colors">
              {product.name}
            </p>
            <p className="mt-1 line-clamp-2 text-xs text-[#666666] dark:text-[#94a3b8]">
              {product.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
