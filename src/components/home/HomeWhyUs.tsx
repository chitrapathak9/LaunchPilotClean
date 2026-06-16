import React from 'react';
import { Shield, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';

export function HomeWhyUs() {
  const guarantees = [
    {
      icon: <Shield size={24} className="text-blue-600" />,
      title: "Zero-Risk Intellectual Property",
      subtitle: "Before a single line of code.",
      description: "We don't hold your codebase hostage. We sign strict NDAs before the first discovery call. You retain 100% ownership of all custom code, prompt templates, and infrastructure from Day 1.",
      checks: ["Day-0 Corporate NDA", "Full source code transfer", "No proprietary platform lock-in"]
    },
    {
      icon: <Zap size={24} className="text-emerald-500" />,
      title: "Rapid Production Deployment",
      subtitle: "No endless discovery retainers.",
      description: "Because we specialize exclusively in AI architectures, we don't need months to figure out how to build your product. We architect a precise flow and deploy production-grade systems rapidly.",
      checks: ["Dedicated Systems Architect", "Clear milestone deliverables", "Weekly transparent syncs"]
    },
    {
      icon: <TrendingUp size={24} className="text-amber-500" />,
      title: "Built to Scale, Not to Demo",
      subtitle: "We don't disappear at launch.",
      description: "We don't build fragile prototypes. Every system is engineered to handle enterprise loads. We stay involved post-launch to fine-tune prompts, monitor API usage, and ensure your ROI is realized.",
      checks: ["Post-launch optimization", "Scalable cloud architecture", "Included launch support"]
    }
  ];

  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-50/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-24 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-blue-600"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">The Launch AI Standard</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            We don't ask for trust. <br />
            <span className="text-slate-400 font-medium">We provide verification.</span>
          </h2>
        </div>

        <div className="space-y-8">
          {guarantees.map((item, idx) => (
            <div key={idx} className="relative bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row gap-12 items-center group overflow-hidden transition-colors hover:border-slate-300">
              
              {/* Subtle gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="flex-1 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-8 shadow-sm">
                  {item.icon}
                </div>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">{item.subtitle}</p>
                <h3 className="text-3xl font-bold text-slate-900 mb-6">{item.title}</h3>
                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>

              <div className="w-full md:w-[400px] bg-slate-50 rounded-2xl border border-slate-100 p-8 relative z-10">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b border-slate-200">The Verification</h4>
                 <ul className="space-y-4">
                   {item.checks.map((check, cIdx) => (
                     <li key={cIdx} className="flex items-center gap-4 text-slate-700 font-medium">
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
