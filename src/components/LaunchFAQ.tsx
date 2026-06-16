import React, { useState } from 'react';
import { FadeUp } from './FadeUp';
import { IconChevronDown } from '@tabler/icons-react';

export function LaunchFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the 30-60 day timeline actually work?',
      a: 'We start with a detailed system architecture audit — both sides agree on exact workflows, API connectors, and agent behaviors before any integration begins. That removes back-and-forth and lets us ship in a tight, focused sprint. Daily Slack updates keep you in the loop.'
    },
    {
      q: "What if the automation isn't ready in 60 days?",
      a: "If we fail to meet the delivery timeline for reasons on our side, we continue work at zero additional cost. Our fixed-scope integration process is built specifically to prevent timeline creep."
    },
    {
      q: 'Who owns the custom automation systems and API integrations?',
      a: "You do. 100%. All custom code, database schemas, prompt templates, and integration workflows are built directly inside your own cloud infrastructure (Zapier, Make, AWS, or Supabase). We hold no licenses or proprietary locks."
    },
    {
      q: 'How do you ensure data security and compliance?',
      a: "We take data protection very seriously. We sign strict corporate NDAs before the first discovery call. All automated pipelines use security-isolated database connections, OAuth protocols, and data encryption. We build compliant workflows matching HIPAA and GDPR requirements."
    },
    {
      q: 'Do you charge a monthly management fee?',
      a: "No. All our standard projects are priced on a transparent, one-time fixed contract. Once we deploy and complete the 30-day post-launch support phase, you own the systems with no recurring agency fees. We also offer optional monthly support retainers for prompt tuning."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeUp delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-900 bg-slate-100 border border-slate-200 rounded-full px-4 py-1.5 inline-block">
              FAQ
            </span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 tracking-tight">
              Common questions
            </h2>
          </FadeUp>
        </div>

        {/* Accordion List */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
