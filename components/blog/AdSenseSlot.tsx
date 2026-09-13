'use client';

export function AdSenseSlot() {
  return (
    <div className="mb-6">
      <div className="rounded-lg border border-[#e0e0e0] bg-white p-4 dark:bg-[#111111] dark:border-[#1f1f1f]">
        {/* Google AdSense Placeholder */}
        <div className="min-h-[250px] flex items-center justify-center text-center">
          <div>
            <p className="text-sm font-semibold text-[#666666] dark:text-[#94a3b8] mb-2">Advertisement</p>
            <p className="text-xs text-[#666666] dark:text-[#94a3b8]">Google AdSense Slot</p>
            <p className="text-xs text-orange-600 mt-2">300x250 or 300x600</p>
          </div>
        </div>
        {/* In production, replace with:
          <ins 
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
            data-ad-slot="xxxxxxxxxx"
            data-ad-format="auto"
            data-full-width-responsive="true">
          </ins>
        */}
      </div>
    </div>
  );
}
