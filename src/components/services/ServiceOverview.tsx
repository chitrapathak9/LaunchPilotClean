import React from 'react';
import { ServiceData } from '../../data/services';
import { ArrowRight } from 'lucide-react';

interface ServiceOverviewProps {
  service: ServiceData;
}

export function ServiceOverview({ service }: ServiceOverviewProps) {
  return (
    <section className="section-lg bg-white border-b border-gray-100">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Heading */}
          <div className="lg:col-span-5">
            <div className="section-overline mb-4">Service Overview</div>
            <h2 className="heading-lg text-ink-900 mb-6">
              Elevating your <span className="text-cobalt-600">{service.name.toLowerCase()}</span>.
            </h2>
            <div className="flex flex-col gap-4">
              {service.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cobalt-50 flex items-center justify-center text-cobalt-600 shrink-0">
                    <span className="text-sm font-bold">{idx + 1}</span>
                  </div>
                  <span className="text-[0.9375rem] font-semibold text-ink-800">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Marketing Content */}
          <div className="lg:col-span-7 lg:pt-8">
            <div className="prose prose-lg prose-ink">
              <p className="text-[1.125rem] leading-relaxed text-ink-600">
                {service.marketingContent}
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <a 
                href="/book-appointment" 
                className="inline-flex items-center gap-2 text-[0.9375rem] font-bold text-cobalt-600 hover:text-cobalt-700 transition-colors group"
              >
                Discuss your project with our experts
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
