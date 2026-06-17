import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ServiceData } from '../../data/services';

interface ServiceHeroProps {
  service: ServiceData;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-white overflow-hidden border-b border-gray-100">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cobalt-50/50 via-white to-white pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      
      <div className="container-editorial relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Animated Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-ink-100 shadow-sm mb-8 animate-fade-down">
            <span className="w-2 h-2 rounded-full bg-[#6D28D9] animate-pulse shrink-0 shadow-[0_0_8px_rgba(109,40,217,0.6)]" />
            <span className="text-[0.6875rem] font-bold tracking-[0.1em] uppercase text-ink-600">
              Enterprise Service
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-ink-900 mb-6 leading-[1.1] tracking-tight animate-fade-up" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}>
            {service.name}
          </h1>

          {/* Subtitle */}
          <p className="body-xl text-ink-500 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '100ms' }}>
            {service.heroSubtitle}
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <a href="/book-appointment" className="btn-primary py-3.5 px-8 text-[0.9375rem]">
              Talk to an Expert
              <ArrowRight size={16} />
            </a>
            <a href="#engagement" className="btn-secondary py-3.5 px-8 text-[0.9375rem] border-ink-200">
              View Engagement Models
            </a>
          </div>

        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50/80 to-transparent pointer-events-none" />
    </section>
  );
}
