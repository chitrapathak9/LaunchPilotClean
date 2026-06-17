import React from 'react';
import { ArrowRight, Workflow, Rocket, Users, Target } from 'lucide-react';

export function EngagementLifecycle() {
  const steps = [
    {
      icon: <Target size={24} />,
      title: '1. The Rescue (Time & Material)',
      desc: 'You have a burning problem or legacy codebase. We drop in on an hourly basis to map the architecture, extinguish fires, and stabilize the product immediately.'
    },
    {
      icon: <Rocket size={24} />,
      title: '2. The Build (Fixed Price)',
      desc: 'With the architecture stabilized, we scope out the next major feature or MVP rebuild. You get absolute cost certainty while we execute flawlessly.'
    },
    {
      icon: <Users size={24} />,
      title: '3. The Scale (Dedicated Team)',
      desc: 'The product has found massive traction. You now need a dedicated, long-term engineering squad integrated directly into your Slack to push code daily.'
    },
    {
      icon: <Workflow size={24} />,
      title: '4. The Hybrid (Enterprise)',
      desc: 'You have a complex enterprise. We provide a dedicated core team, while hot-swapping specialized AI or DevOps engineers in and out as the product demands.'
    }
  ];

  return (
    <section className="section-xl bg-white border-b border-gray-100">
      <div className="container-editorial">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="section-overline justify-center inline-flex">The Lifecycle</div>
          <h2 className="heading-display mt-4 mb-6">
            A partnership that <span className="text-emerald-600">evolves</span> with your business.
          </h2>
          <p className="body-xl text-ink-500">
            You don't need to lock into a single model. Our most successful clients transition through different engagement structures as their product lifecycle matures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {/* Connector Line (hidden on mobile, visible on desktop between cards) */}
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[2px] bg-gray-100 -z-10" />
              )}
              
              <div className="bg-white border border-gray-200 rounded-[2rem] p-8 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 z-10 relative">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  {step.icon}
                </div>
                <h3 className="text-[1.25rem] font-bold text-ink-900 mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[0.9375rem] text-ink-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
