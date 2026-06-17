import React from 'react';

export function CareersLife() {
  return (
    <section className="section-xl bg-white border-b border-gray-100">
      <div className="container-editorial">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="section-overline justify-center inline-flex">Life at Launch AI Pilot</div>
          <h2 className="heading-display mt-4 mb-6 text-ink-900">
            A look inside our <span className="text-indigo-600">company.</span>
          </h2>
          <p className="body-xl text-ink-500">
            We work hard, but we also know how to enjoy the journey. Here is a glimpse of what it looks like to be part of our global team.
          </p>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {/* Large main image */}
          <div className="lg:col-span-2 row-span-2 rounded-[2rem] overflow-hidden group relative h-[300px] lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Team collaborating" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <p className="absolute bottom-6 left-8 text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
              Annual team offsite
            </p>
          </div>
          
          {/* Small images */}
          <div className="rounded-[2rem] overflow-hidden group relative h-[250px] lg:h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Remote coding setup" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="rounded-[2rem] overflow-hidden group relative h-[250px] lg:h-[300px]">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Strategy meeting" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
