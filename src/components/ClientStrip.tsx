import React from 'react';

export function ClientStrip() {
  const companies = [
    'AdFlow',
    'MedSync',
    'PayRoute',
    'DataPipe',
    'HealthOS',
    'RetailAI',
    'VoiceFlow',
    'FinStack'
  ];

  // Duplicate the list for a seamless infinite scroll loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="py-12 bg-white overflow-hidden border-t border-zinc-200 select-none">
      {/* Centered Label */}
      <div className="text-center mb-6">
        <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
          trusted by founders building in
        </p>
      </div>

      {/* Infinite scrolling marquee strip */}
      <div className="w-full flex select-none overflow-hidden relative">
        <div className="animate-marquee flex gap-4 whitespace-nowrap">
          {duplicatedCompanies.map((company, index) => (
            <div 
              key={index}
              className="border border-zinc-200 rounded-full px-5 py-2 text-sm text-zinc-400 bg-white whitespace-nowrap font-bold tracking-wide"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
