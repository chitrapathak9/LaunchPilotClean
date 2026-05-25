import React from 'react';
import { FadeUp } from './FadeUp';
import { IconUser } from '@tabler/icons-react';

export function LaunchFounder() {
  const stats = [
    { value: '30+', label: 'Products' },
    { value: '6 Years', label: 'Experience' },
    { value: '5', label: 'Verticals' }
  ];

  return (
    <section className="bg-white border-y border-zinc-200 py-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Story */}
        <div className="space-y-6">
          <FadeUp delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 inline-block">
              The team
            </span>
          </FadeUp>

          <FadeUp delay={0.2}>
            <h2 className="text-3xl font-bold text-zinc-900 tracking-tight">
              Built by a founder who ships
            </h2>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="text-zinc-650 leading-relaxed space-y-4 text-base font-semibold">
              <p>
                After 6 years building 30+ products across AdTech, Healthcare, 
                Fintech, and SaaS — I stopped taking on projects the old way.
              </p>
              <p>
                No more 3-month timelines. No more vague scopes. No more 
                clients stuck waiting while their runway burns.
              </p>
              <p>
                I built a system: fixed price, fixed scope, 21 days, 
                NDA before anything is discussed. It works every time.
              </p>
            </div>
          </FadeUp>

          {/* Stat Row */}
          <FadeUp delay={0.4}>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-200 mt-8">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-zinc-900 font-bold text-xl tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-zinc-500 text-xs mt-1 font-bold uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* CTA */}
          <FadeUp delay={0.5}>
            <div className="pt-4">
              <a 
                href="#contact" 
                className="inline-block bg-violet-600 hover:bg-violet-500 text-white rounded-full px-6 py-3.5 text-sm font-bold transition-colors duration-200 tracking-wide"
              >
                Book a call with me directly
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Right Column: Professional Portrait */}
        <div className="flex flex-col items-center justify-center lg:items-end">
          <FadeUp delay={0.3} className="w-full max-w-sm">
            <div className="bg-[#FAF9F6] rounded-2xl w-full aspect-square flex items-center justify-center border border-zinc-200/80 shadow-md relative overflow-hidden group">
              <img 
                src="/founder.png" 
                alt="Founder of LaunchAIPilot" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Decorative premium shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/10 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider text-center mt-4">
              Founder, LaunchAIPilot
            </div>
          </FadeUp>
        </div>


      </div>
    </section>
  );
}
