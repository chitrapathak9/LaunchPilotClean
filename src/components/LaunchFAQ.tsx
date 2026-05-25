import React, { useState } from 'react';
import { FadeUp } from './FadeUp';
import { IconChevronDown } from '@tabler/icons-react';

export function LaunchFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the 21-day timeline actually work?',
      a: 'We start with a fixed scope document — both sides agree exactly what gets built before any code is written. That removes back-and-forth and lets us ship in a tight, focused sprint. Daily Slack updates keep you in the loop without slowing us down.'
    },
    {
      q: "What if the project isn't done in 21 days?",
      a: "If we miss the deadline for reasons on our side, the next sprint is free. We've shipped 30+ products on time — the fixed scope process is specifically designed to prevent overruns."
    },
    {
      q: 'Who owns the code, design, and IP?',
      a: "You do. 100%. The GitHub repo is created in your account on day one. We don't hold the code, license it back to you, or retain any rights. When the project is done, we walk away — you have everything."
    },
    {
      q: 'What tech stack do you use?',
      a: 'We use MERN stack (MongoDB, Express, React, Node.js), Next.js, Flutter for mobile, PostgreSQL and Supabase for structured data, and Go + Redis + RabbitMQ for high-throughput systems like AdTech. We match the stack to your product\'s actual needs.'
    },
    {
      q: 'Can you add features after launch?',
      a: 'Yes — we offer a post-launch sprint package. Many clients come back for Phase 2 after their MVP gets traction. Returning clients get priority scheduling.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-cream border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeUp delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 inline-block">
              FAQ
            </span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-6 tracking-tight">
              Common questions
            </h2>
          </FadeUp>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto divide-y divide-zinc-200 border-t border-b border-zinc-200">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <FadeUp key={index} delay={0.1 * index}>
                <div className="py-5">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : index)}
                    className="w-full text-left flex justify-between items-center group focus:outline-none"
                  >
                    <span className="text-zinc-955 font-bold text-base transition-colors group-hover:text-violet-600">
                      {faq.q}
                    </span>
                    <IconChevronDown 
                      className={`text-zinc-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-violet-600' : ''
                      }`} 
                      size={20} 
                    />
                  </button>

                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-zinc-600 text-sm leading-relaxed font-semibold">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

      </div>
    </section>
  );
}
