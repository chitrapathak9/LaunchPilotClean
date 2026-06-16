import React from 'react';
import { RouteOff, FileWarning, EyeOff } from 'lucide-react';

export function HomeProblem() {
  const problems = [
    {
      title: 'Wrong AI Tooling',
      description: 'The market is flooded with shiny AI products. Businesses waste months trying to integrate off-the-shelf tools that don\'t actually solve their core operational bottlenecks, leading to massive technical debt.',
      icon: <FileWarning size={24} />
    },
    {
      title: 'Lack of Clear Direction',
      description: 'Without a focused technical roadmap, AI projects turn into endless R&D experiments with no clear path to production or positive ROI. Momentum stalls and resources are burned.',
      icon: <RouteOff size={24} />
    },
    {
      title: 'Traditional Agencies',
      description: 'Traditional agencies take months and charge exorbitant fees just to understand your business. They build bloated, generic architectures because they lack deep, specialized AI engineering expertise.',
      icon: <EyeOff size={24} />
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-rose-600"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-600">The Core Issue</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] max-w-3xl">
            AI projects don't fail because of the tech. <br/>
            <span className="text-slate-400 font-medium">They fail because of the approach.</span>
          </h2>
        </div>

        {/* Premium Grid Layout without outer borders */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {problems.map((problem, idx) => (
            <div 
              key={idx} 
              className={`py-12 md:py-16 md:px-12 hover:bg-slate-50/50 transition-colors duration-500 group ${
                (idx % 3 !== 2) ? 'md:border-r border-slate-100' : ''
              }`}
            >
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-600 mb-8 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all duration-300">
                {problem.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-rose-600 transition-colors duration-300">
                {problem.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
