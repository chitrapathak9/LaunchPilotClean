import React from 'react';
import { RouteOff, FileWarning, EyeOff } from 'lucide-react';

const problems = [
  {
    num: '01',
    title: 'Chasing the Wrong AI Tools',
    description:
      "The market is flooded with shiny AI products. Businesses waste months integrating off-the-shelf tools that don't solve their real operational bottlenecks — creating massive technical debt with zero ROI.",
    icon: <FileWarning size={22} />,
    accent: 'cobalt',
  },
  {
    num: '02',
    title: 'No Clear Technical Roadmap',
    description:
      'Without a focused technical blueprint, AI projects turn into endless R&D experiments with no path to production. Momentum stalls, budgets evaporate, and stakeholders lose confidence.',
    icon: <RouteOff size={22} />,
    accent: 'slate',
  },
  {
    num: '03',
    title: 'Working with the Wrong Agency',
    description:
      'Generic agencies charge high fees just to understand your business — then build bloated architectures because they lack deep, specialized AI engineering expertise. You pay for their learning curve.',
    icon: <EyeOff size={22} />,
    accent: 'cobalt',
  },
];

const ACCENT_MAP: Record<string, {
  icon: string;
  topBar: string;
  num: string;
}> = {
  cobalt: {
    icon:   'bg-cobalt-50 text-cobalt-600 border-cobalt-100 group-hover:bg-cobalt-600 group-hover:text-white group-hover:border-cobalt-600',
    topBar: 'bg-cobalt-500',
    num:    'text-gray-100 group-hover:text-gray-200',
  },
  slate: {
    icon:   'bg-slate-50 text-slate-500 border-slate-200 group-hover:bg-slate-700 group-hover:text-white group-hover:border-slate-700',
    topBar: 'bg-slate-400',
    num:    'text-gray-100 group-hover:text-gray-200',
  },
};

export function HomeProblem() {
  return (
    <section className="section-xl bg-white">
      <div className="container-content">

        {/* Section header */}
        <div className="max-w-[660px] mb-16 lg:mb-20">
          <div className="section-overline">The Real Challenge</div>
          <h2 className="heading-display mt-2">
            AI projects don't fail
            <br />
            <span className="text-ink-400 font-medium">because of the technology.</span>
          </h2>
          <p className="body-xl text-ink-500 mt-5 max-w-[520px]">
            They fail because of the approach — the wrong tools, no direction, and the wrong partner.
            Here's what most businesses get wrong before writing a single line of code.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, idx) => {
            const a = ACCENT_MAP[problem.accent];
            return (
              <div
                key={idx}
                className="group relative bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden transition-all duration-500 hover:border-gray-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1.5"
              >
                {/* Top accent bar */}
                <div className={`h-1 w-full ${a.topBar} rounded-t-3xl`} />

                <div className="p-8 lg:p-9">
                  {/* Giant background number */}
                  <div
                    className={`absolute bottom-4 right-5 text-[7rem] font-black leading-none select-none pointer-events-none transition-colors duration-500 ${a.num}`}
                    style={{ fontFamily: 'Fraunces, Georgia, serif' }}
                  >
                    {problem.num}
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-7 transition-all duration-300 ${a.icon}`}>
                    {problem.icon}
                  </div>

                  {/* Content */}
                  <div className="relative z-10 max-w-[280px]">
                    <div className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-ink-400 mb-2">
                      Mistake {problem.num}
                    </div>
                    <h3 className="text-[1.125rem] font-bold text-ink-900 mb-3 leading-snug">
                      {problem.title}
                    </h3>
                    <p className="text-[0.875rem] text-ink-500 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom hook */}
        <div className="mt-14 p-6 lg:p-8 bg-cobalt-50 border border-cobalt-100 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <p className="font-bold text-ink-900 text-[1.0625rem] mb-1">
              Sound familiar?
            </p>
            <p className="text-[0.9375rem] text-ink-500">
              We've helped 10+ companies escape these exact traps. Let's talk.
            </p>
          </div>
          <a
            href="/book-appointment"
            className="btn-cobalt text-[0.875rem] py-3 px-7 shrink-0 rounded-xl"
          >
            Book a Free Strategy Call →
          </a>
        </div>

      </div>
    </section>
  );
}
