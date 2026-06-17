import React from 'react';
import { UserCheck, ShieldCheck, Target, Zap } from 'lucide-react';

export function ServiceWhyUs() {
  return (
    <section className="section-xl bg-gray-50 border-t border-gray-100 overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cobalt-50/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-50/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      <div className="container-content relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 lg:mb-20">
          <div className="section-overline mb-4">Why Launch AI Pilot</div>
          <h2 className="heading-display text-ink-900 mb-6">
            No more chaos. <br />
            <span className="text-cobalt-600">Just pure execution.</span>
          </h2>
          <p className="body-xl text-ink-500">
            We built this agency to solve the exact frustrations founders face when hiring external teams. Say goodbye to the communication breakdowns and missed deadlines.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1 */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 hover:border-gray-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 border border-purple-100">
              <UserCheck size={24} />
            </div>
            <h3 className="text-[1.25rem] font-bold text-ink-900 mb-3">Your Developer, Your Project</h3>
            <p className="text-[0.9375rem] text-ink-600 leading-relaxed">
              Direct access to top-tier engineering talent completely dedicated to your success. We don't stretch our developers across ten different clients. When they work with you, they are effectively part of your internal team.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 hover:border-gray-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300">
            <div className="w-12 h-12 bg-cobalt-50 rounded-2xl flex items-center justify-center text-cobalt-600 mb-6 border border-cobalt-100">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-[1.25rem] font-bold text-ink-900 mb-3">One Point of Contact</h3>
            <p className="text-[0.9375rem] text-ink-600 leading-relaxed">
              No more repeating yourself to five different people. Your dedicated Project Manager acts as your technical partner, handling all the operational complexity, translating business goals into technical requirements effortlessly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 hover:border-gray-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 border border-emerald-100">
              <Target size={24} />
            </div>
            <h3 className="text-[1.25rem] font-bold text-ink-900 mb-3">Top 1% Marketing & Industry IQ</h3>
            <p className="text-[0.9375rem] text-ink-600 leading-relaxed">
              Our Project Managers don't just push Jira tickets—they bring deep industry experience and marketing acumen to the table. We actively advise on product positioning to ensure what we build actually converts in the real world.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 hover:border-gray-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] transition-all duration-300">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 mb-6 border border-amber-100">
              <Zap size={24} />
            </div>
            <h3 className="text-[1.25rem] font-bold text-ink-900 mb-3">Absolute Clarity</h3>
            <p className="text-[0.9375rem] text-ink-600 leading-relaxed">
              100% transparency into our workflows. Expect weekly demos of working software, immediate communication via Slack, and absolute clarity on where your budget is going at all times.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
