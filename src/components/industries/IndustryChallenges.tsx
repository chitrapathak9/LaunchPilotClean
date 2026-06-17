import React from 'react';
import { IndustryData } from '../../data/industries';
import { AlertCircle } from 'lucide-react';

interface IndustryChallengesProps {
  industry: IndustryData;
}

export function IndustryChallenges({ industry }: IndustryChallengesProps) {
  return (
    <section className="section-xl bg-white border-b border-gray-100">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* Left Column - Marketing Content */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="section-overline mb-4">Deep Domain Expertise</div>
            <h2 className="heading-lg text-ink-900 mb-6">
              Generic software kills <span className="text-cobalt-600">revenue</span>.
            </h2>
            <div className="prose prose-lg prose-ink max-w-none">
              <p className="text-[1.125rem] leading-relaxed text-ink-600">
                {industry.marketingContent}
              </p>
            </div>
          </div>

          {/* Right Column - Core Challenges List */}
          <div className="lg:col-span-6 bg-gray-50 border border-gray-200 rounded-[2rem] p-8 lg:p-12 shadow-sm">
            <h3 className="text-[1.25rem] font-bold text-ink-900 mb-8 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertCircle size={20} strokeWidth={2.5} />
              </span>
              The structural failures we solve:
            </h3>
            
            <ul className="space-y-6">
              {industry.coreChallenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <span className="mt-1 w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                  </span>
                  <span className="text-[1.0625rem] text-ink-700 leading-relaxed font-medium">
                    {challenge}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
