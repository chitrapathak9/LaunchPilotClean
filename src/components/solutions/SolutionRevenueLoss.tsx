import React from 'react';
import { ArrowRight, PhoneCall, Timer } from 'lucide-react';

export function SolutionRevenueLoss() {
  return (
    <section className="section-lg bg-gray-50 border-y border-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-cobalt-50 to-transparent pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/50 border border-rose-200 text-rose-600 text-[0.75rem] font-bold tracking-widest uppercase mb-8">
            <Timer size={14} /> The Cost of Inaction
          </div>

          <h2 className="heading-display text-ink-900 mb-6">
            You are losing revenue every day you tolerate these edge cases.
          </h2>
          
          <p className="body-xl text-ink-500 mb-12 max-w-2xl mx-auto">
            Traditional agencies will spend 3 months in "discovery" just to understand your industry. We already know the bottlenecks. Stop the bleeding and let's map out a solution in a single call.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="/book-appointment" className="btn-primary py-4 px-8 text-[1rem] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <PhoneCall size={18} />
              Discuss Your Edge Case
            </a>
            <span className="text-ink-400 text-[0.9375rem] font-medium hidden sm:block">
              or
            </span>
            <a href="#contact" className="text-ink-700 font-semibold text-[0.9375rem] hover:text-cobalt-600 transition-colors flex items-center gap-2 group">
              Send us an email <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="mt-8 text-[0.875rem] text-ink-500">
            * We typically map out a viable architectural solution within the first 30 minutes of our call.
          </div>

        </div>
      </div>
    </section>
  );
}
