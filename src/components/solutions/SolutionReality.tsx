import React from 'react';
import { SolutionData } from '../../data/solutions';
import { X, Check } from 'lucide-react';

interface SolutionRealityProps {
  solution: SolutionData;
}

export function SolutionReality({ solution }: SolutionRealityProps) {
  return (
    <section className="section-xl bg-gray-50 border-b border-gray-100">
      <div className="container-content">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="section-overline justify-center inline-flex">The Industry Reality</div>
          <h2 className="heading-display mt-4 mb-6">
            Why other agencies fail at <br />
            <span className="text-cobalt-600">{solution.name.toLowerCase()}</span>.
          </h2>
          <p className="body-xl text-ink-500">
            We've taken over enough failed projects to know exactly where traditional agencies go wrong. Here is how our approach guarantees your success.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Traditional Approach (The Problem) */}
          <div className="bg-white rounded-[2rem] p-8 lg:p-12 shadow-sm border border-rose-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
                  <X size={20} strokeWidth={2.5} />
                </div>
                <h3 className="text-[1.375rem] font-bold text-ink-900">Traditional Agency</h3>
              </div>

              <ul className="space-y-6">
                {solution.traditionalApproach.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="mt-1 w-6 h-6 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                      <X size={14} className="text-rose-500" strokeWidth={3} />
                    </span>
                    <span className="text-[1.0625rem] text-ink-600 leading-relaxed font-medium">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Our Approach (The Solution) */}
          <div className="bg-ink-900 rounded-[2rem] p-8 lg:p-12 shadow-xl border border-ink-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cobalt-500/20 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 dot-grid-dark opacity-30 pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-cobalt-500/20 flex items-center justify-center text-cobalt-400">
                  <Check size={20} strokeWidth={2.5} />
                </div>
                <h3 className="text-[1.375rem] font-bold text-white">Launch AI Pilot</h3>
              </div>

              <ul className="space-y-6">
                {solution.ourApproach.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <span className="mt-1 w-6 h-6 rounded-full bg-cobalt-500/20 flex items-center justify-center shrink-0">
                      <Check size={14} className="text-cobalt-400" strokeWidth={3} />
                    </span>
                    <span className="text-[1.0625rem] text-white/80 leading-relaxed font-medium">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
