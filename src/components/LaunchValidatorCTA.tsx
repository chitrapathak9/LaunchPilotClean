import React from 'react';
import { FadeUp } from './FadeUp';
import { IconSparkles, IconCheck, IconArrowRight, IconActivity, IconLock } from '@tabler/icons-react';

export function LaunchValidatorCTA() {
  return (
    <section id="roi-calculator" className="py-24 bg-[#FAF9F6] border-y border-zinc-200/80 relative overflow-hidden">
      {/* Subtle light violet background glow blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/[0.02] blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Strategic Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <FadeUp delay={0.1}>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 text-violet-600 text-xs px-4 py-1.5 font-bold uppercase tracking-widest">
                <IconSparkles size={12} className="animate-spin" style={{ animationDuration: '3s' }} />
                Operations Audit
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
                Calculate your business automation ROI in seconds.
              </h2>
              <p className="text-lg text-zinc-655 font-semibold leading-relaxed">
                Before you hire more staff or buy expensive off-the-shelf software, see how much time and money you can save by implementing custom AI workflows and autonomous agents. Our ROI evaluation is precise, data-driven, and completely free.
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="space-y-4">
                {[
                  { title: 'Calculated Efficiency Score', desc: 'Get an instant automation readiness rate based on your current software stack.' },
                  { title: 'Operational ROI Model', desc: 'Detailed projections on monthly manual hours saved and financial yield.' },
                  { title: 'Custom Integration Mapping', desc: 'Tailored visual workflow designs mapping Zapier, Make, and custom LLM connections.' },
                  { title: 'Bottleneck & Security Matrix', desc: 'Deep-dive security assessments and standardized B2B data protection mitigations.' }
                ].map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center shrink-0 mt-1">
                      <IconCheck size={12} strokeWidth={3} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900">{item.title}</h4>
                      <p className="text-xs text-zinc-550 font-semibold mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="pt-4">
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-violet-600 text-white rounded-full px-8 py-4 font-bold hover:bg-violet-500 transition-all duration-200 text-base shadow-md shadow-violet-600/10 group"
                >
                  Audit Your Workflows Now
                  <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Right Column: High-Fidelity Light Premium Validator Preview Frame */}
          <div className="lg:col-span-6">
            <FadeUp delay={0.3}>
              <div className="bg-white border border-zinc-200/80 rounded-3xl p-6 shadow-lg relative overflow-hidden select-none">
                {/* Purple header overlay strip */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500" />
                
                {/* Simulated window header buttons */}
                <div className="flex items-center justify-between border-b border-zinc-150 pb-4 mb-5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                  </div>
                  <span className="text-[10px] text-zinc-450 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded font-mono uppercase tracking-wider font-semibold">
                    integration_study_v2.0
                  </span>
                </div>

                {/* Input Concept Box Preview */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-left space-y-3">
                  <div className="flex items-center gap-2 text-[10px] text-violet-600 font-bold uppercase tracking-wider">
                    <IconActivity size={12} />
                    Current Manual Workflow
                  </div>
                  <p className="text-xs text-zinc-800 font-semibold leading-relaxed">
                    Custom CRM syncing, inbound lead qualification, and customer support ticket replies...
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Zapier', 'Make.com', 'Custom AI Agent', 'PostgreSQL'].map((tag) => (
                      <span key={tag} className="text-[9px] bg-white text-zinc-500 border border-zinc-200 px-2 py-0.5 rounded font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Results Preview */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {/* Score box */}
                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-left flex items-center gap-3">
                    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="20" cy="20" r="17" fill="transparent" stroke="#e4e4e7" strokeWidth="4" />
                        <circle cx="20" cy="20" r="17" fill="transparent" stroke="#8b5cf6" strokeWidth="4" strokeDasharray={107} strokeDashoffset={107 - (107 * 88) / 100} />
                      </svg>
                      <span className="absolute text-[10px] font-extrabold text-zinc-900">88%</span>
                    </div>
                    <div>
                      <span className="block text-[8px] text-zinc-450 font-bold uppercase tracking-wider">Efficiency</span>
                      <span className="text-xs font-bold text-zinc-800 leading-none">High ROI</span>
                    </div>
                  </div>

                  {/* Market TAM SAM SOM */}
                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-left">
                    <span className="block text-[8px] text-zinc-450 font-bold uppercase tracking-wider font-semibold">Monthly Savings</span>
                    <span className="text-xs font-bold text-zinc-800 block mt-0.5">$4,850 Saved</span>
                    <span className="text-[9px] text-emerald-600 font-bold">320+ hours saved</span>
                  </div>
                </div>

                {/* Locked Preview row */}
                <div className="mt-4 bg-zinc-50 border border-zinc-200 rounded-2xl p-4 flex items-center justify-between select-none">
                  <div className="flex items-center gap-2">
                    <IconLock className="text-zinc-400" size={14} />
                    <span className="text-xs font-bold text-zinc-500">Custom Integration & Schema Specs</span>
                  </div>
                  <span className="text-[9px] bg-violet-50 text-violet-600 font-bold border border-violet-200 px-2 py-0.5 rounded">
                    LOCKED
                  </span>
                </div>

                {/* Dynamic mouse/cursor visual micro-animation preview */}
                <div className="absolute bottom-4 right-12 bg-violet-600 text-white rounded-full p-2.5 shadow-lg shadow-violet-600/30 scale-95 border border-violet-500/20">
                  <IconSparkles size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
                </div>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
