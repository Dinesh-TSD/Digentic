'use client';

type AdPosition = 'top' | 'mid' | 'bottom' | 'sidebar' | 'inline';

interface AdSenseSlotProps {
  /** Visual position hint — controls the placeholder size and label */
  position?: AdPosition;
  /** AdSense publisher ID (e.g. "ca-pub-0000000000000000") */
  publisherId?: string;
  /** AdSense ad slot ID */
  adSlot?: string;
}

const POSITION_CONFIG: Record<
  AdPosition,
  { label: string; mobileHeight: string; desktopHeight: string; format: string }
> = {
  top: {
    label: 'Top Banner',
    mobileHeight: 'h-[50px] sm:h-[90px]',
    desktopHeight: 'lg:h-[90px]',
    format: '728x90 / 320x50',
  },
  mid: {
    label: 'Mid Banner',
    mobileHeight: 'h-[250px]',
    desktopHeight: 'lg:h-[90px]',
    format: '728x90 / 300x250',
  },
  bottom: {
    label: 'Bottom Banner',
    mobileHeight: 'h-[50px] sm:h-[90px]',
    desktopHeight: 'lg:h-[90px]',
    format: '728x90 / 320x50',
  },
  sidebar: {
    label: 'Sidebar',
    mobileHeight: 'h-[250px]',
    desktopHeight: 'lg:h-[600px]',
    format: '300x250 / 300x600',
  },
  inline: {
    label: 'Inline',
    mobileHeight: 'h-[250px]',
    desktopHeight: 'lg:h-[250px]',
    format: '300x250',
  },
};

export function AdSenseSlot({
  position = 'inline',
  publisherId,
  adSlot,
}: AdSenseSlotProps) {
  const config = POSITION_CONFIG[position];

  // When real credentials are provided, render the actual AdSense ins tag.
  // The script initialisation (adsbygoogle.push({})) should be handled globally
  // in your layout or a dedicated useEffect — not repeated per-slot.
  if (publisherId && adSlot) {
    return (
      <div className="mb-6 w-full overflow-hidden">
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={publisherId}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // ── Development / placeholder ───────────────────────────────────────────
  return (
    <div className="mb-6 w-full">
      <div
        className={`
          flex w-full items-center justify-center rounded-lg
          border border-dashed border-[#e0e0e0] bg-white
          dark:border-[#1f1f1f] dark:bg-[#111111]
          ${config.mobileHeight} ${config.desktopHeight}
          transition-colors
        `}
        role="complementary"
        aria-label={`Advertisement — ${config.label}`}
      >
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#666666] dark:text-[#94a3b8]">
            Advertisement
          </p>
          <p className="mt-1 text-xs text-[#999999] dark:text-[#64748b]">Google AdSense — {config.label}</p>
          <p className="mt-1 text-[10px] font-medium text-[#ff8c00]/70">{config.format}</p>
        </div>
      </div>
    </div>
  );
}
