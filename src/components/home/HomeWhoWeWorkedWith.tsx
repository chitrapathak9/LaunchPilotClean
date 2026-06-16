import React from 'react';
import { Stethoscope, BarChart3, Building2, Server } from 'lucide-react';

export function HomeWhoWeWorkedWith() {
  const industries = [
    { name: 'Healthcare', icon: <Stethoscope size={28} /> },
    { name: 'AdTech', icon: <BarChart3 size={28} /> },
    { name: 'Hospital Management', icon: <Building2 size={28} /> },
    { name: 'SaaS Founders', icon: <Server size={28} /> }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Who We Work With</h2>
          <p className="text-slate-600">
            We don't build generic AI. We specialize in deep technical integrations for complex industries where accuracy and data security matter most.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.map((industry, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center p-8 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-slate-100 transition-colors">
              <div className="text-slate-700 mb-4">
                {industry.icon}
              </div>
              <p className="font-semibold text-slate-900 text-center">{industry.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
