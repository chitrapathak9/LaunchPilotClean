import React from 'react';
import { ArrowRight, Check, X, Minus, Shuffle, Clock, Building2, Briefcase, Users, Rocket } from 'lucide-react';

const engagementModels = [
  {
    id: 'hybrid',
    name: 'Hybrid Model',
    icon: <Shuffle size={24} />,
    tagline: 'Best of Both Worlds',
    description: 'Your core features get a fixed price. Everything else bills hourly. You know exactly what the foundation costs, with room to adapt as your product evolves.',
    bestFor: 'Projects over $25k with defined core features but expected iteration — v2 launches, products entering new markets.',
    features: [
      'Fixed budget for core features',
      'Hourly billing for iterations',
      'Dedicated project manager',
      'Weekly demos of working software',
      'No surprise invoices'
    ],
    popular: true,
  },
  {
    id: 'time',
    name: 'Time & Material',
    icon: <Clock size={24} />,
    tagline: 'Maximum Flexibility',
    description: 'Pay only for the hours worked. Perfect for ongoing maintenance, unknown scopes, or when you want to change directions frequently without friction.',
    bestFor: 'Ongoing maintenance, rescuing legacy codebases, or highly experimental products with rapidly shifting requirements.',
    features: [
      'Total scope flexibility',
      'Pay only for what you use',
      'Weekly transparent timesheets',
      'Scale team up or down anytime',
      'Direct developer access'
    ],
  },
  {
    id: 'b2b',
    name: 'B2B Partnership',
    icon: <Building2 size={24} />,
    tagline: 'Revenue Share & Equity',
    description: 'We act as your technical co-founder. We heavily discount our development rates in exchange for equity or a revenue-sharing agreement.',
    bestFor: 'Funded startups or established businesses launching a spin-off SaaS where technical execution is the primary risk.',
    features: [
      'Skin in the game',
      'Deep business alignment',
      'CTO-level strategic guidance',
      'Shared risk and reward',
      'Long-term commitment'
    ],
  },
  {
    id: 'fixed',
    name: 'Fixed Price',
    icon: <Briefcase size={24} />,
    tagline: 'Total Budget Safety',
    description: 'You know exactly what you will pay before we write a single line of code. Requires a detailed discovery phase to lock in the scope.',
    bestFor: 'Well-defined MVPs, specific feature additions, or enterprise portals with rigid, pre-approved budgets.',
    features: [
      'Zero budget overruns',
      'Clear, guaranteed timeline',
      'Strict scope management',
      'Milestone-based payments',
      'Turnkey delivery'
    ],
  },
  {
    id: 'dedicated',
    name: 'Dedicated Team',
    icon: <Users size={24} />,
    tagline: 'Your Extension',
    description: 'Hire a pre-vetted, cohesive team of our engineers, designers, and PMs to work exclusively on your product on a monthly retainer.',
    bestFor: 'Companies that need to rapidly expand their engineering capacity without the headache of hiring and onboarding.',
    features: [
      'Pre-assembled, cohesive teams',
      'Seamless integration with your culture',
      'Predictable monthly burn rate',
      'Full-time dedication',
      'No recruitment fees'
    ],
  },
  {
    id: 'startup',
    name: 'Startup & Entrepreneur',
    icon: <Rocket size={24} />,
    tagline: 'Speed to Market',
    description: 'A heavily optimized, high-velocity program designed to take you from idea to a launchable, revenue-generating MVP in 4-6 weeks.',
    bestFor: 'Early-stage founders needing to validate a concept, raise capital, or acquire their first 100 paying customers.',
    features: [
      'Extreme high-velocity sprints',
      'Ruthless feature prioritization',
      'Investor-ready code and UI',
      'Post-launch tech support',
      'Go-to-market technical advice'
    ],
  }
];

const comparisonMetrics = [
  { metric: 'Know Your Budget', hybrid: 'Good', time: 'Okay', b2b: 'Good', fixed: 'Good', dedicated: 'Okay', startup: 'Good' },
  { metric: 'Change Things Easily', hybrid: 'Good', time: 'Good', b2b: 'Good', fixed: 'Limited', dedicated: 'Good', startup: 'Limited' },
  { metric: 'Control Your Timeline', hybrid: 'Good', time: 'Okay', b2b: 'Good', fixed: 'Good', dedicated: 'Okay', startup: 'Good' },
  { metric: 'Who Takes the Risk', hybrid: 'Okay', time: 'Limited', b2b: 'Good', fixed: 'Good', dedicated: 'Limited', startup: 'Good' },
  { metric: 'Grow or Shrink Team', hybrid: 'Okay', time: 'Good', b2b: 'Okay', fixed: 'Limited', dedicated: 'Good', startup: 'Limited' },
  { metric: 'Team Learns Your Business', hybrid: 'Okay', time: 'Okay', b2b: 'Good', fixed: 'Limited', dedicated: 'Good', startup: 'Good' },
];

function getStatusIcon(status: string) {
  if (status === 'Good') return <Check size={18} className="text-emerald-500" strokeWidth={3} />;
  if (status === 'Okay') return <Minus size={18} className="text-amber-500" strokeWidth={3} />;
  if (status === 'Limited') return <X size={18} className="text-rose-500" strokeWidth={3} />;
  return null;
}

