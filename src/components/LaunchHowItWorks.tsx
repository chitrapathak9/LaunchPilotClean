import React from 'react';
import { FadeUp } from './FadeUp';
import { 
  IconPhoneCall, 
  IconFileText, 
  IconRocket 
} from '@tabler/icons-react';

export function LaunchHowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <IconPhoneCall className="text-violet-600" size={24} />,
      title: 'Automation audit',
      body: 'We jump on a free 30-minute discovery call to map your workflows. You walk us through your manual processes, and we identify major efficiency gaps. Enterprise NDA signed beforehand.',
      tag: 'Free · 30 minutes · NDA first'
    },
    {
      number: '02',
      icon: <IconFileText className="text-violet-600" size={24} />,
      title: 'System architecture',
      body: 'Within 48 hours, you receive a visual database schema, API integration map, and fixed-price proposal. No vague hourly estimates. You know exactly what we build and what it costs.',
      tag: 'Fixed price · No surprises · 48hr turnaround'
    },
    {
      number: '03',
      icon: <IconRocket className="text-violet-600" size={24} />,
      title: 'Deploy & optimize',
      body: 'Daily Slack updates and collaborative system reviews. All custom workflows, prompts, database triggers, and APIs are yours. We guarantee 99.9% system uptime and continuous support.',
      tag: 'Daily updates · 100% ownership · Uptime guarantee'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-cream border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeUp delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 inline-block">
              Process
            </span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-6 tracking-tight">
              From manual bottleneck to automated scale in 3 steps
            </h2>
          </FadeUp>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {steps.map((step, index) => (
            <FadeUp key={index} delay={0.1 * index} className="h-full">
              <div className="bg-white border border-zinc-200 rounded-2xl p-8 flex flex-col justify-between h-full group relative overflow-hidden shadow-sm">
                <div>
                  {/* Step number on top right */}
                  <div className="text-5xl font-extrabold text-zinc-100 font-sans tracking-tight absolute top-6 right-8 select-none">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-cream flex items-center justify-center border border-zinc-200 mt-2">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-zinc-900 font-bold text-lg mt-6">
                    {step.title}
                  </h3>

                  {/* Body */}
                  <p className="text-zinc-550 text-sm leading-relaxed mt-3 font-semibold">
                    {step.body}
                  </p>
                </div>

                {/* Pill Tag */}
                <div className="mt-8">
                  <span className="bg-zinc-50 text-zinc-600 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block border border-zinc-200">
                    {step.tag}
                  </span>
                </div>

              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}
