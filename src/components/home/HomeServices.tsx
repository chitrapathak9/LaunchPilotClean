import React, { useState } from 'react';
import { ArrowRight, Code2, Rocket, Brain, Globe, Smartphone, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';

import { services } from '../../data/services';

export function HomeServices() {
  const [activeService, setActiveService] = useState(0);
  const active = services[activeService];

  return (
    <section className="section-xl bg-canvas-warm">
      <div className="container-content">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div className="max-w-[560px]">
            <div className="section-overline">Our Services</div>
            <h2 className="heading-display mt-1">
              Everyone sells tech. <br />
              <span className="text-ink-400 font-medium">We sell outcomes.</span>
            </h2>
          </div>
          <p className="body-xl text-ink-500 max-w-[300px] md:text-right">
            End-to-end solutions that drive measurable business impact.
          </p>
        </div>

        {/* Tab layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 lg:gap-10">

          {/* Left: Service list */}
          <div className="flex flex-col gap-1">
            {services.map((service, idx) => (
              <button
                key={service.id}
                onClick={() => setActiveService(idx)}
                className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 group ${
                  activeService === idx
                    ? 'bg-ink-900 shadow-card-md'
                    : 'hover:bg-ink-100/60'
                }`}
              >
                <span
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 ${
                    activeService === idx
                      ? 'bg-white/10 text-white'
                      : 'bg-ink-100 text-ink-500 group-hover:text-ink-700'
                  }`}
                >
                  {service.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-[0.9375rem] transition-colors duration-200 leading-tight ${
                    activeService === idx ? 'text-white' : 'text-ink-800 group-hover:text-ink-900'
                  }`}>
                    {service.name}
                  </p>
                  <p className={`text-[0.8125rem] mt-0.5 transition-colors duration-200 truncate ${
                    activeService === idx ? 'text-white/50' : 'text-ink-400'
                  }`}>
                    {service.tagline}
                  </p>
                </div>
                <span className={`text-[0.75rem] font-mono font-bold shrink-0 ${
                  activeService === idx ? 'text-white/40' : 'text-ink-300'
                }`}>
                  {service.num}
                </span>
              </button>
            ))}
          </div>

          {/* Right: Detail panel */}
          <div
            key={active.id}
            className="bg-white border border-ink-100 rounded-3xl p-8 lg:p-10 shadow-card-md flex flex-col animate-fade-up"
          >
            {/* Icon + number */}
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-ink-50 border border-ink-100 flex items-center justify-center text-ink-600">
                {active.icon}
              </div>
              <span
                className="font-display font-bold text-ink-100 leading-none"
                style={{ fontSize: '4rem' }}
              >
                {active.num}
              </span>
            </div>

            {/* Text */}
            <h3 className="heading-lg text-ink-900 mb-2">{active.name}</h3>
            <p className="label-xs text-cobalt-600 mb-5">{active.tagline}</p>
            <p className="body-xl text-ink-500 leading-relaxed mb-8">{active.description}</p>

            {/* Highlights */}
            <div className="flex flex-wrap gap-2 mb-10">
              {active.highlights.map((h, i) => (
                <span key={i} className="badge badge-cobalt text-[0.6875rem]">{h}</span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-auto flex items-center gap-4">
              <Link
                to={`/services/${active.slug}`}
                className="inline-flex items-center gap-2 text-[0.875rem] font-bold text-[#6D28D9] hover:text-[#5b21b6] group transition-colors"
              >
                Explore service details
                <span className="btn-icon-arrow !bg-[#6D28D9]/10 group-hover:!bg-[#6D28D9]/20">
                  <ArrowRight size={13} className="text-[#6D28D9]" />
                </span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
