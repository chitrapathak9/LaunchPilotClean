import React from 'react';
import { Clock, MessageSquareShare, Code2, Cpu } from 'lucide-react';

export function DeliveryFramework() {
  const pillars = [
    {
      icon: <Clock size={24} />,
      title: 'Daily Overlap Hours',
      desc: 'We make sure our team is online for at least 4 hours of your workday. This gives us plenty of time for daily meetings, planning, and face-to-face feedback.'
    },
    {
      icon: <Cpu size={24} />,
      title: 'Round-The-Clock Progress',
      desc: 'Because we are in different time zones, your project keeps moving forward while you sleep. You wake up to fresh updates and new features ready to review.'
    },
    {
      icon: <MessageSquareShare size={24} />,
      title: 'Clear Communication',
      desc: 'We know that poor communication ruins projects. Every developer on your team speaks fluent English and understands how modern tech businesses operate.'
    },
    {
      icon: <Code2 size={24} />,
      title: 'Fully Managed Teams',
      desc: 'We don\'t just give you freelancers to manage. We provide a complete team with a project manager, designers, and developers who take ownership of the work.'
    }
  ];

  return (
    <section className="section-xl bg-white border-b border-gray-100">
      <div className="container-editorial">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="section-overline justify-center inline-flex">How It Works</div>
          <h2 className="heading-display mt-4 mb-6 text-ink-900">
            How we <span className="text-blue-600">deliver across time zones.</span>
          </h2>
          <p className="body-xl text-ink-500">
            Working with a remote team shouldn't be difficult. Here is how we make sure everything runs smoothly from day one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="bg-gray-50 border border-gray-200 rounded-[2rem] p-8 hover:shadow-lg transition-all group relative overflow-hidden">
              <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                {pillar.icon}
              </div>
              <h3 className="text-[1.25rem] font-bold text-ink-900 mb-3 group-hover:text-blue-600 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-[0.9375rem] text-ink-500 leading-relaxed mb-0">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
