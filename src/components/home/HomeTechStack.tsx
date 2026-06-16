import React from 'react';

export function HomeTechStack() {
  const technologies = [
    'Node.js', 'React.js', 'Angular', 'Python', 'Next.js', 
    'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker',
    'GraphQL', 'TensorFlow', 'PyTorch', 'Vue.js', 'Kubernetes'
  ];

  return (
    <section className="py-20 bg-white overflow-hidden border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Our Capabilities & Technologies</h3>
      </div>
      
      {/* Infinite Marquee */}
      <div className="relative flex overflow-x-hidden group">
        <div className="py-4 animate-marquee whitespace-nowrap flex items-center">
          {[...technologies, ...technologies].map((tech, idx) => (
            <span 
              key={idx} 
              className="mx-8 text-2xl md:text-4xl font-bold text-slate-200 hover:text-slate-400 transition-colors duration-300 select-none cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Fade Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
}