export function ServiceEngagement() {
  return (
    <section id="engagement" className="section-xl bg-white border-b border-gray-100">
      <div className="container-editorial">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="section-overline justify-center inline-flex">Engagement Options</div>
          <h2 className="heading-display mt-2 mb-4">
            How we partner with you.
          </h2>
          <p className="body-xl text-ink-500">
            We don't force a one-size-fits-all contract. Choose the engagement model that perfectly aligns with your risk tolerance, timeline, and budget.
          </p>
        </div>

        {/* --- Models Stack Section --- */}
        <div className="flex flex-col gap-20 lg:gap-32 mb-32">
          {engagementModels.map((model, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div key={model.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                
                {/* Float Card (Image Side) */}
                <div className="w-full lg:w-1/2 flex justify-center">
                  <div className="w-full max-w-md bg-white border border-gray-200 rounded-[2.5rem] shadow-sm p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-[1.25rem] flex items-center justify-center text-ink-800 mb-8 border border-gray-100">
                      {React.cloneElement(model.icon as React.ReactElement, { size: 36, strokeWidth: 1.5 })}
                    </div>
                    <h3 className="text-[1.75rem] font-bold text-ink-900 mb-3 tracking-tight">{model.tagline}</h3>
                    <p className="text-[0.9375rem] text-ink-500 mb-8 max-w-[280px] leading-relaxed">
                      Know your costs upfront. Stay flexible when needed.
                    </p>
                    <div className="flex items-center gap-3">
                      <span className="badge">Flexible</span>
                      <span className="badge">Transparent</span>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    {model.popular && (
                      <span className="px-3 py-1 bg-ink-900 text-white text-[0.6875rem] font-bold rounded-full">
                        Most Popular
                      </span>
                    )}
                    <span className="text-[0.75rem] font-bold text-ink-500 uppercase tracking-widest flex items-center gap-1.5">
                      {React.cloneElement(model.icon as React.ReactElement, { size: 14 })} Model Overview
                    </span>
                  </div>
                  
                  <h3 className="heading-xl text-ink-900 mb-5">{model.name}</h3>
                  <p className="body-lg text-ink-600 mb-8 leading-relaxed max-w-lg">
                    {model.description}
                  </p>

                  {/* Best For Box */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 max-w-lg">
                    <div className="text-[0.6875rem] font-bold text-ink-400 tracking-[0.1em] uppercase mb-2">Best For</div>
                    <p className="text-[0.875rem] text-ink-800 font-medium leading-relaxed">
                      {model.bestFor}
                    </p>
                  </div>

                  {/* Checklist */}
                  <ul className="space-y-4 mb-10">
                    {model.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3 text-[0.9375rem] text-ink-700 font-medium">
                        <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                          <Check size={12} className="text-ink-600" strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Buttons */}
                  <div className="flex items-center gap-4 mt-auto">
                    <a href="/book-appointment" className="btn-primary py-3.5 px-7 text-[0.875rem] rounded-xl">
                      Let's Talk Strategy <ArrowRight size={16} />
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* --- Comparison Table (Attachment 1 Style - Light Mode) --- */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 text-[0.6875rem] font-bold text-ink-500 uppercase tracking-widest mb-4">
              Quick Compare
            </div>
            <h3 className="heading-lg text-ink-900">Compare All 6 Options</h3>
            <p className="text-ink-500 mt-2">See how each model stacks up. Pick what matters most to you.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-[2rem] overflow-hidden shadow-sm">
            <div className="overflow-x-auto hide-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-gray-50/80 border-b border-gray-200">
                    <th className="py-6 px-6 font-bold text-ink-900 text-[0.875rem] w-[22%]">What Matters</th>
                    {engagementModels.map(model => (
                      <th key={model.id} className="py-6 px-4 font-bold text-ink-900 text-[0.875rem] text-center w-[13%]">
                        {model.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparisonMetrics.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 px-6 font-semibold text-ink-700 text-[0.875rem]">{row.metric}</td>
                      <td className="py-5 px-4 text-center">{getStatusIcon(row.hybrid)}</td>
                      <td className="py-5 px-4 text-center">{getStatusIcon(row.time)}</td>
                      <td className="py-5 px-4 text-center">{getStatusIcon(row.b2b)}</td>
                      <td className="py-5 px-4 text-center">{getStatusIcon(row.fixed)}</td>
                      <td className="py-5 px-4 text-center">{getStatusIcon(row.dedicated)}</td>
                      <td className="py-5 px-4 text-center">{getStatusIcon(row.startup)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-2 text-[0.8125rem] text-ink-500 font-medium">
              <Check size={16} className="text-emerald-500" strokeWidth={3} /> Good
            </div>
            <div className="flex items-center gap-2 text-[0.8125rem] text-ink-500 font-medium">
              <Minus size={16} className="text-amber-500" strokeWidth={3} /> Okay
            </div>
            <div className="flex items-center gap-2 text-[0.8125rem] text-ink-500 font-medium">
              <X size={16} className="text-rose-500" strokeWidth={3} /> Limited
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
