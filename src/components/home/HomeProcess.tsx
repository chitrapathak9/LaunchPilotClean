import React from 'react';

const steps = [
  {
    num: '01',
    name: 'Discovery & Blueprint',
    description:
      'We deeply analyze your business bottlenecks and architect a comprehensive technical blueprint before writing a single line of code. No discovery retainers. Just clarity.',
  },
  {
    num: '02',
    name: 'Rapid Prototyping',
    description:
      'We build high-fidelity interactive prototypes to validate user experience and technical feasibility rapidly — giving you confidence before full development begins.',
  },
  {
    num: '03',
    name: 'Agile Development',
    description:
      'Our engineering team executes the blueprint in focused two-week sprints, with full transparency and daily updates keeping you in control at every step.',
  },
  {
    num: '04',
    name: 'Deploy & Scale',
    description:
      'We deploy to production-grade infrastructure, hand over full IP ownership, and provide ongoing scaling support to maximize your ROI beyond launch.',
  },
];

export function HomeProcess() {
  return (
    <section className="section-xl bg-white">
      <div className="container-content">

        {/* Header */}
        <div className="max-w-[640px] mb-16 lg:mb-20">
          <div className="section-overline">Our Process</div>
          <h2 className="heading-display mt-1">
            A battle-tested framework <br />
            <span className="text-ink-400 font-medium">to guarantee delivery.</span>
          </h2>
          <p className="body-xl text-ink-500 mt-5">
            No ambiguity, no scope creep — just a clear path from idea to production.
          </p>
        </div>

        {/* Process Grid (Plus Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-[1000px] mx-auto relative">
          
          {steps.map((step, idx) => {
            // Determine borders for the plus layout
            let borderClasses = "border-gray-200 ";
            if (idx === 0) borderClasses += "border-b md:border-r";
            if (idx === 1) borderClasses += "border-b";
            if (idx === 2) borderClasses += "border-b md:border-b-0 md:border-r";
            if (idx === 3) borderClasses += "";

            return (
              <div
                key={idx}
                className={`group bg-transparent p-8 lg:p-12 transition-all duration-300 relative flex flex-col hover:bg-white ${borderClasses}`}
              >
                {/* Content */}
                <div className="flex-1">
                  {/* Large serif number */}
                  <div
                    className="font-display font-bold text-ink-100 leading-none mb-4 group-hover:text-ink-200 transition-colors duration-300"
                    style={{ fontSize: '4rem' }}
                  >
                    {step.num}
                  </div>
                  <h3 className="heading-md text-ink-900 mb-3 group-hover:text-[#6D28D9] transition-colors duration-300">
                    {step.name}
                  </h3>
                  <p className="body-base text-ink-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
