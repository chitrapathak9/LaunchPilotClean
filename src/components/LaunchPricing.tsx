import React, { useState } from 'react';
import { FadeUp } from './FadeUp';
import { IconCheck } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export function LaunchPricing() {
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'growth' | 'premium'>('growth');

  const starterFeatures = [
    'Up to 3 core automated workflows',
    'Zapier / Make system integration',
    'EHR, CRM, or email database sync',
    'Pre-built custom prompt templates',
    '21-day timeline guarantee',
    '30 days post-launch support',
    '100% custom system ownership',
    'Deployed on your infrastructure'
  ];

  const growthFeatures = [
    'Everything in Starter, plus:',
    'Up to 8 workflows total',
    'Advanced autonomous AI agents',
    'Third-party APIs & webhook routing',
    'Custom analytics & metrics dashboard',
    '60 days post-launch support',
    '1-on-1 operational training',
    'Workflow compliance & data audits'
  ];

  const premiumFeatures = [
    'Everything in Growth, plus:',
    'Unlimited workflows / bespoke scope',
    'Custom fine-tuned LLM agents',
    'Internal security-isolated vectors',
    'B2B compliance audits (HIPAA/GDPR)',
    'Dedicated high-priority Slack channel',
    '90 days post-launch support',
    'Priority API token optimization'
  ];

  return (
    <section id="pricing" className="py-24 bg-cream border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <FadeUp delay={0.1}>
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 inline-block">
              Pricing Packages
            </span>
          </FadeUp>
          
          <FadeUp delay={0.2}>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mt-6 tracking-tight">
              Simple. Fixed. No surprises.
            </h2>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="max-w-7xl mx-auto px-6 lg:px-8">
              Know the exact cost and workflow scope before we write a single line of code.
            </p>
          </FadeUp>
        </div>

        {/* Pricing Cards Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          {/* Card 1: Starter Workflow */}
          <FadeUp delay={0.3} className="h-full">
            <div 
              onClick={() => setSelectedPlan('starter')}
              className={`rounded-2xl p-8 flex flex-col justify-between h-full transition-all duration-350 cursor-pointer ${
                selectedPlan === 'starter'
                  ? 'bg-white border-2 border-violet-600 shadow-xl shadow-violet-600/10 md:-translate-y-2 z-10 relative'
                  : 'bg-white border border-zinc-200 shadow-sm opacity-95 hover:opacity-100 hover:border-zinc-350'
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="bg-zinc-50 text-zinc-650 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block border border-zinc-200">
                    Small Teams
                  </span>
                  {selectedPlan === 'starter' && (
                    <span className="bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block shadow-sm">
                      Selected ✓
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mt-6">
                  Starter Workflow
                </h3>
                
                <div className="flex items-baseline mt-4 mb-6">
                  <span className="text-5xl font-bold text-zinc-900">$1,499</span>
                  <span className="text-zinc-550 text-sm ml-2 font-semibold">/one-time</span>
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
                  to="/book-appointment?plan=starter&price=1499" 
                  className={`block w-full text-center rounded-xl py-4 text-sm font-bold transition-all tracking-wide shadow-sm ${
                    selectedPlan === 'starter'
                      ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-md shadow-violet-600/10'
                      : 'border border-zinc-350 text-zinc-800 hover:bg-zinc-100 bg-white'
                  }`}
                >
                  Book Starter Workflow — $1,499
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* Card 2: Growth System */}
          <FadeUp delay={0.4} className="h-full">
            <div 
              onClick={() => setSelectedPlan('growth')}
              className={`rounded-2xl p-8 flex flex-col justify-between h-full transition-all duration-350 cursor-pointer ${
                selectedPlan === 'growth'
                  ? 'bg-white border-2 border-violet-600 shadow-xl shadow-violet-600/10 md:-translate-y-2 z-10 relative'
                  : 'bg-white border border-zinc-200 shadow-sm opacity-95 hover:opacity-100 hover:border-zinc-350'
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="bg-violet-100 text-violet-700 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block border border-violet-200/50">
                    Most Popular
                  </span>
                  {selectedPlan === 'growth' && (
                    <span className="bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block shadow-sm">
                      Selected ✓
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mt-6">
                  Growth System
                </h3>
                
                <div className="flex items-baseline mt-4 mb-6">
                  <span className="text-5xl font-bold text-zinc-900">$2,999</span>
                  <span className="text-zinc-550 text-sm ml-2 font-semibold">/one-time</span>
                </div>

                <ul className="space-y-3 mt-6 pt-6 border-t border-zinc-200">
                  {growthFeatures.map((feat) => {
                    const isHeader = feat.includes("plus:");
                    return (
                      <li key={feat} className={`flex items-start gap-3 text-sm leading-relaxed ${isHeader ? 'text-violet-600 font-bold mt-2' : 'text-zinc-655 font-semibold'}`}>
                        {!isHeader && <IconCheck className="text-violet-600 shrink-0 mt-0.5" size={16} />}
                        <span>{feat}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="pt-8">
                <Link 
                  to="/book-appointment?plan=growth&price=2999" 
                  className={`block w-full text-center rounded-xl py-4 text-sm font-bold transition-all tracking-wide shadow-md ${
                    selectedPlan === 'growth'
                      ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-violet-600/10'
                      : 'border border-zinc-350 text-zinc-800 hover:bg-zinc-100 bg-white'
                  }`}
                >
                  Book Growth System — $2,999
                </Link>
              </div>
            </div>
          </FadeUp>

          {/* Card 3: Enterprise Automation */}
          <FadeUp delay={0.5} className="h-full">
            <div 
              onClick={() => setSelectedPlan('premium')}
              className={`rounded-2xl p-8 flex flex-col justify-between h-full transition-all duration-350 cursor-pointer ${
                selectedPlan === 'premium'
                  ? 'bg-white border-2 border-violet-600 shadow-xl shadow-violet-600/10 md:-translate-y-2 z-10 relative'
                  : 'bg-white border border-zinc-200 shadow-sm opacity-95 hover:opacity-100 hover:border-zinc-350'
              }`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="bg-zinc-50 text-zinc-655 text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block border border-zinc-200">
                    Scaling Enterprises
                  </span>
                  {selectedPlan === 'premium' && (
                    <span className="bg-violet-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block shadow-sm">
                      Selected ✓
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 mt-6">
                  Enterprise Automation
                </h3>
                
                <div className="flex items-baseline mt-4 mb-6">
                  <span className="text-5xl font-bold text-zinc-900">$5,999</span>
                  <span className="text-zinc-550 text-sm ml-2 font-semibold">/one-time</span>
                </div>

                <ul className="space-y-3 mt-6 pt-6 border-t border-zinc-200">
                  {premiumFeatures.map((feat) => {
                    const isHeader = feat.includes("plus:");
                    return (
                      <li key={feat} className={`flex items-start gap-3 text-sm leading-relaxed ${isHeader ? 'text-violet-600 font-bold mt-2' : 'text-zinc-655 font-semibold'}`}>
                        {!isHeader && <IconCheck className="text-violet-600 shrink-0 mt-0.5" size={16} />}
                        <span>{feat}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="pt-8">
                <Link 
                  to="/book-appointment?plan=premium&price=5999" 
                  className={`block w-full text-center rounded-xl py-4 text-sm font-bold transition-all tracking-wide shadow-sm ${
                    selectedPlan === 'premium'
                      ? 'bg-violet-600 text-white hover:bg-violet-500 shadow-md shadow-violet-600/10'
                      : 'border border-zinc-350 text-zinc-800 hover:bg-zinc-100 bg-white'
                  }`}
                >
                  Book Enterprise Overhaul — $5,999
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Payment stepper / workflow */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h4 className="text-lg font-bold text-zinc-900 mb-6">Transparent Payment Structure (50/50 Model)</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-violet-50 border border-violet-200 text-violet-600 font-bold flex items-center justify-center text-sm shadow-sm">
                1
              </div>
              <p className="text-sm font-bold text-zinc-900 mt-3">Audit & Architecture</p>
              <p className="text-xs text-zinc-500 mt-1 max-w-[200px] font-semibold">NDA signed. Core workflows and database integration mapped together.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                2
              </div>
              <p className="text-sm font-bold text-zinc-900 mt-3">50% Development Start</p>
              <p className="text-xs text-zinc-500 mt-1 max-w-[200px] font-semibold">Pay the first half when we start building the prioritized scope.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-violet-50 border border-violet-200 text-violet-600 font-bold flex items-center justify-center text-sm shadow-sm">
                3
              </div>
              <p className="text-sm font-bold text-zinc-900 mt-3">50% Live Delivery</p>
              <p className="text-xs text-zinc-500 mt-1 max-w-[200px] font-semibold">Pay the remaining half only when your system is fully integrated and live.</p>
            </div>
          </div>
        </div>

        {/* Bottom guarantee */}
        <div className="text-center mt-12">
          <FadeUp delay={0.6}>
            <p className="text-zinc-500 text-sm font-bold tracking-wide">
              21-day timeline guarantee: if we miss the deadline, we keep building at no extra cost. NDA signed before the first call.
            </p>
          </FadeUp>
        </div>

      </div>
    </section>
  );
}
