import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '10+',  label: 'MVP Shipped',    sub: 'Across all verticals' },
  { value: '5+',   label: 'Years Experience',     sub: 'Deep domain expertise' },
  { value: '32',   label: 'Case Studies',          sub: 'Documented outcomes' },
  { value: '5+',  label: 'Countries Served',      sub: 'Global client reach' },
];

export function HomeCTAStats() {
  return (
    <section className="bg-gray-50 section-xl relative overflow-hidden border-y border-gray-200">
      {/* Background glow - subtle light mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-white rounded-full blur-[100px] pointer-events-none" />

      <div className="container-content relative z-10">

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10 mb-16 lg:mb-20 pb-16 lg:pb-20 border-b border-gray-200">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div
                className="font-display font-bold text-ink-900 leading-none mb-2 group-hover:text-cobalt-600 transition-colors duration-300"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
              >
                {stat.value}
              </div>
              <div className="text-[0.875rem] font-bold text-ink-600 mb-1">{stat.label}</div>
              <div className="text-[0.75rem] text-ink-400 font-medium">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* CTA block */}
        <div className="max-w-[680px] mx-auto text-center">
          <h2
            className="font-display font-bold text-ink-900 leading-tight mb-5"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)', letterSpacing: '-0.03em' }}
          >
            Your competitor isn't waiting.
          </h2>
          <p className="body-xl text-ink-500 mb-10 max-w-[500px] mx-auto">
            Every week without the right team is a week of missed features, lost users, and unimpressed investors. Let's change that.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book-appointment"
              className="inline-flex items-center justify-center gap-2 bg-ink-900 text-white font-bold text-[0.9375rem] rounded-full px-8 py-3.5 hover:bg-ink-800 transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] w-full sm:w-auto"
            >
              Book a Free 30-Min Call <ArrowUpRight size={16} />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 border border-ink-200 text-ink-700 font-semibold text-[0.9375rem] rounded-full px-8 py-3.5 hover:border-ink-300 hover:text-ink-900 hover:bg-gray-100 transition-all w-full sm:w-auto"
            >
              See What We've Built
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
