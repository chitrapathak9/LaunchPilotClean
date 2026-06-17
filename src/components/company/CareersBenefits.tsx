import React from 'react';
import { Rocket, BrainCircuit, Globe2, Wallet } from 'lucide-react';

export function CareersBenefits() {
  const benefits = [
    {
      icon: <Globe2 size={24} />,
      title: 'Work from anywhere',
      desc: 'We are a 100% remote company. Work from your home, a coffee shop, or while traveling. We only care about your results, not where you sit.'
    },
    {
      icon: <Wallet size={24} />,
      title: 'Great pay',
      desc: 'We expect great work, and we pay well for it. We offer competitive salaries that match or beat industry standards.'
    },
    {
      icon: <Rocket size={24} />,
      title: 'Build real things',
      desc: 'You won\'t be stuck doing boring maintenance work. You will be building fresh, exciting products for startups from the ground up.'
    },
    {
      icon: <BrainCircuit size={24} />,
      title: 'The best tools',
      desc: 'We provide you with the best software, hardware, and AI tools you need to get your job done without frustration.'
    }
  ];

  return (
    <section className="section-xl bg-gray-50 border-b border-gray-100">
      <div className="container-editorial">
        
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="section-overline justify-center inline-flex">The Perks</div>
          <h2 className="heading-display mt-4 mb-6 text-ink-900">
            Why you will love <span className="text-indigo-600">working here.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-[2rem] p-8 hover:shadow-lg transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                {benefit.icon}
              </div>
              <h3 className="text-[1.25rem] font-bold text-ink-900 mb-3 group-hover:text-indigo-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-[0.9375rem] text-ink-500 leading-relaxed mb-0">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
