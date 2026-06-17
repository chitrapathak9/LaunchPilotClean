import React from 'react';
import { Target, Lightbulb } from 'lucide-react';

export function AboutMission() {
  return (
    <section className="section-xl bg-gray-50 border-b border-gray-100">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mission */}
          <div className="bg-white border border-gray-200 rounded-[2.5rem] p-10 lg:p-14 shadow-sm relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-8">
              <Target size={32} strokeWidth={1.5} />
            </div>
            
            <h2 className="text-[2.5rem] font-display font-bold text-ink-900 mb-6 leading-tight">
              Our <span className="text-indigo-600">Mission</span>
            </h2>
            
            <p className="text-[1.125rem] text-ink-600 leading-relaxed mb-0">
              To ruthlessly eliminate technical debt and bloat from the software industry. We exist to build high-performance, scalable platforms that give our clients an absolute, undeniable engineering advantage over their competitors.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-ink-900 border border-ink-800 rounded-[2.5rem] p-10 lg:p-14 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="absolute inset-0 dot-grid-dark opacity-30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 border border-white/10 text-white flex items-center justify-center mb-8 backdrop-blur-md">
              <Lightbulb size={32} strokeWidth={1.5} />
            </div>
            
            <h2 className="relative z-10 text-[2.5rem] font-display font-bold text-white mb-6 leading-tight">
              Our <span className="text-indigo-400">Vision</span>
            </h2>
            
            <p className="relative z-10 text-[1.125rem] text-ink-300 leading-relaxed mb-0">
              To be the definitive AI-native engineering partner for global enterprises. We envision a future where software development is entirely decoupled from massive offshore headcounts and driven entirely by elite, autonomous engineering squads.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
