import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROTATING_WORDS = [
  "Custom AI",
  "Scalable Systems",
  "Smart Workflows",
  "Secure Infrastructure"
];

export function HomeHero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000); // Changes every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden font-sans bg-[#F8F9FA]">
      
      {/* Calm, Slow Aurora Background Effect */}
      {/* Opacity is lowered and colors are shifted to soft slate/teal/blue for a calm, airy feel. Animations are extremely slow. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-60">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-slate-300/40 blur-[120px] animate-[pulse_20s_ease-in-out_infinite]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-200/30 blur-[120px] animate-[pulse_25s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-teal-100/40 blur-[140px] animate-[pulse_30s_ease-in-out_infinite]"></div>
      </div>
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 w-full">
        
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center">

          {/* Animated Typography Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight text-slate-900 leading-[1.15] mb-8 min-h-[140px] md:min-h-[180px]">
            <span className="block animate-fade-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
              We engineer <span className="text-blue-600 inline-flex overflow-hidden align-bottom">
                 <span key={currentWordIndex} className="animate-fade-up inline-block" style={{ animationDuration: '0.6s' }}>
                    {ROTATING_WORDS[currentWordIndex]}
                 </span>
              </span>
            </span>
            <span className="block animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              that drives measurable ROI
            </span>
            <span className="block animate-fade-up text-slate-400 font-medium mt-2" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              for ambitious enterprises.
            </span>
          </h1>
          
          {/* Subtitle (3-4 lines) */}
          <p className="text-base md:text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
            We cut through the hype to integrate the exact AI tools your business needs. Stop wasting resources on generic prototypes. Our architects map your operational bottlenecks and deploy secure, production-grade infrastructure designed to scale your revenue.
          </p>
          
          {/* Action Buttons (Medium Size) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
            <Link to="/book-appointment" className="group inline-flex items-center justify-center h-10 px-6 rounded-full bg-slate-900 text-white font-medium text-sm transition-all hover:bg-slate-800 hover:scale-[1.02] shadow-sm w-full sm:w-auto">
              Book a Clarity Call <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="group inline-flex items-center justify-center h-10 px-6 rounded-full bg-white border border-slate-200 text-slate-700 font-medium text-sm transition-all hover:bg-slate-50 hover:border-slate-300 shadow-sm w-full sm:w-auto">
              Know Us
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
