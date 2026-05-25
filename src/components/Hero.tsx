import React from 'react';
import { FadeUp } from './FadeUp';
import { IconCircleCheck } from '@tabler/icons-react';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-6 bg-cream relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center z-10">
        
        {/* Top Badge */}
        <FadeUp delay={0.1}>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 text-violet-600 text-xs px-4 py-1.5 font-bold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse inline-block"></span>
            21-day delivery · 2 spots left this month
          </div>
        </FadeUp>

        {/* Main Headline */}
        <FadeUp delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-none">
            Your MVP. Built in<br />
            <span className="text-violet-600">21 Days. Guaranteed.</span>
          </h1>
        </FadeUp>

        {/* Subheadline */}
        <FadeUp delay={0.3}>
          <p className="text-xl text-zinc-650 max-w-2xl mx-auto mt-6 leading-relaxed font-semibold">
            We build SaaS, Medical, AdTech, and Fintech products. 
            Fixed price contract. NDA signed before the first call. 
            You own 100% of the code.
          </p>
        </FadeUp>

        {/* CTA Row */}
        <FadeUp delay={0.4}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#contact" 
              className="bg-violet-600 text-white rounded-full px-8 py-4 font-bold hover:bg-violet-500 transition-all duration-200 text-base shadow-md shadow-violet-600/10 min-w-[240px] text-center"
            >
              Book a free clarity call
            </a>
            <a 
              href="/demo" 
              className="border-2 border-violet-650 text-violet-600 rounded-full px-8 py-4 font-bold hover:bg-violet-50/50 bg-white transition-all duration-200 text-base min-w-[240px] text-center shadow-sm flex items-center justify-center gap-2 group"
            >
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse"></span>
              Validate your Idea (Free)
            </a>
          </div>
        </FadeUp>

        {/* Trust Strip */}
        <FadeUp delay={0.5}>
          <div className="mt-16 pt-8 border-t border-zinc-200/60 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-semibold">
              <IconCircleCheck className="text-violet-600" size={18} />
              Fixed price — no surprise invoices
            </div>
            
            <div className="hidden md:block w-px h-4 bg-zinc-200"></div>
            
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-semibold">
              <IconCircleCheck className="text-violet-600" size={18} />
              NDA signed before the first call
            </div>
            
            <div className="hidden md:block w-px h-4 bg-zinc-200"></div>
            
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-semibold">
              <IconCircleCheck className="text-violet-600" size={18} />
              100% source code — yours forever
            </div>
            
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
