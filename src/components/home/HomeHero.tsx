import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROTATING_WORDS = [
  "Custom AI",
  "Scalable Systems",
  "Smart Workflows",
  "Data Pipelines"
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
      
      {/* Premium Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Calm, Slow Aurora Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-70">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-slate-300/40 blur-[120px] animate-[pulse_20s_ease-in-out_infinite]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-200/30 blur-[120px] animate-[pulse_25s_ease-in-out_infinite_reverse]"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-indigo-100/40 blur-[140px] animate-[pulse_30s_ease-in-out_infinite]"></div>
      </div>
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto text-center relative z-10">

          {/* Premium Overline Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200/60 bg-white/50 backdrop-blur-md mb-8 shadow-sm animate-fade-up">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-600">Enterprise Infrastructure</span>
          </div>

          {/* Animated Typography Heading - Strictly 3 Lines */}
          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight text-slate-900 leading-[1.15] mb-8">
            <span className="block animate-fade-up" style={{ animationDelay: '100ms', animationFillMode: 'both' }}>
              We engineer <span className="inline-block relative h-[1.2em] w-[200px] md:w-[320px] lg:w-[420px] align-bottom overflow-hidden">
                 <span key={currentWordIndex} className="absolute inset-x-0 bottom-0 pb-1 md:pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-fade-up flex justify-center" style={{ animationDuration: '0.6s' }}>
                    {ROTATING_WORDS[currentWordIndex]}
                 </span>
              </span>
            </span>
            <span className="block animate-fade-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              that drives measurable ROI
            </span>
            <span className="block animate-fade-up text-slate-800 mt-1" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
              for ambitious enterprises.
            </span>
          </h1>
          
          {/* Subtitle (Strictly 3 lines max) */}
          <p className="text-sm md:text-base text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '400ms', animationFillMode: 'both' }}>
            We cut through the hype to integrate the exact AI tools your business needs. Our architects map your operational bottlenecks and deploy secure, production-grade infrastructure designed to instantly scale your revenue.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
            <Link to="/book-appointment" className="group inline-flex items-center justify-center h-11 px-8 rounded-full bg-slate-900 text-white font-medium text-sm transition-all hover:bg-slate-800 hover:scale-[1.02] shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] w-full sm:w-auto">
              Book a Clarity Call <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/about" className="group inline-flex items-center justify-center h-11 px-8 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/80 text-slate-700 font-medium text-sm transition-all hover:bg-white hover:border-slate-300 shadow-sm w-full sm:w-auto">
              Know Us
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
