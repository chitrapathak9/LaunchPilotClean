import React from 'react';

export function StatsBar() {
  const stats = [
    { value: '30+', label: 'Products shipped' },
    { value: '21 Days', label: 'Average delivery' },
    { value: '5', label: 'Verticals covered' },
    { value: '100%', label: 'Code ownership' }
  ];

  return (
    <section className="bg-zinc-50 border-y border-zinc-100 py-12 select-none">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-4xl font-bold text-zinc-900 tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm text-zinc-400 mt-1 uppercase tracking-wide font-bold">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
