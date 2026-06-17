import React from 'react';
import { XCircle, CheckCircle2 } from 'lucide-react';

export function AboutDifference() {
  const differences = [
    {
      old: '3 months of paid "discovery" before writing a single line of code.',
      new: 'We map the architecture in a week and start shipping code in Sprint 1.'
    },
    {
      old: 'Bait-and-switch: Seniors pitch you, juniors build your product.',
      new: 'The elite senior engineers who scope your project are the ones who build it.'
    },
    {
      old: 'Black-box development where you only see updates once a month.',
      new: 'Real-time Jira access, direct Slack channels, and total code transparency.'
    },
    {
      old: 'Code built fast, but instantly becomes legacy technical debt.',
      new: 'AI-native execution ensuring enterprise-grade scalability from day one.'
    }
  ];

  return (
    <section className="section-xl bg-white border-b border-gray-100">
      <div className="container-editorial">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-display mb-6 text-ink-900">
            We're not the agency you've <span className="text-indigo-600">worked with before.</span>
          </h2>
          <p className="body-xl text-ink-500">
            The traditional outsourcing model is broken. It relies on bloat, miscommunication, and junior developers. We tore that model down to build something better.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-[2.5rem] overflow-hidden shadow-sm">
            
            {/* Header row */}
            <div className="grid grid-cols-1 md:grid-cols-2 border-b border-gray-200 bg-white">
              <div className="p-8 text-center md:text-left border-b md:border-b-0 md:border-r border-gray-200">
                <span className="text-[1rem] font-bold text-ink-900 uppercase tracking-widest">Traditional Agencies</span>
              </div>
              <div className="p-8 text-center md:text-left bg-indigo-50/30">
                <span className="text-[1rem] font-bold text-indigo-700 uppercase tracking-widest">Launch AI Pilot</span>
              </div>
            </div>

            {/* Content rows */}
            <div className="divide-y divide-gray-200">
              {differences.map((diff, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-2 group hover:bg-white transition-colors">
                  
                  {/* The Old Way */}
                  <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-200 flex items-start gap-4">
                    <XCircle className="text-rose-400 shrink-0 mt-1" size={24} />
                    <p className="text-[1.0625rem] text-ink-500 leading-relaxed">{diff.old}</p>
                  </div>
                  
                  {/* The New Way */}
                  <div className="p-8 md:p-10 bg-indigo-50/10 group-hover:bg-indigo-50/30 transition-colors flex items-start gap-4">
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={24} />
                    <p className="text-[1.0625rem] text-ink-900 font-medium leading-relaxed">{diff.new}</p>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
