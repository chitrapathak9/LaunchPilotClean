import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$2,999',
      description: 'Perfect for small teams needing core AI automation.',
      features: [
        '1 Custom AI Workflow',
        'Basic Integration (Zapier/Make)',
        '30-Day Delivery',
        '100% Code Ownership',
        'Standard Support'
      ]
    },
    {
      name: 'Growth',
      price: '$4,999',
      description: 'Ideal for scaling businesses with complex processes.',
      isPopular: true,
      features: [
        'Up to 3 Custom AI Workflows',
        'Advanced API Integrations',
        'Custom Knowledge Base (RAG)',
        '45-Day Delivery',
        '100% Code Ownership',
        'Priority Support'
      ]
    },
    {
      name: 'Full Arsenal',
      price: '$9,999',
      description: 'For enterprises requiring complete operational overhaul.',
      features: [
        'Unlimited AI Workflows (Scope bound)',
        'Custom Web App / Dashboard',
        'Advanced Analytics & Tracking',
        '60-Day Delivery',
        '100% Code Ownership',
        'Dedicated Slack Channel'
      ]
    },
    {
      name: 'Custom',
      price: 'Let\'s Talk',
      description: 'For highly specialized infrastructure requirements.',
      features: [
        'On-Premise Deployment options',
        'Fine-tuned LLMs',
        'HIPAA / SOC2 Compliance architecture',
        'Custom Delivery Timeline',
        '100% Code Ownership',
        '24/7 Enterprise Support'
      ]
    }
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Simple, transparent pricing</h2>
          <p className="text-lg text-slate-600">
            No hidden fees. No endless discovery retainers. Just clear deliverables and timelines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative flex flex-col p-8 rounded-3xl bg-white border ${plan.isPopular ? 'border-slate-900 shadow-xl' : 'border-slate-200 shadow-sm'} transition-transform hover:-translate-y-1 duration-300`}>
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm h-10">{plan.description}</p>
              </div>
              
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                {plan.price !== "Let's Talk" && <span className="text-slate-500 font-medium">/project</span>}
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 text-slate-700 text-sm">
                    <Check size={18} className="text-slate-900 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/book-appointment" className={`w-full py-3 rounded-xl font-bold text-center transition-colors ${plan.isPopular ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                {plan.price === "Let's Talk" ? 'Contact Us' : 'Get Started'}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
