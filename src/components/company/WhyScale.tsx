import React from 'react';
import { Rocket } from 'lucide-react';

export function WhyScale() {
  return (
    <section className="section-xl bg-white border-b border-gray-100 relative overflow-hidden">
      
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
      
      <div className="container-editorial relative z-10">
        <div className="bg-ink-900 rounded-[2.5rem] p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-xl">
          
          {/* Dark grid background for the card */}
          <div className="absolute inset-0 dot-grid-dark opacity-30 pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 text-amber-400 flex items-center justify-center mb-8 backdrop-blur-md">
              <Rocket size={32} />
            </div>
            <h2 className="heading-display !text-white mb-6">
              Built to handle <span className="text-amber-400">500,000 users</span> from day one.
            </h2>
            <p className="text-[1.125rem] text-ink-300 leading-relaxed mb-0">
              When your marketing campaign goes viral, your website shouldn't crash. We engineer your entire system to handle massive traffic spikes right out of the gate. You focus on getting the customers, and we will make sure the platform stays online.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0 hidden lg:block">
            <div className="w-64 h-64 rounded-full border border-white/10 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-amber-500/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="w-48 h-48 rounded-full border border-white/20 flex items-center justify-center bg-ink-800">
                <div className="text-center">
                  <div className="text-4xl font-black text-white mb-1">5L+</div>
                  <div className="text-sm font-bold text-amber-400 tracking-widest uppercase">Users</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
