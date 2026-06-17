import React from 'react';
import { Target, ShieldCheck, Zap } from 'lucide-react';

export function CareersValues() {
  const values = [
    {
      icon: <Zap size={24} />,
      title: 'No useless meetings',
      desc: 'We protect your time so you can actually write code. We keep meetings short, strict, and only when absolutely necessary.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Take total ownership',
      desc: 'We don\'t micromanage. When you are given a project, you own it from the first line of code to the final launch.'
    },
    {
      icon: <Target size={24} />,
      title: 'Always be learning',
      desc: 'Technology moves fast. We give you the tools, time, and budget to learn new languages and frameworks to stay ahead.'
    }
  ];

  return (
    <section className="section-xl bg-white border-b border-gray-100">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-5">
            <div className="section-overline">How We Work</div>
            <h2 className="heading-display mb-6 text-ink-900">
              We treat developers like <span className="text-indigo-600">adults.</span>
            </h2>
            <p className="body-lg text-ink-500 mb-0">
              We believe that if you hire smart people, you should get out of their way. Our entire culture is built around giving you the freedom to do the best work of your career without corporate red tape.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="space-y-6">
              {values.map((val, idx) => (
                <div key={idx} className="bg-gray-50 border border-gray-200 rounded-[2rem] p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 text-indigo-600">
                    {val.icon}
                  </div>
                  <div>
                    <h3 className="text-[1.125rem] font-bold text-ink-900 mb-2">{val.title}</h3>
                    <p className="text-[0.9375rem] text-ink-500 leading-relaxed mb-0">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
