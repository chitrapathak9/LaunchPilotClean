import React from 'react';
import { Quote } from 'lucide-react';

export function HomeWhyWeExist() {
  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Quote size={48} className="text-slate-200 mx-auto mb-8" />
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">
            We exist because we saw too many great companies wasting millions on the wrong tech stack while struggling to scale manual processes.
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            The truth is, AI is not magic. It is an engineering discipline. We built Launch AI Pilot to bridge the gap between business operations and bleeding-edge AI technology. No fluff, just results.
          </p>
          <div className="inline-flex items-center gap-4 text-left border border-slate-200 rounded-full p-2 pr-6 bg-slate-50">
            <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
               {/* Placeholder for founder avatar */}
               <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=100&h=100&q=80" alt="Founder" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-slate-900">Dushyant</p>
              <p className="text-sm text-slate-500">Founder, Launch AI Pilot</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
