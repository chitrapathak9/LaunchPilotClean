import React from 'react';
import { Flag, Rocket, Trophy, Globe } from 'lucide-react';

export function AboutJourney() {
  const timeline = [
    {
      year: '2020',
      title: 'The Foundation',
      desc: 'Frustrated by the slow, bureaucratic nature of traditional dev shops, we launched as a specialized technical strike team focusing purely on high-stakes rescue projects.',
      icon: <Flag size={20} />
    },
    {
      year: '2022',
      title: 'Global Expansion',
      desc: 'Scaled operations to support enterprise clients across 5+ countries, deploying complete remote engineering pods into major tech hubs.',
      icon: <Globe size={20} />
    },
    {
      year: '2023',
      title: 'The AI Pivot',
      desc: 'Recognizing the massive shift in software engineering, we transitioned fully to AI-native development workflows, accelerating delivery times by 40%.',
      icon: <Rocket size={20} />
    },
    {
      year: 'Today',
      title: 'Launch AI Pilot',
      desc: 'We now operate as the elite, autonomous engineering partner for industry leaders, having shipped over 10+ massive enterprise systems globally.',
      icon: <Trophy size={20} />
    }
  ];

  return (
    <section className="section-xl bg-white border-b border-gray-100">
      <div className="container-editorial">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="section-overline justify-center inline-flex">Our Journey</div>
          <h2 className="heading-display mt-4 mb-6 text-ink-900">
            From tactical strike team to <span className="text-indigo-600">global AI agency.</span>
          </h2>
          <p className="body-xl text-ink-500">
            We didn't start by selling generic websites. We started by rescuing failing, multi-million dollar software projects that other agencies couldn't deliver.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline track */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[2px] bg-indigo-100 -translate-x-1/2" />

            <div className="space-y-16">
              {timeline.map((item, idx) => (
                <div key={idx} className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Content */}
                  <div className={`w-full lg:w-1/2 pl-20 lg:pl-0 ${idx % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-gray-50 border border-gray-200 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow relative">
                      <span className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-2xl border border-gray-200 text-indigo-600 font-bold text-[0.9375rem] flex items-center justify-center shadow-sm">
                        {item.year}
                      </span>
                      <h3 className="text-[1.25rem] font-bold text-ink-900 mb-3">{item.title}</h3>
                      <p className="text-[0.9375rem] text-ink-500 leading-relaxed m-0">{item.desc}</p>
                    </div>
                  </div>

                  {/* Icon Node */}
                  <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 w-12 h-12 bg-white border-4 border-indigo-100 rounded-full flex items-center justify-center text-indigo-600 z-10 shadow-sm">
                    {item.icon}
                  </div>

                  {/* Spacer for empty half */}
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
