import React from 'react';
import { Target, Workflow, Zap, Code2, Play, Activity, LayoutDashboard, Database, Link as LinkIcon, CheckCircle2, GitBranch, FolderGit2 } from 'lucide-react';

export function HomeSolution() {
  const sections = [
    {
      title: 'Deep Business Understanding',
      description: 'We do not just write code. We spend time understanding your operational bottlenecks, your market, and your goals. By mapping out your exact workflow, we ensure the AI solution we build actually solves a real problem.',
      icon: <Target size={24} />,
      graphic: (
        <div className="w-full h-full bg-slate-100/50 p-6 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/40 rounded-full blur-[80px]"></div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden flex flex-col w-full h-[320px] relative z-10">
            {/* Browser/App Header */}
            <div className="h-12 border-b border-slate-100 flex items-center px-4 justify-between bg-slate-50/80 backdrop-blur-sm">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
              </div>
              <div className="text-xs font-bold text-slate-500 flex items-center gap-2 bg-white px-3 py-1.5 rounded-md shadow-sm border border-slate-200">
                <Activity size={14} className="text-blue-600" />
                Operational Audit Console
              </div>
              <div className="w-12"></div>
            </div>
            
            {/* Dashboard Body */}
            <div className="flex-1 flex bg-slate-50/30">
              {/* Sidebar */}
              <div className="w-1/3 border-r border-slate-100 p-4 flex flex-col gap-4">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identified Bottlenecks</div>
                <div className="space-y-2">
                  <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-lg flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></div>
                    <span className="text-[10px] md:text-xs font-semibold text-rose-700 leading-tight">Manual Data Entry (4h/day)</span>
                  </div>
                  <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-lg flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                    <span className="text-[10px] md:text-xs font-semibold text-amber-700 leading-tight">Support Triage Delay</span>
                  </div>
                  <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center gap-2 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                    <span className="text-[10px] md:text-xs font-semibold text-slate-600 leading-tight">Lead Qualification</span>
                  </div>
                </div>
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 p-5 flex flex-col relative overflow-hidden">
                 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Proposed AI Workflow Mapping</div>
                 
                 <div className="flex-1 border border-slate-200 bg-white rounded-xl shadow-inner p-4 relative flex items-center justify-between">
                    {/* SVG Connector Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      <path d="M 40 50 L 120 50" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                      <path d="M 120 50 L 190 50" stroke="#3B82F6" strokeWidth="2" />
                    </svg>
                    
                    {/* Nodes */}
                    <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 bg-white border border-slate-200 shadow-sm rounded-lg flex items-center justify-center">
                       <Database size={18} className="text-slate-400" />
                    </div>
                    
                    {/* Central AI Node */}
                    <div className="relative z-10 p-2.5 md:p-3 bg-blue-600 shadow-lg shadow-blue-600/30 rounded-xl flex items-center gap-2">
                       <Zap size={16} className="text-white fill-white animate-pulse" />
                       <span className="text-[10px] md:text-xs font-bold text-white hidden sm:block">LLM Agent</span>
                    </div>

                    <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 bg-white border border-emerald-200 shadow-sm rounded-lg flex items-center justify-center ring-2 ring-emerald-500/20">
                       <CheckCircle2 size={18} className="text-emerald-500" />
                    </div>
                 </div>
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
        <div className="w-full h-full bg-slate-50 p-4 relative overflow-hidden flex items-center justify-center">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
          
          <div className="relative z-10 w-full max-w-[400px] h-full flex items-center justify-center">
            
            {/* SVG Connecting Lines with animations */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none text-slate-300" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
               <path d="M 80 100 Q 150 150 200 150" stroke="currentColor" strokeWidth="1.5" fill="none" />
               <path d="M 80 200 Q 150 150 200 150" stroke="currentColor" strokeWidth="1.5" fill="none" />
               <path d="M 240 150 L 320 150" stroke="#3B82F6" strokeWidth="2" fill="none" className="opacity-50" />
               
               {/* Animated Packet */}
               <circle cx="0" cy="0" r="3" fill="#3B82F6" className="shadow-[0_0_10px_#3B82F6]">
                 <animateMotion path="M 80 100 Q 150 150 200 150" dur="2s" repeatCount="indefinite" />
               </circle>
            </svg>

            {/* Source Nodes */}
            <div className="absolute left-2 md:left-8 top-[20%] w-[100px] md:w-[120px] bg-white border border-slate-200 rounded-lg p-2 shadow-sm flex items-center gap-2">
               <div className="w-5 h-5 md:w-6 md:h-6 rounded bg-emerald-50 flex items-center justify-center shrink-0 border border-emerald-100">
                  <Database size={12} className="text-emerald-600" />
               </div>
               <span className="text-[9px] md:text-[10px] font-mono font-bold text-slate-700">Client CRM</span>
            </div>
            
            <div className="absolute left-2 md:left-8 bottom-[20%] w-[100px] md:w-[120px] bg-white border border-slate-200 rounded-lg p-2 shadow-sm flex items-center gap-2">
               <div className="w-5 h-5 md:w-6 md:h-6 rounded bg-amber-50 flex items-center justify-center shrink-0 border border-amber-100">
                  <Activity size={12} className="text-amber-600" />
               </div>
               <span className="text-[9px] md:text-[10px] font-mono font-bold text-slate-700">Live API</span>
            </div>

            {/* Central Orchestrator */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[120px] md:w-[140px] bg-blue-50 border border-blue-200 shadow-[0_0_30px_rgba(59,130,246,0.15)] rounded-xl p-3 md:p-4 flex flex-col items-center gap-2">
               <div className="p-2 bg-blue-600 rounded-lg shadow-sm">
                  <Workflow size={20} className="text-white" />
               </div>
               <span className="text-[10px] md:text-[11px] font-bold text-slate-900 tracking-wide text-center">AI Orchestrator</span>
               <div className="px-2 py-0.5 bg-white rounded text-[8px] md:text-[9px] font-mono font-bold text-blue-600 border border-blue-100">gpt-4-turbo</div>
            </div>

            {/* Output Node */}
            <div className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-[100px] md:w-[120px] bg-white border border-emerald-200 rounded-lg p-2 md:p-3 shadow-sm flex flex-col items-center gap-2">
               <CheckCircle2 size={20} className="text-emerald-500" />
               <span className="text-[9px] md:text-[10px] font-bold text-emerald-700 text-center">Production App</span>
            </div>

            {/* Floating Labels */}
            <div className="absolute top-[35%] left-[25%] md:left-[30%] text-[8px] font-mono font-bold text-slate-500 bg-white px-1.5 py-0.5 border border-slate-200 rounded shadow-sm">JSON payload</div>
          </div>
        </div>
      )
    },
    {
      title: 'Rapid Enterprise Deployment',
      description: 'Traditional agencies string you along for months. Our specialized team executes with clarity. Because we defined the right flow from day one, we build and deploy your custom AI solution securely and rapidly.',
      icon: <Zap size={24} />,
      graphic: (
        <div className="w-full h-full bg-slate-50 p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
          <div className="w-full h-full flex flex-col xl:flex-row gap-4 relative z-10 max-h-full">
            {/* Left Pane: Terminal */}
            <div className="flex-[3] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col font-mono text-[10px] md:text-xs">
              <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-3 gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="ml-2 font-bold text-slate-500">deploy.sh</span>
              </div>
              <div className="p-4 flex flex-col gap-2.5 text-slate-600 overflow-y-auto font-medium">
                <div className="text-blue-600 font-bold">$ yarn launch-ai-infrastructure --prod</div>
                <div>[1/4] Building secure VPC network... <span className="text-emerald-600 font-bold">Done</span></div>
                <div>[2/4] Provisioning Vector Databases... <span className="text-emerald-600 font-bold">Done</span></div>
                <div className="flex items-center gap-2">
                  [3/4] Deploying edge functions... 
                  <span className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                </div>
              </div>
            </div>

            {/* Right Pane: Server Monitor */}
            <div className="flex-[2] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col shrink-0">
              <div className="p-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                <span className="text-[10px] font-bold text-slate-600 uppercase">Live Status</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  Online
                </span>
              </div>
              <div className="p-4 flex flex-col gap-4">
                {/* Metric 1 */}
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="font-bold text-slate-500">API Latency</span>
                    <span className="font-mono font-bold text-slate-700">42ms</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[15%] h-full bg-emerald-500"></div>
                  </div>
                </div>
                {/* Metric 2 */}
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="font-bold text-slate-500">Success Rate</span>
                    <span className="font-mono font-bold text-slate-700">99.99%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[99%] h-full bg-blue-500"></div>
                  </div>
                </div>
                {/* Notification Toast */}
                <div className="mt-auto p-2 bg-emerald-50 border border-emerald-100 rounded flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span className="text-[9px] font-bold text-emerald-800 leading-tight">Production environment successfully deployed.</span>
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
        <div className="w-full h-full bg-slate-50 p-6 flex flex-col justify-center relative overflow-hidden">
           {/* Success Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-100/50 rounded-full blur-[80px]"></div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col w-full h-[320px] relative z-10">
            {/* VS Code Header */}
            <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex text-slate-400 text-[10px] md:text-[11px] font-mono gap-4 overflow-hidden font-bold">
                   <span className="text-slate-700 whitespace-nowrap hidden sm:block bg-white px-2 py-1 rounded shadow-sm border border-slate-200">launch_ai_app.py</span>
                   <span className="whitespace-nowrap py-1">config.ts</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              {/* File Explorer */}
              <div className="w-1/3 max-w-[140px] bg-slate-50/50 border-r border-slate-100 p-3 text-[10px] md:text-[11px] font-mono font-bold text-slate-600 flex flex-col gap-2">
                <div className="text-[9px] font-extrabold text-slate-400 uppercase mb-1 tracking-wider">Explorer</div>
                <div className="flex items-center gap-2 text-slate-700"><FolderGit2 size={14} className="text-blue-500 shrink-0" /> <span className="truncate">src</span></div>
                <div className="flex items-center gap-2 pl-4"><span className="text-blue-500">TS</span> <span className="truncate">index.ts</span></div>
                <div className="flex items-center gap-2 pl-4 bg-blue-50 text-blue-900 py-0.5 -ml-3 pl-7 border-l-2 border-blue-500"><span className="text-blue-600">PY</span> <span className="truncate text-slate-800">app.py</span></div>
                <div className="flex items-center gap-2 pl-4"><span className="text-rose-500">{'{ }'}</span> <span className="truncate">package.json</span></div>
              </div>

              {/* Code Area */}
              <div className="flex-1 bg-white p-4 font-mono font-bold text-[10px] md:text-[11px] leading-relaxed relative overflow-hidden">
                <div className="whitespace-nowrap"><span className="text-blue-600">import</span> <span className="text-slate-800">os</span></div>
                <div className="whitespace-nowrap"><span className="text-blue-600">from</span> <span className="text-slate-800">langchain.agents</span> <span className="text-blue-600">import</span> <span className="text-teal-600">AgentExecutor</span></div>
                <br/>
                <div className="text-emerald-600 whitespace-nowrap bg-emerald-50 px-1 rounded w-fit"># 100% Client Owned Infrastructure</div>
                <div className="whitespace-nowrap"><span className="text-blue-600">def</span> <span className="text-amber-600">initialize_custom_ai</span><span className="text-slate-800">():</span></div>
                <div className="pl-4 text-slate-800 whitespace-nowrap">api_key = os.environ.get(<span className="text-amber-700">'OWNED_KEY'</span>)</div>
                <div className="pl-4 text-slate-800 whitespace-nowrap"><span className="text-purple-600">return</span> <span className="text-teal-600">AgentExecutor</span>(api_key)</div>
                
                {/* Premium Transfer Overlay */}
                <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                   <div className="bg-slate-900 text-white px-4 py-2 md:px-5 md:py-3 rounded-xl text-[10px] md:text-xs font-bold flex items-center gap-2 shadow-xl animate-fade-up border border-slate-800">
                     <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                     <span className="whitespace-nowrap">Full IP Transferred</span>
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
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">How We Work</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
            How we take you from concept to <span className="text-slate-400 font-medium block mt-2">production with zero friction.</span>
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

                {/* Graphic Side */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] group shadow-sm border border-slate-100">
                    <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-[1.02]">
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
