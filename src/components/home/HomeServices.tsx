import React from 'react';
import { ArrowRight, Code2, Rocket, Brain, Globe, Smartphone, Palette } from 'lucide-react';

export function HomeServices() {
  const services = [
    { 
      name: 'SaaS Development', 
      description: 'Architecting scalable, multi-tenant software platforms designed for high availability and rapid user acquisition.'
    },
    { 
      name: 'MVP Development', 
      description: 'Rapidly prototyping and launching core product offerings to validate market fit without accumulating technical debt.'
    },
    { 
      name: 'AI Development', 
      description: 'Deploying autonomous agents and fine-tuning proprietary models to engineer intelligent layers into your operations.'
    },
    { 
      name: 'Web Development', 
      description: 'Building high-performance, highly scalable web applications with modern frameworks and flawless responsive design.'
    },
    { 
      name: 'Mobile App Development', 
      description: 'Creating disruptive, native-feeling mobile experiences that prioritize user retention and intuitive, frictionless interactions.'
    },
    { 
      name: 'UI/UX Designs', 
      description: 'Designing digital interfaces that deliver intuitive user journeys, blending behavioral psychology with data-driven design.'
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-blue-600"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Our Services</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              Everyone is selling tech. <br />
              <span className="text-slate-400 font-medium">We sell outcomes.</span>
            </h2>
          </div>
          <div className="hidden md:block">
             <p className="text-slate-500 max-w-sm text-lg">We engineer end-to-end solutions that drive measurable business impact, not just lines of code.</p>
          </div>
        </div>

        {/* Premium Plus (++) Grid Layout without outer borders */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`py-12 md:py-16 md:px-12 hover:bg-slate-50/50 transition-colors duration-500 group ${
                (idx % 3 !== 2) ? 'md:border-r border-slate-100' : ''
              } ${
                idx < 3 ? 'border-b border-slate-100' : ''
              }`}
            >
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
