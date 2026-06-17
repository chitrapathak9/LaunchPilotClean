import React from 'react';
import { Quote } from 'lucide-react';

export function CareersTestimonials() {
  const testimonials = [
    {
      quote: "The best part about working here is the total freedom. Nobody is looking over your shoulder. You are given a hard problem, and you have the trust and tools to solve it your way.",
      author: "Rahul M.",
      role: "Senior Backend Engineer"
    },
    {
      quote: "I used to work at a massive agency where it took 3 weeks just to get approval to use a new library. Here, if a tool helps us ship faster, we use it the same day.",
      author: "Priya S.",
      role: "Lead Frontend Developer"
    },
    {
      quote: "The focus on AI and modern tech stacks is incredible. I've learned more in my first six months here than I did in three years at my previous company.",
      author: "Amit V.",
      role: "AI Solutions Architect"
    },
    {
      quote: "Being 100% remote actually works here. The communication is clear, the documentation is great, and I never feel disconnected from the rest of the team.",
      author: "Sneha P.",
      role: "UI/UX Designer"
    },
    {
      quote: "Management actually listens to developers. If we suggest a better architectural approach, they don't ignore it—they encourage us to build it.",
      author: "Rohan K.",
      role: "Engineering Team Lead"
    },
    {
      quote: "No useless meetings. Period. We have our quick syncs, and then we are left alone to get in the zone and write code. It's incredibly refreshing.",
      author: "Neha D.",
      role: "DevOps Engineer"
    },
    {
      quote: "The compensation is great, but the real benefit is the scale of the projects. We are building things that are used by thousands of people globally.",
      author: "Vikram T.",
      role: "Product Manager"
    },
    {
      quote: "I joined as a junior and was given real responsibilities from day one. The senior devs actually take the time to mentor and review your code properly.",
      author: "Anjali R.",
      role: "Software Engineer"
    },
    {
      quote: "The culture is built around results, not hours logged. As long as you deliver high-quality work, you have complete control over your schedule.",
      author: "Karthik N.",
      role: "Mobile App Developer"
    },
    {
      quote: "We don't cut corners to meet arbitrary deadlines. The focus is always on building scalable, clean, and maintainable systems.",
      author: "Meera C.",
      role: "QA Lead"
    }
  ];

  // Double the array for seamless marquee scrolling
  const scrollItems = [...testimonials, ...testimonials];

  return (
    <section className="section-xl bg-white border-b border-gray-100 overflow-hidden">
      <div className="container-editorial">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-overline justify-center inline-flex">Employee Stories</div>
          <h2 className="heading-display mt-4 mb-6 text-ink-900">
            Don't just take <span className="text-indigo-600">our word for it.</span>
          </h2>
        </div>
      </div>

      {/* Marquee Wrapper */}
      <div className="relative w-full pb-8">
        {/* Left/Right Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="marquee-track flex gap-6 px-6" style={{ animationDuration: '60s' }}>
          {scrollItems.map((test, idx) => (
            <div 
              key={idx} 
              className="bg-gray-50 border border-gray-200 rounded-[2rem] p-8 w-[400px] shrink-0 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative"
            >
              <Quote size={32} className="text-indigo-100 absolute top-8 right-8" />
              <p className="text-[1.0625rem] text-ink-700 leading-relaxed font-medium mb-8 relative z-10 flex-grow">
                "{test.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 shrink-0">
                  {test.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-ink-900">{test.author}</h4>
                  <p className="text-[0.875rem] text-ink-500 m-0">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
