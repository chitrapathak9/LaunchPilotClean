import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomeCTAStats() {
  const stats = [
    { value: '50+', label: 'Products Shipped' },
    { value: '5+', label: 'Years' },
    { value: '32', label: 'Case Studies' },
    { value: '20+', label: 'Countries' }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* CTA Top */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            Your competitor isn't waiting.
          </h2>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed">
            Every week without the right team is a week of missed features, lost users, and unimpressed investors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/about" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-bold rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center">
              See What We've Built
            </Link>
            <Link to="/book-appointment" className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              Book a Free 30-Min Call <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Stats Bottom */}
        <div className="pt-16 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
