import React from 'react';
import { FadeUp } from './FadeUp';

export function ClientStrip() {
  const companies = [
    'Fintech Co',
    'MedSync',
    'AdFlow',
    'SaaS Labs',
    'HealthTrack',
    'RetailOS',
    'DataPipe',
    'VoiceAI'
  ];

  // Duplicate companies twice to ensure seamless overflow loop
  const duplicatedCompanies = [...companies, ...companies, ...companies];

  return (
    <section className="py-12 bg-cream overflow-hidden border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 mb-6 text-center">
        <FadeUp delay={0.1}>
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            trusted by founders building in
          </p>
        </FadeUp>
      </div>

      {/* Marquee Row */}
      <div className="w-full flex select-none overflow-hidden relative mt-4">
        {/* Soft edge blur overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none"></div>

        <div className="animate-marquee flex gap-4 whitespace-nowrap">
          {duplicatedCompanies.map((company, index) => (
            <div 
              key={index}
              className="border border-zinc-300 rounded-full px-5 py-2.5 text-zinc-600 text-sm font-bold tracking-wide bg-white hover:border-zinc-400 hover:text-zinc-800 transition-all duration-200 shadow-sm"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
