import React from 'react';
import { FadeUp } from './FadeUp';

export function StatsBar() {
  const stats = [
    { value: '30+', label: 'Products shipped' },
    { value: '6 years', label: 'Experience building' },
    { value: '5', label: 'Verticals covered' },
    { value: '21 days', label: 'Avg delivery time' },
  ];

  return (
    <section className="bg-white border-y border-zinc-200 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <FadeUp key={index} delay={0.1 * index}>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold text-zinc-900 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-sm text-zinc-500 mt-1.5 font-bold tracking-wide">
                  {stat.label}
                </span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
