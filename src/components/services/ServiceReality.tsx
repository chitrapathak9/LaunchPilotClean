import React from 'react';
import { X, Check } from 'lucide-react';
import { ServiceData } from '../../data/services';

interface ServiceRealityProps {
  service: ServiceData;
}

export function ServiceReality({ service }: ServiceRealityProps) {
  return (
    <section className="section-xl bg-gray-50 border-b border-gray-100">
      <div className="container-editorial">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="section-overline justify-center inline-flex">The Industry Reality</div>
          <h2 className="heading-display mt-2 mb-4">
            Why most agencies fail at this.
          </h2>
          <p className="body-xl text-ink-500">
            The standard agency model is broken. We rebuilt it from the ground up to guarantee delivery and performance.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Traditional Approach */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 shadow-sm relative overflow-hidden group">
            {/* Subtle red tint header */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-500" />
            <h3 className="text-[1.375rem] font-bold text-ink-900 mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <X size={16} strokeWidth={3} />
              </span>
              The Traditional Approach
            </h3>
            <ul className="space-y-6">
              {service.traditionalApproach.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4 text-[0.9375rem] text-ink-600 leading-relaxed">
                  <span className="mt-1 text-rose-400 shrink-0 opacity-70">
                    <X size={16} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Our Approach */}
          <div className="bg-ink-900 rounded-3xl p-8 lg:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.12)] relative overflow-hidden group border border-ink-800">
            {/* Subtle purple tint header */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#6D28D9]" />
            <h3 className="text-[1.375rem] font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#6D28D9]/20 text-[#c4b5fd] flex items-center justify-center shrink-0">
                <Check size={16} strokeWidth={3} />
              </span>
              Our Approach
            </h3>
            <ul className="space-y-6">
              {service.ourApproach.map((point, idx) => (
                <li key={idx} className="flex items-start gap-4 text-[0.9375rem] text-white/80 leading-relaxed">
                  <span className="mt-1 text-[#a78bfa] shrink-0">
                    <Check size={16} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
