import React from 'react';
import { FadeUp } from './FadeUp';

export function LaunchFounder() {
  return (
    <section className="bg-white border-y border-zinc-200 py-20 text-left select-none">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Standalone Software Company Story */}
        <div className="space-y-6">
          <FadeUp delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-650 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 inline-block">
              Who we are
            </span>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
              A company built around one promise.
            </h2>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="text-zinc-650 leading-relaxed space-y-4 text-base font-semibold">
              <p>
                LaunchAIPilot is a product engineering company based in 
                Ahmedabad, India. We build SaaS, Medical, AdTech, Fintech, and 
                Food Tech products for founders across the US, UK, UAE, 
                and Australia.
              </p>
              <p>
                Our 21-day delivery system isn't a gimmick — it's built 
                from 6 years of shipping 30+ real products. Fixed price. 
                Fixed scope. NDA before anything is discussed. 
                You own 100% of the code.
              </p>
              <p>
                We're not a freelancer taking side projects. 
                We're not a 200-person agency that hands you off to juniors. 
                We're a focused team of senior engineers who've built in 
                regulated, complex industries — and we don't learn on your dime.
              </p>
            </div>
          </FadeUp>

          {/* Stats Row (3 items with vertical dividers between) */}
          <FadeUp delay={0.4}>
            <div className="flex gap-6 divide-x divide-zinc-200 pt-6 border-t border-zinc-200 mt-8">
              <div className="flex-1">
                <div className="text-zinc-900 font-bold text-xl tracking-tight">
                  30+
                </div>
                <div className="text-zinc-550 text-xs mt-1 font-bold uppercase tracking-wider">
                  Products shipped
                </div>
              </div>
              <div className="flex-1 pl-6">
                <div className="text-zinc-900 font-bold text-xl tracking-tight">
                  6 Years
                </div>
                <div className="text-zinc-550 text-xs mt-1 font-bold uppercase tracking-wider">
                  Engineering experience
                </div>
              </div>
              <div className="flex-1 pl-6">
                <div className="text-zinc-900 font-bold text-xl tracking-tight">
                  4
                </div>
                <div className="text-zinc-550 text-xs mt-1 font-bold uppercase tracking-wider">
                  Countries served
                </div>
              </div>
            </div>
          </FadeUp>

          {/* CTA + Small confidentiality info */}
          <FadeUp delay={0.5}>
            <div className="pt-4 space-y-3">
              <a 
                href="#contact" 
                className="inline-block bg-violet-600 hover:bg-violet-500 text-white rounded-full px-6 py-3.5 text-sm font-bold transition-colors duration-200 tracking-wide shadow-sm"
              >
                Book a free clarity call
              </a>
              <div className="text-xs text-zinc-400 font-semibold tracking-wide">
                contact@launchaipilot.com · Ahmedabad, India
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Right Column: Premium Dynamic Company Profile Card */}
        <div className="flex flex-col items-center justify-center lg:items-end">
          <FadeUp delay={0.3} className="w-full max-w-md">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 text-left shadow-sm">
              
              {/* Top Section */}
              <div className="space-y-1">
                <div className="text-lg font-bold text-zinc-900 tracking-tight">
                  LaunchAIPilot
                </div>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span>Est. 2024 · Product engineering company</span>
                </div>
              </div>

              <div className="my-5 border-t border-zinc-200" />

              {/* 2x2 Stats Grid inside card */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-2xl font-bold text-zinc-900">
                    30+
                  </div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide mt-1">
                    Products delivered
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900">
                    21 Days
                  </div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide mt-1">
                    Avg delivery time
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900">
                    5
                  </div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide mt-1">
                    Industry verticals
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-zinc-900">
                    100%
                  </div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wide mt-1">
                    Client code ownership
                  </div>
                </div>
              </div>

              <div className="my-5 border-t border-zinc-200" />

              {/* Stack Section */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3">
                  OUR STACK
                </div>
                <div className="flex flex-wrap gap-2">
                  {['MERN', 'Next.js', 'Flutter', 'Go', 'PostgreSQL', 'Redis', 'Supabase', 'AWS'].map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs bg-white border border-zinc-200 text-zinc-500 rounded-full px-3 py-1 font-bold tracking-wide shadow-inner"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="my-5 border-t border-zinc-200" />

              {/* Location footer */}
              <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                <span>Serving US · UK · UAE · Australia from Ahmedabad, India</span>
              </div>

            </div>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}
