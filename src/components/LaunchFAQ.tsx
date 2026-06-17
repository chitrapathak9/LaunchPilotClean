import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

const faqs = [
  {
    q: 'How does the 30–60 day timeline actually work?',
    a: "We start with a detailed system architecture audit — both sides agree on exact workflows, API connectors, and agent behaviors before any integration begins. That removes back-and-forth and lets us ship in a tight, focused sprint. Daily Slack updates keep you in the loop.",
  },
  {
    q: "What if the automation isn't ready in 60 days?",
    a: "If we fail to meet the delivery timeline for reasons on our side, we continue work at zero additional cost. Our fixed-scope integration process is built specifically to prevent timeline creep.",
  },
  {
    q: 'Who owns the custom automation systems and API integrations?',
    a: "You do. 100%. All custom code, database schemas, prompt templates, and integration workflows are built directly inside your own cloud infrastructure. We hold no licenses or proprietary locks whatsoever.",
  },
  {
    q: 'How do you ensure data security and compliance?',
    a: "We take data protection very seriously. We sign strict corporate NDAs before the first discovery call. All automated pipelines use security-isolated database connections, OAuth protocols, and data encryption. We build compliant workflows matching HIPAA and GDPR requirements.",
  },
  {
    q: 'Do you charge a monthly management fee?',
    a: "No. All our standard projects are priced on a transparent, one-time fixed contract. Once we deploy and complete the 30-day post-launch support phase, you own the systems with no recurring agency fees. We also offer optional monthly support retainers for prompt tuning.",
  },
];

export function LaunchFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="section-xl bg-canvas-warm border-t border-ink-100">
      <div className="container-narrow">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="section-overline justify-center inline-flex">Common Questions</div>
          <h2 className="heading-display mt-3">
            Frequently asked
          </h2>
          <p className="body-xl text-ink-500 mt-4 max-w-[440px] mx-auto">
            Everything you need to know before making a decision.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-cobalt-200 shadow-card' : 'border-ink-100 hover:border-ink-200'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full text-left flex justify-between items-center gap-4 px-6 py-5 focus:outline-none group"
                >
                  <span className={`font-bold text-[0.9375rem] transition-colors ${
                    isOpen ? 'text-cobalt-600' : 'text-ink-900 group-hover:text-ink-700'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    isOpen ? 'bg-cobalt-600 text-white rotate-180' : 'bg-ink-100 text-ink-500'
                  }`}>
                    <IconChevronDown size={16} />
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 ease-spring overflow-hidden ${
                    isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 body-base text-ink-500 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
