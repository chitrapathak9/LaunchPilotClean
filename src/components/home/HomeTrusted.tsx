import React from 'react';
import { Star, ShieldCheck, Clock, FileSignature } from 'lucide-react';

export function HomeTrusted() {
  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Trust Pillar 1 */}
          <div className="flex items-center gap-4 flex-1">
            <div className="flex -space-x-2">
              <img className="w-10 h-10 rounded-full border-2 border-slate-50 object-cover" src="https://flagcdn.com/us.svg" alt="USA" title="Healthcare & SaaS" />
              <img className="w-10 h-10 rounded-full border-2 border-slate-50 object-cover" src="https://flagcdn.com/gb.svg" alt="UK" title="AdTech" />
              <img className="w-10 h-10 rounded-full border-2 border-slate-50 object-cover" src="https://flagcdn.com/de.svg" alt="Germany" title="Hospital Management" />
            </div>
            <div>
              <p className="text-sm text-slate-800 font-semibold">Trusted by 5+ Founders</p>
              <p className="text-xs text-slate-500">Healthcare, AdTech, SaaS</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-200"></div>

          {/* Trust Pillar 2 */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-800 font-semibold">30-60 Days</p>
              <p className="text-xs text-slate-500">Guaranteed Delivery</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-200"></div>

          {/* Trust Pillar 3 */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-800 font-semibold">100% Code Ownership</p>
              <p className="text-xs text-slate-500">Transferred immediately</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-200"></div>

          {/* Trust Pillar 4 */}
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <FileSignature size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-800 font-semibold">Day 0 NDA</p>
              <p className="text-xs text-slate-500">Signed before our call</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-200"></div>

          {/* Trust Pillar 5 */}
          <div className="flex items-center gap-3 flex-1">
             <div>
              <div className="flex text-amber-400 mb-1">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
              <p className="text-xs text-slate-500">Founder reviewed</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
