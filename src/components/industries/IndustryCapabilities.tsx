import React from 'react';
import { IndustryData } from '../../data/industries';
import { ArrowRight } from 'lucide-react';

interface IndustryCapabilitiesProps {
  industry: IndustryData;
}

export function IndustryCapabilities({ industry }: IndustryCapabilitiesProps) {
  return (
    <section className="section-xl bg-gray-50 border-b border-gray-100">
      <div className="container-editorial">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="section-overline justify-center inline-flex">Our Arsenal</div>
          <h2 className="heading-display mt-4 mb-6">
            The precise mix of <span className="text-cobalt-600">services and solutions</span>.
          </h2>
          <p className="body-xl text-ink-500">
            We don't sell you what we have on the shelf; we deploy the exact technological capability required to destroy the bottlenecks in your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {industry.capabilities.map((cap, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-[1.5rem] p-8 hover:shadow-lg transition-all group relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-cobalt-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 text-cobalt-600 flex items-center justify-center">
                  {React.cloneElement(cap.icon as React.ReactElement, { strokeWidth: 1.5, size: 24 })}
                </div>
                <span className={`text-[0.6875rem] font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                  cap.category === 'Service' 
                    ? 'bg-ink-100 text-ink-700' 
                    : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {cap.category}
                </span>
              </div>

              <h3 className="text-[1.25rem] font-bold text-ink-900 mb-3 group-hover:text-cobalt-600 transition-colors">
                {cap.title}
              </h3>
              
              <p className="text-[0.9375rem] text-ink-600 leading-relaxed mb-6">
                {cap.description}
              </p>

              <div className="flex items-center gap-2 text-[0.875rem] font-semibold text-ink-900 group-hover:text-cobalt-600 transition-colors mt-auto">
                Explore Capability <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
