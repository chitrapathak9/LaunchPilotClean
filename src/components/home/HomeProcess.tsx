import React from 'react';

export function HomeProcess() {
  const steps = [
    { 
      name: 'Discovery & Blueprint', 
      description: 'We deeply analyze your business bottlenecks and architect a comprehensive technical blueprint before writing a single line of code.'
    },
    { 
      name: 'Rapid Prototyping', 
      description: 'We build high-fidelity interactive prototypes to validate the user experience and technical feasibility rapidly.'
    },
    { 
      name: 'Agile Development', 
      description: 'Our engineering team executes the blueprint in aggressive two-week sprints, keeping you fully transparent and in control.'
    },
    { 
      name: 'Deployment & Scale', 
      description: 'We deploy to production-grade infrastructure, handing over full code ownership and providing ongoing scaling support.'
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-blue-600"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Process</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] max-w-3xl">
            A precise, battle-tested framework to <span className="text-slate-400 font-medium">guarantee delivery.</span>
          </h2>
        </div>

        {/* Premium Plus Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-y border-slate-200/60">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`p-10 md:p-16 relative overflow-hidden group ${
                idx % 2 === 0 ? 'md:border-r border-slate-200/60' : ''
              } ${
                idx < 2 ? 'border-b border-slate-200/60' : ''
              }`}
            >
              {/* Giant Background Number */}
              <div className="absolute top-4 md:top-8 right-6 md:right-10 text-[100px] md:text-[140px] font-black text-slate-50 transition-transform duration-700 group-hover:-translate-y-4 group-hover:text-slate-100 select-none z-0 leading-none">
                0{idx + 1}
              </div>
              
              <div className="relative z-10 pt-16 md:pt-20">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">{step.name}</h3>
                <p className="text-slate-500 leading-relaxed max-w-md">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
