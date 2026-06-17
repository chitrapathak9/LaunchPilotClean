import React from 'react';
import { SolutionData } from '../../data/solutions';
import { AlertCircle, TrendingDown, Zap } from 'lucide-react';

interface SolutionEdgeCasesProps {
  solution: SolutionData;
}

export function SolutionEdgeCases({ solution }: SolutionEdgeCasesProps) {
  return (
    <section className="section-xl bg-white border-b border-gray-100 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-gray-50 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="container-editorial relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="section-overline justify-center inline-flex">Industry Edge Cases</div>
          <h2 className="heading-display mt-4 mb-6">
            The hidden revenue leaks in <br/>
            <span className="text-cobalt-600">your industry</span>.
          </h2>
          <p className="body-xl text-ink-500">
            Generic solutions fail at the edge cases. We specialize in solving the exact bottlenecks that are costing your specific industry millions.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10 max-w-6xl mx-auto">
          {solution.edgeCases.map((edgeCase, idx) => (
            <div 
              key={idx} 
              className="bg-white border border-gray-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Side: Industry & Problem */}
                <div className="lg:col-span-5 p-8 lg:p-12 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-100 flex flex-col justify-center relative overflow-hidden">
                  {/* Subtle inner shadow on the gray side */}
                  <div className="absolute inset-0 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.01)] pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-10 group-hover:border-cobalt-200 transition-colors">
                      <span className="w-2 h-2 rounded-full bg-cobalt-600 animate-pulse shadow-[0_0_8px_rgba(26,86,219,0.5)]" />
                      <span className="text-[0.75rem] font-bold tracking-widest uppercase text-ink-900">
                        {edgeCase.industry}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4 text-rose-600 font-bold text-[0.75rem] tracking-widest uppercase">
                      <AlertCircle size={16} strokeWidth={2.5} /> The Bottleneck
                    </div>
                    <h3 className="text-[1.375rem] lg:text-[1.5rem] text-ink-900 font-bold leading-snug tracking-tight">
                      {edgeCase.problem}
                    </h3>
                  </div>
                </div>

                {/* Right Side: Cost & Solution */}
                <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center bg-white relative">
                  
                  {/* Cost of Inaction Block */}
                  <div className="mb-12 relative pl-6 lg:pl-8">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-rose-500 rounded-full opacity-20 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-2 mb-3 text-rose-600 font-bold text-[0.75rem] tracking-widest uppercase">
                      <TrendingDown size={16} strokeWidth={2.5} /> Cost of Inaction
                    </div>
                    <p className="text-[1.125rem] text-ink-800 font-medium leading-relaxed">
                      {edgeCase.revenueLoss}
                    </p>
                  </div>

                  {/* Our Solution Block */}
                  <div className="relative pl-6 lg:pl-8">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-cobalt-600 rounded-full opacity-20 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-2 mb-3 text-cobalt-600 font-bold text-[0.75rem] tracking-widest uppercase">
                      <Zap size={16} strokeWidth={2.5} /> Our Solution
                    </div>
                    <p className="text-[1.125rem] text-ink-600 leading-relaxed">
                      {edgeCase.solution}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
