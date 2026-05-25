import React from 'react';
import { FadeUp } from './FadeUp';

export function LaunchFounder() {
  const stats = [
    { value: '30+', label: 'Products' },
    { value: '6 Years', label: 'Experience' },
    { value: '5', label: 'Verticals' }
  ];

  return (
    <section className="bg-white border-y border-zinc-200 py-20 text-left">
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
              Built by engineers who've shipped it before
            </h2>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="text-zinc-650 leading-relaxed space-y-4 text-base font-semibold">
              <p>
                After 6 years building 30+ products across AdTech, Healthcare, 
                Fintech, and SaaS — we stopped taking on projects the old way.
              </p>
              <p>
                No more 3-month timelines. No more vague scopes. No more 
                clients stuck waiting while their runway burns.
              </p>
              <p>
                We built a system: fixed price, fixed scope, 21 days, 
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
                Book a call with our team
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Right Column: Dynamic Team Description Card (No Photos) */}
        <div className="flex flex-col items-center justify-center lg:items-end">
          <FadeUp delay={0.3} className="w-full max-w-md">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-8 text-left shadow-sm">
              
              {/* Avatars circles row */}
              <div className="flex gap-2 mb-6">
                <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-extrabold text-xs tracking-wider select-none shadow-sm">
                  FE
                </div>
                <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-extrabold text-xs tracking-wider select-none shadow-sm">
                  BE
                </div>
                <div className="w-10 h-10 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-extrabold text-xs tracking-wider select-none shadow-sm">
                  PM
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-200 text-zinc-400 flex items-center justify-center font-extrabold text-xs tracking-wider select-none shadow-sm">
                  +4
                </div>
              </div>

              {/* Card heading & body text */}
              <h3 className="text-lg font-bold text-zinc-900 mb-3 tracking-tight">
                A focused team. Not an agency.
              </h3>
              <p className="text-zinc-650 text-sm leading-relaxed mb-6 font-semibold">
                We're a small, senior team — Frontend, Backend, Mobile, and a dedicated PM on every project. No juniors. No handoffs. Same people from call to launch.
              </p>

              {/* Tech Stack Pills list */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['MERN', 'Next.js', 'Flutter', 'Go', 'PostgreSQL', 'Redis', 'Supabase', 'AWS'].map((tech) => (
                  <span 
                    key={tech} 
                    className="text-xs bg-white border border-zinc-200 text-zinc-600 rounded-full px-3 py-1 font-bold tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Location footer with animated green active dot */}
              <div className="flex items-center gap-2 pt-6 border-t border-zinc-200/60 text-xs text-zinc-500 font-bold select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0 animate-pulse" />
                <span>Based in Ahmedabad, India · Serving US, UK, UAE, Australia</span>
              </div>

            </div>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}
