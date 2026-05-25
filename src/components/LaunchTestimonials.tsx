import React from 'react';
import { FadeUp } from './FadeUp';
import { IconStar } from '@tabler/icons-react';

export function LaunchTestimonials() {
  const reviews = [
    {
      initials: 'AK',
      name: 'AK',
      role: 'Founder, AdFlow Technologies',
      industry: 'AdTech',
      quote: 'They delivered our entire AdTech bidding engine in under 3 weeks. We were skeptical about the timeline but they hit every milestone. The NDA process before the call made us trust them immediately.'
    },
    {
      initials: 'SM',
      name: 'SM',
      role: 'CEO, HealthSync',
      industry: 'Medical SaaS',
      quote: 'Fixed price meant we could plan our runway properly. No surprises, no scope creep. The Slack updates every day meant we felt like part of the team, not just a client.'
    },
    {
      initials: 'RJ',
      name: 'RJ',
      role: 'Co-Founder, PayRoute',
      industry: 'Fintech',
      quote: "We'd been burned by two agencies before. This was completely different — code was ours from day one, deployed on our own infrastructure. 21 days later we had a live product."
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
              <div className="bg-white border border-zinc-200 rounded-2xl p-7 flex flex-col justify-between h-full hover:border-zinc-300 transition-colors duration-300 shadow-sm">
                <div>
                  {/* 5 Stars */}
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <IconStar 
                        key={i} 
                        className="text-violet-600 fill-violet-600/10" 
                        size={14} 
                      />
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

      </div>
    </section>
  );
}
