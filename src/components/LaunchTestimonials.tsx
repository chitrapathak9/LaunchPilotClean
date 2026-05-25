import React from 'react';
import { FadeUp } from './FadeUp';

export function LaunchTestimonials() {
  const reviews = [
    {
      initials: 'RK',
      name: 'Rahul K.',
      role: 'Founder, AdFlow Technologies',
      industry: 'AdTech',
      quote: 'We needed a bidding engine that could handle real-time programmatic at scale. They delivered in 18 days. The NDA before the first call told us everything about how they operate.'
    },
    {
      initials: 'PS',
      name: 'Priya S.',
      role: 'CEO, MedSync Platform',
      industry: 'Medical SaaS',
      quote: 'Fixed price meant we could plan our Series A runway properly. No surprises, no renegotiation. Daily Slack updates meant we never felt out of the loop.'
    },
    {
      initials: 'JM',
      name: 'James M.',
      role: 'Co-Founder, PayRoute',
      industry: 'Fintech',
      quote: "Two agencies burned us before this. What made this different — the repo was in our GitHub from day one. 21 days later we had a live product with 50+ endpoints working."
    }
  ];

  return (
    <section className="py-24 bg-cream border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeUp delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 inline-block">
              Client stories
            </span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-6 tracking-tight">
              What founders say
            </h2>
          </FadeUp>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((rev, index) => (
            <FadeUp key={index} delay={0.1 * index}>
              <div className="bg-white border border-zinc-200 rounded-2xl p-7 flex flex-col justify-between h-full hover:border-zinc-300 transition-colors duration-300 shadow-sm text-left">
                <div>
                  {/* 5 Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-violet-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-zinc-650 text-sm leading-relaxed mt-5 italic font-semibold">
                    "{rev.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="mt-8 pt-6 border-t border-zinc-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cream border border-zinc-300 flex items-center justify-center text-zinc-800 text-sm font-bold shadow-inner">
                    {rev.initials}
                  </div>
                  <div>
                    <div className="text-zinc-900 text-sm font-bold">
                      {rev.name}
                    </div>
                    <div className="text-zinc-500 text-xs mt-0.5 font-semibold">
                      {rev.role} · <span className="text-violet-600 font-bold">{rev.industry}</span>
                    </div>
                  </div>
                </div>

              </div>
            </FadeUp>
          ))}
        </div>

        {/* Confidentiality notice */}
        <div className="text-center text-xs text-zinc-400 mt-8 font-semibold">
          * Names abbreviated for client confidentiality. Full references available on request after NDA.
        </div>

      </div>
    </section>
  );
}
