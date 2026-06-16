import React from 'react';
import { Shield, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

export function HomeWhyUs() {
  const guarantees = [
    {
      icon: <Shield size={24} className="text-blue-400" />,
      title: "Zero-Risk Intellectual Property",
      subtitle: "Before a single line of code.",
      description: "We don't hold your codebase hostage. We sign strict NDAs before the first discovery call. You retain 100% ownership of all custom code, prompt templates, and infrastructure from Day 1.",
      checks: ["Day-0 Corporate NDA", "Full source code transfer", "No proprietary platform lock-in"]
    },
    {
      icon: <Zap size={24} className="text-emerald-400" />,
      title: "30-60 Day Production Guarantee",
      subtitle: "No endless discovery retainers.",
      description: "Because we specialize exclusively in AI architectures, we don't need 3 months to figure out how to build your product. We architect a precise flow and deploy production-grade systems in weeks, not seasons.",
      checks: ["Dedicated Systems Architect", "Fixed timeline contracts", "Weekly transparent syncs"]
    },
    {
      icon: <TrendingUp size={24} className="text-amber-400" />,
      title: "Built to Scale, Not to Demo",
      subtitle: "We don't disappear at launch.",
      description: "We don't build fragile prototypes. Every system is engineered to handle enterprise loads. We stay involved post-launch to fine-tune prompts, monitor API usage, and ensure your ROI is realized.",
      checks: ["Post-launch optimization", "Scalable cloud architecture", "30 days included support"]
    }
  ];

  return (
    <section className="py-32 bg-[#0A0F1A] text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        <div className="mb-24 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-blue-500"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">The Launch AI Standard</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-[1.15]">
            We don't ask for trust. <br />
            <span className="text-slate-500 font-medium">We provide verification.</span>
          </h2>
        </div>

        <div className="space-y-8">
          {guarantees.map((item, idx) => (
            <div key={idx} className="relative bg-[#111827] border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center group overflow-hidden transition-colors hover:border-slate-700">
              
              {/* Subtle gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/0 via-blue-900/5 to-blue-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="flex-1 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-8 shadow-inner">
                  {item.icon}
                </div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">{item.subtitle}</p>
                <h3 className="text-3xl font-bold text-white mb-6">{item.title}</h3>
                <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>

              <div className="w-full md:w-[400px] bg-[#0A0F1A] rounded-2xl border border-slate-800 p-8 relative z-10">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 pb-4 border-b border-slate-800">The Verification</h4>
                 <ul className="space-y-4">
                   {item.checks.map((check, cIdx) => (
                     <li key={cIdx} className="flex items-center gap-4 text-slate-300 font-medium">
                       <CheckCircle2 size={18} className="text-blue-500 shrink-0" />
                       {check}
                     </li>
                   ))}
                 </ul>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
