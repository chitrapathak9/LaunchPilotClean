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
      title: 'Clarity call',
      body: 'We jump on a free 30-min call. You explain your idea. We ask the right questions. NDA signed before we discuss anything. No pitching.',
      tag: 'Free · 30 minutes · NDA first'
    },
    {
      number: '02',
      icon: <IconFileText className="text-violet-600" size={24} />,
      title: 'Fixed proposal',
      body: 'Within 24 hours you get a fixed price, exact timeline, and tech spec. No vague estimates. No hourly billing. You know the cost before a single line of code is written.',
      tag: 'Fixed price · No surprises · 24hr turnaround'
    },
    {
      number: '03',
      icon: <IconRocket className="text-violet-600" size={24} />,
      title: 'Build and ship',
      body: 'Daily Slack updates. You see progress every single day. The GitHub repo is yours from day one. We ship in 21 days or the next sprint is on us.',
      tag: 'Daily updates · You own the repo · 21-day guarantee'
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
              From idea to live product in 3 steps
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
