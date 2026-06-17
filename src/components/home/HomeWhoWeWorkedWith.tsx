import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, BarChart3, Building2, Cpu } from 'lucide-react';

const industries = [
  {
    name: 'Healthcare',
    description:
      'HIPAA-compliant AI systems that streamline patient data processing and complex diagnostic workflows. Reducing operational overhead while improving care quality.',
    icon: <Heart size={22} />,
    accent: 'bg-rose-50 text-rose-600 border-rose-100',
    accentHover: 'group-hover:bg-rose-600 group-hover:text-white',
    featured: true,
  },
  {
    name: 'AdTech',
    description:
      'High-throughput data pipelines and predictive models that optimize programmatic ad targeting, bidding algorithms, and real-time campaign performance.',
    icon: <BarChart3 size={22} />,
    accent: 'bg-amber-50 text-amber-600 border-amber-100',
    accentHover: 'group-hover:bg-amber-600 group-hover:text-white',
    featured: false,
  },
  {
    name: 'Hospital Management',
    description:
      'Intelligent resource allocation and automated scheduling systems that drastically reduce operational overhead and improve staff utilization.',
    icon: <Building2 size={22} />,
    accent: 'bg-teal-50 text-teal-600 border-teal-100',
    accentHover: 'group-hover:bg-teal-600 group-hover:text-white',
    featured: false,
  },
  {
    name: 'SaaS Founders',
    description:
      'Powerful, scalable AI features integrated into your existing product architecture to increase user retention, reduce churn, and grow your ARR.',
    icon: <Cpu size={22} />,
    accent: 'bg-cobalt-50 text-cobalt-600 border-cobalt-100',
    accentHover: 'group-hover:bg-cobalt-600 group-hover:text-white',
    featured: true,
  },
];

export function HomeWhoWeWorkedWith() {
  return (
    <section className="section-xl bg-white">
      <div className="container-content">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 lg:mb-20">
          <div className="max-w-[560px]">
            <div className="section-overline">Who We Work With</div>
            <h2 className="heading-display mt-1">
              Deep expertise in <br />
              <span className="text-ink-400 font-medium">complex industries.</span>
            </h2>
          </div>
          <p className="body-xl text-ink-500 max-w-[320px] lg:text-right">
            We specialize in regulated, high-stakes verticals where precision engineering matters.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {industries.map((industry, idx) => (
            <div
              key={idx}
              className={`group relative bg-ink-50 border border-ink-100 rounded-3xl overflow-hidden transition-all duration-400 hover:border-ink-200 hover:shadow-card-lg hover:-translate-y-1.5 ${
                industry.featured ? 'md:p-10 p-8' : 'p-8'
              }`}
            >
              {/* Giant background name */}
              <div
                className="absolute bottom-0 right-0 text-[5rem] md:text-[7rem] font-black text-ink-100/60 group-hover:text-ink-100/80 leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-105 origin-bottom-right pr-4 pb-2"
                style={{ fontFamily: 'Fraunces, Georgia, serif' }}
              >
                {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-300 ${industry.accent} ${industry.accentHover}`}>
                {industry.icon}
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-[380px]">
                <h3 className={`font-bold text-ink-900 mb-3 ${industry.featured ? 'text-2xl' : 'text-xl'}`}>
                  {industry.name}
                </h3>
                <p className="body-base text-ink-500 leading-relaxed">
                  {industry.description}
                </p>
              </div>

              {/* Hover arrow */}
              <div className="mt-6 flex items-center gap-2 text-[0.8125rem] font-semibold text-ink-400 group-hover:text-ink-700 transition-colors duration-300 relative z-10">
                <span>Explore work</span>
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 text-center">
          <p className="body-base text-ink-400 mb-3">We're happy to work with new industries as well.</p>
          <Link
            to="/book-appointment"
            className="inline-flex items-center gap-2 text-[0.875rem] font-bold text-ink-900 underline underline-offset-4 decoration-2 decoration-ink-300 hover:decoration-cobalt-600 hover:text-cobalt-600 transition-all"
          >
            Book a discovery call <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
