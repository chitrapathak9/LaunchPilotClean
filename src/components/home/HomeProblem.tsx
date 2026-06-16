import React from 'react';
import { RouteOff, FileWarning, EyeOff } from 'lucide-react';

export function HomeProblem() {
  return (
    <section className="py-32 bg-slate-50 border-b border-slate-200/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-20 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-blue-600"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">The Core Issue</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            AI projects don't fail because of the tech. <span className="text-slate-400 font-medium block mt-2">They fail because of the approach.</span>
          </h2>
        </div>

        {/* Premium Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Box 1: Wide */}
          <div className="md:col-span-8 bg-white rounded-[2rem] border border-slate-200 p-8 md:p-12 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-bl-[100px] -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-110"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 mb-8 border border-rose-200">
                <FileWarning size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Wrong AI Tooling</h3>
              <p className="text-slate-500 leading-relaxed max-w-md">
                The market is flooded with shiny AI products. Businesses waste months trying to integrate off-the-shelf tools that don't actually solve their core operational bottlenecks, leading to massive technical debt.
              </p>
              
              {/* Micro UI snippet */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-4">
                <div className="flex -space-x-3">
                   <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-400">GPT4</div>
                   <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-slate-400">Claude</div>
                   <div className="w-10 h-10 rounded-full bg-rose-100 border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-rose-500 line-through">Hype</div>
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stop chasing models</span>
              </div>
            </div>
          </div>

          {/* Bento Box 2: Tall */}
          <div className="md:col-span-4 bg-[#0F172A] rounded-[2rem] border border-slate-800 p-8 md:p-12 shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-transparent opacity-50"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-300 mb-8 border border-slate-700">
                <RouteOff size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lack of Clear Direction</h3>
              <p className="text-slate-400 leading-relaxed mb-8">
                Without a focused technical roadmap, AI projects turn into endless R&D experiments with no clear path to production or positive ROI.
              </p>
              
              <div className="mt-auto">
                 <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                   <div className="w-1/3 h-full bg-rose-500 rounded-full relative">
                      <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full animate-ping"></div>
                   </div>
                 </div>
                 <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                   <span>Timeline</span>
                   <span className="text-rose-400">Stalled</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Bento Box 3: Full Width */}
          <div className="md:col-span-12 bg-white rounded-[2rem] border border-slate-200 p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-12 group overflow-hidden relative">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-50 rounded-full blur-[100px] -z-0 opacity-50 transition-opacity duration-700 group-hover:opacity-100"></div>

            <div className="relative z-10 flex-1">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 border border-blue-100">
                <EyeOff size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Nobody Told Them the Truth</h3>
              <p className="text-slate-500 leading-relaxed max-w-xl">
                Traditional agencies take 6 months and charge exorbitant fees just to understand your business. They build bloated, generic architectures because they lack deep AI engineering expertise. We stop the bleeding and build what actually works.
              </p>
            </div>

            <div className="relative z-10 flex-1 w-full bg-slate-50 rounded-2xl border border-slate-200 p-6">
               <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Typical Agency Process</span>
                 <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">Bloated</span>
               </div>
               <div className="space-y-3">
                 <div className="w-full h-8 bg-slate-200 rounded flex items-center px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Month 1-2: Endless Discovery</div>
                 <div className="w-full h-8 bg-slate-200 rounded flex items-center px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Month 3-5: Building the Wrong Thing</div>
                 <div className="w-full h-8 bg-slate-200 rounded flex items-center px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Month 6: Missing Features</div>
               </div>
            </div>
            
          </div>

        </div>
        
      </div>
    </section>
  );
}
