import React from 'react';
import { FadeUp } from './FadeUp';
import { IconCheck, IconX } from '@tabler/icons-react';

export function Comparison() {
  const comparisonData = [
    { label: 'Cost', agency: '$30,000+', us: 'Fixed price' },
    { label: 'Timeline', agency: '3–6 months', us: '21 days' },
    { label: 'NDA protection', agency: 'Optional / extra cost', us: 'Before first call' },
    { label: 'Code ownership', agency: 'Varies / licensed', us: '100% yours' },
    { label: 'Communication', agency: 'Bi-weekly meetings', us: 'Daily Slack updates' },
    { label: 'Scope changes', agency: 'Extra invoice', us: 'Handled upfront' },
    { label: 'Payment terms', agency: 'Milestone deposits', us: 'Fixed, upfront clarity' },
    { label: 'Post-launch', agency: 'Expensive retainer', us: '30 days included' },
  ];

  return (
    <section className="py-24 bg-cream border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeUp delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 inline-block">
              Why us
            </span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-6 tracking-tight">
              Why not just hire an agency?
            </h2>
          </FadeUp>
        </div>

        {/* Comparison grid: 2 cards side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Traditional Agency Card */}
          <FadeUp delay={0.3}>
            <div className="bg-white border border-zinc-200 rounded-2xl p-8 relative shadow-sm">
              <div className="flex justify-between items-center pb-6 border-b border-zinc-200 mb-6">
                <h3 className="text-lg font-bold text-zinc-500">
                  Traditional agency
                </h3>
                <span className="bg-zinc-100 text-zinc-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Slow & Vague
                </span>
              </div>

              <div className="space-y-2">
                {comparisonData.map((row, idx) => (
                  <div 
                    key={idx}
                    className="flex justify-between items-center py-4 border-b border-zinc-100 last:border-0 text-sm font-semibold"
                  >
                    <span className="text-zinc-400">
                      {row.label}
                    </span>
                    <span className="text-zinc-600 flex items-center gap-2">
                      <IconX className="text-red-500 shrink-0" size={16} />
                      {row.agency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* LaunchAIPilot Card (Featured Winner) */}
          <FadeUp delay={0.4}>
            <div className="bg-white border-2 border-violet-600 rounded-2xl p-8 relative shadow-md">
              <div className="flex justify-between items-center pb-6 border-b border-zinc-200 mb-6">
                <h3 className="text-lg font-bold text-zinc-900">
                  LaunchAIPilot
                </h3>
                <span className="bg-violet-100 text-violet-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-violet-200/50">
                  Recommended
                </span>
              </div>

              <div className="space-y-2">
                {comparisonData.map((row, idx) => (
                  <div 
                    key={idx}
                    className="flex justify-between items-center py-4 border-b border-zinc-100 last:border-0 text-sm font-semibold"
                  >
                    <span className="text-zinc-655">
                      {row.label}
                    </span>
                    <span className="text-zinc-900 flex items-center gap-2 font-bold">
                      <IconCheck className="text-violet-600 shrink-0" size={16} />
                      {row.us}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

        </div>

      </div>
    </section>
  );
}
