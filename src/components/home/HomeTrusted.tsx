import React from 'react';
import { Star } from 'lucide-react';

export function HomeTrusted() {
  return (
    <section className="bg-gray-50 border-t border-b border-gray-200 py-4 lg:py-6 overflow-hidden">
      <div className="container-editorial">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">

          {/* Segment 1: Founders & Flags */}
          <div className="flex items-center gap-3 pt-4 lg:pt-0 pl-0">
            <span className="text-[0.8125rem] text-ink-500 font-medium whitespace-nowrap">
              Trusted by <strong className="text-ink-900 font-bold">10+ founders</strong> across
            </span>
            <div className="flex gap-1 text-lg">
              <span role="img" aria-label="US">🇺🇸</span>
              <span role="img" aria-label="UK">🇬🇧</span>
              <span role="img" aria-label="AU">🇦🇺</span>
              <span role="img" aria-label="AE">🇦🇪</span>
              <span role="img" aria-label="DE">🇩🇪</span>
              <span role="img" aria-label="IL">🇮🇱</span>
            </div>
          </div>

          {/* Segment 2: Delivery */}
          <div className="flex flex-col items-center lg:items-start pt-4 lg:pt-0 lg:pl-8">
            <span className="text-[0.9375rem] font-bold text-ink-900 leading-tight">Rapid Deployment</span>
            <span className="text-[0.75rem] text-ink-400 font-medium">Production-ready Systems</span>
          </div>

          {/* Segment 3: Code Ownership */}
          <div className="flex flex-col items-center lg:items-start pt-4 lg:pt-0 lg:pl-8">
            <span className="text-[0.9375rem] font-bold text-ink-900 leading-tight">100% IP Transfer</span>
            <span className="text-[0.75rem] text-ink-400 font-medium">Full Code Ownership</span>
          </div>

          {/* Segment 4: NDA */}
          <div className="flex flex-col items-center lg:items-start pt-4 lg:pt-0 lg:pl-8">
            <span className="text-[0.9375rem] font-bold text-ink-900 leading-tight">Day Zero NDA</span>
            <span className="text-[0.75rem] text-ink-400 font-medium">Total Confidentiality</span>
          </div>

          {/* Segment 5: Rating */}


        </div>
      </div>
    </section>
  );
}
