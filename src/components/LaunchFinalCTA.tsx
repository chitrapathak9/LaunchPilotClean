import React from 'react';
import { FadeUp } from './FadeUp';

export function LaunchFinalCTA() {
  return (
    <section id="contact" className="py-24 bg-white border-t border-zinc-200 text-center">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Headline */}
        <FadeUp delay={0.1}>
          <h2 className="text-zinc-900 text-4xl md:text-5xl font-bold max-w-2xl mx-auto tracking-tight leading-tight">
            Your MVP could be live in 21 days.
          </h2>
        </FadeUp>

        {/* Body Description */}
        <FadeUp delay={0.2}>
          <p className="text-zinc-650 text-lg mt-5 max-w-xl mx-auto font-medium leading-relaxed">
            Two spots left this month. Book a free clarity call — no pitch, no pressure. 
            Just a 30-min conversation about your product.
          </p>
        </FadeUp>

        {/* Action Buttons */}
        <FadeUp delay={0.3}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="mailto:contact@launchaipilot.com"
              className="w-full sm:w-auto bg-violet-600 text-white font-bold rounded-full px-8 py-4 hover:bg-violet-500 transition-colors duration-200 text-base shadow-md shadow-violet-600/10 min-w-[240px] text-center"
            >
              Book a free clarity call
            </a>
            <a 
              href="mailto:contact@launchaipilot.com"
              className="w-full sm:w-auto border border-zinc-300 text-zinc-800 font-bold rounded-full px-8 py-4 hover:bg-zinc-50 bg-white transition-colors duration-200 text-base min-w-[240px] text-center shadow-sm"
            >
              Email us directly
            </a>
          </div>
        </FadeUp>

        {/* Trust Line */}
        <FadeUp delay={0.4}>
          <div className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mt-10 border-t border-zinc-200 pt-8 max-w-md mx-auto">
            NDA before anything · Fixed price · Code is yours
          </div>
        </FadeUp>

      </div>
    </section>
  );
}

