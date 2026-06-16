import React from 'react';
import { Link } from 'react-router-dom';

export function HomeWhoWeWorkedWith() {
  const industries = [
    { 
      name: 'Healthcare', 
      description: 'We build HIPAA-compliant AI systems that streamline patient data processing and complex diagnostic workflows.'
    },
    { 
      name: 'AdTech', 
      description: 'We engineer high-throughput data pipelines and predictive models to optimize programmatic ad targeting and bidding.'
    },
    { 
      name: 'Hospital Management', 
      description: 'We deploy intelligent resource allocation and scheduling systems to drastically reduce operational overhead.'
    },
    { 
      name: 'SaaS Founders', 
      description: 'We integrate powerful, scalable AI features into your existing product to instantly increase your retention and ARR.'
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-blue-600"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Who We Work With</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] max-w-3xl">
            We specialize in deep technical integrations for <span className="text-slate-400 font-medium">complex industries.</span>
          </h2>
        </div>

        {/* Premium Plus Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-y border-slate-200/60">
          {industries.map((industry, idx) => (
            <div 
              key={idx} 
              className={`p-10 md:p-16 relative overflow-hidden group ${
                idx % 2 === 0 ? 'md:border-r border-slate-200/60' : ''
              } ${
                idx < 2 ? 'border-b border-slate-200/60' : ''
              }`}
            >
              {/* Giant Background Number */}
              <div className="absolute top-4 md:top-8 right-6 md:right-10 text-[100px] md:text-[140px] font-black text-slate-50 transition-transform duration-700 group-hover:-translate-y-4 group-hover:text-slate-100 select-none z-0 leading-none">
                0{idx + 1}
              </div>
              
              <div className="relative z-10 pt-16 md:pt-20">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">{industry.name}.</h3>
                <p className="text-slate-500 leading-relaxed max-w-md">
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center animate-fade-up">
          <p className="text-slate-500 text-lg mb-2">We are happy to work with new industries also.</p>
          <Link to="/book-appointment" className="text-slate-900 font-bold underline underline-offset-4 decoration-2 decoration-slate-300 hover:decoration-blue-600 hover:text-blue-600 transition-all">
            Book a call
          </Link>
        </div>

      </div>
    </section>
  );
}
