import React from 'react';
import { Star, ShieldCheck, Clock, FileSignature } from 'lucide-react';

export function HomeTrusted() {
  return (
    <section className="py-8 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-8 lg:gap-4">
          
          {/* Trust Pillar 1 */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 shrink-0">
              <img className="w-8 h-8 rounded-full border-2 border-slate-50 object-cover" src="https://flagcdn.com/us.svg" alt="USA" />
              <img className="w-8 h-8 rounded-full border-2 border-slate-50 object-cover" src="https://flagcdn.com/gb.svg" alt="UK" />
              <img className="w-8 h-8 rounded-full border-2 border-slate-50 object-cover" src="https://flagcdn.com/de.svg" alt="Germany" />
            </div>
            <div>
              <p className="text-sm text-slate-900 font-semibold whitespace-nowrap">Trusted by 5+ Founders from</p>
              <p className="text-xs text-slate-500 whitespace-nowrap">Healthcare, AdTech, Hospital Management, SaaS</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-slate-200 shrink-0"></div>

          {/* Trust Pillar 2 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-900 font-semibold whitespace-nowrap">Rapid Deployment</p>
              <p className="text-xs text-slate-500 whitespace-nowrap">Production-ready systems</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-slate-200 shrink-0"></div>

          {/* Trust Pillar 3 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-900 font-semibold whitespace-nowrap">100% IP Transfer</p>
              <p className="text-xs text-slate-500 whitespace-nowrap">Full code ownership</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-slate-200 shrink-0"></div>

          {/* Trust Pillar 4 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
              <FileSignature size={18} />
            </div>
            <div>
              <p className="text-sm text-slate-900 font-semibold whitespace-nowrap">Day Zero NDA</p>
              <p className="text-xs text-slate-500 whitespace-nowrap">Total confidentiality</p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-8 bg-slate-200 shrink-0"></div>

          {/* Trust Pillar 5 */}
          <div className="flex items-center gap-3">
             <div>
              <div className="flex text-amber-400 mb-1">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <p className="text-xs text-slate-500 font-medium whitespace-nowrap">Verified Reviews</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
