import React from 'react';
import { Phone, Code2, Users, FileCheck } from 'lucide-react';

export function CareersProcess() {
  const steps = [
    {
      num: '01',
      icon: <Phone size={24} />,
      title: 'Quick Chat',
      desc: 'A 20-minute call to get to know you, your background, and what you are looking for in your next role.'
    },
    {
      num: '02',
      icon: <Code2 size={24} />,
      title: 'Technical Interview',
      desc: 'We don\'t do tricky whiteboard puzzles. We will talk through real-world problems you would actually solve on the job.'
    },
    {
      num: '03',
      icon: <Users size={24} />,
      title: 'Meet the Team',
      desc: 'A chance for you to meet the founders and the developers you will be working with every day.'
    },
    {
      num: '04',
      icon: <FileCheck size={24} />,
      title: 'The Offer',
      desc: 'If it is a match, we move fast. We will send you an offer and get you set up with everything you need to start.'
    }
  ];

  return (
    <section className="section-xl bg-gray-50 border-b border-gray-100">
      <div className="container-editorial">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="section-overline justify-center inline-flex">How We Hire</div>
          <h2 className="heading-display mt-4 mb-6 text-ink-900">
            A simple, transparent <span className="text-indigo-600">process.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative">
          
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[2.75rem] left-0 w-full h-[2px] bg-gray-200 -z-0" />

          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-indigo-600 mb-6 relative">
                {step.icon}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center border-2 border-white">
                  {step.num}
                </div>
              </div>
              <h3 className="text-[1.25rem] font-bold text-ink-900 mb-3">{step.title}</h3>
              <p className="text-[0.9375rem] text-ink-500 leading-relaxed px-4">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
