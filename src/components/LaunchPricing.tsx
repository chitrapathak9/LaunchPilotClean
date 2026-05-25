import React, { useState } from 'react';
import { FadeUp } from './FadeUp';
import { IconCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export function LaunchPricing() {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'builder'>('builder');

  const starterFeatures = [
    '1 platform (web or mobile)',
    'User authentication + onboarding',
    'Payment integration (Stripe)',
    'Core feature set (defined in proposal)',
    '21-day delivery',
    '30 days post-launch support',
    'Source code 100% yours',
    'Deployed on your infrastructure'
  ];

  const fullFeatures = [
    'Web + Mobile + Admin panel',
    'Advanced AI/ML integration',
    'Complex third-party API integrations',
    'Multi-role access control',
    'Performance optimization (high throughput)',
    'Priority 21-day delivery',
    '60 days post-launch support',
    '1-on-1 onboarding walkthrough'
  ];

  return (
    <section id="pricing" className="py-24 bg-cream border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeUp delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 inline-block">
              Pricing
            </span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mt-6 tracking-tight">
              Simple. Fixed. No surprises.
            </h2>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="text-base text-zinc-650 leading-relaxed max-w-2xl mx-auto mt-4 font-semibold">
              Know the cost before we write a single line of code.
            </p>
          </FadeUp>
        </div>

        {/* Pricing Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch mt-8">
          
          {/* Card 1: Starter MVP */}
          <FadeUp delay={0.3} className="h-full">
            <div 
              onClick={() => setSelectedPlan('starter')}
              className={`rounded-2xl p-8 flex flex-col justify-between h-full transition-all duration-350 cursor-pointer ${
                selectedPlan === 'starter'
                  ? 'bg-white border-2 border-violet-600 shadow-xl shadow-violet-600/10 md:-translate-y-2 z-10 relative'
                  : 'bg-white border border-zinc-200 shadow-sm opacity-90 hover:opacity-100 hover:border-zinc-350'
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="bg-zinc-50 text-zinc-600 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block border border-zinc-200">
                    For solo founders
                  </span>
                  {selectedPlan === 'starter' && (
                    <span className="bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block shadow-sm">
                      Selected ✓
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mt-6">
                  Starter MVP
                </h3>
                
                <div className="flex items-baseline mt-4 mb-6">
                  <span className="text-5xl font-bold text-zinc-900">$4,999</span>
                  <span className="text-zinc-500 text-sm ml-2">/one-time</span>
                </div>

                <ul className="space-y-3 mt-6 pt-6 border-t border-zinc-200">
                  {starterFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-zinc-650 leading-relaxed font-semibold">
                      <IconCheck className="text-violet-600 shrink-0 mt-0.5" size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link 
                  to="/checkout?plan=starter&price=4999" 
                  className={`block w-full text-center rounded-xl py-4 text-sm font-bold transition-all tracking-wide shadow-sm ${
                    selectedPlan === 'starter'
                      ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-md shadow-violet-600/10'
                      : 'border border-zinc-350 text-zinc-800 hover:bg-zinc-100 bg-white'
                  }`}
                >
                  Get Starter MVP — $4,999
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* Card 2: Full Product */}
          <FadeUp delay={0.4} className="h-full">
            <div 
              onClick={() => setSelectedPlan('builder')}
              className={`rounded-2xl p-8 flex flex-col justify-between h-full transition-all duration-350 cursor-pointer ${
                selectedPlan === 'builder'
                  ? 'bg-white border-2 border-violet-600 shadow-xl shadow-violet-600/10 md:-translate-y-2 z-10 relative'
                  : 'bg-white border border-zinc-200 shadow-sm opacity-90 hover:opacity-100 hover:border-zinc-350'
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="bg-violet-100 text-violet-700 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block border border-violet-200/50">
                    Most popular
                  </span>
                  {selectedPlan === 'builder' && (
                    <span className="bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block shadow-sm">
                      Selected ✓
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mt-6">
                  Full Product
                </h3>
                
                <div className="flex items-baseline mt-4 mb-6">
                  <span className="text-5xl font-bold text-zinc-900">$9,999</span>
                  <span className="text-zinc-500 text-sm ml-2">/one-time</span>
                </div>

                <ul className="space-y-3 mt-6 pt-6 border-t border-zinc-200">
                  {fullFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm text-zinc-700 leading-relaxed font-bold">
                      <IconCheck className="text-violet-600 shrink-0 mt-0.5" size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link 
                  to="/checkout?plan=builder&price=9999" 
                  className={`block w-full text-center rounded-xl py-4 text-sm font-bold transition-all tracking-wide shadow-md ${
                    selectedPlan === 'builder'
                      ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-violet-600/10'
                      : 'border border-zinc-350 text-zinc-800 hover:bg-zinc-100 bg-white'
                  }`}
                >
                  Get Full Product — $9,999
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
        {/* Bottom guarantee */}
        <div className="text-center mt-12">
          <FadeUp delay={0.5}>
            <p className="text-zinc-500 text-sm font-bold tracking-wide">
              14-day money-back guarantee if we miss the deadline. NDA signed before any discussion.
            </p>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}
