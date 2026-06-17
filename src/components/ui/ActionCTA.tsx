import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface ActionCTAProps {
  pillText: string;
  pillIcon: React.ReactNode;
  title: React.ReactNode;
  description: string;
  buttonText?: string;
}

export function ActionCTA({ pillText, pillIcon, title, description, buttonText = "Schedule Your Call" }: ActionCTAProps) {
  return (
    <section className="section-lg bg-gray-50 border-y border-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r from-cobalt-50 to-transparent pointer-events-none" />

      <div className="container-editorial relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/50 border border-indigo-200 text-indigo-700 text-[0.75rem] font-bold tracking-widest uppercase mb-8">
            <span className="flex items-center justify-center shrink-0">
              {pillIcon}
            </span>
            {pillText}
          </div>

          <h2 className="heading-display text-ink-900 mb-6">
            {title}
          </h2>
          
          <p className="body-xl text-ink-500 mb-12 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a href="/book-appointment" className="btn-primary py-4 px-8 text-[1rem] shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <PhoneCall size={18} />
              {buttonText}
            </a>
            <span className="text-ink-400 text-[0.9375rem] font-medium hidden sm:block">
              or
            </span>
            <a href="/contact" className="text-ink-700 font-semibold text-[0.9375rem] hover:text-cobalt-600 transition-colors flex items-center gap-2 group">
              Send us an email <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
