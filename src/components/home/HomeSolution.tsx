import React from 'react';
import { Target, Workflow, Zap, Code2, Play, Activity, LayoutDashboard, Database, Link as LinkIcon, CheckCircle2, GitBranch, FolderGit2 } from 'lucide-react';

export function HomeSolution() {
  const sections = [
    {
      title: 'Deep Business Understanding',
      description: 'We do not just write code. We spend time understanding your operational bottlenecks, your market, and your goals. By mapping out your exact workflow, we ensure the AI solution we build actually solves a real problem.',
      icon: <Target size={24} />,
      graphic: (
        <div className="w-full h-full bg-[#FAFAFA] p-6 md:p-12 flex flex-col justify-center relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]"></div>
          
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-white/80 overflow-hidden flex flex-col h-full max-h-[340px] relative z-10">
            {/* Glass Header */}
            <div className="h-12 border-b border-slate-100/50 flex items-center px-4 justify-between bg-white/40">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                <div className="w-3 h-3 rounded-full bg-slate-200"></div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white/60 px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                <LayoutDashboard size={14} className="text-blue-500" />
                <span>Workflow Analysis Map</span>
              </div>
            </div>
            {/* Glass Body */}
            <div className="flex-1 p-6 flex gap-6">
              <div className="w-1/3 flex flex-col gap-4">
                <div className="h-2 bg-slate-100 rounded-full w-full"></div>
                <div className="h-2 bg-slate-100 rounded-full w-5/6"></div>
                <div className="h-2 bg-slate-100 rounded-full w-4/6"></div>
                <div className="mt-auto p-4 bg-gradient-to-br from-blue-50 to-transparent rounded-xl border border-blue-100/50">
                  <p className="text-[10px] text-blue-600 font-bold mb-1 uppercase tracking-widest">System Viability</p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-black text-slate-900 leading-none">98</span>
                    <span className="text-blue-500 text-sm font-bold mb-1">%</span>
                  </div>
                </div>
              </div>
              <div className="w-2/3 bg-slate-50/50 rounded-xl border border-slate-100 relative p-4 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNFMkU4RjAiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Activity size={120} className="text-blue-500/10" strokeWidth={1} />
                </div>
                {/* Floating Glass Nodes */}
                <div className="absolute top-[20%] left-[10%] w-16 h-8 bg-white/80 backdrop-blur border border-white shadow-sm rounded-lg flex items-center justify-center text-[10px] font-bold text-slate-600 animate-[float_4s_ease-in-out_infinite]">Intake</div>
                <div className="absolute bottom-[20%] right-[10%] w-16 h-8 bg-blue-500/90 backdrop-blur border border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] rounded-lg flex items-center justify-center text-[10px] font-bold text-white animate-[float_5s_ease-in-out_infinite]">Process</div>
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ strokeDasharray: '4 4' }}>
                   <path d="M 80 80 Q 150 150 200 120" stroke="#3B82F6" strokeWidth="1.5" fill="none" opacity="0.3" className="animate-[pulse_2s_linear_infinite]" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Architecting the Right Flow',
      description: 'Once we understand the problem, we map out the precise technical direction. We choose the right AI models, databases, and APIs tailored specifically to your needs, ignoring the hype to focus on what actually works.',
      icon: <Workflow size={24} />,
      graphic: (
        <div className="w-full h-full bg-[#0A0F1A] p-6 md:p-12 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15)_0%,transparent_60%)]"></div>
          
          <div className="relative z-10 w-full max-w-[340px] aspect-square">
            {/* Center Node (Glass) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-blue-500/10 backdrop-blur-md border border-blue-400/30 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.4)] z-20 animate-[float_6s_ease-in-out_infinite]">
              <div className="absolute inset-0 bg-blue-400/20 rounded-2xl animate-ping opacity-20"></div>
              <Zap className="text-blue-400" size={32} />
            </div>

            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none text-blue-500/30">
              <path d="M 170 170 L 60 80" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M 170 170 L 280 80" stroke="currentColor" strokeWidth="1" fill="none" />
              <path d="M 170 170 L 170 280" stroke="currentColor" strokeWidth="1" fill="none" />
              {/* Animated data packets */}
              <circle cx="60" cy="80" r="3" fill="#3B82F6">
                <animateMotion path="M 0 0 L 110 90" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="170" cy="280" r="3" fill="#3B82F6">
                <animateMotion path="M 0 0 L 0 -110" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* Outer Nodes (Glass) */}
            <div className="absolute top-[5%] left-[5%] w-14 h-14 bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-xl flex items-center justify-center z-20">
              <Database className="text-slate-300" size={20} />
            </div>
            <div className="absolute top-[5%] right-[5%] w-14 h-14 bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-xl flex items-center justify-center z-20">
              <LinkIcon className="text-slate-300" size={20} />
            </div>
            <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-14 h-14 bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-xl flex items-center justify-center z-20">
              <Code2 className="text-slate-300" size={20} />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Rapid Development in 30-60 Days',
      description: 'Traditional agencies string you along for 6 months. Our specialized team executes with clarity. Because we defined the right flow from day one, we build and deploy your custom AI solution in just 30 to 60 days.',
      icon: <Zap size={24} />,
      graphic: (
        <div className="w-full h-full bg-[#FAFAFA] p-6 md:p-12 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-slate-200/50 rounded-full blur-[100px]"></div>
          
          <div className="bg-[#0A0F1A]/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgb(0,0,0,0.15)] border border-slate-800 overflow-hidden flex flex-col w-full font-mono text-xs relative z-10 h-[300px]">
            {/* Terminal Header */}
            <div className="h-10 bg-slate-900/50 border-b border-slate-800 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
              </div>
              <div className="text-slate-500 text-[10px] uppercase tracking-widest font-bold">Launch AI Deployment</div>
              <div className="w-12"></div>
            </div>
            {/* Terminal Body */}
            <div className="p-6 flex flex-col gap-3 text-slate-400 flex-1 overflow-hidden">
              <div className="flex items-center gap-3">
                <span className="text-blue-500">➜</span>
                <span className="text-white">launch-ai-pilot</span>
                <span>yarn deploy:production</span>
              </div>
              <div className="text-slate-500 mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-500 rounded-full animate-pulse"></span>
                Compiling optimized AI graph models...
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>Build architecture successful [1.2s]</span>
              </div>
              <div className="text-slate-500 mt-2 flex items-center gap-2">
                <span className="w-1 h-1 bg-slate-500 rounded-full animate-pulse"></span>
                Running stress test suite...
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>All 142 node endpoints verified</span>
              </div>
              <div className="mt-4 flex flex-col gap-2 p-3 bg-blue-900/10 border border-blue-900/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Play size={12} className="text-blue-400 fill-blue-400 animate-pulse" />
                  <span className="text-blue-300 font-bold">Deploying to secure cloud infrastructure...</span>
                </div>
                {/* Glowing Progress Bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-blue-500 w-[85%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '100% Code Ownership',
      description: 'You are never locked into proprietary platforms. From day one, you own the IP and the codebase. We transfer everything to you, ensuring your business has an asset it can scale indefinitely.',
      icon: <Code2 size={24} />,
      graphic: (
        <div className="w-full h-full bg-[#FAFAFA] p-6 md:p-12 flex flex-col justify-center relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]"></div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col w-full h-[300px] relative z-10">
            {/* Repo Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                  <FolderGit2 className="text-slate-600" size={16} />
                </div>
                <span className="font-bold text-slate-900">client-infrastructure <span className="text-slate-400 font-normal">/ src</span></span>
              </div>
              <div className="px-3 py-1.5 rounded-md text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-200 flex items-center gap-1.5 shadow-sm">
                <GitBranch size={12} className="text-blue-500" />
                production
              </div>
            </div>
            {/* File List */}
            <div className="flex-1 flex flex-col text-sm bg-slate-50/50">
              <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center text-slate-600 text-xs bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-black text-[10px]">✓</div>
                  <span className="font-bold text-slate-800">Final handover commit</span>
                </div>
                <span className="text-slate-400 font-medium">Just now</span>
              </div>
              
              <div className="flex-1 p-5 flex flex-col gap-4 relative">
                 {/* Fake files */}
                 <div className="flex justify-between items-center text-xs text-slate-500">
                   <div className="flex items-center gap-3">
                     <span className="text-blue-500 text-lg">📁</span>
                     <span className="font-medium text-slate-700">ai-models</span>
                   </div>
                   <span className="font-mono text-[10px]">d8f2a1</span>
                 </div>
                 <div className="flex justify-between items-center text-xs text-slate-500">
                   <div className="flex items-center gap-3">
                     <span className="text-amber-500 text-lg">📄</span>
                     <span className="font-medium text-slate-700">architecture.json</span>
                   </div>
                   <span className="font-mono text-[10px]">e4b9c2</span>
                 </div>
                 <div className="flex justify-between items-center text-xs text-slate-500">
                   <div className="flex items-center gap-3">
                     <span className="text-slate-400 text-lg">📄</span>
                     <span className="font-medium text-slate-700">deployment-keys.env</span>
                   </div>
                   <span className="font-mono text-[10px]">f1a8d0</span>
                 </div>

                 {/* Premium Success overlay */}
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full flex justify-center">
                   <div className="bg-emerald-500 text-white px-6 py-3 rounded-full text-xs font-bold flex items-center gap-2 shadow-[0_10px_30px_rgba(16,185,129,0.3)] animate-fade-up border border-emerald-400">
                     <CheckCircle2 size={16} />
                     100% IP Transferred
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="mb-24 max-w-4xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-blue-600"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">The Journey</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            How we take you from concept to <span className="text-slate-400 font-medium block mt-2">production in 30-60 days.</span>
          </h2>
        </div>

        <div className="space-y-32">
          {sections.map((section, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={idx} className={`flex flex-col gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                
                {/* Content Side */}
                <div className="flex-1 w-full text-left">
                  <span className="text-sm font-bold text-blue-600 mb-6 block font-mono bg-blue-50 w-fit px-3 py-1 rounded-full border border-blue-100">Step 0{idx + 1}</span>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">{section.title}</h3>
                  <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                    {section.description}
                  </p>
                </div>

                {/* Graphic Side - Removed the grey border to let the glassmorphism shine */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] group">
                    <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-[1.03]">
                      {section.graphic}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
